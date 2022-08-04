export function PostSGSST(codigo, nombre, archivoPdf, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return { codigo, nombre, archivoPdf, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico };
}

export function PutSGSST(id, codigo, nombre, archivoPdf, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return { id, codigo, nombre, archivoPdf, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico };
}