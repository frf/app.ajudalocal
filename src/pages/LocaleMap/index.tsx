import React, { useState } from "react";
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import MarkerClusterGroup from 'react-leaflet-cluster'
import ReactLoading from 'react-loading';
import mapMarkerImg from "../../assets/images/iconeLogo.png";
import Map from '../../components/Map';

import './styles.css';
import { useFetch } from "../../services/api";
// import { mutate as mutateGlobal } from 'swr';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
})

export interface IPoint {
  id: number;
  latitude: number;
  longitude: number;
  name: string; 
}

export default function LocaleMap() {
    const { data } = useFetch<IPoint[]>('/locales');

    const [position] = useState({
      latitude: -22.897784, 
      longitude: -43.317036,
    });

    if (!data) {
      return (
        <div className="box flex">
              <ReactLoading type={'spin'} color={'#3b0a7c'} height={50} width={50} />
        </div>
      );
    }

    console.log(data);
      
    return (
      <div id="page-map">
        <aside>
          <header>
            <img src={mapMarkerImg} alt="AjudaLocal" />
            <h2>1 - Cadastre um local que esteja precisando de ajuda.</h2>
            <p>Se você não pode ajudar agora mas viu um local que precisa de ajuda, marque este local cadastrando ele para todos nós.</p>

            <h2>2 - Doação: Escolha um local no mapa para você ajudar</h2>
            <p>Veja a descrição deste local e faça uma visita até lá, pois pode ter alguem precisando de você.</p>
          </header>

          <footer>
          </footer>
        </aside>
        <Map center={[position.latitude, position.longitude]} zoom={4} maxZoom={18} className='markercluster-map'>
          <MarkerClusterGroup>
            {data.map(locale => (
            <Marker key={locale.id} icon={happyMapIcon} position={[locale.latitude,locale.longitude]}>
              <Popup closeButton={false} minWidth={340} maxWidth={340} className="map-popup">
                {locale.name}
                <Link to={`/locale/1`}>
                  <FiArrowRight size={20} color="#fff" />
                </Link>
              </Popup>
            </Marker>
            ))}
          </MarkerClusterGroup>
        </Map>
        <Link to="/locale/create" className="create-orphanage">
          <FiPlus size={32} color="#FFF" />
        </Link>
      </div>
    );
}