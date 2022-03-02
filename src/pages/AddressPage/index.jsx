import React, { useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
import InputMask from 'react-input-mask'

import Nav from '../Navigation/Nav'
import api from '../../services/loginApi'
import DropDownStates from "../../components/DropDowns/DdStates";

import './styles.css'
import DropDownCities from "../../components/DropDowns/DdCities";

export default function AddressAdd() {

    const history = useHistory();

    const [user, setUser] = useState([]);
    const accessToken = localStorage.getItem('accessToken');

    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState();
    const [complement, setComplement] = useState('');

    useEffect(() => {
        api.get('user/findByToken',{
            headers: {
                 Authorization : `Bearer ${accessToken}`
                }
        }).then(response =>{
            setUser(response.data)
        })
    },[])
    
    async function addAddress(e){
        e.preventDefault();

        const addressDto = {
            country : "Brasil",
            state : state,
            city : city,
            district,
            street,
            number,
            complement
        }

        const data = {
            firstName : user.firstName,
            lastName : user.lastName,
            cpf : user.cpf,
            rg : user.rg,
            born : user.born,
            register : user.register,
            login : user.login,
            email : user.email,
            addressDto
        }

        try {
            api.put(`/user/update/${user.id}`, data, {
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
            history.push('/perfilsimples')
        } catch (err) {
            alert("Nao foi possivel registrar o endereço")
        }
    
    }
    



    const [formValuesState, setFormValuesState] = useState({});
    const [formValuesCity, setFormValuesCity] = useState({});

    const handleInputChangeState = (e) =>{
        e.preventDefault();
        const {value, name} = e.target;
        setFormValuesState({...formValuesState, [name]:value});
        setState(value)
    }
    const handleInputChangeCity = (e) =>{
        e.preventDefault();
        const {value, name} = e.target;
        setFormValuesCity({...formValuesCity, [name]:value});
        setCity(value)
    }

    

    return (
        <>
            <Nav />
            <div className="container">
                <form name='form-save' onSubmit={addAddress}>
                    <DropDownStates id="state" name="state" onChange={handleInputChangeState}/>
                    <DropDownCities id="city" name="city" onChange={handleInputChangeCity} state={formValuesState.state}/>
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
                        type="number"
                        placeholder="Numero"
                        value={number}
                        onChange={e => setNumber(e.target.value)}
                     />
                     <input
                        placeholder="Complemento"
                        value={complement}
                        onChange={e => setComplement(e.target.value)}
                     />
                     <button className="button" type="submit">Registrar endereço</button>
                </form>
            </div>
        </>
    );
}