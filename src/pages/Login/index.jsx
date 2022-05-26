import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import './loginStyles.css'

import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import api from '../../services/loginApi'

export default function Login() {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if(localStorage.getItem('email') !== null){
        history.push('/perfilsimples');
    }

    async function login(e) {
        e.preventDefault();

        const data = {
            email,
            password,
        };
        try {
            const response = await api.post('auth', data);

            localStorage.setItem('email', data.email)
            localStorage.setItem('accessToken', response.data.token)
            try {
                await api.get("/user/verify", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                history.push('/perfilsimples');
            } catch (err) {
                localStorage.clear()
                alert("Conta inativada")
            }
        } catch (err) {
            alert("Login failed !")
        }
    };

    return (
        <>
            <Nav />
            <div className="main-login">
                <div className="login-container">
                    <form onSubmit={login}>
                        <h1>Faça login para continuar . .</h1>
                        <input
                            data-cy="login"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            data-cy="senha"
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button data-cy="login-submit" className="button" type="submit">Login</button>
                    </form>
                </div>

                <div className="register-container">
                    <div className="align-register">
                        <h1>Se você não é registrado, cria sua conta agora!</h1>
                        <button data-cy="register-btn" className="button" onClick={() => history.push('register')} >Registrar-se</button>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <Bottom />
        </>
    );
}
