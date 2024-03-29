import { DefaultValue } from "components/helpers/Enums";
import { FormatDate } from "components/helpers/Format";

export function PostParaclinics(idTipoParaclinico = "", documento = "", fecha = FormatDate(new Date()), idMotivo = DefaultValue.SINREGISTRO_GLOBAL,
    idConductaClasificacion = DefaultValue.SINREGISTRO_GLOBAL, idConclusion = DefaultValue.SINREGISTRO_GLOBAL, idProveedor = "", observacion = "",
    idRecomendaciones = DefaultValue.SINREGISTRO_GLOBAL, ojoDerecho = "", dxDerecho = "", ojoIzquierdo = "", dxIzquierdo = "", add1 = "", idLecturaAdd = "",
    idControl = "", remitidoOftalmo = false, requiereLentes = false, dxDiagnostico = "", idTipoEPP = DefaultValue.SINREGISTRO_GLOBAL, fvc = "", feV1 = "",
    fevfvc = "", feV2575 = "", pef = "", resultado = DefaultValue.SINREGISTRO_GLOBAL, resultadoColesterol = "", interpretacionColeste = DefaultValue.SINREGISTRO_GLOBAL,
    observacionColeste = "", resultadoColesteHDL = "", interpretacionColesteHDL = DefaultValue.SINREGISTRO_GLOBAL, observacionColesteHDL = "", dislipidemiaHDL = false,
    resultadoTrigli = "", interpretacionTrigli = DefaultValue.SINREGISTRO_GLOBAL, observacionTrigli = "", resultadoGlicemia = "",
    interpretacionGlicemia = DefaultValue.SINREGISTRO_GLOBAL, observacionGlicemia = "", resultadoCreatinina = "",
    interpretacionCreatinina = DefaultValue.SINREGISTRO_GLOBAL,
    observacionCreatinina = "", resultadoBUN = "", interpretacionBUN = DefaultValue.SINREGISTRO_GLOBAL, observacionBUN = "",
    idParcialOrina = DefaultValue.SINREGISTRO_GLOBAL, observacionParcialOrina = "", hemograma = DefaultValue.SINREGISTRO_GLOBAL, observacionHemograma = "",
    gpt = DefaultValue.SINREGISTRO_GLOBAL, observacionGPT = "", got = DefaultValue.SINREGISTRO_GLOBAL, observacionGOT = "",
    bilirrubina = DefaultValue.SINREGISTRO_GLOBAL, observacionBilirrubina = "", bilirrubinaDirecta = DefaultValue.SINREGISTRO_GLOBAL,
    observacionBilirrubinaDirecta = "", otalgiaAOP = false, otorreaAOP = false, otitisAOP = false, acufenosAOP = false, cirugiaAOP = false, vertigoAOP = false,
    farmacologicosAOP = false, luritoAOP = false, familiaresAOP = false, paralisisAOP = false, htaaop = false, tipoAcusiaAOP = false, diabetesAOP = false,
    expoRuidoAOP = false, anteceTraumaticosAOP = false, observacionAOP = "",

    idEmpresaAO = DefaultValue.SINREGISTRO_GLOBAL, 
    
    idCargoAO = DefaultValue.SINREGISTRO_GLOBAL, tiempoExpoAO = "", idProteccionAuditivaAO = DefaultValue.SINREGISTRO_GLOBAL,
    idSuministradaPorAO = DefaultValue.SINREGISTRO_GLOBAL, idUsoAO = DefaultValue.SINREGISTRO_GLOBAL, idOdcaeAUDIO = DefaultValue.SINREGISTRO_GLOBAL,
    idOdmtAUDIO = DefaultValue.SINREGISTRO_GLOBAL, idOicaeAUDIO = DefaultValue.SINREGISTRO_GLOBAL, idOimtAUDIO = DefaultValue.SINREGISTRO_GLOBAL,
    
    idReposoAUDIO = false, dxAUDIO = "", idConductaAUDIO = DefaultValue.SINREGISTRO_GLOBAL, idCambioEPP = false, observacionAUDIO = "", url = "",
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        idTipoParaclinico, documento, fecha, idMotivo, idConductaClasificacion,
        idConclusion, idProveedor, observacion, idRecomendaciones, ojoDerecho, dxDerecho, ojoIzquierdo,
        dxIzquierdo, add1, idLecturaAdd, idControl, remitidoOftalmo, requiereLentes, dxDiagnostico,
        idTipoEPP, fvc, feV1, fevfvc, feV2575, pef, resultado, resultadoColesterol, interpretacionColeste,
        observacionColeste, resultadoColesteHDL, interpretacionColesteHDL,
        observacionColesteHDL, dislipidemiaHDL, resultadoTrigli, interpretacionTrigli, observacionTrigli,
        resultadoGlicemia, interpretacionGlicemia, observacionGlicemia, resultadoCreatinina, interpretacionCreatinina,
        observacionCreatinina, resultadoBUN, interpretacionBUN, observacionBUN, idParcialOrina, observacionParcialOrina,
        hemograma, observacionHemograma, gpt, observacionGPT, got, observacionGOT, bilirrubina, observacionBilirrubina,
        bilirrubinaDirecta, observacionBilirrubinaDirecta, otalgiaAOP, otorreaAOP, otitisAOP, acufenosAOP, cirugiaAOP, vertigoAOP,
        farmacologicosAOP, luritoAOP, familiaresAOP, paralisisAOP, htaaop, tipoAcusiaAOP, diabetesAOP, expoRuidoAOP, anteceTraumaticosAOP, observacionAOP,
        idEmpresaAO, idCargoAO, tiempoExpoAO, idProteccionAuditivaAO, idSuministradaPorAO, idUsoAO, idOdcaeAUDIO, idOdmtAUDIO, idOicaeAUDIO, idOimtAUDIO,
        idReposoAUDIO, dxAUDIO, idConductaAUDIO, idCambioEPP, observacionAUDIO, url, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}

