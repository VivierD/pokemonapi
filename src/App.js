import axios from "axios"
import { useEffect, useState } from 'react';
import './App.css';
import PokemonCollection from "./components/PokemonCollection";

function App() {
  const [pokemons, setPokemons] = useState([])
  const [nextUrl, setNextUrl] = useState("")

  /* Hook permettant de récupérer les données de l'API à la première initialisation du site. */
  useEffect(()=>{

    const getPokemon = async() => {
      /* Récupération d'un array de données des 20 premiers Pokémon */
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=50")
      
      /* Fonction appelé pour le chargement de 20 autres Pokémon */
      setNextUrl(res.data.next)
      
      /* Boucle récupérant les données nous intéressant des Pokémon un par un */
      res.data.results.forEach(async (pokemon) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        setPokemons((p)=>[... p, poke.data])
      });
    }
    getPokemon()
  },[])

  /* Fonction appelé lors du clique sur le bouton, permettant de charger 20 nouveaux Pokémon,
  Même procédé que la fonction au dessus. */
  const nextPage = async () =>{
    let res = await axios.get(nextUrl)

    setNextUrl(res.data.next)

    res.data.results.forEach(async (pokemon) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      setPokemons((p)=>[... p, poke.data])
    });
  }

  /* On envoi l'Array "pokemons" à l'enfant PokemonCollection, afin de déstructurer le tableau et récupérer
  les données qui nous intéressent à afficher */
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
