import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom"

import Login from './pages/Login';
import VendorUser from './pages/VendorUser/index';
import NewProduct from './pages/NewProduct';
import LandPage from './pages/LandPage/index';
import Register from './pages/RegisterPage/index';
import AddressAdd from './pages/AddressPage/index';
import NormalPerfil from './pages/NormalUser/index';
import EditUser from './pages/EditUser/index';
import AddCard from './pages/AddCard/index';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={LandPage}/>
                <Route path='/login' component={Login}/>
                <Route path='/perfilvendedor' exact component={VendorUser}/>
                <Route path='/products/new/:prodId' component={NewProduct}/>
                <Route path='/register' component={Register}/>
                <Route path='/perfilsimples' component={NormalPerfil} />
                <Route path='/adicionarendereco' component={AddressAdd} />
                <Route path='/editarperfil' component={EditUser} />
                <Route path='/adicionarcartao' component={AddCard} />
            </Switch>
        </BrowserRouter>
    );
}