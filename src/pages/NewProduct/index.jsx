import React, { useState, useEffect } from "react";
import {useHistory, Link, useParams} from 'react-router-dom'
import NumberFormat from 'react-number-format'
import { FiArrowLeft } from "react-icons/fi";

import logo from '../../assets/instrumentos.png'
import api from '../../services/loginApi'

import './newProdStyles.css'


export default function NewProduct(){

    const [id, setId] = useState(null);
    const [prod_name,setProd_name] = useState('');
    const [prod_price,setProd_price] = useState('');
    const [prod_spec,setProd_spec] = useState('');
    const [prod_builder,setProd_builder] = useState('');
    const [categoryId,setCategoryId] = useState();
    const [categoryName,setCategoryName] = useState('');
    const [userId, setUserId] = useState();
    const [categoryList, setCategoryList] = useState([]);
    
    const {prodId} = useParams();

    const accessToken = localStorage.getItem('accessToken');

    const history = useHistory();

    //--------------------------------HOOKS----------------------------------------
    //--------------------------------HOOKS----------------------------------------

    useEffect(() => {
        api.get('category/list',{
            headers: {
                 Authorization : `Bearer ${accessToken}`
                }
        }).then(response =>{
            setCategoryList(response.data)
        })
    })
    
    useEffect(() => {
        if (prodId === '0') return;
        else loadProd();
    }, [prodId])

    useEffect(() => {
        api.get('auth/me',{
            headers: {
                 Authorization : `Bearer ${accessToken}`
                }
        }).then(response =>{
            setUserId(response.data.id)
        })
    })

    //----------------------------------functions------------------------------------
    //----------------------------------functions------------------------------------
    

    async function loadProd()
    {
        
        try {
            
            const response = await api.get(`products/list/${prodId}`, {
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
            console.log(response.data)
            setId(response.data.id);
            setProd_name(response.data.prod_name);
            setProd_builder(response.data.prod_builder);
            setProd_spec(response.data.prod_spec);
            setProd_price(response.data.prod_price);            
            setCategoryId(response.data.categoryDto.categoryId)
            setCategoryName(response.data.categoryDto.categoryName)
        
        } catch (error) {
            alert('Erro ao carregar o livro')
            history.push('/products')
        }
    }


    function SaveOrUpdate(e)
    {

        e.preventDefault();

        const userDto = {
            id : userId ,
        }

        const categoryDto = {
            id : categoryId ,
        }

        const data = {
            prod_name,
            prod_builder,
            prod_price ,
            prod_spec, 
            categoryDto,
            userDto
        }

        try {
            if (prodId === '0') {
                api.post('products/register', data, {
                    headers:{
                        Authorization: `Bearer ${accessToken}`
                    }
                })
            } else {
                data.id = id;
                api.put(`products/update/${id}`, data,{
                    headers:{
                        Authorization: `Bearer ${accessToken}`
                    }
                })
            }

            history.push('/perfilvendedor')
        } catch (err) {
            alert('Error while recoring product, try again')
        }
    }

    //-----------------------------------PAGE -----------------------------------------
    //-----------------------------------PAGE -----------------------------------------
    //-----------------------------------PAGE -----------------------------------------

    return(
        <div className="new-product-container"> 
            <div className="content">
                <section className="form">
                    <img src={logo} alt="logo" />
                    <h1>Adicionar novo produto</h1>
                    <p>Entre com as informações do produto e clique em adicionar</p>
                    <Link className="back-link" to="/perfilvendedor">
                        <FiArrowLeft size={16} color="blue"/>
                        Voltar
                    </Link>
                </section>
                <form name ="form-save" onSubmit={SaveOrUpdate}>
                    <input
                        placeholder="Nome"
                        value={prod_name}
                        onChange={e => setProd_name(e.target.value)}
                     />
                    <input
                        placeholder="Fabricante"
                        value={prod_builder}
                        onChange={e => setProd_builder(e.target.value)}
                      />
                    <input
                        placeholder="Especificações"
                        value={prod_spec}
                        onChange={e => setProd_spec(e.target.value)}
                      />
                    <NumberFormat
                    //ARRUMAR DECIMAL SCALE, INSERT FALHANDO CASO NAO INSIRA CERTO
                        //decimalScale={2}
                        //fixedDecimalScale
                        //thousandSeparator={true}
                        placeholder="Preço"
                        value={prod_price}
                        onChange={e => setProd_price(e.target.value)}
                      />
                   <select name="select_category" onChange={e => setCategoryId(e.target.value)}>
                       <option value={categoryId}>{categoryName}</option>
                        {categoryList.map(cat =>(
                            <option key ={cat.id} value={cat.id} >
                                {cat.categoryName}
                            </option>
                        ))}
                        </select> 
                    <button className="button" type="submit">Adicionar</button>
                </form>
            </div>
        </div>
    );

}