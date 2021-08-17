import React, { useEffect } from "react";
import { getPokemon } from "../actions/index.js";
import { useDispatch } from "react-redux";
import Pokemons from "./Pokemons/Pokemons"
import NavBar from "./NavBar/NavBar";

export default function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPokemon());
    }, [dispatch])
    return (
        <div>
            <NavBar/>
            <div>
                <Pokemons/>
            </div>
        </div>
    )
}