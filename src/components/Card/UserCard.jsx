import './card.css'
import React from 'react'

export default props =>
    <div className='card'>
        <div className='content'>
            <ul key={props.id}>
                <li>Id: {props.id}</li><br />
                <li>Nome : {props.nome} {props.sobrenome} </li><br />
                <li>cpf : {props.cpf} </li><br />
                <li>RG : {props.rg}  </li><br />
                <li>Telefone : {props.phone}  </li><br />
                <li>Data de Nascimento : {props.born}  </li><br />
                <li>Email : {props.email}  </li><br />
                {props.children}
            </ul>
        </div>
        <div className='footer'>
            {props.usu_rank}
        </div>
    </div>
