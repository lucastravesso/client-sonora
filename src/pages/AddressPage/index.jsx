import React, { useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'

import Nav from '../Navigation/Nav'
import Bottom from '../BottomInfo/Bottom'
import api from '../../services/loginApi'
import DropDownStates from "../../components/DropDowns/DdStates";

import './addressStyles.css'
import DropDownCities from "../../components/DropDowns/DdCities";

export default function AddressAdd() {

    const history = useHistory();

    const [formValuesState, setFormValuesState] = useState({});
    const [formValuesCity, setFormValuesCity] = useState({});
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState();
    const [complement, setComplement] = useState('');


    async function addAddress(e){
        e.preventDefault();

        const data = {
            country : "Brasil",
            state : state,
            city : city,
            district,
            street,
            number,
            complement
        }


        try {
            api.post(`/address`, data, {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            history.push('/perfilsimples')
        } catch (err) {
            alert("Nao foi possivel registrar o endereço")
        }
    
    }
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
            <div className="container-address">
                <form className ="form-save-address" name='form-save-address' onSubmit={addAddress}>
                    <div className="panel-address">
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
                    </div>
                </form>
            </div>
            <Bottom />
        </>
    );
}