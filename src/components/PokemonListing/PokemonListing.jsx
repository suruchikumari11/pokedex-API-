import { useEffect, useState } from 'react'
import axios from 'axios'
import './pokemonlist.css'
import Pokemon from '../Pokemon/Pokemon'



function PokemonListing() {
    const [pokemonlist, setPokemonlist] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    let [POKEDEX_url, setPOKEDEX_url] = useState('https://pokeapi.co/api/v2/pokemon')

    let [prevUrl, setPrevUrl] = useState("");
    let [nextUrl, setNextUrl] = useState("");
    


    async function downloadpokemon() {
        setIsLoading(true)///print a loading message
        let response = await axios.get(POKEDEX_url)
        const pokemonResult = response.data.results
        console.log(response.data)

        setNextUrl(response.data.next)
        console.log(response.data.next)

        setPrevUrl(response.data.previous)
        const pokemonpromise = pokemonResult.map((pokemon) => axios.get(pokemon.url))
        const pokemonData = await axios.all(pokemonpromise)
        console.log(pokemonData)

        const result = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types

            }
        })
        console.log(result)
        setPokemonlist(result);
    


    }


    useEffect(() => {
        downloadpokemon()
        setIsLoading(false)
        

    }, [POKEDEX_url])
    return (
        <div className='pokemonlist-wrapper'>
            <h1>Pokemon listing</h1>
            <div className='pokemon-wrapper'>
                
                {(isLoading) ? 'Loading..' : pokemonlist.map((p) => <Pokemon key={p.id} name={p.name} image={p.image} id={p.id} />)}
            </div>
            <div className='btn-controller'>
                <button className='btn' disabled={prevUrl == null} onClick={() => setPOKEDEX_url(prevUrl)}>prev</button>
                <button className='btn' disabled={nextUrl == null} onClick={() => setPOKEDEX_url(nextUrl)}>next</button>
            </div>
        </div>
    )
}

export default PokemonListing
