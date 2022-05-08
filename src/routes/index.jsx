import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Start from "../pages/Start";

const RoutePath = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/start" element={<Start/>}/>
                <Route path="*" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutePath;