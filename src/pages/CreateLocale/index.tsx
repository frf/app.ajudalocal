import React from "react";
// import { Marker } from 'react-leaflet';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';

import './styles.css';
// import { FiPlus } from "react-icons/fi";
// import Map from "../../components/Map";
// import happyMapIcon from "../../components/Map/happMapIcon";

interface IFormInputs {
  name_user: string
  phone_user: string
  address: string
  instructions: string
}

const schema = yup.object().shape({
  name_user: yup.string().required(),
  phone_user: yup.string().required(),
  address: yup.string().required(),
  instructions: yup.string().required(),
});

export default function CreateLocale() {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const { register, handleSubmit, errors } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });

  const backPage = () => {
    history.push('/');
  }

  const onSubmit = handleSubmit((data: IFormInputs) => {
    console.log(data);
    async function postLocale() {
     
      try {
        const response = await api.post('/locales', data);
        if (response.status === 201) {
          enqueueSnackbar('Cadastrado com sucesso! Aguarde a nossa liberação.', {variant: 'success', anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          }});

          backPage()

        }
        if (response.status !== 201) {
          enqueueSnackbar('Desculpe mas teve algum probelma, tente novamente.', {variant: 'warning', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          }});
        }

      } catch (error) {
        enqueueSnackbar('Desculpe mas teve algum probelma, tente novamente.', {variant: 'error', anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        }});
      }
      
    }

    postLocale();
  });



  return (
    <div id="page-create-locale">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={onSubmit}>
          <fieldset>
            <legend>Dados do local</legend>
          {/* 
            <Map style={{ width: '100%', height: 280 }}>
              <Marker interactive={false} icon={happyMapIcon} position={[-27.2092052,-49.6401092]} />
            </Map> */}

            <div className="input-block">
              <label htmlFor="address">Endereço</label>
              <input id="address" name="address" ref={register} />
              {errors.address && <span>Este campo precisa ser preenchido!</span>}
            </div>
            
            <div className="input-block">
              <label htmlFor="about">Instruções <span>Ex: pessoas na rua precisando de comida, roupas etc...</span></label>
              <textarea id="instructions" name="instructions" ref={register}  maxLength={700} />
              {errors.instructions && <span>Este campo precisa ser preenchido!</span>}
            </div>

            <div className="input-block">
              <label htmlFor="name_user">Seu nome</label>
              <input id="name_user" name="name_user" ref={register} />
              {errors.name_user && <span>Este campo precisa ser preenchido!</span>}
            </div>

            <div className="input-block">
              <label htmlFor="phone_user">Telefone</label>
              <input id="phone_user" name="phone_user" ref={register} />
              {errors.name_user && <span>Este campo precisa ser preenchido!</span>}
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
          <SecondaryButton type="button" onClick={backPage}>Voltar</SecondaryButton>
        </form>
      </main>
    </div>
  );
}