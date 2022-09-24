import { DefaultValue } from "components/helpers/Enums";

export function PostAttention(documento, fecha, sede, tipo, atencion, estadoCaso = DefaultValue.SINREGISTRO_GLOBAL, observaciones,
    numeroHistoria, estadoPac, contingencia = DefaultValue.SINREGISTRO_GLOBAL, turno = DefaultValue.SINREGISTRO_GLOBAL,
    diaTurno = DefaultValue.SINREGISTRO_GLOBAL, motivo = DefaultValue.SINREGISTRO_GLOBAL, medico = DefaultValue.SINREGISTRO_GLOBAL,
    docSolicitante, talla, peso, imc, usuarioCierreAtencion, fechaDigitacion, fechaCierreAtencion, duracion, usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        documento, fecha, sede, tipo, atencion, estadoCaso, observaciones, numeroHistoria,
        estadoPac, contingencia, turno, diaTurno, motivo, medico, docSolicitante, talla, peso, imc,
        usuarioCierreAtencion, fechaDigitacion, fechaCierreAtencion, duracion, usuarioRegistro, fechaRegistro,
        usuarioModifico, fechaModifico
    };
}

export function PutAttention(id, documento, fecha, sede, tipo, atencion, estadoCaso = DefaultValue.SINREGISTRO_GLOBAL, observaciones,
    numeroHistoria, estadoPac, contingencia = DefaultValue.SINREGISTRO_GLOBAL, turno = DefaultValue.SINREGISTRO_GLOBAL,
    diaTurno = DefaultValue.SINREGISTRO_GLOBAL, motivo = DefaultValue.SINREGISTRO_GLOBAL, medico = DefaultValue.SINREGISTRO_GLOBAL,
    docSolicitante, talla, peso, imc, usuarioCierreAtencion, fechaDigitacion, fechaCierreAtencion, duracion, usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, documento, fecha, sede, tipo, atencion, estadoCaso, observaciones, numeroHistoria,
        estadoPac, contingencia, turno, diaTurno, motivo, medico, docSolicitante, talla, peso, imc, usuarioCierreAtencion,
        fechaDigitacion, fechaCierreAtencion, duracion, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}