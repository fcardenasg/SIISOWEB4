export function PostCatalog(nombre, codigo, idTipoCatalogo, usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico, estado) {
    return { nombre, codigo, idTipoCatalogo, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico, estado };
}

export function PutCatalog(idCatalogo, nombre, codigo, idTipoCatalogo, usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico, estado) {
    return { idCatalogo, nombre, codigo, idTipoCatalogo, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico, estado };
}