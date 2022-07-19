import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import{ Container } from '@material-ui/core';

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Admin from "./components/Admin/Admin";

const App = () => {
    return ( 
      <BrowserRouter>
        <Container  style={{width:"100%", padding:0}}>
            <NavBar/>
            <Routes>
                <Route path="/"  element={<Home/>} />
                <Route path="/auth"  element={<Auth/>} />
                <Route path="/admin"  element={<Admin/>} />
              </Routes>
        </Container>
      </BrowserRouter>
    );
}
export default App;

