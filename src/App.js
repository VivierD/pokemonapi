import axios from "axios"
import { useEffect, useState } from 'react';
import './App.css';
import PokemonCollection from "./components/PokemonCollection";

function App() {
  const [pokemons, setPokemons] = useState([])
  const [nextUrl, setNextUrl] = useState("")

  useEffect(()=>{

    const getPokemon = async() => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=50")

      setNextUrl(res.data.next)

      res.data.results.forEach(async (pokemon) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        setPokemons((p)=>[... p, poke.data])
      });
    }
    getPokemon()
  },[])

  const nextPage = async () =>{
    let res = await axios.get(nextUrl)

    setNextUrl(res.data.next)

    res.data.results.forEach(async (pokemon) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      setPokemons((p)=>[... p, poke.data])
    });
  }

  return (
    <div className="App">
      <div className="container">
        <header className='pokemon-header'>Pokémon</header>
        <PokemonCollection pokemons={pokemons}/>
        <button onClick={nextPage}>Charger d'avantages de Pokémon</button>
        </div>
    </div>
  );
}

export default App;
