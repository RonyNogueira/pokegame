import React from "react";
import ash from "../../assets/img/ashFront.png"
import SideMenu from "../../components/SideMenu";
import { randomNumber } from "../../utils";
import api from "../../services/api";
import { useDispatch, useSelector } from "react-redux"
import { setPokemon, orderPokemon } from "../../features/pokemon";
import { toggle } from "../../features/openModal";


const Start = ()=>{
    const dispatch =  useDispatch()
    const qtdPokemon = useSelector((state)=> state.pokemonData.listPokemon.findIndex((pokemon)=>pokemon.isEmpty))
    
    
    const getRandomPokemon = async ()=>{
        
        const {data} = await api.get(`/${randomNumber()}`)
        const height = (data.height/10).toFixed(1)
        const weight = (data.weight/100).toFixed(1)
        const pokemon = {
            id:data.id,
            name:data.name,
            image:data.sprites.other["official-artwork"].front_default,
            types:data.types,
            hp: data.stats[0].base_stat,
            height,
            weight,
            isEmpty:false
        }

        dispatch(setPokemon(pokemon))
        dispatch(toggle())
    }

    return(
        <div className="row start-page">
            <div className="col-lg-12 start-page__avatar-range">
                <SideMenu/>
                <div className={`start-page__avatar-range__content ${qtdPokemon === -1 ? "error" :null}`}>
                    <button disabled={qtdPokemon === -1} onClick={getRandomPokemon}><img  src={ash} className={`start-page__avatar-range__content__boy ${qtdPokemon === -1 ? "error" :null}`} alt=""   /></button>
                </div>
            </div>
            
        </div>
    )
}

export default Start