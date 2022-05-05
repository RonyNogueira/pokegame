import React from "react";
import ash from "../../assets/img/ashFront.png"
import SideMenu from "../../components/SideMenu";
import Modal from "../../components/Modal";

const Start = ()=>{
    return(
        <div className="row start-page">
            <div className="col-lg-12 start-page__avatar-range">
                <SideMenu/>
                <img src={ash} className="start-page__avatar-range__boy" alt=""   />
            </div>
            <Modal/>
        </div>
    )
}

export default Start