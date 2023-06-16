export function PutWorkHistoryRiskDLTD(id, idHistoriaLaboral, fecha, documento, idRiesgo, idCargo, idClase, idExposicion,
    gradoSinEPP, gradoConEPP, medidasControl, anio = 0, mes = 0, usuarioRegistro, fechaRegistro,
    usuarioModifico, fechaModifico) {
    return {
        id, idHistoriaLaboral, fecha, documento, idRiesgo, idCargo, idClase, idExposicion,
        gradoSinEPP, gradoConEPP, medidasControl, anio, mes, usuarioRegistro, fechaRegistro,
        usuarioModifico, fechaModifico
    };
}

export function PutWorkHistoryRiskDLTD1(id, idHistoriaLaboral, fecha, documento, idRiesgo, idCargo, idClase, idExposicion,
    gradoSinEPP, gradoConEPP, medidasControl, listaMedidasControl, anio = 0, mes = 0, usuarioRegistro, fechaRegistro,
    usuarioModifico, fechaModifico) {
    return {
        id, idHistoriaLaboral, fecha, documento, idRiesgo, idCargo, idClase, idExposicion,
        gradoSinEPP, gradoConEPP, medidasControl, listaMedidasControl, anio, mes, usuarioRegistro, fechaRegistro,
        usuarioModifico, fechaModifico
    };
}