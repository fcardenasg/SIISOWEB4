export function PostMedicalAdvice(documento, fecha, idRegistroAtencion, idTipoAtencion, idSede, idContingencia, idEstadoCaso, idTurno, idDiaTurno,
    idTipoAsesoria, idMotivo, idSubmotivo, idCausa, motivo, recomendaciones, pautas, idEstadoAsesoria, usuarioRegistro, fechaRegistro,
    usuarioModifico, fechaModifico) {
    return {
        documento, fecha, idRegistroAtencion, idTipoAtencion, idSede, idContingencia, idEstadoCaso, idTurno, idDiaTurno, idTipoAsesoria,
        idMotivo, idSubmotivo, idCausa, motivo, recomendaciones, pautas, idEstadoAsesoria, usuarioRegistro, fechaRegistro, usuarioModifico,
        fechaModifico
    };
}

export function PutMedicalAdvice(id, documento, fecha, idRegistroAtencion, idTipoAtencion, idSede, idContingencia, idEstadoCaso, idTurno, idDiaTurno,
    idTipoAsesoria, idMotivo, idSubmotivo, idCausa, motivo, recomendaciones, pautas, idEstadoAsesoria, usuarioRegistro, fechaRegistro,
    usuarioModifico, fechaModifico,IdCalendario,urlpaciente,message,whatsapp,email,state,channel) {
    return {
        id, documento, fecha, idRegistroAtencion, idTipoAtencion, idSede, idContingencia, idEstadoCaso, idTurno, idDiaTurno, idTipoAsesoria,
        idMotivo, idSubmotivo, idCausa, motivo, recomendaciones, pautas, idEstadoAsesoria, usuarioRegistro, fechaRegistro, usuarioModifico,
        fechaModifico,IdCalendario,urlpaciente,message,whatsapp,email,state,channel
    };
}