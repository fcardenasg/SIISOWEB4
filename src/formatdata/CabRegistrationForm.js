import { DefaultValue } from "components/helpers/Enums";

export function PostCabRegistration(documento, fecha, diagnostico,
    motivoTraslado,idContingencia,idRuta,idDestino,nroTaxi,idCargadoa,idCupo,idMedico,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        documento, fecha, diagnostico,
        motivoTraslado,idContingencia,idRuta,idDestino,nroTaxi,idCargadoa,idCupo,idMedico,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutCabRegistration(idRegistroTaxi, documento, fecha, diagnostico,
    motivoTraslado,idContingencia,idRuta,idDestino,nroTaxi,idCargadoa,idCupo,idMedico,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        idRegistroTaxi, documento, fecha, diagnostico,
    motivoTraslado,idContingencia,idRuta,idDestino,nroTaxi,idCargadoa,idCupo,idMedico,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}






