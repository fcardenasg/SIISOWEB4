export function PostTemplate(idSegmentoAgrupado, idSegmentoAfectado, idSubsegmento,
    idCIE11, usuario, idTipoAtencion, idAtencion, IdItems, descripcion) {
    return {
        idSegmentoAgrupado, idSegmentoAfectado, idSubsegmento,
        idCIE11, usuario, idTipoAtencion, idAtencion, IdItems, descripcion
    };
}

export function PutTemplate(id, idSegmentoAgrupado, idSegmentoAfectado, idSubsegmento,
    idCIE11, usuario, idTipoAtencion, idAtencion, IdItems, descripcion) {
    return {
        id, idSegmentoAgrupado, idSegmentoAfectado, idSubsegmento,
        idCIE11, usuario, idTipoAtencion, idAtencion, IdItems, descripcion
    };
}