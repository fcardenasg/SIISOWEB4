import { DefaultValue } from 'components/helpers/Enums';

export function PostAlcoholAndDrugTesting(documento, fecha, idRegistroAtencion = DefaultValue.SINREGISTRO_GLOBAL,
    idMotivoPrueba = DefaultValue.SINREGISTRO_GLOBAL, sustancia1 = false,
    idMuestra1 = DefaultValue.SINREGISTRO_GLOBAL, idResultado1 = DefaultValue.SINREGISTRO_GLOBAL, sustancia2 = false,
    idMuestra2 = DefaultValue.SINREGISTRO_GLOBAL,
    idResultado2 = DefaultValue.SINREGISTRO_GLOBAL, sustancia3 = false, idMuestra3 = DefaultValue.SINREGISTRO_GLOBAL,
    idResultado3 = DefaultValue.SINREGISTRO_GLOBAL,
    sustancia4 = false, idMuestra4 = DefaultValue.SINREGISTRO_GLOBAL, idResultado4 = DefaultValue.SINREGISTRO_GLOBAL,
    sustancia5 = false, idMuestra5 = DefaultValue.SINREGISTRO_GLOBAL, idResultado5 = DefaultValue.SINREGISTRO_GLOBAL,
    sustancia6 = false, idMuestra6 = DefaultValue.SINREGISTRO_GLOBAL, idResultado6 = DefaultValue.SINREGISTRO_GLOBAL,
    idRemitido = DefaultValue.SINREGISTRO_GLOBAL, idDocumentoSolicitante = '', idNumeroHistoria = 0,
    idConcepto = DefaultValue.SINREGISTRO_GLOBAL,
    idRealizada = DefaultValue.SINREGISTRO_GLOBAL, idMotivoAsis = DefaultValue.SINREGISTRO_GLOBAL, observaciones, 
    idMedico,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        documento, fecha, idRegistroAtencion, idMotivoPrueba, sustancia1,
        idMuestra1, idResultado1, sustancia2, idMuestra2, idResultado2, sustancia3, idMuestra3,
        idResultado3, sustancia4, idMuestra4, idResultado4, sustancia5, idMuestra5, idResultado5,
        sustancia6, idMuestra6, idResultado6, idRemitido, idDocumentoSolicitante, idNumeroHistoria, idConcepto,
        idRealizada, idMotivoAsis, observaciones, idMedico,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutAlcoholAndDrugTesting(idPruebasAlcoholDroga, documento, fecha, idRegistroAtencion, idMotivoPrueba = DefaultValue.SINREGISTRO_GLOBAL, sustancia1 = false,
    idMuestra1 = DefaultValue.SINREGISTRO_GLOBAL, idResultado1 = DefaultValue.SINREGISTRO_GLOBAL, sustancia2 = false, idMuestra2 = DefaultValue.SINREGISTRO_GLOBAL,
    idResultado2 = DefaultValue.SINREGISTRO_GLOBAL, sustancia3 = false, idMuestra3 = DefaultValue.SINREGISTRO_GLOBAL,
    idResultado3 = DefaultValue.SINREGISTRO_GLOBAL, sustancia4 = false, idMuestra4 = DefaultValue.SINREGISTRO_GLOBAL, idResultado4 = DefaultValue.SINREGISTRO_GLOBAL,
    sustancia5 = false, idMuestra5 = DefaultValue.SINREGISTRO_GLOBAL, idResultado5 = DefaultValue.SINREGISTRO_GLOBAL,
    sustancia6 = false, idMuestra6 = DefaultValue.SINREGISTRO_GLOBAL, idResultado6 = DefaultValue.SINREGISTRO_GLOBAL, idRemitido = DefaultValue.SINREGISTRO_GLOBAL,
    idDocumentoSolicitante, idNumeroHistoria = DefaultValue.SINREGISTRO_GLOBAL, idConcepto = DefaultValue.SINREGISTRO_GLOBAL,
    idRealizada = DefaultValue.SINREGISTRO_GLOBAL, idMotivoAsis = DefaultValue.SINREGISTRO_GLOBAL, observaciones, idMedico,
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        idPruebasAlcoholDroga, documento, fecha, idRegistroAtencion, idMotivoPrueba, sustancia1,
        idMuestra1, idResultado1, sustancia2, idMuestra2, idResultado2, sustancia3, idMuestra3,
        idResultado3, sustancia4, idMuestra4, idResultado4, sustancia5, idMuestra5, idResultado5,
        sustancia6, idMuestra6, idResultado6, idRemitido, idDocumentoSolicitante, idNumeroHistoria, idConcepto,
        idRealizada, idMotivoAsis, observaciones, idMedico,
        usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}



