import './styles.css'

const DropDownStatusChange = ({name, onChange = () => { } }) => {

    return (
        <select name={name} onChange={onChange}>
            <option value="AGUARDANDO_APROVAÇÃO">AGUARDANDO APROVAÇÃO</option>
            <option value="TROCA_APROVADA">TROCA APROVADA</option>
        </select>
    );
}
export default DropDownStatusChange;