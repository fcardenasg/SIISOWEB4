export function PostMedicalFormula(fecha, documento, idContingencia, numeroHistoria = 0,
    idTipoRemision, diagnostico, descripcion, medico, usuario, fechaSistema) {
    return {
        fecha, documento, idContingencia, numeroHistoria,
        idTipoRemision, diagnostico, descripcion, medico, usuario, fechaSistema
    };
}

export function PutMedicalFormula(idRecetario, fecha, documento, idContingencia, numeroHistoria = 0,
    idTipoRemision, diagnostico, descripcion, medico, usuario, fechaSistema) {
    return {
        idRecetario, fecha, documento, idContingencia, numeroHistoria,
        idTipoRemision, diagnostico, descripcion, medico, usuario, fechaSistema
    };
}