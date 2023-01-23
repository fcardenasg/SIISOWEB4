import { DefaultValue } from "components/helpers/Enums";

export function PostConceptofAptitude(idConcepto, documento, fecha,
    idConceptoActitud,observacionesNEMTA,usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
       idConcepto, documento, fecha,
        idConceptoActitud,observacionesNEMTA,usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutConceptofAptitude(idTrabajoenAltura, idConcepto, documento, fecha,
    idConceptoActitud,observacionesNEMTA,usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        idTrabajoenAltura, idConcepto, documento, fecha,
        idConceptoActitud,observacionesNEMTA,usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

