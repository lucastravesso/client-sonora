import React, { useState} from "react";
import {useHistory} from 'react-router-dom'
import InputMask from 'react-input-mask'


import Nav from '../Navigation/Nav'
import api from '../../services/loginApi'
import DropDownCardFlag from '../../components/DropDowns/DdCardFlags'
import Bottom from "../BottomInfo/Bottom";

import './cardStyles.css'
import { validateCardDate, validateDoc } from "../../validations/validations";

export default function AddCard(){

    const history = useHistory();
    const accessToken = localStorage.getItem('accessToken');
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

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
            card_security : card_valid,
        }

        if(!validate()) return; 

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
    function validate(){
        if(!card_name) return setStatus({
            type: 'error',
            message: 'Necessario preencher o campo Nome no cartão . .'
        })
        else if(!card_flag) return setStatus({
            type: 'error',
            message: 'Necessario escolher a bandeira do cartão . .'
        })
        else if(!card_number) return setStatus({
            type: 'error',
            message: 'Necessario preencher o campo numero do cartão . .'
        })
        else if(validateDoc(card_number, "CARD")) return setStatus({
            type: 'error',
            message: 'Necessario preencher o campo numero do cartão . .'
        })
        else if(!card_valid) return setStatus({
            type: 'error',
            message: 'Necessario preencher o campo validade do cartão . .'
        })
        else{return true;}
    }

    return (
        <>
        <Nav></Nav>
        <div className="container-card">
            <form className="form-save-card" onSubmit={addCard}>
            {status.type === 'error' ? <p style={{ color: "red"}}>{status.message}</p> : ""}

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
                    mask='999'
                    placeholder='Validade do cartão'
                    value={card_valid}
                    onChange={e => setCard_valid(e.target.value)}
                />
                <button className="button" type="submit">Registrar cartão</button>
            </form>
        </div>
        <br />
        <Bottom />
        </>
    );

}
