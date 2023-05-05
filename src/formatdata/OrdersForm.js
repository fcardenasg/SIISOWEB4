export function PostOrders(documento, fecha, idTipoExamen, observaciones = "", usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        documento, fecha, idTipoExamen, observaciones, usuarioRegistro,
        fechaRegistro, usuarioModifico, fechaModifico
    }
};

export function PutOrders(id, documento, fecha, idTipoExamen, observaciones, usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, documento, fecha, idTipoExamen, observaciones, usuarioRegistro,
        fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PostOrdersParaclinico(idParaclinico, idOrdenes, idProveedor, idCiudad, idTipoExamenLaboratorio, idTipoExamenRNM,
    fechaExamenFisico, asistio, consentimientoInformado, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        idParaclinico, idOrdenes, idProveedor, idCiudad, idTipoExamenLaboratorio, idTipoExamenRNM,
        fechaExamenFisico, asistio, consentimientoInformado, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutOrdersParaclinico(id, idParaclinico, idOrdenes, idProveedor, idCiudad, idTipoExamenLaboratorio, idTipoExamenRNM,
    fechaExamenFisico, asistio, consentimientoInformado, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, idParaclinico, idOrdenes, idProveedor, idCiudad, idTipoExamenLaboratorio, idTipoExamenRNM,
        fechaExamenFisico, asistio, consentimientoInformado, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}