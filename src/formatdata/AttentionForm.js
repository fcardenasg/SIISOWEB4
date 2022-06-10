export function PostAttention(documento, fecha, sede, tipo, atencion, estadoCaso = 1, observaciones, numeroHistoria,
    estadoPac, contingencia = 1, turno = 1, diaTurno = 1, motivo = 1, medico = 1, docSolicitante, talla, peso, iMC,
    usuarioCierreAtencion, fechaDigitacion, fechaCierreAtencion, duracion, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        documento, fecha, sede, tipo, atencion, estadoCaso, observaciones, numeroHistoria,
        estadoPac, contingencia, turno, diaTurno, motivo, medico, docSolicitante, talla, peso, iMC,
        usuarioCierreAtencion, fechaDigitacion, fechaCierreAtencion, duracion, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutAttention(id, documento, fecha, sede, tipo, atencion, estadoCaso, observaciones, numeroHistoria,
    estadoPac, contingencia, turno, diaTurno, motivo, medico, docSolicitante, talla, peso, iMC, usuarioCierreAtencion,
    fechaDigitacion, fechaCierreAtencion, duracion, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, documento, fecha, sede, tipo, atencion, estadoCaso, observaciones, numeroHistoria,
        estadoPac, contingencia, turno, diaTurno, motivo, medico, docSolicitante, talla, peso, iMC, usuarioCierreAtencion,
        fechaDigitacion, fechaCierreAtencion, duracion, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}