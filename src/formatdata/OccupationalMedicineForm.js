import { DefaultValue } from "components/helpers/Enums";

export function PostOccupationalMedicine(cedula, resumenCaso = DefaultValue.SINREGISTRO_GLOBAL, fechaRetiro, segmentoAgrupado = DefaultValue.SINREGISTRO_GLOBAL,
    segmentoAfectado = DefaultValue.SINREGISTRO_GLOBAL, subsegmento = DefaultValue.SINREGISTRO_GLOBAL, codDx = '', nroFurel = '',
    regionInfoLaboral = DefaultValue.SINREGISTRO_GLOBAL, lateralidad = DefaultValue.SINREGISTRO_GLOBAL, entidadQueMotivaEnvio = DefaultValue.SINREGISTRO_GLOBAL,
    entidadDondeEnvia = DefaultValue.SINREGISTRO_GLOBAL, fechaEntrega, fechaEnvio, investigado = DefaultValue.SINREGISTRO_GLOBAL, observaciones = '',
    fechaCalificacionEps, origenEps = DefaultValue.SINREGISTRO_GLOBAL, noSolicitudARL = '', fechaCalifiOrigenARL, origenARL = DefaultValue.SINREGISTRO_GLOBAL,
    fechaCalificacionPclARL, pclARL = 0, fechaEstructuraARL, fechaRecalificacionPclARL, pclRecalificadaARL = 0, fechaEstructuraRecalificadaARL, fechaCalificaOrigenJRC,
    juntaCalifica = DefaultValue.SINREGISTRO_GLOBAL, noDictamenJRC = '', origenJRC = DefaultValue.SINREGISTRO_GLOBAL, controversia = '', conclusion = '',
    fechaCalificacionPclJRC, noDictamenPclJRC = '', pclJRC = 0, fechaEstructuraPclJRC, noActaRecursoJRC = '', fechaRecalificacionPclJRC,
    noDictamenRecalificacionJRC = 0, juntaReCalificacionJRC = 0, pclRecalificadaJRC = 0, fechaRecalificacionEstJRC, fechaCalificaOrigenJNC, noDictamenJNC = '',
    origenJNC = DefaultValue.SINREGISTRO_GLOBAL, fechaCalificacionPclJNC, noDictamenPclJNC = '', pclJNC = 0, fechaEstructuraJNC, fechaRecalificacionPclJNC,
    noDictamenRecalificacionJNC = '', pclRecalificacionJNC = 0, origenInstaFinal = DefaultValue.SINREGISTRO_GLOBAL, fechaEstructuracionOrigenInstaFinal,
    instanciaOrigenInstaFinal = DefaultValue.SINREGISTRO_GLOBAL, pclFinalInstaFinal = 0, instanciaFinal = 0, fechaCalificacionPclInstFinal,
    fechaEstructuracionPclInstFinal, indemnizado = DefaultValue.SINREGISTRO_GLOBAL, fechaPagoInstaFinal, entregadoMin = DefaultValue.SINREGISTRO_GLOBAL,
    indemnizadoRecalificado = DefaultValue.SINREGISTRO_GLOBAL, fechaPagoRecalificadoInstaFinal, estadoRHT = '', reintegro = '', reubicado = '', restringido = '',
    jornadaLaboral = '', indemnizacion = '', sede = DefaultValue.SINREGISTRO_GLOBAL, usuario = '', usuarioReporte = '', fechaSistema, fechaInforme, fechaReporte,
    fechaSistemaReporte, edadCalificado, antiguedadCalificado, urlDocumento = urlDocumento === null ? '' : urlDocumento) {
    return {
        cedula, resumenCaso, fechaRetiro, segmentoAgrupado, segmentoAfectado, subsegmento,
        codDx, nroFurel, regionInfoLaboral, lateralidad, entidadQueMotivaEnvio, entidadDondeEnvia, fechaEntrega, fechaEnvio, investigado,
        observaciones, fechaCalificacionEps, origenEps, noSolicitudARL, fechaCalifiOrigenARL, origenARL, fechaCalificacionPclARL, pclARL,
        fechaEstructuraARL, fechaRecalificacionPclARL, pclRecalificadaARL, fechaEstructuraRecalificadaARL, fechaCalificaOrigenJRC, juntaCalifica,
        noDictamenJRC, origenJRC, controversia, conclusion, fechaCalificacionPclJRC, noDictamenPclJRC, pclJRC, fechaEstructuraPclJRC,
        noActaRecursoJRC, fechaRecalificacionPclJRC, noDictamenRecalificacionJRC, juntaReCalificacionJRC, pclRecalificadaJRC,
        fechaRecalificacionEstJRC, fechaCalificaOrigenJNC, noDictamenJNC, origenJNC, fechaCalificacionPclJNC, noDictamenPclJNC,
        pclJNC, fechaEstructuraJNC, fechaRecalificacionPclJNC, noDictamenRecalificacionJNC, pclRecalificacionJNC, origenInstaFinal,
        fechaEstructuracionOrigenInstaFinal, instanciaOrigenInstaFinal, pclFinalInstaFinal, instanciaFinal, fechaCalificacionPclInstFinal,
        fechaEstructuracionPclInstFinal, indemnizado, fechaPagoInstaFinal, entregadoMin, indemnizadoRecalificado, fechaPagoRecalificadoInstaFinal,
        estadoRHT, reintegro, reubicado, restringido, jornadaLaboral, indemnizacion, sede, usuario, usuarioReporte, fechaSistema, fechaInforme,
        fechaReporte, fechaSistemaReporte, edadCalificado, antiguedadCalificado, urlDocumento
    };
}

