import moment from "moment";

export function validateSenha(password) {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%*()_+^&}{:;?.])(?:([0-9a-zA-Z!@#$%;*(){}_+^&])(?!\1)){8,}$/;
    return regex.test(password);
}
    
export function validateNasc(dtNasc) {
    return moment().isSameOrAfter(dtNasc);
}

export function validateEmail(email) {
    const validator = require("email-validator");
    return validator.validate(email);
}

export function validateNome(nome) {
    const regex = /^([a-zA-Z][\w ]{2,})$/
    return regex.test(nome);
}

export function validateDoc(codigo, tipoDocumento) {
    if (tipoDocumento === "RG") return !(codigo.replace(/[-_()]/g, "").length < 11)
    if (tipoDocumento === "CPF") return (codigo.replace(/[-_()]/g, "").length < 14)
    if (tipoDocumento === "TEL") return (codigo.replace(/[-_()]/g, "").length > 10)
    if (tipoDocumento === "CARD") return !(codigo.replace(/[_]|[ ]/g, "").length > 15)
}

export function validateCardDate(data) {
    const minMonth = (new Date().getMonth() + 1)
    const minYear = (new Date().getFullYear() - 2000)
    let date = data.replace(/[_]|[/]/g, "")
    if (parseInt(date.slice(0, 2)) > 12) return true
    if (parseInt(date.slice(-2)) === minYear && parseInt(date.slice(0, 2)) <= minMonth) return true
    else return (parseInt(date.slice(-2)) < minYear)
}