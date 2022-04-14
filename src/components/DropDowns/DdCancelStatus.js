import './styles.css'

const DropDownStatusCancel = ({name, onChange = () => { } }) => {

    return (
        <select name={name} onChange={onChange}>
            <option value="AGUARDANDO_APROVAÇÃO">AGUARDANDO APROVAÇÃO</option>
            <option value="CANCELADO">CANCELADO</option>
            <option value="TROCA_REJEITADA">REJEITADO</option>
        </select>
    );
}
export default DropDownStatusCancel;