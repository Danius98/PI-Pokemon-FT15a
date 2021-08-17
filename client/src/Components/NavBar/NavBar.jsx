import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getPokemon, show_Pokemon, Name_OrderA, Name_OrderZ, Type, Created, Poke_Attack_Max, Poke_Attack_Min} from '../../actions/index.js';
import Buscador from '../Buscador/Buscador.jsx';
import './NavBar.css';

const NavBar = ({getPokemon, show_Pokemon, Name_OrderA, Name_OrderZ, Type, Created, Poke_Attack_Max, Poke_Attack_Min}) => {
    const[Order, setOrder] = useState('');
    const[Tipo, setTipo] = useState('');
    const[Pokemon, setPokemon] = useState('');
    const[Creado, setCreado] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        if(Tipo) {
            getPokemon();
            if(Tipo !== "Todos") {
                setTimeout(() => {
                    dispatch(Type(Tipo))
                }, 50)
            }
        }
    }, [Tipo, getPokemon, dispatch]);
    useEffect(() => {
        if(Order === "Todos") getPokemon();
        else if(Order === "A-Z") Name_OrderA();
        else if(Order === "Z-A") Name_OrderZ();
        else if(Order === "Mayor Ataque") Poke_Attack_Max();
        else if(Order === "Menor Ataque") Poke_Attack_Min();
    }, [Order, setOrder])
    useEffect(() => {
        if(Creado === "falso") Created();
        else if(Creado === "true") Created();
    }, [Creado, setCreado])
    const Pokemonhandler = (e) => {
        e.preventDefault()
        setPokemon(e.target.value)
    }
    const showPokehandler = (e) => {
        e.preventDefault()
        getPokemon()
        setTimeout(() => {
            dispatch(show_Pokemon(Pokemon))
        }, 50);
        console.log(Pokemon)
        setPokemon('')
    }
    console.log(Tipo)
    console.log(Pokemon)
    return (
        <header className="navbar">
            <div className="list">
                <Link className="landinglink" to="/">
                    <p>Bienvenidos</p>
                </Link>
                <div className="list-item">
                    <h5 className="order">Ordenado Según:</h5>
                    <select onChange={(event) => setOrder(event.target.value)}>
                        <option value="Todos">Todos</option>
                        <option value="A-Z">Alfabético A-Z</option>
                        <option value="Z-A">Alfabético Z-A</option>
                        <option value="Mayor Ataque">Mayor Ataque</option>
                        <option value="Menor Ataque">Menor Ataque</option>
                    </select>
                    <Buscador/>
                </div>
                <div className="continent">
                    <h5>Filtrado por Creado</h5>
                    <div>
                        <select onChange={(event) => setCreado(event.target.value)}>
                          <option value="false">Existente</option>
                          <option value="true">Creado</option>
                        </select>                   
                    </div>
                </div>
                <div className="continent">
                    <h5>Filtrado por Tipo</h5>
                    <div>
                        <select onChange={(event) => setTipo(event.target.value)}>
                          <option value="Todos">Todos</option>
                          <option value="Normal">Normal</option>
                          <option value="Ground">Ground</option>
                          <option value="Fighting">Fighting</option>
                          <option value="Flying">Flying</option>
                          <option value="Poison">Poison</option>
                          <option value="Rock">Rock</option>
                          <option value="Bug">Bug</option>
                          <option value="Ghost">Ghost</option>
                          <option value="Steel">Steel</option>
                          <option value="Fire">Fire</option>
                          <option value="Water">Water</option>
                          <option value="Grass">Grass</option>
                          <option value="Electric">Electric</option>
                          <option value="Phychic">Psychic</option>
                          <option value="Ice">Ice</option>
                          <option value="Dragon">Dragon</option>
                          <option value="Dark">Dark</option>
                          <option value="Fairy">Fairy</option>
                          <option value="Shadow">Shadow</option>
                          <option value="Unknown">Unknown</option>
                        </select>                   
                    </div>
                </div>
                <div>
                    <label className="order">Pokemon Creado</label>
                    <form>
                        <input className="inputtext"
                        placeholder="Crea tu Pokemon"
                        type="text"
                        value={Pokemon}
                        onChange={Pokemonhandler}
                        />
                        <button className="btnact" onClick={showPokehandler}>Buscá</button>
                        <Link className="link" to="/Pokemon/Create">
                            <h5>Crea un Pokemon</h5>
                        </Link>
                    </form>
                </div>
            </div>
        </header>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPokemon: () => dispatch(getPokemon()),
        show_DB_Pokemon: (payload) => dispatch(show_Pokemon(payload)),
        Name_OrderA: () => dispatch(Name_OrderA()),
        Name_OrderZ: () => dispatch(Name_OrderZ()),
        Type: (Tipo) => dispatch(Type(Tipo)),
        Created: (Creado) => dispatch(Created(Creado)),
        Poke_Attack_Max: () => dispatch(Poke_Attack_Max()),
        Poke_Attack_Min: () => dispatch(Poke_Attack_Min())
    }
}

const mapStateToProps = (state) => {
    return {
        Pokemons: state.Pokemons
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)