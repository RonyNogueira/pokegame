import bulba from "../../assets/img/001.png"
import pokeball from "../../assets/img/pokeball.png"
import closeIcon from "../../assets/img/close.png"
import { useSelector, useDispatch } from "react-redux"
import { toggle } from "../../features/openModal"

const Modal = ()=>{
    const openModal = useSelector((state)=>state.openModal.open)
    const dispacth = useDispatch()

    return(
        <div className={openModal ? "modal" : "modal close"}>
            <div className="modal__content">
                <img onClick={()=>dispacth(toggle())} className="modal__content__close-icon" src={closeIcon} alt="botão fechar modal" />
                <div className="modal__content__box">
                    <div className="modal__content__box__img">
                        <img src={bulba} alt="" />
                    </div>
                    <div className="modal__content__box__info">
                        <h1>Bulbasaur</h1>
                    </div>
                    <div className="row">
                        <div className="col-4 col-lg-4 modal__content__box__status">
                            <h3>HP</h3>
                            <h4>45/45</h4>
                        </div>
                        <div className="col-4 col-lg-4 modal__content__box__status">
                            <h3>Altura</h3>
                            <h4>0.7m</h4>
                        </div>
                        <div className="col-4 col-lg-4 modal__content__box__status">
                            <h3>Peso</h3>
                            <h4>6.7kg</h4>
                        </div>
                    </div>

                    <div className="row modal__content__box__type">

                    <div className="modal__content__box__type__pokeball-img">
                        <button className="btn"><img src={pokeball} alt="uma pokebola" /></button>
                    </div>

                    <div className="modal__content__box__type__pokemon-type">
                        <span>Grama</span>
                        <span>Veneno</span>
                    </div>

                    </div>
                </div>
 
            </div>
        </div>
    )
}

export default Modal