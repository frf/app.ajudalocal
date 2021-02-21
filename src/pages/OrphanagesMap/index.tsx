import React from "react";
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlus } from "react-icons/fi";

import mapMarkerImg from "../../assets/images/iconeLogo.png";
import Map from '../../components/Map';

import './styles.css';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
})

export default function OrphanagesMap() {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="AjudaLocal" />

          <h2>1 - Escolher um local para ajudar</h2>
          <p>Veja a descrição deste local e vá até ele para poder ajudar.</p>

          <h2>2 - Marque um local que precise de ajuda</h2>
          <p>Se você acha que neste local tem pessoas ou animais que possam precisar dde ajudar marque este local.</p>
        </header>

        <footer>
        </footer>
      </aside>

      <Map>
        <Marker icon={happyMapIcon} position={[-27.2092052,-49.6401092]}>
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
            Lar das meninas
            <Link to={`/orphanages/1`}>
              <FiArrowRight size={20} color="#fff" />
            </Link>
          </Popup>
        </Marker>
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
