import React from "react";
import {useHistory} from 'react-router-dom'
import InputMask from 'react-input-mask'

import Nav from '../Navigation/Nav'
import api from '../../services/loginApi'

import './styles.css'

export default function EditUser() {

    const history = useHistory();

    return (
        <>
            <Nav />
        </>
    );
}