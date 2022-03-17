import React, {useState, useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom'
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi'

import './vendorPageStyles.css'

import Nav from '../Navigation/Nav'

import api from '../../services/loginApi'


export default function Products () {
    
    const[products, setProducts] = useState([]);

    const email = localStorage.getItem('email')
    const accessToken = localStorage.getItem('accessToken')

    const history = useHistory();

    // ---------------------------------------------CALLBACK FUNCTIONS------------------------------------------------------------------------------------------

    async function logout()
    {
        localStorage.clear()
        history.push('/login')
    }

    async function editProduct(id)
    {
        try {
            history.push(`products/new/${id}`)
        } catch (err) {
            alert('Edit Failed')
        }
    }

    async function deleteProduct(id)
    {
        try {
            
            await api.delete(`/products/delete/${id}`,{
                headers: {
                    Authorization : `Bearer ${accessToken}`
                   }
            })
                setProducts(products.filter(prod => prod.id !== id))
        } catch (err) {
            alert('Falha ao deletar')
        }
    }


    /* -------------------------------------  HOOKS PARA MANTER API ATIVA -------------------------------------  -------------------------------------  */

    useEffect(() => {
        api.get(`products/list`,{
            headers: {
                 Authorization : `Bearer ${accessToken}`
                }
        }).then(resProd => {
            setProducts(resProd.data)
        })
    })

    /** ----------------------------------------------------------- SEPARADOR ----------------------------------------------------------- */



    return (
        <>
        <Nav />
        <div className="products-container">
            <header>
                <span>Bem vindo, <strong>{email}</strong></span>
                <Link className="button" to="/products/new/0">Adicionar novo produto</Link>
                <button onClick={logout} type="button">
                    <FiPower size={18} color='251fc5' />
                </button>
            </header>

            <h1>Produtos registrados</h1>
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


                        <button onClick={() => editProduct(prod.id)} type="button">
                            <FiEdit size={20} color='251fc5' />
                        </button>

                        <button onClick={() => deleteProduct(prod.id)} type="button">
                            <FiTrash2 size={20} color='251fc5' />
                        </button>
                    </li>
                ))}

            </ul>

        </div></>
    );
}
