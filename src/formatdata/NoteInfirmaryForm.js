import { DefaultValue } from "components/helpers/Enums";

export function PostNoteInfirmary(documento, fecha, idAtencion, idContingencia, idTurno = DefaultValue.SINREGISTRO_GLOBAL,
    idDiaTurno = DefaultValue.SINREGISTRO_GLOBAL, procedimientos, notaEnfermedad, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno,
        procedimientos, notaEnfermedad, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutNoteInfirmary(id, documento, fecha, idAtencion, idContingencia, idTurno = DefaultValue.SINREGISTRO_GLOBAL,
    idDiaTurno = DefaultValue.SINREGISTRO_GLOBAL, procedimientos, notaEnfermedad, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno,
        procedimientos, notaEnfermedad, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}