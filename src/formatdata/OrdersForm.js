export function PostOrders(documento, fecha, idTipoExamen, observaciones = "", usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico, citacion, consentimientoInformado, vih, pruebaEmbarazo,
    fechaCitacion) {
    return {
        documento, fecha, idTipoExamen, observaciones, usuarioRegistro,
        fechaRegistro, usuarioModifico, fechaModifico, citacion, consentimientoInformado, vih, pruebaEmbarazo,
        fechaCitacion
    }
};

export function PutOrders(id, documento, fecha, idTipoExamen, observaciones, usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico, citacion, consentimientoInformado, vih, pruebaEmbarazo,
    fechaCitacion) {
    return {
        id, documento, fecha, idTipoExamen, observaciones, usuarioRegistro,
        fechaRegistro, usuarioModifico, fechaModifico, citacion, consentimientoInformado, vih, pruebaEmbarazo,
        fechaCitacion
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