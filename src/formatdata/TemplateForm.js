export function PostTemplate(idSegmentoAgrupado, idSegmentoAfectado, idSubsegmento,
    idCIE11, usuario, idTipoAtencion, idAtencion, descripcion) {
    return {
        idSegmentoAgrupado, idSegmentoAfectado, idSubsegmento,
        idCIE11, usuario, idTipoAtencion, idAtencion, descripcion
    };
}

export function PutTemplate(id, idSegmentoAgrupado, idSegmentoAfectado, idSubsegmento,
    idCIE11, usuario, idTipoAtencion, idAtencion, descripcion) {
    return {
        id, idSegmentoAgrupado, idSegmentoAfectado, idSubsegmento,
        idCIE11, usuario, idTipoAtencion, idAtencion, descripcion
    };
}