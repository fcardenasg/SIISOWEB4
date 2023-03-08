import { DefaultValue } from "components/helpers/Enums";

export function PostAttention(documento, fecha, sede = DefaultValue.SINREGISTRO_GLOBAL, tipo = DefaultValue.SINREGISTRO_GLOBAL,
    atencion = DefaultValue.SINREGISTRO_GLOBAL, estadoCaso = DefaultValue.SINREGISTRO_GLOBAL, observaciones = "",
    numeroHistoria = 0, estadoPac = "", contingencia = DefaultValue.SINREGISTRO_GLOBAL, turno = DefaultValue.SINREGISTRO_GLOBAL,
    diaTurno = DefaultValue.SINREGISTRO_GLOBAL, motivo = DefaultValue.SINREGISTRO_GLOBAL, medico = DefaultValue.SINREGISTRO_GLOBAL,
    docSolicitante = "", talla = "", peso = "", imc = "", usuarioCierreAtencion = "", fechaDigitacion, fechaCierreAtencion, duracion = "", usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        documento, fecha, sede, tipo, atencion, estadoCaso, observaciones, numeroHistoria,
        estadoPac, contingencia, turno, diaTurno, motivo, medico, docSolicitante, talla, peso, imc,
        usuarioCierreAtencion, fechaDigitacion, fechaCierreAtencion, duracion, usuarioRegistro, fechaRegistro,
        usuarioModifico, fechaModifico
    };
}

export function PutAttention(id, documento, fecha, sede = DefaultValue.SINREGISTRO_GLOBAL, tipo = DefaultValue.SINREGISTRO_GLOBAL,
    atencion = DefaultValue.SINREGISTRO_GLOBAL, estadoCaso = DefaultValue.SINREGISTRO_GLOBAL, observaciones = "",
    numeroHistoria = 0, estadoPac = DefaultValue.SINREGISTRO_GLOBAL, contingencia = DefaultValue.SINREGISTRO_GLOBAL, turno = DefaultValue.SINREGISTRO_GLOBAL,
    diaTurno = DefaultValue.SINREGISTRO_GLOBAL, motivo = DefaultValue.SINREGISTRO_GLOBAL, medico = DefaultValue.SINREGISTRO_GLOBAL,
    docSolicitante = "", talla = "", peso = "", imc = "", usuarioCierreAtencion = "", fechaDigitacion, fechaCierreAtencion, duracion = 0, usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, documento, fecha, sede, tipo, atencion, estadoCaso, observaciones, numeroHistoria,
        estadoPac, contingencia, turno, diaTurno, motivo, medico, docSolicitante, talla, peso, imc, usuarioCierreAtencion,
        fechaDigitacion, fechaCierreAtencion, duracion, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutEstadoAtencion(id, estadoPac, usuario) {
    return {
        id, estadoPac, usuario
    }
}