export function PostMedicamentos(codigo, descripcion, idUnidad, cantidad, existencia,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        codigo, descripcion, idUnidad, cantidad, existencia,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutMedicamentos(id, codigo, descripcion, idUnidad, cantidad, existencia,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, codigo, descripcion, idUnidad, cantidad, existencia,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}