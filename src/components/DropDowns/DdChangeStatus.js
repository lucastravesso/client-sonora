import './styles.css'

const DropDownStatusChange = ({name, onChange = () => { } }) => {

    return (
        <select name={name} onChange={onChange}>
            <option value="AGUARDANDO_APROVAÇÃO">AGUARDANDO APROVAÇÃO</option>
            <option value="TROCA_APROVADA">TROCA APROVADA</option>
            <option value="PRODUTO_RETORNADO">TROCA FINALIZADA</option>
            <option value="TROCA_REJEITADA">TROCA REJEITADA</option>
        </select>
    );
}
export default DropDownStatusChange;