export function PutOccupationalMedicine(id, cedula, resumenCaso = DefaultValue.SINREGISTRO_GLOBAL, fechaRetiro, segmentoAgrupado = DefaultValue.SINREGISTRO_GLOBAL,
    segmentoAfectado = DefaultValue.SINREGISTRO_GLOBAL, subsegmento = DefaultValue.SINREGISTRO_GLOBAL, codDx = '', nroFurel = '', regionInfoLaboral = DefaultValue.SINREGISTRO_GLOBAL,
    lateralidad = DefaultValue.SINREGISTRO_GLOBAL, entidadQueMotivaEnvio = DefaultValue.SINREGISTRO_GLOBAL, entidadDondeEnvia = DefaultValue.SINREGISTRO_GLOBAL, fechaEntrega,
    fechaEnvio, investigado = DefaultValue.SINREGISTRO_GLOBAL, observaciones = '', fechaCalificacionEps, origenEps = DefaultValue.SINREGISTRO_GLOBAL, noSolicitudARL = '',
    fechaCalifiOrigenARL, origenARL = DefaultValue.SINREGISTRO_GLOBAL, fechaCalificacionPclARL, pclARL = 0,
    fechaEstructuraARL, fechaRecalificacionPclARL, pclRecalificadaARL = 0, fechaEstructuraRecalificadaARL, fechaCalificaOrigenJRC, juntaCalifica = DefaultValue.SINREGISTRO_GLOBAL,
    noDictamenJRC = '', origenJRC = DefaultValue.SINREGISTRO_GLOBAL, controversia = '', conclusion = '', fechaCalificacionPclJRC, noDictamenPclJRC = '', pclJRC = 0, fechaEstructuraPclJRC,
    noActaRecursoJRC = '', fechaRecalificacionPclJRC, noDictamenRecalificacionJRC = 0, juntaReCalificacionJRC = 0, pclRecalificadaJRC = 0,
    fechaRecalificacionEstJRC, fechaCalificaOrigenJNC, noDictamenJNC = '', origenJNC = DefaultValue.SINREGISTRO_GLOBAL, fechaCalificacionPclJNC, noDictamenPclJNC = '',
    pclJNC = 0, fechaEstructuraJNC, fechaRecalificacionPclJNC, noDictamenRecalificacionJNC = '', pclRecalificacionJNC = 0, origenInstaFinal = DefaultValue.SINREGISTRO_GLOBAL,
    fechaEstructuracionOrigenInstaFinal, instanciaOrigenInstaFinal = DefaultValue.SINREGISTRO_GLOBAL, pclFinalInstaFinal = 0, instanciaFinal = 0, fechaCalificacionPclInstFinal,
    fechaEstructuracionPclInstFinal, indemnizado = DefaultValue.SINREGISTRO_GLOBAL, fechaPagoInstaFinal, entregadoMin = DefaultValue.SINREGISTRO_GLOBAL, indemnizadoRecalificado = DefaultValue.SINREGISTRO_GLOBAL,
    fechaPagoRecalificadoInstaFinal, estadoRHT = '', reintegro = '', reubicado = '', restringido = '', jornadaLaboral = '', indemnizacion = '', sede = DefaultValue.SINREGISTRO_GLOBAL,
    usuario = '', usuarioReporte = '', fechaSistema, fechaInforme, fechaReporte, fechaSistemaReporte, edadCalificado, antiguedadCalificado, urlDocumento = urlDocumento === null ? '' : urlDocumento) {
    return {
        id, cedula, resumenCaso, fechaRetiro, segmentoAgrupado, segmentoAfectado, subsegmento,
        codDx, nroFurel, regionInfoLaboral, lateralidad, entidadQueMotivaEnvio, entidadDondeEnvia, fechaEntrega, fechaEnvio, investigado,
        observaciones, fechaCalificacionEps, origenEps, noSolicitudARL, fechaCalifiOrigenARL, origenARL, fechaCalificacionPclARL, pclARL,
        fechaEstructuraARL, fechaRecalificacionPclARL, pclRecalificadaARL, fechaEstructuraRecalificadaARL, fechaCalificaOrigenJRC, juntaCalifica,
        noDictamenJRC, origenJRC, controversia, conclusion, fechaCalificacionPclJRC, noDictamenPclJRC, pclJRC, fechaEstructuraPclJRC,
        noActaRecursoJRC, fechaRecalificacionPclJRC, noDictamenRecalificacionJRC, juntaReCalificacionJRC, pclRecalificadaJRC,
        fechaRecalificacionEstJRC, fechaCalificaOrigenJNC, noDictamenJNC, origenJNC, fechaCalificacionPclJNC, noDictamenPclJNC,
        pclJNC, fechaEstructuraJNC, fechaRecalificacionPclJNC, noDictamenRecalificacionJNC, pclRecalificacionJNC, origenInstaFinal,
        fechaEstructuracionOrigenInstaFinal, instanciaOrigenInstaFinal, pclFinalInstaFinal, instanciaFinal, fechaCalificacionPclInstFinal,
        fechaEstructuracionPclInstFinal, indemnizado, fechaPagoInstaFinal, entregadoMin, indemnizadoRecalificado, fechaPagoRecalificadoInstaFinal,
        estadoRHT, reintegro, reubicado, restringido, jornadaLaboral, indemnizacion, sede, usuario, usuarioReporte, fechaSistema, fechaInforme,
        fechaReporte, fechaSistemaReporte, edadCalificado, antiguedadCalificado, urlDocumento
    };
}