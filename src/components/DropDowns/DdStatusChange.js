import './styles.css'

const DropDownStatus = ({name, onChange = () => { } }) => {

    return (
        <select name={name} onChange={onChange}>
            <option value="PEDIDO_EFETUADO">PEDIDO EFETUADO</option>
            <option value="PEDIDO_EM_PRODUÇÃO">PEDIDO EM PRODUÇÃO</option>
            <option value="PEDIDO_ENVIADO">PEDIDO ENVIADO</option>
            <option value="ENTREGUE">ENTREGUE</option>
            <option value="CANCELADO">CANCELADO</option>
            <option value="DEVOLUÇÃO_APROVADA">DEVOLUÇÃO APROVADA</option>
            <option value="AGUARDANDO_APROVAÇÃO">AGUARDANDO APROVAÇÃO</option>
            <option value="TROCA_APROVADA">TROCA APROVADA</option>
            <option value="PEDIDO_EFETUADO">PEDIDO EFETUADO</option>
        </select>
    );
}
export default DropDownStatus;