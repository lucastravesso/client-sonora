import React, {useState, useEffect} from 'react';

import api from '../../services/loginApi'
import Nav from '../Navigation/Nav'

import './styles.css'

export default function LandPage() {

    const[products, setProducts] = useState([]);

    useEffect(() => {
        api.get(`products/list`).then(resProd => {
            setProducts(resProd.data)
        })
    }, [products])

    return (
        <>
            <Nav />
            <div className="products-full-container">
                <ul>
                    {products.map(prod => (
                        <li key={prod.id}>
                            <strong>Produto:</strong>
                            <p>{prod.prod_name}</p>
                            <strong>Preço:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prod.prod_price)}</p>
                            <strong>Fabricante:</strong>
                            <p>{prod.prod_builder}</p>
                            <strong>Especificação:</strong>
                            <p>{prod.prod_spec}</p>
                            <strong>Categoria:</strong>
                            <p>{prod.categoryDto.categoryName}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}