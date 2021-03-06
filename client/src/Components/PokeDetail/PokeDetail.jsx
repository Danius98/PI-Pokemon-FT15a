import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import { getPokemonID } from '../../actions/index.js';
//import  Activity  from '../Countries/ActivityDetail.jsx';
import "./PokeDetail.css"

export default function PokeID() {
    const PokeDetailed = useSelector((state) => state.PokeInfo)
    const dispatch = useDispatch();
    const {idPokemon} = useParams();
    useEffect(() => {
        dispatch(getPokemonID(idPokemon));
    }, [dispatch, idPokemon]);
    console.log(idPokemon, `${idPokemon}`)
    console.log(PokeDetailed, "Detalle del Pokemon")
    return (
        <div className="all">
            <button className="buton">
                <Link className="link"to="/Pokemon">Home</Link>
            </button>
            <div className="container">
              <h1>{PokeDetailed.Nombre}</h1>
              <div className="imgcontainer">
                  <img src={PokeDetailed.Imagen} alt="No se encontrĂ³ el Pokemon"/>
              </div>
              <div className="table">
                 <h3>Vida: {PokeDetailed.Vida}</h3>
                 <h3>Ataque: {PokeDetailed.Ataque}</h3>
                 <h3>Defensa: {PokeDetailed.Defensa}</h3>
                 <h3>Velocidad: {PokeDetailed.Velocidad}</h3>
                 <h3>Altura: {PokeDetailed.Altura}Cm</h3>
                 <h3>Peso: {PokeDetailed.Peso}Kg</h3>
                 <h3>Tipo:{PokeDetailed.types.map((PokeDetailed) => (PokeDetailed.Tipo))}</h3>
                 </div>
            </div>
        </div>
    )
}

