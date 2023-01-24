import { DefaultValue } from "components/helpers/Enums";

export function PostAccidentRate(fecha, documento, idClaseAT = DefaultValue.SINREGISTRO_GLOBAL, idCausaAT = DefaultValue.SINREGISTRO_GLOBAL,
    idSegmentoAgrupado = DefaultValue.SINREGISTRO_GLOBAL, idSegmentoAfectado = DefaultValue.SINREGISTRO_GLOBAL,
    idSubsegmento = DefaultValue.SINREGISTRO_GLOBAL, idSubTipoConsecuencia = DefaultValue.SINREGISTRO_GLOBAL, diagnosticoInicial = '',
    diagnosticoFinal = '', idParaclinicos = DefaultValue.SINREGISTRO_GLOBAL, idConceptoActitudSFI = DefaultValue.SINREGISTRO_GLOBAL,
    idConceptoActitudSFF = DefaultValue.SINREGISTRO_GLOBAL, diasTw = 0, diasIncapacidad = 0, idStatus = DefaultValue.SINREGISTRO_GLOBAL, url = url === null ? '' : url,
    seguimiento = '', idRemitido = DefaultValue.SINREGISTRO_GLOBAL, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        fecha, documento, idClaseAT, idCausaAT, idSegmentoAgrupado, idSegmentoAfectado,
        idSubsegmento, idSubTipoConsecuencia, diagnosticoInicial, diagnosticoFinal, idParaclinicos, idConceptoActitudSFI,
        idConceptoActitudSFF, diasTw, diasIncapacidad, idStatus, url, seguimiento, idRemitido, usuarioRegistro,
        fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutAccidentRate(id, fecha, documento, idClaseAT = DefaultValue.SINREGISTRO_GLOBAL, idCausaAT = DefaultValue.SINREGISTRO_GLOBAL,
    idSegmentoAgrupado = DefaultValue.SINREGISTRO_GLOBAL, idSegmentoAfectado = DefaultValue.SINREGISTRO_GLOBAL,
    idSubsegmento = DefaultValue.SINREGISTRO_GLOBAL, idSubTipoConsecuencia = DefaultValue.SINREGISTRO_GLOBAL, diagnosticoInicial = '',
    diagnosticoFinal = '', idParaclinicos = DefaultValue.SINREGISTRO_GLOBAL, idConceptoActitudSFI = DefaultValue.SINREGISTRO_GLOBAL,
    idConceptoActitudSFF = DefaultValue.SINREGISTRO_GLOBAL, diasTw = 0, diasIncapacidad = 0, idStatus = DefaultValue.SINREGISTRO_GLOBAL, url = '',
    seguimiento = '', idRemitido = DefaultValue.SINREGISTRO_GLOBAL, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, fecha, documento, idClaseAT, idCausaAT, idSegmentoAgrupado, idSegmentoAfectado,
        idSubsegmento, idSubTipoConsecuencia, diagnosticoInicial, diagnosticoFinal, idParaclinicos, idConceptoActitudSFI,
        idConceptoActitudSFF, diasTw, diasIncapacidad, idStatus, url, seguimiento, idRemitido, usuarioRegistro,
        fechaRegistro, usuarioModifico, fechaModifico
    };
}