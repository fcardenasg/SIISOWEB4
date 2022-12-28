import { DefaultValue } from "components/helpers/Enums";

export function PostMedicalFormula(fecha, documento, idContingencia = DefaultValue.SINREGISTRO_GLOBAL, numeroHistoria = 0,
    idTipoRemision = DefaultValue.SINREGISTRO_GLOBAL, diagnostico = "", descripcion = "", medico = "",
    usuarioRegistro = "", fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        fecha, documento, idContingencia, numeroHistoria,
        idTipoRemision, diagnostico, descripcion, medico, usuarioRegistro, fechaRegistro,
        usuarioModifico, fechaModifico
    };
}

export function PutMedicalFormula(idRecetario, fecha, documento, idContingencia = DefaultValue.SINREGISTRO_GLOBAL, numeroHistoria = 0,
    idTipoRemision = DefaultValue.SINREGISTRO_GLOBAL, diagnostico = "", descripcion = "", medico = "", usuarioRegistro = "",
    fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        idRecetario, fecha, documento, idContingencia, numeroHistoria,
        idTipoRemision, diagnostico, descripcion, medico, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}