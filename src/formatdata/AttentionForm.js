export function PostAttention(documento, fecha, sede, tipo, atencion, estadoCaso, observaciones, numeroHistoria, estadoPac, contingencia, turno, diaTurno,
    motivo, medico, docSolicitante, talla, peso, imc = imc, usuarioCierreAtencion, fechaDigitacion, fechaCierreAtencion, duracion, usuarioRegistro, fechaRegistro,
    usuarioModifico, fechaModifico) {
    return {
        documento, fecha, sede, tipo, atencion, estadoCaso, observaciones, numeroHistoria, estadoPac, contingencia, turno, diaTurno,
        motivo, medico, docSolicitante, talla, peso, imc, usuarioCierreAtencion, fechaDigitacion, fechaCierreAtencion, duracion, usuarioRegistro, fechaRegistro,
        usuarioModifico, fechaModifico
    };
}

export function PutAttention(id, documento, fecha, sede, tipo, atencion, estadoCaso, observaciones, numeroHistoria, estadoPac, contingencia, turno, diaTurno,
    motivo, medico, docSolicitante, talla, peso, imc, usuarioCierreAtencion, fechaDigitacion, fechaCierreAtencion, duracion, usuarioRegistro, fechaRegistro,
    usuarioModifico, fechaModifico) {
    return {
        id, documento, fecha, sede, tipo, atencion, estadoCaso, observaciones, numeroHistoria, estadoPac, contingencia, turno, diaTurno,
        motivo, medico, docSolicitante, talla, peso, imc, usuarioCierreAtencion, fechaDigitacion, fechaCierreAtencion, duracion, usuarioRegistro, fechaRegistro,
        usuarioModifico, fechaModifico
    };
}

export function PutEstadoAtencion(id, estadoPac, usuario) {
    return {
        id, estadoPac, usuario
    }
}