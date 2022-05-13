import React, { useEffect } from "react";
import questionMark from  '../../assets/img/question-mark.png'
import plusIcon from '../../assets/img/plus.png' 
import { useDispatch, useSelector,  } from "react-redux";
import { setListPokemon, setPokemon } from "../../features/pokemon";
import { toggle } from "../../features/openModal";



const SideMenu = ()=>{
    const listPokemon = useSelector((state)=>state.pokemonData.listPokemon)
    const qtdPokemon = useSelector((state)=> state.pokemonData.listPokemon.findIndex((pokemon)=>pokemon.isEmpty))

    const dispatch = useDispatch();
    
    const handleEditPokemon = (pokemon)=>{
        if(pokemon.isEmpty) return
       dispatch(setPokemon(pokemon))
       dispatch(toggle({isEdit:true}))
    }

    const emptyListPokemon = ()=>{
        for(let i = 0; i<6; i++){
            dispatch(setListPokemon({
                image:questionMark,
                isEmpty:true
            }))
        }
    }

    const handleNewPokemon = ()=>{
        dispatch(toggle({isNew:true}))
    }

    useEffect(()=>{
        emptyListPokemon()
    },[ ])

    return(
        <div className="side-menu">
            {
                listPokemon.map((pokemon,index)=>(
                    <div key={index} onClick={()=>handleEditPokemon(pokemon)} className="side-menu__circle">
                        <img src={pokemon.image} alt="" />
                    </div>
                ))
            }
            <div className="side-menu__plus">
               <button disabled={qtdPokemon === -1} onClick={handleNewPokemon}><img src={plusIcon} alt="" /></button> 
            </div>
        </div>
    )
}

export default SideMenu;