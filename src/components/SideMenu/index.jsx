import React from "react";
import questionMark from  '../../assets/img/question-mark.png'
import plusIcon from '../../assets/img/plus.png' 
import { useDispatch } from "react-redux";
import { toggle } from "../../features/openModal";

const teste = [0,1,2,3,4,5,6,7,8,9]
const newArr = teste.slice(0,6)

const SideMenu = ()=>{
    const dispatch = useDispatch()

    return(
        <div className="side-menu">
            {
                newArr.map(()=>(
                    <div className="side-menu__circle">
                        <img src={questionMark} alt="" />
                    </div>
                ))
            }

            <div className="side-menu__plus">
               <button onClick={ () => dispatch(toggle())}><img src={plusIcon} alt="" /></button> 
            </div>
        </div>
    )
}

export default SideMenu;