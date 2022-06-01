export function PostWorkHistory(fecha, idAtencion, documento, idEmpresa, idCargo, anio, meses) {
    return { fecha, idAtencion, documento, idEmpresa, idCargo, anio, meses };
}

export function PutWorkHistory(id, fecha, idAtencion, documento, idEmpresa, idCargo, anio, meses) {
    return { id, fecha, idAtencion, documento, idEmpresa, idCargo, anio, meses };
}