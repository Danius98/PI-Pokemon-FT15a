import React from "react";
import { Link } from "react-router-dom";
import './Card.css';

export default function PokeCard(props) {
    const {   Imagen, ID, Nombre, Tipo } = props;
    return (
        <div className="card2">
           <Link to={`/Pokemon/${ID}`}>
           <li className="list-item">
           <img width={100}src={Imagen} alt="No imagen"/>
           <div className="align">
              <h4 className="name">{Nombre}</h4>
              <h5>{Tipo}</h5>
           </div>
           </li>
           </Link>
        </div>
    )
};