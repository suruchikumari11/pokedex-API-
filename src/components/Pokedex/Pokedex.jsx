import React from 'react'
import Search from '../Search/Search'
import './Pokedex.css'
import PokemonListing from '../PokemonListing/PokemonListing'

function Pokedex() {
  return (
    <div className='pokedex-wrapper'>
      <h1 id='pokedex-heading'>Pokedex</h1>
      <Search/>
      <PokemonListing/>
    </div>
  )
}

export default Pokedex
