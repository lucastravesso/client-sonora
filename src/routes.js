import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom"

import Login from './pages/Login';
import Instruments from './pages/Instruments'

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/instruments' component={Instruments}/>
            </Switch>
        </BrowserRouter>
    );
}