import bulba from "../../assets/img/001.png"
import pokeball from "../../assets/img/pokeball.png"
import closeIcon from "../../assets/img/close.png"
import { useSelector, useDispatch } from "react-redux"
import { toggle } from "../../features/openModal"
import typeColors from "../../utils/typeColors.json"

const Modal = ()=>{
    const openModal = useSelector((state)=>state.openModal.open)
    const pokemon = useSelector((state)=>state.pokemonData.pokemon)
    const dispatch = useDispatch()

    return(
        <div className={openModal ? "modal" : "modal close"}>
            <div className="modal__content">
                <img onClick={()=>dispatch(toggle())} className="modal__content__close-icon" src={closeIcon} alt="botão fechar modal" />
                <div className="modal__content__box">
                    <div className="modal__content__box__img">
                        <img src={pokemon.image} alt="" />
                    </div>
                    <div className="modal__content__box__info">
                        <h1>{pokemon.name}</h1>
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
                        <button className="btn"><img src={pokeball} alt="uma pokebola" /></button>
                    </div>

                    <div className="modal__content__box__type__pokemon-type">
                        {
                            pokemon.types.map(({type})=>{
                                const {color,pt_br} = typeColors.find((color)=>color.name === type.name)
                                return <span style={{backgroundColor: `#${color}`}}>{pt_br}</span>
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