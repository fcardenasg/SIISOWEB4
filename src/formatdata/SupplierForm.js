import { DefaultValue } from "components/helpers/Enums";

export function PostSupplier(codiProv, nombProv, teleProv = "", emaiProv = "", contaProv = "", ciudProv = DefaultValue.SINREGISTRO_GLOBAL,
    tipoProv, direProv, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico, estadoCampania) {
    return {
        codiProv, nombProv, teleProv, emaiProv, contaProv, ciudProv, tipoProv, direProv,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico, estadoCampania
    };
}

export function PutSupplier(codiProv, nombProv, teleProv = "", emaiProv = "", contaProv = "", ciudProv = DefaultValue.SINREGISTRO_GLOBAL,
    tipoProv, direProv, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico, estadoCampania) {
    return {
        codiProv, nombProv, teleProv, emaiProv, contaProv, ciudProv, tipoProv, direProv,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico, estadoCampania
    };
}