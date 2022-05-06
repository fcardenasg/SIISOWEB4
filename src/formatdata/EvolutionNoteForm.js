export function PostEvolutionNote(documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno, nota, diagnostico,
    planManejo, idConceptoActitud, idRemitido, usuarioCreacion, fechaCreacion, usuarioModifica, fechaModifica) {
    return {
        documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno, nota, diagnostico,
        planManejo, idConceptoActitud, idRemitido, usuarioCreacion, fechaCreacion, usuarioModifica, fechaModifica
    };
}

export function PutEvolutionNote(id, documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno, nota, diagnostico,
    planManejo, idConceptoActitud, idRemitido, usuarioCreacion, fechaCreacion, usuarioModifica, fechaModifica) {
    return {
        id, documento, fecha, idAtencion, idContingencia, idTurno, idDiaTurno, nota, diagnostico,
        planManejo, idConceptoActitud, idRemitido, usuarioCreacion, fechaCreacion, usuarioModifica, fechaModifica
    };
}