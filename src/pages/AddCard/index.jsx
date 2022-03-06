import React, { useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
import InputMask from 'react-input-mask'


import Nav from '../Navigation/Nav'
import api from '../../services/loginApi'
import DropDownCardFlag from '../../components/DropDowns/DdCardFlags'

import './styles.css'

export default function AddCard(){

    const history = useHistory();
    const accessToken = localStorage.getItem('accessToken');

    const [card_name, setCard_name] = useState('');
    const [card_flag, setCard_flag] = useState('');
    const [card_number, setCard_number] = useState('');
    const [card_valid, setCard_valid] = useState('');


    async function addCard(e){
        e.preventDefault();

        const data ={
            card_name : card_name,
            card_flag : card_flag,
            card_number : card_number,
            card_valid : card_valid,
        }

        try {
            api.post('/card/register', data, {
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
            history.push('/perfilsimples')
        } catch (err) {
            alert('Não foi possivel inserir um novo cartão . ')
        }
    }

    const handleInputChangeFlag = (e) =>{
        e.preventDefault();
        setCard_flag(e.target.value);
    }

    return (
        <>
        <Nav></Nav>
        <div className="container">
            <form className="form-save" onSubmit={addCard}>
                <DropDownCardFlag onChange={handleInputChangeFlag}/>
                <InputMask
                    placeholder='Nome no cartão'
                    value={card_name}
                    onChange={e => setCard_name(e.target.value)}
                />
                <InputMask
                    mask="9999 9999 9999 9999"
                    placeholder='Numero no cartão'
                    value={card_number}
                    onChange={e => setCard_number(e.target.value)}
                />
                <InputMask
                    mask='99/99'
                    placeholder='Validade do cartão'
                    value={card_valid}
                    onChange={e => setCard_valid(e.target.value)}
                />
                <button className="button" type="submit">Registrar cartão</button>
            </form>
        </div>
        </>
    );

}
