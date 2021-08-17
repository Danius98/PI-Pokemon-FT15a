import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTypes, createPokemon } from "../../actions/index.js";
import  Type from "./Type";
import './Type.css';

export default function CreatePokemon() {
    const Types = useSelector((state) => state.Types )
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const Tipos = Types
    const [dataForm, setDataForm] = useState({
        Nombre: '',
        Vida: '',
        Fuerza: '',
        Defensa: '',
        Velocidad: '',
        Altura: '',
        Peso: '',
        typeId: []
    });
    const stateReset = () => {
       setDataForm ({
        Nombre: '',
        Vida: '',
        Fuerza: '',
        Defensa: '',
        Velocidad: '',
        Altura: '',
        Peso: '',
        typeId: []
    });
    setInput('');
  };
  const submitInput = (e) => {
      e.preventDefault();
      setInput(e.target.value);
  };
  const setDataHandler = (e) => {
      e.preventDefault();
      setDataForm({
          ...dataForm,
          [e.target.name]: e.target.value,
      });
  };
  const setCodeHandler = (e) => {
    e.preventDefault();
    setDataForm({
        ...dataForm,
        [e.target.name]: dataForm[e.target.name].concat(e.target.value),
    })
    alert("Tipo Añadido")
};
useEffect(() => {
    dispatch(getTypes(input));
}, [input, dispatch]);
const submitForm = (e) => {
    e.preventDefault();
    let form = true;
    if(dataForm["Nombre"].length < 2) {
        form = false;
    } else if (!dataForm["typeId"].length > 1) {
        form = false;
    }
    if(form) {
        dispatch(createPokemon(dataForm))
        .then(() => stateReset())
        .then(() => alert("Pokemon añadido"))
    } else {
        return alert("Por favor llena todos los campos antes de crear una actividad");
    }
  };
  return (
          <div className="container">
                <Link to="/Pokemon" className="homelink">
                    <h1>Inicio</h1>
                </Link>
                <form onSubmit={(e)=>submitForm(e)}>
                <div>
                <input className="input"
                type="text"
                placeholder="Nombra tu Pokemon"
                name="Nombre"
                value={dataForm.Nombre}
                onChange={setDataHandler}/>
                </div>
                <div>
                <input className="input"
                type="number"
                placeholder="Vida"
                name="Vida"
                value={dataForm.Vida}
                onChange={setDataHandler}/>
                </div>
                <div>
                <input className="input"
                type="number"
                placeholder="Fuerza"
                name="Fuerza"
                value={dataForm.Fuerza}
                onChange={setDataHandler}/>
                </div>
                <div>
                <input className="input"
                type="number"
                placeholder="Defensa"
                name="Defensa"
                value={dataForm.Defensa}
                onChange={setDataHandler}/>
                </div>
                <div>
                <input className="input"
                type="number"
                placeholder="Velocidad"
                name="Velocidad"
                value={dataForm.Velocidad}
                onChange={setDataHandler}/>
                </div>
                <div>
                <input className="input"
                type="number"
                placeholder="Altura"
                name="Altura"
                value={dataForm.Altura}
                onChange={setDataHandler}/>
                </div>
                <div>
                <input className="input"
                type="number"
                placeholder="Peso"
                name="Peso"
                value={dataForm.Peso}
                onChange={setDataHandler}/>
                </div>
                <div className="input">
                    <label>Seleccioná Tipos</label>
                    <input className="countries"
                    type="text"
                    placeholder="Encuentra tu Tipo"
                    onChange={submitInput}/>
                </div>
                <div>
                    <input className="buton"type="submit" value="Añadir Tipo"/>
                </div>
                </form>
                <div className="wrap">
                        {Tipos.map((c) => (
                            <div className="countrycont2">
                                <div>
                                    <Type key={c.Tipo}/>
                                    <button className="btn2"onClick={setCodeHandler} value={c.id} name="typeId">
                                        Añade
                                    </button>
                                    </div>
                                    </div>
                        ))}
                </div>
      </div>
  )
}
