import React from "react";
import questionMark from  '../../assets/img/question-mark.png'
import plusIcon from '../../assets/img/plus.png' 
import { useSelector } from "react-redux";

const teste = [0,1,2,3,4,5,6,7,8,9]
const newArr = teste.slice(0,6)

const SideMenu = ()=>{
    const listPokemon = useSelector((state)=>state.pokemonData.listPokemon)
    const log = (pokemon)=>{
        console.log(pokemon)
    }
    return(
        <div className="side-menu">
            {
                listPokemon.map((pokemon,index)=>(
                    <div key={index} onClick={log(pokemon)} className="side-menu__circle">
                        <img src={pokemon.image} alt="" />
                    </div>
                ))
            }
            <div className="side-menu__plus">
               <button><img src={plusIcon} alt="" /></button> 
            </div>
        </div>
    )
}

export default SideMenu;