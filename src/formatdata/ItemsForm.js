export function PostItems(descripcion, idTipoAtencion, idAtencion,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        descripcion, idTipoAtencion, idAtencion,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutItems(id, descripcion, idTipoAtencion, idAtencion,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, descripcion, idTipoAtencion, idAtencion,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}