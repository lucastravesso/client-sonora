import React, { useState} from "react";
import {useHistory} from 'react-router-dom';
import InputMask from 'react-input-mask';

import Nav from '../Navigation/Nav'
import api from '../../services/loginApi'
import Bottom from '../BottomInfo/Bottom'

import './registerPageStyles.css'

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

    async function registerForm(e){
        e.preventDefault();

        localStorage.clear()

        const data ={
            firstName,
            lastName,
            cpf,
            rg,
            phone,
            born,
            register : null,
            password,
            email,
        }

        if(!validate()) return; 

        
        if(password === passwordConf)
            {
                try {
                    api.post('/user/registerNoAddress', data);
                    history.push('/login')
        
                } catch (err) {
                    alert("Falha ao criar conta . .")
                }
            }else{
                alert("Confirmação de senha invalida . . . .")
            }
    }

    function validate(){
        if(!firstName) return setStatus({
            type: 'error',
            message: 'Necessario preencher o campo nome . .'
        })
        else if(!lastName) return setStatus({
            type: 'error',
            message: 'Necessario preencher o campo sobrenome . .'
        })
        else if(!cpf) return setStatus({
            type: 'error',
            message: 'Necessario preencher o campo cpf . .'
        })
        else if(!rg) return setStatus({
            type: 'error',
            message: 'Necessario preencher o campo rg . .'
        })
        else if(!phone) return setStatus({
            type: 'error',
            message: 'Necessario preencher o campo telefone . .'
        })
        else if(!born) return setStatus({
            type: 'error',
            message: 'Necessario preencher o campo data de nascimento . .'
        })
        else if(!email) return setStatus({
            type: 'error',
            message: 'Necessario preencher o campo email . .'
        })
        else if(!password) return setStatus({
            type: 'error',
            message: 'Necessario preencher o campo senha . .'
        })
        else{return true;}
    }
    
    return (
        <>
            <Nav />
            <div className="input">                        
                <h1>{status.type === 'error' ? <p style={{ color: "red"}}>{status.message}</p> : ""}</h1>
            </div>
            <form onSubmit={registerForm}>
                <div className="form-container">
                    <div className="left-form">
                        <div className="inputs-left">
                            <input
                                placeholder='Nome'
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <input
                                placeholder='Sobrenome'
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                            <InputMask
                                mask="999.999.999-99"
                                placeholder='CPF'
                                value={cpf}
                                onChange={e => setCpf(e.target.value)}
                            />
                            <InputMask
                                mask="99.999.999-9"
                                placeholder='RG'
                                value={rg}
                                onChange={e => setRg(e.target.value)}
                            />
                            <input
                                placeholder='Data de Nascimento'
                                type="date"
                                onChange={e => setBorn(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="right-form">
                        <div className="inputs-right">
                            <InputMask
                                mask="(99)99999-9999"
                                placeholder='Telefone'
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                            <input
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
                            <button className="button" type='submit'>Enviar</button>
                        </div>
                    </div>
                </div>
            </form>
            <br />
            <Bottom />
        </>
    );
}