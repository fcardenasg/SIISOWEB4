
export function PostCabRegistration(documento, fecha, diagnostico,
    motivoTraslado, idContingencia, idRuta, idDestino, nroTaxi, idCargadoa, idCupo, idMedico,
    idTipoTransporte, cualTransporte, usuarioRegistro) {
    return {
        documento, fecha, diagnostico,
        motivoTraslado, idContingencia, idRuta, idDestino, nroTaxi, idCargadoa, idCupo, idMedico,
        idTipoTransporte, cualTransporte, usuarioRegistro,
    };
}

export function PutCabRegistration(idRegistroTaxi, documento, fecha, diagnostico,
    motivoTraslado, idContingencia, idRuta, idDestino, nroTaxi, idCargadoa, idCupo, idMedico,
    idTipoTransporte, cualTransporte, usuarioModifico) {
    return {
        idRegistroTaxi, documento, fecha, diagnostico,
        motivoTraslado, idContingencia, idRuta, idDestino, nroTaxi, idCargadoa, idCupo, idMedico,
        idTipoTransporte, cualTransporte, usuarioModifico
    };
}