import React, { useEffect, useState } from 'react';
import PokeCard from './Card.jsx';
import { useSelector } from 'react-redux';
import "./Pokemons.css"

export default function Pokemons() {
    const pokemons = useSelector((state) => state.Pokemons)
    const [currentPage, setCurrentPage] = useState(0);

    const next_Page = () => {
        if(pokemons.length <= currentPage + 9) {
            setCurrentPage(currentPage);
        } else setCurrentPage(currentPage + 9);
    };
    const prev_Page = () => {
        if (currentPage < 9) {
            setCurrentPage(0);
        } else {
            setCurrentPage(currentPage - 9);
        }
    };
    const first_Page = () => {
        setCurrentPage(0);
    };
    const last_Page = () => {
        setCurrentPage(pokemons.length - 9)
    };
    useEffect(() => {
        first_Page()
    }, [pokemons]);
console.log(pokemons)
    const Filtred_Pokemon = pokemons.slice(currentPage, currentPage + 9);
    return (
        <div>
                <div>
            <button className="button" onClick={first_Page}> {"<<"}</button>
            <button className="button" onClick={prev_Page}> {"<"}</button>
            <button className="button" onClick={next_Page}> {">"}</button>
            {Filtred_Pokemon.length >= 9 ? (
            <button className="button" onClick={last_Page}> {">>"}</button>
            ): null}
            </div>
            <div className="grid">
            {Filtred_Pokemon.map((e)  => (
            <PokeCard
            ID = {e.ID}
            Imagen = {e.Imagen}
            Nombre = {e.Nombre}
            Tipo = {e.Tipo}
            />
            ))}
          </div>
        </div>
    )
    }
