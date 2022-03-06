import { useState } from "react";

import './styles.css'

const DropDownCardFlag = ({onChange = () => { } }) => {

    return (
        <select onChange={onChange}>
            <option value="">Selecione uma bandeira</option>
            <option value="Master Card">Master Card</option>
            <option value="Maestro">Maestro</option>
            <option value="Visa">Visa</option>
            <option value="Elo">Elo</option>
            <option value="American Express">American Express</option>
            <option value="Hipercard">Hipercard</option>
        </select>
    );
}

export default DropDownCardFlag;