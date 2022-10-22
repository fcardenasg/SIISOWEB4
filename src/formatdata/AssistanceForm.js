import { DefaultValue } from "components/helpers/Enums";

export function PostAssistance(documento, fecha, idRegistroAtencion, idAtencion, idContingencia, idTurno = DefaultValue.SINREGISTRO_GLOBAL,
    idDiaTurno = DefaultValue.SINREGISTRO_GLOBAL, motivoConsulta, enfermedadActual,
    antecedentes, revisionSistema, examenFisico, examenParaclinico, dx1, dx2, dx3, planManejo, idConceptoActitud, idRemitido,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        documento, fecha, idAtencion, idRegistroAtencion, idContingencia, idTurno, idDiaTurno, motivoConsulta, enfermedadActual,
        antecedentes, revisionSistema, examenFisico, examenParaclinico, dx1, dx2, dx3, planManejo, idConceptoActitud, idRemitido,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutAssistance(id, documento, fecha, idAtencion, idRegistroAtencion, idContingencia, idTurno = DefaultValue.SINREGISTRO_GLOBAL,
    idDiaTurno = DefaultValue.SINREGISTRO_GLOBAL, motivoConsulta, enfermedadActual,
    antecedentes, revisionSistema, examenFisico, examenParaclinico, dx1, dx2, dx3, planManejo, idConceptoActitud, idRemitido,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, documento, fecha, idAtencion, idRegistroAtencion, idContingencia, idTurno, idDiaTurno, motivoConsulta, enfermedadActual,
        antecedentes, revisionSistema, examenFisico, examenParaclinico, dx1, dx2, dx3, planManejo, idConceptoActitud, idRemitido,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}