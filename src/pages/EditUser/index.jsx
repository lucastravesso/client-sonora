import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import InputMask from 'react-input-mask'

import DropDownCities from "../../components/DropDowns/DdCities";
import DropDownStates from "../../components/DropDowns/DdStates";

import Nav from '../Navigation/Nav'
import api from '../../services/loginApi'
import Bottom from '../BottomInfo/Bottom'

import './editUserStyles.css'

export default function EditUser() {

    const [userId, setUserId] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [phone, setPhone] = useState('');
    const [born, setBorn] = useState('');
    const [register, setRegister] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');


    const history = useHistory();
    const accessToken = localStorage.getItem('accessToken');


    useEffect(() => {
        try {
            api.get('/user/findByToken', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then(res => {
                setUserId(res.data.id);
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                setCpf(res.data.cpf)
                setRg(res.data.rg)
                setPhone(res.data.phone)
                setBorn(res.data.born)
                setPassword(res.data.password)
                setRegister(res.data.register)
                setLogin(res.data.login)
                setEmail(res.data.email)
            })

        } catch (err) {
            alert("Falha ao encontrar usuario . .")
        }
    }, [accessToken])

    async function updateUser(e) {
        e.preventDefault();


        const User = {
            firstName: firstName,
            lastName: lastName,
            cpf: cpf,
            rg: rg,
            phone: phone,
            born: born,
            register: register,
            password: password,
            login: login,
            email: email,
        }

        try {
            api.put(`/user/update/${userId}`, User, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            history.push('/perfilsimples');
        } catch (err) {
            alert("Falha ao atualizar usuario . .");
        }

    }

    return (
        <>
            <Nav />
            <form onSubmit={updateUser} className="form-edit-user">
                <div className="form-left">
                    <div className="align-left">
                        <input
                            placeholder="Nome"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <input
                            placeholder="Sobrenome"
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
                        <InputMask
                            mask="(99)99999-9999"
                            placeholder='Telefone'
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                        <input
                            type="date"
                            placeholder="Nascimento"
                            value={born}
                            onChange={e => setBorn(e.target.value)}
                        />
                        <input
                            placeholder="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <button className="button" type="submit">Enviar</button>

                    </div>
                </div>

            </form >
            <br />
            <br />
            <Bottom />
        </>
    );
}