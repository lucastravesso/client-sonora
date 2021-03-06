import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';

import Nav from '../Navigation/Nav'
import api from '../../services/loginApi'
import Bottom from '../BottomInfo/Bottom'

import './registerPageStyles.css'
import { validateDoc, validateEmail, validateNasc, validateNome, validateSenha } from "../../validations/validations";
import { useEffect } from "react";

export default function Register() {

    const history = useHistory();
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [born, setBorn] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');

    async function registerForm(e) {
        e.preventDefault();

        localStorage.clear()

        const data = {
            firstName,
            lastName,
            cpf,
            rg,
            phone,
            born,
            register: new Date(),
            password,
            email,
        }

        if (!validate()) return;

        if (password === passwordConf) {
            try {
                api.post('/user/registerNoAddress', data);
                history.push('/login')
            } catch (err) {
                alert("Falha ao criar conta . .")
            }
        } else {
            setStatus({
                type: 'error',
                message: 'Confirmação de senha invalida . .'
            })
        }
    }

    const [res, setRes] = useState()
    useEffect(()=> {mailVerify()}) 

    function mailVerify() {
        api.get(`/user/findmail/${email}`).then(res => {
            if(res.status === 202){
                setRes(true)
            }
        }).catch(err => {
            if(err.response.status === 406){
                setRes(false)
            }
        })
    }

    function validate() {
        if (!firstName) return setStatus({
            type: 'error',
            message: 'Necessario preencher o campo nome . .'
        })
        else if (!validateNome(firstName)) return setStatus({
            type: 'error',
            message: 'Nome invalido . .'
        })
        else if (!lastName) return setStatus({
            type: 'error',
            message: 'Necessario preencher o campo sobrenome . .'
        })
        else if (!validateNome(lastName)) return setStatus({
            type: 'error',
            message: 'Sobrenome invalido . .'
        })
        else if (!cpf) return setStatus({
            type: 'error',
            message: 'Necessario preencher o campo cpf . .'
        })
        else if (!validateDoc(cpf, "CPF")) return setStatus({
            type: 'error',
            message: 'CPF Invalido . .'
        })
        else if (!rg) return setStatus({
            type: 'error',
            message: 'Necessario preencher o campo rg . .'
        })
        else if (!validateDoc(rg, "RG")) return setStatus({
            type: 'error',
            message: 'RG Invalido . .'
        })
        else if (!born) return setStatus({
            type: 'error',
            message: 'Necessario preencher o campo data de nascimento . .'
        })
        else if (!validateNasc(born)) return setStatus({
            type: 'error',
            message: 'Data de nascimento invalida . .'
        })
        else if (!phone) return setStatus({
            type: 'error',
            message: 'Necessario preencher o campo telefone . .'
        })
        else if (!validateDoc(phone, "TEL")) return setStatus({
            type: 'error',
            message: 'Telefone Invalido . .'
        })
        else if (!email) return setStatus({
            type: 'error',
            message: 'Necessario preencher o campo email . .'
        })
        else if (!validateEmail(email)) return setStatus({
            type: 'error',
            message: 'Email invalido . .'
        })
        else if (res === false) return setStatus({
            type: 'error',
            message: 'Email ja cadastrado . .'
        })
        else if (!password) return setStatus({
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
            <div className="input">
                <h1>{status.type === 'error' ? <p style={{ color: "red" }}>{status.message}</p> : ""}</h1>
            </div>
            <form onSubmit={registerForm}>
                <div className="form-container">
                    <div className="left-form">
                        <div className="inputs-left">
                            <input
                                data-cy='nome'
                                placeholder='Nome'
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <input
                                data-cy='sobrenome'
                                placeholder='Sobrenome'
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                            <InputMask
                                data-cy='cpf'
                                mask="999.999.999-99"
                                placeholder='CPF'
                                value={cpf}
                                onChange={e => setCpf(e.target.value)}
                            />
                            <InputMask
                                data-cy='rg'
                                mask="99.999.999-9"
                                placeholder='RG'
                                value={rg}
                                onChange={e => setRg(e.target.value)}
                            />
                            <input
                                data-cy='dt-nasc'
                                placeholder='Data de Nascimento'
                                type="date"
                                onChange={e => setBorn(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="right-form">
                        <div className="inputs-right">
                            <InputMask
                                data-cy='tel'
                                mask="(99)99999-9999"
                                placeholder='Telefone'
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                            <input
                                data-cy='email'
                                placeholder='Email'
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <input
                                placeholder='Senha'
                                type='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <input
                                placeholder='Confirmação de senha'
                                type='password'
                                value={passwordConf}
                                onChange={e => setPasswordConf(e.target.value)}
                            />
                            <button data-cy='btn-register-submit' className="button" type='submit'>Enviar</button>
                        </div>
                    </div>
                </div>
            </form>
            <br />
            <Bottom />
        </>
    );
}