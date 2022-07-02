export function PostMedicalFormula(fecha, documento, idContingencia, numeroHistoria = 0,
    idTipoRemision, diagnostico, descripcion, medico, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        fecha, documento, idContingencia, numeroHistoria,
        idTipoRemision, diagnostico, descripcion, medico, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutMedicalFormula(idRecetario, fecha, documento, idContingencia, numeroHistoria = 0,
    idTipoRemision, diagnostico, descripcion, medico, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        idRecetario, fecha, documento, idContingencia, numeroHistoria,
        idTipoRemision, diagnostico, descripcion, medico, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}