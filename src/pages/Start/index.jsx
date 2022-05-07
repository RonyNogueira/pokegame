import React from "react";
import ash from "../../assets/img/ashFront.png"
import SideMenu from "../../components/SideMenu";
import Modal from "../../components/Modal";
import { randomNumber } from "../../utils";
import api from "../../services/api";
import { useDispatch, useSelector } from "react-redux"
import { setPokemon, setListPokemon } from "../../features/pokemon";
import { toggle } from "../../features/openModal";


const Start = ()=>{
    const dispatch =  useDispatch()
    const qtdPokemon = useSelector((state)=> state.pokemonData.listPokemon.length)
    
    
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
            weight
        }

        dispatch(setPokemon(pokemon))
        dispatch(setListPokemon(pokemon))
        dispatch(toggle())
    }

    return(
        <div className="row start-page">
            <div className="col-lg-12 start-page__avatar-range">
                <SideMenu/>
                <div className={`start-page__avatar-range__content ${qtdPokemon === 6 ? "error" :null}`}>
                    <button disabled={qtdPokemon === 6 ? true :false} onClick={getRandomPokemon}><img  src={ash} className={`start-page__avatar-range__content__boy ${qtdPokemon === 6 ? "error" :null}`} alt=""   /></button>
                </div>
            </div>
            <Modal/>
        </div>
    )
}

export default Start