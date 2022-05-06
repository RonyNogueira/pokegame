import React from "react";
import ash from "../../assets/img/ashFront.png"
import SideMenu from "../../components/SideMenu";
import Modal from "../../components/Modal";
import { randomNumber } from "../../utils";
import api from "../../services/api";
import { useDispatch } from "react-redux"
import { setPokemon } from "../../features/pokemon";
import { toggle } from "../../features/openModal";

const Start = ()=>{
    const dispatch =  useDispatch()


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
        dispatch(toggle())
    }

    return(
        <div className="row start-page">
            <div className="col-lg-12 start-page__avatar-range">
                <SideMenu/>
                <img onClick={getRandomPokemon} src={ash} className="start-page__avatar-range__boy" alt=""   />
            </div>
            <Modal/>
        </div>
    )
}

export default Start