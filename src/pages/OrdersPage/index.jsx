import React from "react";
import { useHistory } from "react-router-dom";

import './OrdersPage.css'

export default function OrdersPage(props) {

    const history = useHistory();

    async function handleRedirect(id){

        localStorage.setItem('order-id', id)
        history.push('/pedido')
    }

    return (
        <>
            <div className="container-orders">
                <table>
                    <tr>
                        <td><h1>TODOS OS PEDIDOS DA CONTA</h1></td>
                    </tr>
                    {props.receiveProps
                    .sort((a, b) => {return a.id - b.id})
                    .reverse()
                    .map(o =>(
                        <>
                            <button onClick={() => handleRedirect(o.id)}>
                                <tr key={o.id}>
                                    <td>{'ID do Pedido ' +  o.id}</td>
                                    <td>{'Status do Pedido ' + o.status}</td>
                                    <td>{'Data do Pedido  ' + o.orderDate}</td>
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