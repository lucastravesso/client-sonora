import { useEffect, useState } from "react";
import { fetchStates, parseStates } from "../../services/ibgeApi";

import './styles.css'

const DropDownStates = ({id, name,address, onChange = () => { } }) => {
    const [states, setStates] = useState([]);

    useEffect(() => {fetchStates().then(parseStates).then(setStates)}, []);    

    return (
        <select id={id || name} name={name || id} onChange={onChange}>
            <option value="">{address}</option>
            {
                states.map(state => {
                    const { label, value } = state;
                    return (
                        <option key={value} value={value}>{label}</option>
                    );
                })
            }
        </select>
    );
}

export default DropDownStates;