export function PostTemplate(idSegmentoAgrupado, idSegmentoAfectado, idSubsegmento,
    idCIE11, usuario, idTipoAtencion, idAtencion, IdItems, descripcion, usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        idSegmentoAgrupado, idSegmentoAfectado, idSubsegmento,
        idCIE11, usuario, idTipoAtencion, idAtencion, IdItems, descripcion,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutTemplate(id, idSegmentoAgrupado, idSegmentoAfectado, idSubsegmento,
    idCIE11, usuario, idTipoAtencion, idAtencion, IdItems, descripcion, usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, idSegmentoAgrupado, idSegmentoAfectado, idSubsegmento,
        idCIE11, usuario, idTipoAtencion, idAtencion, IdItems, descripcion,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}