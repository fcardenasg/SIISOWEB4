export function PostMedicalAdvice(
    documento,
    fecha,
    idTipoAtencion,
    idSede,
    idContingencia,
    idEstadoCaso,
    idTurno,
    idDiaTurno,
    idTipoAsesoria,
    idMotivo,
    idCausa,
    motivo,
    recomdaciones,
    pautas,
    idEstadoAsesoria,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
) {
    return {
        documento,
        fecha,
        idTipoAtencion,
        idSede,
        idContingencia,
        idEstadoCaso,
        idTurno,
        idDiaTurno,
        idTipoAsesoria,
        idMotivo,
        idCausa,
        motivo,
        recomdaciones,
        pautas,
        idEstadoAsesoria,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutMedicalAdvice(
    id,
    documento,
    fecha,
    idTipoAtencion,
    idSede,
    idContingencia,
    idEstadoCaso,
    idTurno,
    idDiaTurno,
    idTipoAsesoria,
    idMotivo,
    idCausa,
    motivo,
    recomdaciones,
    pautas,
    idEstadoAsesoria,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
) {
    return {
        id,
        documento,
        fecha,
        idTipoAtencion,
        idSede,
        idContingencia,
        idEstadoCaso,
        idTurno,
        idDiaTurno,
        idTipoAsesoria,
        idMotivo,
        idCausa,
        motivo,
        recomdaciones,
        pautas,
        idEstadoAsesoria,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}