export function PutParaclinics(id, idTipoParaclinico = "", documento = "", fecha = FormatDate(new Date()), idMotivo = DefaultValue.SINREGISTRO_GLOBAL,
    idConductaClasificacion = DefaultValue.SINREGISTRO_GLOBAL, idConclusion = DefaultValue.SINREGISTRO_GLOBAL, idProveedor = "", observacion = "",
    idRecomendaciones = DefaultValue.SINREGISTRO_GLOBAL, ojoDerecho = "", dxDerecho = "", ojoIzquierdo = "", dxIzquierdo = "", add1 = "", idLecturaAdd = "",
    idControl = "", remitidoOftalmo = false, requiereLentes = false, dxDiagnostico = "", idTipoEPP = DefaultValue.SINREGISTRO_GLOBAL, fvc = "", feV1 = "",
    fevfvc = "", feV2575 = "", pef = "", resultado = DefaultValue.SINREGISTRO_GLOBAL, resultadoColesterol = "", interpretacionColeste = DefaultValue.SINREGISTRO_GLOBAL,
    observacionColeste = "", resultadoColesteHDL = "", interpretacionColesteHDL = DefaultValue.SINREGISTRO_GLOBAL, observacionColesteHDL = "", dislipidemiaHDL = false,
    resultadoTrigli = "", interpretacionTrigli = DefaultValue.SINREGISTRO_GLOBAL, observacionTrigli = "", resultadoGlicemia = "",
    interpretacionGlicemia = DefaultValue.SINREGISTRO_GLOBAL, observacionGlicemia = "", resultadoCreatinina = "",
    interpretacionCreatinina = DefaultValue.SINREGISTRO_GLOBAL,
    observacionCreatinina = "", resultadoBUN = "", interpretacionBUN = DefaultValue.SINREGISTRO_GLOBAL, observacionBUN = "",
    idParcialOrina = DefaultValue.SINREGISTRO_GLOBAL, observacionParcialOrina = "", hemograma = DefaultValue.SINREGISTRO_GLOBAL, observacionHemograma = "",
    gpt = DefaultValue.SINREGISTRO_GLOBAL, observacionGPT = "", got = DefaultValue.SINREGISTRO_GLOBAL, observacionGOT = "",
    bilirrubina = DefaultValue.SINREGISTRO_GLOBAL, observacionBilirrubina = "", bilirrubinaDirecta = DefaultValue.SINREGISTRO_GLOBAL,
    observacionBilirrubinaDirecta = "", otalgiaAOP = false, otorreaAOP = false, otitisAOP = false, acufenosAOP = false, cirugiaAOP = false, vertigoAOP = false,
    farmacologicosAOP = false, luritoAOP = false, familiaresAOP = false, paralisisAOP = false, htaaop = false, tipoAcusiaAOP = false, diabetesAOP = false,
    expoRuidoAOP = false, anteceTraumaticosAOP = false, observacionAOP = "",
    idEmpresaAO = DefaultValue.SINREGISTRO_GLOBAL, idCargoAO = DefaultValue.SINREGISTRO_GLOBAL, tiempoExpoAO = "", idProteccionAuditivaAO = DefaultValue.SINREGISTRO_GLOBAL,
    idSuministradaPorAO = DefaultValue.SINREGISTRO_GLOBAL, idUsoAO = DefaultValue.SINREGISTRO_GLOBAL, idOdcaeAUDIO = DefaultValue.SINREGISTRO_GLOBAL,
    idOdmtAUDIO = DefaultValue.SINREGISTRO_GLOBAL, idOicaeAUDIO = DefaultValue.SINREGISTRO_GLOBAL, idOimtAUDIO = DefaultValue.SINREGISTRO_GLOBAL,
    idReposoAUDIO = false, dxAUDIO = "", idConductaAUDIO = DefaultValue.SINREGISTRO_GLOBAL, idCambioEPP = false, observacionAUDIO = "", url = "",
    usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, idTipoParaclinico, documento, fecha, idMotivo, idConductaClasificacion,
        idConclusion, idProveedor, observacion, idRecomendaciones, ojoDerecho, dxDerecho, ojoIzquierdo,
        dxIzquierdo, add1, idLecturaAdd, idControl, remitidoOftalmo, requiereLentes, dxDiagnostico,
        idTipoEPP, fvc, feV1, fevfvc, feV2575, pef, resultado, resultadoColesterol, interpretacionColeste,
        observacionColeste, resultadoColesteHDL, interpretacionColesteHDL,
        observacionColesteHDL, dislipidemiaHDL, resultadoTrigli, interpretacionTrigli, observacionTrigli,
        resultadoGlicemia, interpretacionGlicemia, observacionGlicemia, resultadoCreatinina, interpretacionCreatinina,
        observacionCreatinina, resultadoBUN, interpretacionBUN, observacionBUN, idParcialOrina, observacionParcialOrina,
        hemograma, observacionHemograma, gpt, observacionGPT, got, observacionGOT, bilirrubina, observacionBilirrubina,
        bilirrubinaDirecta, observacionBilirrubinaDirecta, otalgiaAOP, otorreaAOP, otitisAOP, acufenosAOP, cirugiaAOP, vertigoAOP,
        farmacologicosAOP, luritoAOP, familiaresAOP, paralisisAOP, htaaop, tipoAcusiaAOP, diabetesAOP, expoRuidoAOP, anteceTraumaticosAOP, observacionAOP,
        idEmpresaAO, idCargoAO, tiempoExpoAO, idProteccionAuditivaAO, idSuministradaPorAO, idUsoAO, idOdcaeAUDIO, idOdmtAUDIO, idOicaeAUDIO, idOimtAUDIO,
        idReposoAUDIO, dxAUDIO, idConductaAUDIO, idCambioEPP, observacionAUDIO, url, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}