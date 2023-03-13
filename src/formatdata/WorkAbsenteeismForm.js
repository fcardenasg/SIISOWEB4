import { DefaultValue } from "components/helpers/Enums";

export function PostWorkAbsenteeism(cedula, incapacidad = DefaultValue.SINREGISTRO_GLOBAL, nroIncapacidad = 0, fechaExpedicion,
    departamento = DefaultValue.SINREGISTRO_GLOBAL, ciudadExpedicion = DefaultValue.SINREGISTRO_GLOBAL, tipoIncapacidad = DefaultValue.SINREGISTRO_GLOBAL,
    contingencia = DefaultValue.SINREGISTRO_GLOBAL, fechaInicio, fechaFin, diasSinLaborar = 0, dx = '', dxFinal = '', estadoCaso = DefaultValue.SINREGISTRO_GLOBAL,
    segmentoAgrupado = DefaultValue.SINREGISTRO_GLOBAL, segmentoAfectado = DefaultValue.SINREGISTRO_GLOBAL, subsegmento = DefaultValue.SINREGISTRO_GLOBAL,
    idTipoSoporte = DefaultValue.SINREGISTRO_GLOBAL, idCategoria = DefaultValue.SINREGISTRO_GLOBAL,

    proveedor = '', departamentoIPS = DefaultValue.SINREGISTRO_GLOBAL, ciudadIPS = DefaultValue.SINREGISTRO_GLOBAL, nombreProfesional = '', especialidad = '',
    registroProfesional = '', tipoAtencion = DefaultValue.SINREGISTRO_GLOBAL, cumplimientoRequisito = DefaultValue.SINREGISTRO_GLOBAL,
    expideInCapacidad = DefaultValue.SINREGISTRO_GLOBAL, observacionCumplimiento = '',

    observacion = '', usuarioModificacion, fechaModificacion, usuarioRegistro, fechaRegistro,
    tipoEmpleado = DefaultValue.SINREGISTRO_GLOBAL, tipoNomina = DefaultValue.SINREGISTRO_GLOBAL, fechaConfirmacion, usuarioConfirma) {
    return {
        cedula, incapacidad, nroIncapacidad, fechaExpedicion, departamento, ciudadExpedicion,
        tipoIncapacidad, contingencia, fechaInicio, fechaFin, diasSinLaborar, dx, dxFinal, estadoCaso, segmentoAgrupado, segmentoAfectado,
        subsegmento, idTipoSoporte, idCategoria,

        proveedor, departamentoIPS, ciudadIPS, nombreProfesional, especialidad, registroProfesional, tipoAtencion, cumplimientoRequisito,
        expideInCapacidad, observacionCumplimiento,

        observacion, usuarioModificacion, fechaModificacion, usuarioRegistro, fechaRegistro,
        tipoEmpleado, tipoNomina, fechaConfirmacion, usuarioConfirma
    };
}

export function PutWorkAbsenteeism(id_Inc, cedula, incapacidad = DefaultValue.SINREGISTRO_GLOBAL, nroIncapacidad = 0, fechaExpedicion,
    departamento = DefaultValue.SINREGISTRO_GLOBAL, ciudadExpedicion = DefaultValue.SINREGISTRO_GLOBAL, tipoIncapacidad = DefaultValue.SINREGISTRO_GLOBAL,
    contingencia = DefaultValue.SINREGISTRO_GLOBAL, fechaInicio, fechaFin, diasSinLaborar = 0, dx = '', dxFinal = '', estadoCaso = DefaultValue.SINREGISTRO_GLOBAL,
    segmentoAgrupado = DefaultValue.SINREGISTRO_GLOBAL, segmentoAfectado = DefaultValue.SINREGISTRO_GLOBAL, subsegmento = DefaultValue.SINREGISTRO_GLOBAL,
    idTipoSoporte = DefaultValue.SINREGISTRO_GLOBAL, idCategoria = DefaultValue.SINREGISTRO_GLOBAL,

    proveedor = '', departamentoIPS = DefaultValue.SINREGISTRO_GLOBAL, ciudadIPS = DefaultValue.SINREGISTRO_GLOBAL, nombreProfesional = '', especialidad = '',
    registroProfesional = '', tipoAtencion = DefaultValue.SINREGISTRO_GLOBAL, cumplimientoRequisito = DefaultValue.SINREGISTRO_GLOBAL,
    expideInCapacidad = DefaultValue.SINREGISTRO_GLOBAL, observacionCumplimiento = '',

    observacion = '', usuarioModificacion, fechaModificacion, usuarioRegistro, fechaRegistro,
    tipoEmpleado = DefaultValue.SINREGISTRO_GLOBAL, tipoNomina = DefaultValue.SINREGISTRO_GLOBAL, fechaConfirmacion, usuarioConfirma) {
    return {
        id_Inc, cedula, incapacidad, nroIncapacidad, fechaExpedicion, departamento, ciudadExpedicion,
        tipoIncapacidad, contingencia, fechaInicio, fechaFin, diasSinLaborar, dx, dxFinal, estadoCaso, segmentoAgrupado, segmentoAfectado,
        subsegmento, idTipoSoporte, idCategoria,

        proveedor, departamentoIPS, ciudadIPS, nombreProfesional, especialidad, registroProfesional, tipoAtencion, cumplimientoRequisito,
        expideInCapacidad, observacionCumplimiento,

        observacion, usuarioModificacion, fechaModificacion, usuarioRegistro, fechaRegistro,
        tipoEmpleado, tipoNomina, fechaConfirmacion, usuarioConfirma
    };
}