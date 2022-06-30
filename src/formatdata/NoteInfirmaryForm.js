export function PostNoteInfirmary(documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno,
    procedimientos, notaEnfermedad, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno,
        procedimientos, notaEnfermedad, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutNoteInfirmary(id, documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno,
    procedimientos, notaEnfermedad, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno,
        procedimientos, notaEnfermedad, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}