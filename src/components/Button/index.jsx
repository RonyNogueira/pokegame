import React from "react";

const BtnCustom = ({btnText, click, btnClass})=>{
    return(
        <div>
            <button onClick={click} className={`btn-custom ${btnClass}`}>
                 {btnText}   
            </button>
        </div>
    )
}

export default BtnCustom