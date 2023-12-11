import { DefaultValue } from "components/helpers/Enums";

export function PostNoteInfirmary(idRegistroAtencion, documento, fecha, idAtencion, idContingencia, dx1 = '',
    dx2 = '', dx3 = '', procedimientos, notaEnfermedad, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico, comboProcedimientos) {
    return {
        idRegistroAtencion, documento, fecha, idAtencion, idContingencia, dx1, dx2, dx3, procedimientos, notaEnfermedad, usuarioRegistro,
        fechaRegistro, usuarioModifico, fechaModifico, comboProcedimientos
    };
}

export function PutNoteInfirmary(id, idRegistroAtencion, documento, fecha, idAtencion, idContingencia, dx1 = '',
    dx2 = '', dx3 = '', procedimientos, notaEnfermedad, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico, comboProcedimientos) {
    return {
        id, idRegistroAtencion, documento, fecha, idAtencion, idContingencia, dx1, dx2, dx3, procedimientos, notaEnfermedad, usuarioRegistro, fechaRegistro,
        usuarioModifico, fechaModifico, comboProcedimientos
    };
}