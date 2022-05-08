import React, {useState,useEffect} from "react"
import pokeball from "../../assets/img/pokeball.png"
import closeIcon from "../../assets/img/close.png"
import { useSelector, useDispatch } from "react-redux"
import { toggle } from "../../features/openModal"
import typeColors from "../../utils/typeColors.json"
import {orderPokemon, releasePokemon, changePokemonName} from "../../features/pokemon"
import editIcon from "../../assets/img/editIcon.png"
import confirmIcon from "../../assets/img/confirmIcon.png"
import cancelIcon from "../../assets/img/cancelIcon.png"


const Modal = ()=>{
    const openModal = useSelector((state)=>state.openModal.open)
    const pokemon = useSelector((state)=>state.pokemonData.pokemon)
    const dispatch = useDispatch()
    const isEdit = useSelector((state)=>state.openModal.isEdit)

    const [name, setName] = useState(pokemon.name)
    const [editName, setEditName] = useState(false)

    const handleSavePokemon = ()=>{
        dispatch(orderPokemon(pokemon))
        dispatch(toggle({isEdit:false}))
    }

    const handleReleasePokemon =()=>{
        dispatch(releasePokemon(pokemon))
        dispatch(toggle({isEdit:false}))
    }

    const handleClose = ()=>{
        setEditName(false)
        dispatch(toggle({isEdit:false}))
    }

    const handleChangePokemonName = ()=>{
       dispatch(changePokemonName(name))
       setEditName(false)
    }

    useEffect(()=>{
        setName(pokemon.name)
    },[pokemon.name])
    

    return(
        <div className={openModal ? "modal" : "modal close"}>
            <div className="modal__content">
                <img onClick={handleClose} className="modal__content__close-icon" src={closeIcon} alt="botão fechar modal" />
                <div className="modal__content__box">
                    <div className="modal__content__box__img">
                        <img src={pokemon.image} alt="" />
                    </div>
                    <div className="modal__content__box__info">
                        {
                            editName ? 
                            <>
                                <input onChange={(e)=>setName(e.target.value)} className="form-control" type="text" value={name} /> 
                                <button onClick={handleChangePokemonName}> <img src={confirmIcon} alt="" /></button>
                                <button onClick={()=>setEditName(false)}> <img src={cancelIcon} alt="" /></button>
                            </>
                            :
                            <>
                                <h1>{pokemon.name}</h1>
                                { isEdit && <img onClick={()=>setEditName(!editName)} className="modal__content__box__info__edit-icon" src={editIcon} alt="" /> }
                            </>
                        }
                    </div>
                    <div className="row">
                        <div className="col-4 col-lg-4 modal__content__box__status">
                            <h3>HP</h3>
                            <h4>{pokemon.hp}</h4>
                        </div>
                        <div className="col-4 col-lg-4 modal__content__box__status">
                            <h3>Altura</h3>
                            <h4>{pokemon.height} M</h4>
                        </div>
                        <div className="col-4 col-lg-4 modal__content__box__status">
                            <h3>Peso</h3>
                            <h4>{pokemon.weight} kg</h4>
                        </div>
                    </div>

                    <div className="row modal__content__box__type">

                    <div className="modal__content__box__type__pokeball-img">
                        {
                            !isEdit ? 
                                <button onClick={handleSavePokemon} className="btn">
                                    <img src={pokeball} alt="uma pokebola" />
                                </button>
                            :
                                <button onClick={handleReleasePokemon} className="btn btn-release btn-custom">
                                    Liberar Pokemon
                                </button>
                        }
                    </div>

                    <div className="modal__content__box__type__pokemon-type">
                        {
                            pokemon.types.map(({type, index})=>{
                                const {color,pt_br} = typeColors.find((color)=>color.name === type.name)
                                return <span key={index} style={{backgroundColor: `#${color}`}}>{pt_br}</span>
                            })
                        }
                        
                    </div>

                    </div>
                </div>
 
            </div>
        </div>
    )
}

export default Modal