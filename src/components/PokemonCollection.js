import React from 'react'
import './pokemon.css'
import PokemonList from './PokemonList'

function PokemonCollection(props){
    const{pokemons} = props

    return(
    <section className="collection-container">
        {pokemons.map((pokemon) => {
            return(
                <PokemonList key={pokemon.id} 
                name={pokemon.name} 
                id={pokemon.id} 
                type={pokemon.types[0].type.name}
                image={pokemon.sprites.front_default}
                />
            )
        })}
    </section>
    )
}

export default PokemonCollection