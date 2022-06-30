export function PostEvolutionNote(documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno, nota, diagnostico,
    planManejo, idConceptoActitud, idRemitido, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno, nota, diagnostico,
        planManejo, idConceptoActitud, idRemitido, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutEvolutionNote(id, documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno, nota, diagnostico,
    planManejo, idConceptoActitud, idRemitido, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno, nota, diagnostico,
        planManejo, idConceptoActitud, idRemitido, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}