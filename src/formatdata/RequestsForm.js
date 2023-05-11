export function PostRequests(documento, fechaReciboDLTD, usuarioReciboDLTD, fechaRecibido, fechaLimiteRespuesta, direccion, correo,
    telefono, observacion, fechaEntrega, metodoUtilizado, numeroGuia, entidadSolicitante, usuarioRegistro, fechaRegistro,
    usuarioModifico, fechaModifico, archivoSolicitado) {
    return {
        documento, fechaReciboDLTD, usuarioReciboDLTD, fechaRecibido, fechaLimiteRespuesta, direccion, correo,
        telefono, observacion, fechaEntrega, metodoUtilizado, numeroGuia, entidadSolicitante, usuarioRegistro, fechaRegistro,
        usuarioModifico, fechaModifico, archivoSolicitado
    };
}

export function PutRequests(id, documento, fechaReciboDLTD, usuarioReciboDLTD, fechaRecibido, fechaLimiteRespuesta, direccion, correo,
    telefono, observacion, fechaEntrega, metodoUtilizado, numeroGuia, entidadSolicitante, usuarioRegistro, fechaRegistro,
    usuarioModifico, fechaModifico, archivoSolicitado) {
    return {
        id, documento, fechaReciboDLTD, usuarioReciboDLTD, fechaRecibido, fechaLimiteRespuesta, direccion, correo,
        telefono, observacion, fechaEntrega, metodoUtilizado, numeroGuia, entidadSolicitante, usuarioRegistro, fechaRegistro,
        usuarioModifico, fechaModifico, archivoSolicitado
    };
}

export function PostRequestsDetalle(idSolicitud, idTipoSolicitud, idAreaRespuesta, idUsuarioResponde, observacion, usuarioRegistro, fechaRegistro,
    usuarioModifico, fechaModifico, estadoRespuesta, archivoSolicitado) {
    return {
        idSolicitud, idTipoSolicitud, idAreaRespuesta, idUsuarioResponde, observacion, usuarioRegistro, fechaRegistro,
        usuarioModifico, fechaModifico, estadoRespuesta, archivoSolicitado
    };
}

export function PutRequestsDetalle(id, idSolicitud, idTipoSolicitud, idAreaRespuesta, idUsuarioResponde, observacion, usuarioRegistro, fechaRegistro,
    usuarioModifico, fechaModifico, estadoRespuesta, archivoSolicitado) {
    return {
        id, idSolicitud, idTipoSolicitud, idAreaRespuesta, idUsuarioResponde, observacion, usuarioRegistro, fechaRegistro,
        usuarioModifico, fechaModifico, estadoRespuesta, archivoSolicitado
    };
}