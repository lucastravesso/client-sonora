import React, { useState, useEffect } from "react";

import api from '../../services/loginApi'
import './audit.css'
import NavAdmin from '../NavAdmin/NavAdmin'

export default function AuditTable() {

    const [auditTable, setAuditTable] = useState([])
    const [page, setPage] = useState(0);
    const [limits, setLimits] = useState([])

    useEffect(() => { getAuditTable() }, [page])

    function getAuditTable() {
        try {
            api.get(`/audit/list?page=${page}&&size=14`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => {
                setLimits(res.data)
                setAuditTable(res.data.content)
            })
        } catch (err) {
            console.log(err)
        }
    }

    async function increment() {
        if (page < limits.totalPages - 1) {
            setPage(page + 1)
        } else {
            return alert("Pagina indisponivel");
        }
    }

    async function decrement() {
        if (page > 0) {
            setPage(page - 1)
        } else if (page === 0) {
            return alert("Pagina indisponivel");;
        }
    }

    return (
        <>
            <NavAdmin />
            <div className="audit-container">
                <div className="audit-table">
                    <table className="table-audit-table">
                        <thead>
                            <tr className="th_audit">
                                <td>Identificador</td>
                                <td>Data/Hora</td>
                                <td>Usuario</td>
                                <td>Tabela</td>
                                <td>Evento</td>
                                <td>Coluna</td>
                                <td>Valor Antigo</td>
                                <td>Valor Novo</td>
                                <td>Id da tupla</td>
                            </tr>
                        </thead>
                        <br />
                        <tbody className="tb_audit">
                            {auditTable.map(a =>
                                <tr key={a.aud_id}>
                                    <td>{a.aud_id}</td>
                                    <td>{a.aud_dt_hora}</td>
                                    <td>{a.aud_owner}</td>
                                    <td>{a.aud_tabela}</td>
                                    <td>{a.aud_evento}</td>
                                    <td>{a.aud_coluna}</td>
                                    <td>{a.aud_old}</td>
                                    <td>{a.aud_new}</td>
                                    <td>{a.aud_identificador}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="buttonss">
                        <button className="btn-effects" onClick={() => decrement()}>Pagina anterior</button>
                        <button className="btn-effects2" onClick={() => increment()}>Proxima pagina</button>
                    </div>
                </div>
            </div>
        </>
    );
}