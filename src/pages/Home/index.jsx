import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png"
import BtnCustom from "../../components/Button";

const Home = ()=>{
    return(
        <div className="home">
            <div className="row">
                <div className="col-lg-12 d-flex flex-column text-center  align-items-center">
                    <img src={logo} className="home__logo" alt="pokemon logo" />
                    <Link to={'/start'} className="home__start-link"><BtnCustom btnText='Start' btnClass='home__btn'/></Link>
                </div>
            </div>
        </div>
    )
}

export default Home