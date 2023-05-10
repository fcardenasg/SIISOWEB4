export function PostOrders(documento, fecha, idTipoExamen, observaciones = "", usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico, citacion, consentimientoInformado) {
    return {
        documento, fecha, idTipoExamen, observaciones, usuarioRegistro,
        fechaRegistro, usuarioModifico, fechaModifico, citacion, consentimientoInformado
    }
};

export function PutOrders(id, documento, fecha, idTipoExamen, observaciones, usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico, citacion, consentimientoInformado) {
    return {
        id, documento, fecha, idTipoExamen, observaciones, usuarioRegistro,
        fechaRegistro, usuarioModifico, fechaModifico, citacion, consentimientoInformado
    };
}

export function PostOrdersParaclinico(idParaclinico, idOrdenes, idProveedor, idCiudad, idTipoExamenLaboratorio, idTipoExamenRNM,
    fechaExamenFisico, asistio, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        idParaclinico, idOrdenes, idProveedor, idCiudad, idTipoExamenLaboratorio, idTipoExamenRNM,
        fechaExamenFisico, asistio, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}