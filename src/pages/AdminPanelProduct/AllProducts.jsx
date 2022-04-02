import React, {useState, useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom'
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi'

import './AdminPanelProducts.css'

import api from '../../services/loginApi'
import Logo from '../../assets/logo_Musica.png'
import NavAdmin from '../NavAdmin/NavAdmin'


export default function AllProduct() {
    

    const email = localStorage.getItem('email')
    const accessToken = localStorage.getItem('accessToken')

    // ---------------------------------------------CALLBACK FUNCTIONS------------------------------------------------------------------------------------------

    async function logout()
    {
        localStorage.clear()
        history.push('/login')
    }

    async function editProduct(id)
    {
        try {
            history.push(`/paineladministrativo/produtos/add-alt/${id}`)
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

    const [products, setProducts] = useState([]);
    const [limits, setLimits] = useState([]);
    const [page, setPage] = useState(0);

    
    const history = useHistory();

    async function getProducts(){
        try {
            await api.get(`products/list?page=${page}&&size=6`).then(resProd => {
                setLimits(resProd.data)
                setProducts(resProd.data.content)
            })
        } catch (err) {
            alert("Nao foi possivel trazer os produtos")
        }
    }

    useEffect(() => {
        getProducts()
    }, [page])

    async function increment(){
        if(page < limits.totalPages -1){
            setPage(page + 1)
        }else{
           return alert("Pagina indisponivel");
        }
    }
    async function decrement(){
        if(page > 0){
            setPage(page - 1)
        }else if(page === 0){
           return alert("Pagina indisponivel");;
        }
    }

    /** ----------------------------------------------------------- SEPARADOR ----------------------------------------------------------- */



    return (
        <>
        <NavAdmin />
        <div className="products-container">
            <header>
                <span>Bem vindo, <strong>{email}</strong></span>
                <Link className="button" to="/paineladministrativo/produtos/add-alt/0">Adicionar novo produto</Link>
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
                        <strong>Quantidade em estoque:</strong>
                        <p>{prod.prod_quantity}</p>

                        <strong>Categoria:</strong>
                        <p>{prod.category.categoryName}</p>


                        <button onClick={() => editProduct(prod.id)} type="button">
                            <FiEdit size={20} color='251fc5' />
                        </button>

                        <button onClick={() => deleteProduct(prod.id)} type="button">
                            <FiTrash2 size={20} color='251fc5' />
                        </button>
                    </li>
                ))}

            </ul>
            <br /><br />
            <div>
                <button className="button" onClick={() => increment()}>Proxima Pagina</button>
                <button className="button" onClick={() => decrement()}>Pagina Anterior</button>
            </div>
        </div></>
    );
}
