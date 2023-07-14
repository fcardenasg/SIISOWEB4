export function PostRefund(documento, dx1, dx2, idOrigenDx1, idOrigenDx2, resumen, idEstadoEmpleado, idEstadoRestriccion, idTipoRestriccion,
    fechaInicio, fechaFin, numeroDia, idOrdenadoPor, idMedico, porcentajePCL, recomendaciones, idConceptoReintegro,
    inicioReubicacion, finReubicacion, descripcion, idTipoHorario, idOrdenadoPorHorario, fechaInicioHorario, fechaFinHorario,
    idEstadoCaso, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        documento, dx1, dx2, idOrigenDx1, idOrigenDx2, resumen, idEstadoEmpleado, idEstadoRestriccion, idTipoRestriccion,
        fechaInicio, fechaFin, numeroDia, idOrdenadoPor, idMedico, porcentajePCL, recomendaciones, idConceptoReintegro,
        inicioReubicacion, finReubicacion, descripcion, idTipoHorario, idOrdenadoPorHorario, fechaInicioHorario, fechaFinHorario,
        idEstadoCaso, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutRefund(id, documento, dx1, dx2, idOrigenDx1, idOrigenDx2, resumen, idEstadoEmpleado, idEstadoRestriccion, idTipoRestriccion,
    fechaInicio, fechaFin, numeroDia, idOrdenadoPor, idMedico, porcentajePCL, recomendaciones, idConceptoReintegro,
    inicioReubicacion, finReubicacion, descripcion, idTipoHorario, idOrdenadoPorHorario, fechaInicioHorario, fechaFinHorario,
    idEstadoCaso, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, documento, dx1, dx2, idOrigenDx1, idOrigenDx2, resumen, idEstadoEmpleado, idEstadoRestriccion, idTipoRestriccion,
        fechaInicio, fechaFin, numeroDia, idOrdenadoPor, idMedico, porcentajePCL, recomendaciones, idConceptoReintegro,
        inicioReubicacion, finReubicacion, descripcion, idTipoHorario, idOrdenadoPorHorario, fechaInicioHorario, fechaFinHorario,
        idEstadoCaso, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PostListaArchivoRefund(idListaReintro, url, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        idListaReintro, url, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}