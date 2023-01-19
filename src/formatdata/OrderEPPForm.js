import { DefaultValue } from "components/helpers/Enums";

export function PostOrderEPP(documento, fecha, idProvedor,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        documento, fecha, idProvedor,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutOrderEPP(idOrdenesEpp, documento, fecha, idProvedor,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        idOrdenesEpp, documento, fecha, idProvedor,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}