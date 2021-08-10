import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'

export default function Landing() {
return (
    <main className="landing">
      <button className="card">
             <Link className="Zelda" to="/Pokemon"><h1>Bienvenido, ¡Suerte en tu aventura!</h1></Link>
      </button>
    </main>
)
}