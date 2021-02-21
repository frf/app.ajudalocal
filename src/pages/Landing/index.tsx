import React from "react";
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/LogoAjuda.png';

import './styles.css';

export default function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="AjudaLocal" />
 
        <main>
          <h1>Ajude com o que puder</h1>
          <p>Faça uma doação para quem precisa.</p>
        </main>

        <div className="location">
          <strong>Brasil</strong>
        </div>

        <Link to="/app" className="enter-app">
          <FaArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  );
}