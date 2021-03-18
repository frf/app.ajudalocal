import React from "react";
import { Marker } from 'react-leaflet';

import PrimaryButton from "../../components/PrimaryButton";
import Sidebar from "../../components/Sidebar";

import './styles.css';
import { FiPlus } from "react-icons/fi";
// import Map from "../../components/Map";
// import happyMapIcon from "../../components/Map/happMapIcon";

export default function OrphanagesMap() {
  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>
{/* 
            <Map style={{ width: '100%', height: 280 }}>
              <Marker interactive={false} icon={happyMapIcon} position={[-27.2092052,-49.6401092]} />
            </Map> */}

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" />
            </div>

            <div className="input-block">
              <label htmlFor="name">Endereço</label>
              <input id="address" />
            </div>

            <div className="input-block">
              <label htmlFor="about">Instruções <span>Máximo de 700 caracteres</span></label>
              <textarea id="instructions" maxLength={700} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image">

              </div>

              <button className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </button>
            </div>
          </fieldset>

          <PrimaryButton type="submit">Confirmar</PrimaryButton>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
