import React, { useEffect, useState } from "react";
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlus } from "react-icons/fi";

import mapMarkerImg from "../../assets/images/iconeLogo.png";
import Map from '../../components/Map';

import './styles.css';
import api from "../../services/api";

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


export default function OrphanagesMap() {
    const [locales, setLocale] = useState<IPoint[]>([]);
    const [position, setPosition] = useState({
      latitude: 0,
      longitude: 0,
    });
    useEffect(() => {
      async function getDocs() {
        const response = await api.get('/locales');
        // response.catch(error => {
        //   enqueueSnackbar('Falha conectar no servidor', { 
        //       variant: 'error',
        //   });
        // });
        setLocale(response.data.data);
       
        const pos: any = {
          latitude: response.data.data[0].latitude,
          longitude: response.data.data[0].longitude,
        }
        setPosition(pos);
        console.log(pos);
      }

      getDocs()
    }, [locales]);
    
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="AjudaLocal" />

          <h2>1 - Escolha um local para ajudar</h2>
          <p>Veja a descrição deste local e vá até ele para poder ajudar.</p>

          <h2>2 - Marque um local que precisa de ajuda</h2>
          <p>Se você acha que neste local tem pessoas ou animais que possam precisar dde ajudar marque este local.</p>
        </header>

        <footer>
        </footer>
      </aside>

      <Map center={[position.latitude, position.longitude]} zoom={14}>
        {locales.map(locale => (
        <Marker key={locale.id} icon={happyMapIcon} position={[locale.latitude,locale.longitude]}>
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
            {locale.name}
            <Link to={`/orphanages/1`}>
              <FiArrowRight size={20} color="#fff" />
            </Link>
          </Popup>
        </Marker>
        ))}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
