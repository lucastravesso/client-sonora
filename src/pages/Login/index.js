import React, {useState} from "react";
import {useHistory} from 'react-router-dom'
import './../Login/styles.css'

import api from '../../services/loginApi'

import logo from '../../assets/instrumentos.png'

export default function Login () {
    
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function login(e){
        e.preventDefault();

        const data = {
            mail,
            password,
        };
        try {
            const response = await api.post('user/login', data);

            localStorage.setItem('email', mail)

            history.push('instruments')
        } catch (err) {
            alert("Login failed !")
        }
    };

    return (
        <div className="login-container">
            <section className="form">
            <img src={logo} alt="login"/>
            <form onSubmit={login}>
                <h1>Faça login para continuar . .</h1>
                <input 
                    placeholder="Email" 
                    value={mail}
                    onChange={e => setMail(e.target.value)}
                />
                <input type="password"
                    placeholder="Senha" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="button" type="submit">Login</button>
            </form>

            </section>

            <img src={logo} alt="login"/>

        </div>
    );
}
