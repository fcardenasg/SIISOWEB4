export function PostAssistance(documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno, motivoConsulta, enfermedadActual,
    antecedentes, revisionSistema, examenFisico, examenParaclinico, diagnostico, planManejo, idConceptoActitud, idRemitido,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno, motivoConsulta, enfermedadActual,
        antecedentes, revisionSistema, examenFisico, examenParaclinico, diagnostico, planManejo, idConceptoActitud, idRemitido,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutAssistance(id, documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno, motivoConsulta, enfermedadActual,
    antecedentes, revisionSistema, examenFisico, examenParaclinico, diagnostico, planManejo, idConceptoActitud, idRemitido,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno, motivoConsulta, enfermedadActual,
        antecedentes, revisionSistema, examenFisico, examenParaclinico, diagnostico, planManejo, idConceptoActitud, idRemitido,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}