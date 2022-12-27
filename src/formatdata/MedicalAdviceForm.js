import { DefaultValue } from "components/helpers/Enums";

export function PostMedicalAdvice(documento, fecha, idRegistroAtencion = 0, idTipoAtencion = DefaultValue.SINREGISTRO_GLOBAL, idSede = DefaultValue.SINREGISTRO_GLOBAL,
    idContingencia = DefaultValue.SINREGISTRO_GLOBAL, idEstadoCaso = DefaultValue.SINREGISTRO_GLOBAL, idTurno = DefaultValue.SINREGISTRO_GLOBAL,
    idDiaTurno = DefaultValue.SINREGISTRO_GLOBAL, idTipoAsesoria = DefaultValue.SINREGISTRO_GLOBAL, idMotivo = DefaultValue.SINREGISTRO_GLOBAL, idSubmotivo = DefaultValue.SINREGISTRO_GLOBAL,
    idCausa = DefaultValue.SINREGISTRO_GLOBAL, motivo = DefaultValue.SINREGISTRO_GLOBAL, recomendaciones = "", pautas = "", idEstadoAsesoria = DefaultValue.SINREGISTRO_GLOBAL,
    usuarioRegistro = "", fechaRegistro, usuarioModifico = "", fechaModifico) {
    return {
        documento, fecha, idRegistroAtencion, idTipoAtencion, idSede, idContingencia, idEstadoCaso, idTurno, idDiaTurno, idTipoAsesoria,
        idMotivo, idSubmotivo, idCausa, motivo, recomendaciones, pautas, idEstadoAsesoria, usuarioRegistro, fechaRegistro, usuarioModifico,
        fechaModifico
    };
}

export function PutMedicalAdvice(id, documento, fecha, idRegistroAtencion = 0, idTipoAtencion = DefaultValue.SINREGISTRO_GLOBAL, idSede = DefaultValue.SINREGISTRO_GLOBAL,
    idContingencia = DefaultValue.SINREGISTRO_GLOBAL, idEstadoCaso = DefaultValue.SINREGISTRO_GLOBAL, idTurno = DefaultValue.SINREGISTRO_GLOBAL,
    idDiaTurno = DefaultValue.SINREGISTRO_GLOBAL, idTipoAsesoria = DefaultValue.SINREGISTRO_GLOBAL, idMotivo = DefaultValue.SINREGISTRO_GLOBAL, idSubmotivo = DefaultValue.SINREGISTRO_GLOBAL,
    idCausa = DefaultValue.SINREGISTRO_GLOBAL, motivo = DefaultValue.SINREGISTRO_GLOBAL, recomendaciones = "", pautas = "", idEstadoAsesoria = DefaultValue.SINREGISTRO_GLOBAL,
    usuarioRegistro = "", fechaRegistro, usuarioModifico = "", fechaModifico) {
    return {
        id, documento, fecha, idRegistroAtencion, idTipoAtencion, idSede, idContingencia, idEstadoCaso, idTurno, idDiaTurno, idTipoAsesoria,
        idMotivo, idSubmotivo, idCausa, motivo, recomendaciones, pautas, idEstadoAsesoria, usuarioRegistro, fechaRegistro, usuarioModifico,
        fechaModifico
    };
}