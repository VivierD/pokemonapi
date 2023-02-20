import React from 'react'

function PokemonList(props) {
    const{name,id,type,image} = props

    /* Retourne la mise en page qui sera affiché */
  return (
    <div>
        <section className={`pokemon-list-container ${type}`}>
            <p className='pokemon-name'> # {id} </p>
            <p className='pokemon-name'> {name} </p>
            <img src={image} alt={name}></img>
            <p className='pokemon-name'>Type : {type} </p>
        </section>
    </div>
  )
}

export default PokemonList