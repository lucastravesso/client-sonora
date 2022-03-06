import { useEffect, useState } from "react";
import { fetchCities } from "../../services/ibgeApi";

import './styles.css'

const DropDownCities = ({id, name, state, address, onChange =() =>{} }) => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        fetchCities(state).then((cities) => {
            setCities(cities);
        })
    }, [state])

    

    return (
        <select id={id || name} name={name || id} onChange={onChange}>
            <option value="">{address}</option>
            {cities.map(city => {
                    const { id, nome } = city;
                    return (
                        <option value={nome} key={id} >{nome}</option>
                        );
                })
            }
        </select>
    );
}

export default DropDownCities;