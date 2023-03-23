import { DefaultValue } from "components/helpers/Enums";
import { FormatDate } from "components/helpers/Format";

export function PostRefund(documento, dx1 = '', dx2 = '', idOrigenDx1 = DefaultValue.SINREGISTRO_GLOBAL, idOrigenDx2 = DefaultValue.SINREGISTRO_GLOBAL,
    resumen = '', idEstadoEmpleado = DefaultValue.SINREGISTRO_GLOBAL, idEstadoRestriccion = DefaultValue.SINREGISTRO_GLOBAL, idTipoRestriccion = DefaultValue.SINREGISTRO_GLOBAL,
    fechaInicio = FormatDate(new Date()), fechaFin = FormatDate(new Date()), numeroDia = 0, idOrdenadoPor = DefaultValue.SINREGISTRO_GLOBAL,
    idMedico, porcentajePCL = '', recomendaciones = '', idConceptoReintegro = DefaultValue.SINREGISTRO_GLOBAL,
    inicioReubicacion = FormatDate(new Date()), finReubicacion = FormatDate(new Date()), descripcion = '', idTipoHorario = DefaultValue.SINREGISTRO_GLOBAL,
    idOrdenadoPorHorario = DefaultValue.SINREGISTRO_GLOBAL, fechaInicioHorario = FormatDate(new Date()), fechaFinHorario = FormatDate(new Date()),
    idEstadoCaso = DefaultValue.SINREGISTRO_GLOBAL, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        documento, dx1, dx2, idOrigenDx1, idOrigenDx2, resumen, idEstadoEmpleado, idEstadoRestriccion, idTipoRestriccion,
        fechaInicio, fechaFin, numeroDia, idOrdenadoPor, idMedico, porcentajePCL, recomendaciones, idConceptoReintegro,
        inicioReubicacion, finReubicacion, descripcion, idTipoHorario, idOrdenadoPorHorario, fechaInicioHorario, fechaFinHorario,
        idEstadoCaso, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutRefund(id, documento, dx1 = '', dx2 = '', idOrigenDx1 = DefaultValue.SINREGISTRO_GLOBAL, idOrigenDx2 = DefaultValue.SINREGISTRO_GLOBAL,
    resumen = '', idEstadoEmpleado = DefaultValue.SINREGISTRO_GLOBAL, idEstadoRestriccion = DefaultValue.SINREGISTRO_GLOBAL, idTipoRestriccion = DefaultValue.SINREGISTRO_GLOBAL,
    fechaInicio = FormatDate(new Date()), fechaFin = FormatDate(new Date()), numeroDia = 0, idOrdenadoPor = DefaultValue.SINREGISTRO_GLOBAL,
    idMedico, porcentajePCL = '', recomendaciones = '', idConceptoReintegro = DefaultValue.SINREGISTRO_GLOBAL,
    inicioReubicacion = FormatDate(new Date()), finReubicacion = FormatDate(new Date()), descripcion = '', idTipoHorario = DefaultValue.SINREGISTRO_GLOBAL,
    idOrdenadoPorHorario = DefaultValue.SINREGISTRO_GLOBAL, fechaInicioHorario = FormatDate(new Date()), fechaFinHorario = FormatDate(new Date()),
    idEstadoCaso = DefaultValue.SINREGISTRO_GLOBAL, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
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