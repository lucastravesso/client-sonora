import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import InputMask from 'react-input-mask'

import DropDownCities from "../../components/DropDowns/DdCities";
import DropDownStates from "../../components/DropDowns/DdStates";

import Nav from '../Navigation/Nav'
import api from '../../services/loginApi'
import Bottom from '../BottomInfo/Bottom'

import './styles.css'

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
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');

    const accessToken = localStorage.getItem('accessToken');

    const [formValuesState, setFormValuesState] = useState({});
    const [formValuesCity, setFormValuesCity] = useState({});

    const handleInputChangeState = (e) => {
        e.preventDefault();
        
        const { value, name } = e.target;
        setFormValuesState({ ...formValuesState, [name]: value });
        setState(value)
    }
    const handleInputChangeCity = (e) => {
        e.preventDefault();
        const { value, name } = e.target;
        setFormValuesCity({ ...formValuesCity, [name]: value });
        setCity(value)
    }



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
                setCountry(res.data.addressDto.country)
                setState(res.data.addressDto.state)
                setCity(res.data.addressDto.city)      
                setDistrict(res.data.addressDto.district)
                setStreet(res.data.addressDto.street)
                setNumber(res.data.addressDto.number)
                setComplement(res.data.addressDto.complement)
            })
            
        } catch (err) {
            alert("Falha ao encontrar usuario . .")
        }
    }, [accessToken])

    async function updateUser(e) {
        e.preventDefault();

        const addressDto = {
            country: country,
            state: state,
            city: city,
            district: district,
            street: street,
            number: number,
            complement: complement,

        }

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
            addressDto,
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



    const history = useHistory();

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

                    </div>
                </div>
                <div className="form-right">
                    <div className="align-rigth">
                        <DropDownStates id="state" name="state" address={state} onChange={handleInputChangeState} />
                        <DropDownCities id="city" name="city" address={city} onChange={handleInputChangeCity} state={formValuesState.state} />
                        <input
                            placeholder="Bairro"
                            value={district}
                            onChange={e => setDistrict(e.target.value)}
                        />
                        <input
                            placeholder="Rua"
                            value={street}
                            onChange={e => setStreet(e.target.value)}
                        />
                        <input
                            placeholder="Numero"
                            value={number}
                            onChange={e => setNumber(e.target.value)}
                        />
                        <input
                            placeholder="Complemento"
                            value={complement}
                            onChange={e => setComplement(e.target.value)}
                        />
                        <button className="button" type="submit">Enviar</button>
                    </div>
                </div>
            </form>
            <br />
            <br />
        <Bottom />
        </>
    );
}