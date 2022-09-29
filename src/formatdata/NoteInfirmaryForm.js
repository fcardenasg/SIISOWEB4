import { DefaultValue } from "components/helpers/Enums";

export function PostNoteInfirmary(idRegistroAtencion, documento, fecha, idAtencion, idContingencia, idTurno = DefaultValue.SINREGISTRO_GLOBAL,
    idDiaTurno = DefaultValue.SINREGISTRO_GLOBAL, procedimientos, notaEnfermedad, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        idRegistroAtencion, documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno,
        procedimientos, notaEnfermedad, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutNoteInfirmary(id, idRegistroAtencion, documento, fecha, idAtencion, idContingencia, idTurno = DefaultValue.SINREGISTRO_GLOBAL,
    idDiaTurno = DefaultValue.SINREGISTRO_GLOBAL, procedimientos, notaEnfermedad, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, idRegistroAtencion, documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno,
        procedimientos, notaEnfermedad, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}