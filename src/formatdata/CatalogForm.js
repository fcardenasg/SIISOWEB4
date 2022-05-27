export function PostCatalog(nombre, codigo, idTipoCatalogo, usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico) {
    return { nombre, codigo, idTipoCatalogo, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico };
}

export function PutCatalog(idCatalogo, nombre, codigo, idTipoCatalogo, usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico) {
    return { idCatalogo, nombre, codigo, idTipoCatalogo, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico };
}