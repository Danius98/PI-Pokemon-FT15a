import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemon, getPokemonsName} from "../../actions/index.js";
import "./Buscador.css";

export default function Buscador() {
    const[input, setInput] = useState('');
    const dispatch = useDispatch();
    const inputHandler = (e) => {
        setInput(e.target.value)
    };
    const onClickHandler = () => {
        dispatch(getPokemonsName(input));
    };
    const HomeHandler = () => {
        dispatch(getPokemon());
    };
    return (
        <div className="container">
            <input className="inputtext"
            type="text"
            placeholder="Busca tu Pokemon"
            name="input"
            onChange={(e) => inputHandler(e)}
            />
            <div>
                <button onClick={() => onClickHandler()} className="btnSearch">Buscar</button>
                <button onClick={() => HomeHandler()} className="btnSearch">Reestablecer</button>
            </div>
        </div>
    )
}