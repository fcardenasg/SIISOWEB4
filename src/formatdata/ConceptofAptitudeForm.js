import { DefaultValue } from "components/helpers/Enums";

export function PostConceptofAptitude(idConcepto = DefaultValue.SINREGISTRO_GLOBAL, documento, fecha,
    idConceptoActitud = DefaultValue.SINREGISTRO_GLOBAL, observacionesNEMTA = "", idMedico, usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        idConcepto, documento, fecha, idConceptoActitud, observacionesNEMTA, idMedico, usuarioRegistro,
        fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutConceptofAptitude(idTrabajoenAltura, idConcepto = DefaultValue.SINREGISTRO_GLOBAL, documento, fecha,
    idConceptoActitud = DefaultValue.SINREGISTRO_GLOBAL, observacionesNEMTA, idMedico, usuarioRegistro,
    fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        idTrabajoenAltura, idConcepto, documento, fecha, idConceptoActitud, idMedico, observacionesNEMTA,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

