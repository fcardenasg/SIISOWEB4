export function ParametrosExcel(sede, fechaInicio, fechaFin, documento, opcion, idAtencion = null) {
    return {
        sede, fechaInicio, fechaFin, documento, opcion, idAtencion
    };
}

export function ParametrosExcelIndicadores(lsAnios, lsMeses, allMes) {
    return {
        lsAnios, lsMeses, allMes
    };
}