import React from "react";
// import { Marker } from 'react-leaflet';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import PrimaryButton from "../../components/PrimaryButton";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";

import './styles.css';
// import { FiPlus } from "react-icons/fi";
// import Map from "../../components/Map";
// import happyMapIcon from "../../components/Map/happMapIcon";

interface IFormInputs {
  name: string
  address: string
  instructions: string
}

const schema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  instructions: yup.string().required(),
});

export default function CreateLocale() {
  
  const { register, handleSubmit, errors } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit = handleSubmit((data: IFormInputs) => {
    console.log(data);
    async function postLocale() {
      const response = await api.post('/locales', data);
      console.log(response);
    }

    postLocale();
  });


  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={onSubmit}>
          <fieldset>
            <legend>Dados</legend>
          {/* 
            <Map style={{ width: '100%', height: 280 }}>
              <Marker interactive={false} icon={happyMapIcon} position={[-27.2092052,-49.6401092]} />
            </Map> */}

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" name="name" ref={register} />
              {errors.name && <span>Este campo precisa ser preenchido!</span>}
            </div>

            <div className="input-block">
              <label htmlFor="address">Endereço</label>
              <input id="address" name="address" ref={register} />
              {errors.address && <span>Este campo precisa ser preenchido!</span>}
            </div>
            
            <div className="input-block">
              <label htmlFor="about">Instruções <span>Máximo de 700 caracteres</span></label>
              <textarea id="instructions" name="instructions" ref={register}  maxLength={700} />
              {errors.instructions && <span>Este campo precisa ser preenchido!</span>}
            </div>

            {/* <div className="input-block">
              <label htmlFor="images">Fotos</label>
              <div className="uploaded-image">
              </div>

              <button className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </button>
            </div> */}
          </fieldset>

          <PrimaryButton type="submit">Confirmar</PrimaryButton>
        </form>
      </main>
    </div>
  );
}