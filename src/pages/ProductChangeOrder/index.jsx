import React from "react";
import { useHistory } from "react-router-dom";

import './ProductChangeOrder.css'

export default function ProductChangeOrder(props) {

    const history = useHistory()

    async function handleRedirect(id){

        localStorage.setItem('order-prod-id', id)
        history.push('/trocas/produto')
    }

    return (
        <>
            <div className="container-product-change">
                <table>
                    <tr>
                        <td><h1>TODOS OS PEDIDOS DE TROCA DA CONTA</h1></td>
                    </tr>
                    {props.receiveProps.map(o =>(
                        <>
                            <button onClick={() => handleRedirect(o.id)}>
                                <tr key={o.id}>
                                    <td>{'ID do Pedido ' +  o.id}</td>
                                    <td>{'Status do Pedido ' + o.status}</td>
                                    <td>{'Data do Pedido  ' + o.change_date}</td>
                                </tr>
                            </button >
                            <br />
                        </>
                    ))}
                </table>
            </div>
        </>
    );

}