import axios from 'axios';
import './Pokemondetails.css'
import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function PokemonDetail() {
    let { id } = useParams();
    let [pokemon,setPokemon]=useState({})

    async function downloadpokemon() {
        const response= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
       
        setPokemon({
           name: response.data.name,
           image:response.data.sprites.other.dream_world.front_default,
           weight:response.data.weight,
           height:response.data.height,
           types:response.data.types.map((t)=>t.type.name)

        }
    )}

    useEffect(()=>{
        downloadpokemon()

    },[])

  return (
    <div className='pokemon-detail'>
        <Link  className="link"to="/">Pokemon listing</Link>
      
      <h2 className='pokemon-name'>Name:{pokemon.name}</h2>
      <div className='pokemon-image'><img src={pokemon.image}/></div>
      <h3 className='pokemon-height'>Height:{pokemon.height}</h3>
      <h3 className='pokemon-weight'>Weight:{pokemon.weight}</h3>
      

    </div>
  )
}

export default PokemonDetail
