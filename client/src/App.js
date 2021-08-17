import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Home from "./Components/Home";
import PokeDetail from "./Components/PokeDetail/PokeDetail"
import Types from "./Components/CreatePokemon/Types"

function App() {
  return (
    <div className="App">
        <Route exact path="/" component={Landing} />
        <Route exact path="/Pokemon" component={Home}/>  
        <Route path="/Pokemon/:idPokemon" component={PokeDetail}/>
        <Route path="/Pokemon/Create" component={Types}/>
    </div>
  );
}

export default App;
