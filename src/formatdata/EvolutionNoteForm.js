import { DefaultValue } from 'components/helpers/Enums'

export function PostEvolutionNote(documento, fecha, idRegistroAtencion, atencion = DefaultValue.SINREGISTRO_GLOBAL, idContingencia = DefaultValue.SINREGISTRO_GLOBAL,
    idTurno = DefaultValue.SINREGISTRO_GLOBAL, idDiaTurno = DefaultValue.SINREGISTRO_GLOBAL, nota = "", dx1 = "",
    dx2 = "", dx3 = "", planManejo = "", idConceptoActitud = DefaultValue.SINREGISTRO_GLOBAL, idRemitido = DefaultValue.SINREGISTRO_GLOBAL,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        documento, fecha, idRegistroAtencion, atencion, idContingencia, idTurno, idDiaTurno, nota, dx1,
        dx2, dx3, planManejo, idConceptoActitud, idRemitido, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutEvolutionNote(id, documento, fecha, idRegistroAtencion, atencion = DefaultValue.SINREGISTRO_GLOBAL, idContingencia = DefaultValue.SINREGISTRO_GLOBAL,
    idTurno = DefaultValue.SINREGISTRO_GLOBAL, idDiaTurno = DefaultValue.SINREGISTRO_GLOBAL, nota = "", dx1 = "",
    dx2 = "", dx3 = "", planManejo = "", idConceptoActitud = DefaultValue.SINREGISTRO_GLOBAL, idRemitido = DefaultValue.SINREGISTRO_GLOBAL,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, documento, fecha, idRegistroAtencion, atencion, idContingencia, idTurno, idDiaTurno, nota, dx1,
        dx2, dx3, planManejo, idConceptoActitud, idRemitido, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}