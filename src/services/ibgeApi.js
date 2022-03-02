const BASE_URL = 'https://servicodados.ibge.gov.br/api/v1';

const responseToJson = (response) => response.json();

export const fetchStates = () =>{
    const url = `${BASE_URL}/localidades/estados`
    return fetch(url).then(responseToJson)
};

export const fetchCities = (state) =>{
    if(!state) return Promise.resolve([]);
    const url = `${BASE_URL}/localidades/estados/${state}/municipios`
    return fetch(url).then(responseToJson)
};

export const parseStates = (states) =>{
    return states.map(state =>{
        return {label: state.nome, value: state.sigla};
    }).sort((a,b) =>{
        return a.label.localeCompare(b.label);
    })
}