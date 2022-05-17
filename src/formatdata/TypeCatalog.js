export function PostTypeCatalog(nombre, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return { nombre, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico };
}

export function PutTypeCatalog(id, nombre, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return { id, nombre, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico };
}