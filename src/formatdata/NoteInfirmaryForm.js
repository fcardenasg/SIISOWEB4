import { DefaultValue } from "components/helpers/Enums";

export function PostNoteInfirmary(idRegistroAtencion, documento, fecha, idAtencion, idContingencia, dx1 = '',
    dx2 = '', dx3 = '', procedimientos, notaEnfermedad, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        idRegistroAtencion, documento, fecha, idAtencion, idContingencia, dx1, dx2, dx3,
        procedimientos, notaEnfermedad, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutNoteInfirmary(id, idRegistroAtencion, documento, fecha, idAtencion, idContingencia, dx1 = '',
    dx2 = '', dx3 = '', procedimientos, notaEnfermedad, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, idRegistroAtencion, documento, fecha, idAtencion, idContingencia, dx1, dx2, dx3,
        procedimientos, notaEnfermedad, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}