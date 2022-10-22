export function PostEvolutionNote(documento, fecha, idRegistroAtencion, idAtencion, idContingencia, idTurno, idDiaTurno, nota, dx1,
    dx2, dx3, planManejo, idConceptoActitud, idRemitido, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        documento, fecha, idRegistroAtencion, idAtencion, idContingencia, idTurno, idDiaTurno, nota, dx1,
        dx2, dx3, planManejo, idConceptoActitud, idRemitido, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutEvolutionNote(id, documento, fecha, idRegistroAtencion, idAtencion, idContingencia, idTurno, idDiaTurno, nota, dx1,
    dx2, dx3, planManejo, idConceptoActitud, idRemitido, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, documento, fecha, idRegistroAtencion, idAtencion, idContingencia, idTurno, idDiaTurno, nota, dx1,
        dx2, dx3, planManejo, idConceptoActitud, idRemitido, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}