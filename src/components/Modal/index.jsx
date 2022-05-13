import React, {useState,useEffect} from "react"
import pokeball from "../../assets/img/pokeball.png"
import closeIcon from "../../assets/img/close.png"
import newPhoto from "../../assets/img/plusimg.png"
import { useSelector, useDispatch } from "react-redux"
import { toggle } from "../../features/openModal"
import typeColors from "../../utils/typeColors.json"
import {orderPokemon, releasePokemon, changePokemonName, newCustomPokemon} from "../../features/pokemon"
import editIcon from "../../assets/img/editIcon.png"
import confirmIcon from "../../assets/img/confirmIcon.png"
import cancelIcon from "../../assets/img/cancelIcon.png"
import {create_UUID} from "../../utils/index"
import Multiselect from 'multiselect-react-dropdown';
import BtnCustom from "../Button"
import *  as yup from "yup"



const Modal = ()=>{
    const openModal = useSelector((state)=>state.openModal.open)
    const pokemon = useSelector((state)=>state.pokemonData.pokemon)
    const dispatch = useDispatch()
    const isEdit = useSelector((state)=>state.openModal.isEdit)
    const isNew = useSelector((state)=>state.openModal.isNew)

    const [name, setName] = useState(pokemon.name)
    const [editName, setEditName] = useState(false)
    const [newPokemon, setNewPokemon]= useState({
            id:create_UUID(),
            name: "",
            image: "",
            types:[],
            hp: 0,
            height: 0,
            weight: 0,
    })
    const [errors, setErrors]= useState([])

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
        setErrors([])
    }

    const handleChangePokemonName = ()=>{
       dispatch(changePokemonName(name))
       setEditName(false)
    }

    const changeFormNewPokemonData = (e) => {
        const { name, value } = e.currentTarget
        setNewPokemon((prevState) => {
            return {
            ...prevState,
            [name]: value
          }
        })
      }

      const handleTypes = (selectedList)=>{
          setNewPokemon((prevState)=>({
              ...prevState,
              types:selectedList.map((selected)=>selected.name)
          })  )
      }

      const handleNewPokemon = async ()=>{
        try {
            const schema = yup.object().shape({
                name: yup.string().required("name"),
                image:yup.string().required("image"),
                types: yup.array().of(yup.string()).min(1,"types"),
                hp: yup.number().min(1,"hp").required(),
                height: yup.number().min(1,"height").required(),
                weight: yup.number().min(1,"weight").required()
            })
  
            await schema.validate(newPokemon, { abortEarly : false, stripUnknown:true })
            dispatch(newCustomPokemon(newPokemon))
            dispatch(toggle({isEdit:false}))

        } catch (error) {
            setErrors(error.errors)
        }

      }

      const handleInputImage = (e)=>{
        if (e.target.files && e.target.files[0]) {
            setNewPokemon((prev)=>({
                ...prev,
                image: URL.createObjectURL(e.target.files[0])
            }))
          }

      }


    useEffect(()=>{
        setName(pokemon.name)
    },[pokemon.name])
    

    return(
        
        <div className={openModal ? "modal" : "modal close"}>
              {
                            console.log("pokemon",pokemon)
            }
            <div className="modal__content">
                <img onClick={handleClose} className="modal__content__close-icon" src={closeIcon} alt="botão fechar modal" />
                <div className="modal__content__box">
                    {!isNew?
                    <>
                    <div className="modal__content__box__img">
                        <img src={pokemon.image} alt="" />
                    </div>
                    <div className="modal__content__box__info">
                        {
                            editName ? 
                            <>
                                <input onChange={(e)=>setName(e.target.value)} maxLength="12" className="form-control" type="text" value={name} /> 
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
                    <div className="row w-100">
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
                            pokemon.types.map((type, index)=>{
                                const {color,pt_br} = typeColors.find((color)=>color.name === type)
                                return <span key={index} style={{backgroundColor: `#${color}`}}>{pt_br}</span>
                            })
                        }
                        
                    </div>
                    </div>
                    </>
                    :<div className="modal__content__box__new-pokemon">
                        <div className={`modal__content__box__img ${errors.includes("image") && "error"}`}>
                            <label htmlFor="imageFile">
                                <img src={newPokemon.image || newPhoto} alt="" />
                            </label>
                            <input className="d-none" onChange={(e)=>handleInputImage(e)} accept=".jpg, .png, .jpeg" type="file" name="" id="imageFile" />
                        </div>

                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="name">
                                    Nome
                                    <input onChange={changeFormNewPokemonData} type="text" className={`form-control ${errors.includes("name") && "error"}`} name="name" placeholder="Nome" id="name" />
                                </label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="hp">
                                    HP
                                    <input onChange={changeFormNewPokemonData} type="number" className={`form-control ${errors.includes("hp") && "error"}`} name="hp" placeholder="HP" id="hp"/>
                                </label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="height">
                                    Altura
                                    <input onChange={changeFormNewPokemonData} type="number" className={`form-control ${errors.includes("height") && "error"}`} name="height" placeholder="Altura" id="height" />
                                </label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="weight">
                                    Peso
                                    <input onChange={changeFormNewPokemonData} type="number" className={`form-control ${errors.includes("weight") && "error"}`} name="weight" placeholder="Peso" id="weight" />
                                </label>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="">Tipo</label>
                                        <Multiselect
                                            options={typeColors}
                                            name="types"
                                            displayValue="pt_br"
                                            selectionLimit={2}
                                            onSelect={handleTypes}
                                            placeholder="Selecione o(s) tipo(s) "
                                            className={`${errors.includes("types") && "error"}`}
                                        />
                            </div>


                            <div className="mb-3 d-flex justify-content-center">
                                <BtnCustom  click={handleNewPokemon} btnText="Criar Pokemon" />
                            </div>
                        </div>
                    </div>

}
                </div>
 
            </div>
        </div>
    )
}

export default Modal