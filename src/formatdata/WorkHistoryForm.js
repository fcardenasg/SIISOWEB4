export function PostWorkHistoryDLTD(fecha, idAtencion, documento, idEmpresa, idCargo, anio, meses,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        fecha, idAtencion, documento, idEmpresa, idCargo, anio, meses,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutWorkHistoryDLTD(id, fecha, idAtencion, documento, idEmpresa, idCargo, anio, meses,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, fecha, idAtencion, documento, idEmpresa, idCargo, anio, meses,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PostWorkHistoryEmpresa(fecha, idAtencion, documento, empresa, cargo, anio, meses,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        fecha, idAtencion, documento, empresa, cargo, anio, meses,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutWorkHistoryEmpresa(id, fecha, idAtencion, documento, empresa, cargo, anio, meses,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, fecha, idAtencion, documento, empresa, cargo, anio, meses,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}