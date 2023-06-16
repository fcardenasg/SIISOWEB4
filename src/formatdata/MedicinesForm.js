export function PostMedicamentos(codigo, descripcion, idUnidad, stopMinimo, cantidadComprada, cantidadConsumida, existencia,
    estado, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        codigo, descripcion, idUnidad, stopMinimo, cantidadComprada, cantidadConsumida, existencia,
        estado, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutMedicamentos(id, codigo, descripcion, idUnidad, stopMinimo, estado, usuarioModifico) {
    return {
        id, codigo, descripcion, idUnidad, stopMinimo, estado, usuarioModifico
    };
}