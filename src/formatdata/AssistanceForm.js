export function PostAssistance(documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno, motivoConsulta, enfermedadActual,
    antecedentes, revisionSistema, examenFisico, examenParaclinico, diagnostico, planManejo, idConceptoActitud, idRemitido,
    usuarioCreacion, fechaCreacion, usuarioModifica, fechaModifica) {
    return {
        documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno, motivoConsulta, enfermedadActual,
        antecedentes, revisionSistema, examenFisico, examenParaclinico, diagnostico, planManejo, idConceptoActitud, idRemitido,
        usuarioCreacion, fechaCreacion, usuarioModifica, fechaModifica
    };
}

export function PutAssistance(id, documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno, motivoConsulta, enfermedadActual,
    antecedentes, revisionSistema, examenFisico, examenParaclinico, diagnostico, planManejo, idConceptoActitud, idRemitido,
    usuarioCreacion, fechaCreacion, usuarioModifica, fechaModifica) {
    return {
        id, documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno, motivoConsulta, enfermedadActual,
        antecedentes, revisionSistema, examenFisico, examenParaclinico, diagnostico, planManejo, idConceptoActitud, idRemitido,
        usuarioCreacion, fechaCreacion, usuarioModifica, fechaModifica
    };
}