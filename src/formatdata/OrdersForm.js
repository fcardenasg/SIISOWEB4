export function PostOrders(documento, fecha, idTipoExamen, observaciones = "", usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico, citacion, consentimientoInformado, vih, pruebaEmbarazo) {
    return {
        documento, fecha, idTipoExamen, observaciones, usuarioRegistro,
        fechaRegistro, usuarioModifico, fechaModifico, citacion, consentimientoInformado, vih, pruebaEmbarazo
    }
};

export function PutOrders(id, documento, fecha, idTipoExamen, observaciones, usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico, citacion, consentimientoInformado, vih, pruebaEmbarazo) {
    return {
        id, documento, fecha, idTipoExamen, observaciones, usuarioRegistro,
        fechaRegistro, usuarioModifico, fechaModifico, citacion, consentimientoInformado, vih, pruebaEmbarazo
    };
}

export function PostOrdersParaclinico(idParaclinico, idOrdenes, idProveedor, idCiudad, idTipoExamenLaboratorio, idTipoExamenRNM,
    fechaExamenFisico, asistio, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        idParaclinico, idOrdenes, idProveedor, idCiudad, idTipoExamenLaboratorio, idTipoExamenRNM,
        fechaExamenFisico, asistio, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PostOrdersMasiva(listaOrdenes = [], listaParaclinicos = []) {
    return {
        listaOrdenes, listaParaclinicos
    };
}