import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom"

import Login from './pages/Login';
import Products from './pages/Products'
import NewProduct from './pages/NewProduct'
import Nav from './pages/Navigation/Nav'
import LandPage from './pages/LandPage/index'
import Register from './pages/RegisterPage/index'
import NormalPerfil from "./pages/NormalUser";

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={LandPage}/>
                <Route path='/login' component={Login}/>
                <Route path='/products' exact component={Products}/>
                <Route path='/products/new/:prodId' component={NewProduct}/>
                <Route path='/nav' component={Nav}/>
                <Route path='/register' component={Register}/>
                <Route parh='/perfilsimples' component={NormalPerfil} />
            </Switch>
        </BrowserRouter>
    );
}