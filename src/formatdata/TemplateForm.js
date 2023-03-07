export function PostTemplate(idCIE11, usuario, descripcion, usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico, archivo) {
    return {
        idCIE11, usuario, descripcion, usuarioRegistro,
        fechaRegistro, usuarioModifico, fechaModifico, archivo
    };
}

export function PutTemplate(id, idCIE11, usuario, descripcion, usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico, archivo) {
    return {
        id, idCIE11, usuario, descripcion, usuarioRegistro,
        fechaRegistro, usuarioModifico, fechaModifico, archivo
    };
}