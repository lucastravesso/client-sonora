import React, { useState } from "react";
import { useHistory } from 'react-router-dom'

import Nav from '../Navigation/Nav'
import api from '../../services/loginApi'
import Bottom from "../BottomInfo/Bottom";

import './PasswordChange.css'
import { validateSenha } from '../../validations/validations'

export default function PasswordChange() {

    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');

    const history = useHistory()

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    async function confirmChange(e) {
        e.preventDefault()

        const data = {
            oldPass: oldPassword,
            password: password,
        }

        if (!validate()) return;

        if (password === passwordConf) {
            try {
                await api.put('/user/updatePass', data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
               history.push('/perfilsimples')
            } catch (err) {
                return setStatus({
                    type: 'error',
                    message: 'Senha antiga nao confere . .'
                })
            }
        } else {
            alert("Confirmação de senha invalida . . . .")

        }

    }

    function validate() {

        if (!oldPassword) return setStatus({
            type: 'error',
            message: 'Necessario preencher campo senha antiga . .'
        })
        if (!password) return setStatus({
            type: 'error',
            message: 'Necessario preencher campo senha . .'
        })
        else if (!validateSenha(password)) return setStatus({
            type: 'error',
            message: 'Senha nao atende aos requisitos . .'
        })
        else { return true; }
    }

    return (
        <>
            <Nav />
            <div className="pwchange" onSubmit={confirmChange}>
                <div className="input">
                    <h1>{status.type === 'error' ? <p style={{ color: "red" }}>{status.message}</p> : ""}</h1>
                </div>
                <form className="pwchange-form">
                    <input
                        placeholder="Senha antiga"
                        type="password"
                        onChange={e => setOldPassword(e.target.value)}
                    />
                    <input
                        placeholder="Nova senha"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input
                        placeholder="Confirmar senha"
                        type="password"
                        onChange={e => setPasswordConf(e.target.value)}
                    />
                    <button className="button" type="submit">Alterar senha</button>
                </form>
            </div>
            <Bottom />
        </>
    );

}
