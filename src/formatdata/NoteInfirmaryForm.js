export function PostNoteInfirmary(documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno,
    procedimientos, notaEnfermedad, usuarioCreacion, fechaCreacion, usuarioModifica, fechaModifica) {
    return {
        documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno,
        procedimientos, notaEnfermedad, usuarioCreacion, fechaCreacion, usuarioModifica, fechaModifica
    };
}

export function PutNoteInfirmary(id, documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno,
    procedimientos, notaEnfermedad, usuarioCreacion, fechaCreacion, usuarioModifica, fechaModifica) {
    return {
        id, documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno,
        procedimientos, notaEnfermedad, usuarioCreacion, fechaCreacion, usuarioModifica, fechaModifica
    };
}