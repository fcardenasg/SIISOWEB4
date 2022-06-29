import { DefaultValue } from 'components/helpers/Enums';
import { FormatDate } from 'components/helpers/Format';

export function PostOccupationalExamination(
    idHistoriaLaboral, documento, fecha, idAtencion, congenitosAP, inmunoPrevenibleAP, infecciososAP,
    ojoAP, agudezaVisualAP, oidosAP, nasoFaringeAP, cardiovascularAP, pulmonarAP, gastrointestinalAP, gimitoUrinarioAP,
    neurologicoAP, transtornoPielAP, osteoMuscularAP, alergicosAP, toxicoAP, faRmacologicosAP, quirurgicosAP,
    traumaticosAP, tranfuccionesAP, etsAP, deformidadesAP, psiquiatricosAP, farmacoDependenciaAP, emAP, renalAP,
    asmaAP, orlAP, cancerAP, especifiqueAP, anioAT, especifiqueAT, anio1AT, especifique1AT, tetanoIM, influenzaIM,
    fiebreAmarillaIM, rubeolaSarampionIM, covid19IM, otrasIM, anioVacuna1IM = 0, anioVacuna2IM = 0, anioVacuna3IM = 0,
    anioVacuna4IM = 0, anioVacuna5IM = 0, anioVacuna6IM = 0, fumaHB, cigarrillosDiasFumaHB, aniosCigaFumaHB, mesesCigaFumaHB,
    observacionFumaHB, fumabaHB, cigarrillosDiasFumabaHB, aniosCigaFumabaHB, mesesCigaFumabaHB, observacionFumabaHB,
    practicaDeporteHB, idFrecuenciaDeporteHB, idCualDeporteHB, observacionPracticaDeporHB, hobbiesPasatiempoHB, cualHobbiesHB,
    consumeBebidasAlcoholicasHB, idFrecuenciaBebidaAlHB, cualBebidasAlHB, fobiasHB, tipoFobiaHB, cualFobiaHB,

    menarquiaGO = 0, idCiclosGO = DefaultValue.SINREGISTRO_GLOBAL, duracionGO = 0, amenoreaGO = false, disminureaGO = false,
    leucoreaGO = false, vidaMaritalGO = 0, vidaObstetricaGO = 0, ggo = 0, pgo = 0, ago = 0, csgo = 0, vgo = 0,
    fupgo = FormatDate(new Date()), furgo = FormatDate(new Date()), etsgo = false, cualgo = DefaultValue.SINREGISTRO_TEXTO,
    quisteOvariosBiomasGO = false, endometriosisGO = false, epigo = false, planificaGO = false,
    idMetodoGO = DefaultValue.SINREGISTRO_GLOBAL, ultimoAnioCitologiaGO = 0, idResultadoGO = DefaultValue.SINREGISTRO_GLOBAL,

    cabezaRS, ojosRS, oidosRS, narizRS, bocaRS, gargantaRS, cuellosRS, cardioRS, gastrointestinalRS,
    genitoUrinarioRS, osteoRS, neuroRS, pielRS, psiquiatricoRS, observacionRS, taSentadoEF, taAcostadoEF, pulsoEF,
    fcef, fref, temperaturaEF, pesoEF, tallaEF, imcef, clasificacionEF, idBiotipoEF, estadoNitricionalEF, pielFaneraEF,
    craneoEF, parpadoEF, conjuntivasEF, corniasEF, pupilasEF, reflejoFotomotorEF, reflejoCornialEF, fondoOjosEF,
    inspeccionEF, otoscopiaEF, inspeccionNarizEF, rinoscopioEF, labiosEF, mucosaEF, enciasEF, paladarEF, dientesEF,
    lenguaEF, faringeEF, amigdalasEF, cuellosEF, inspeccionToraxEF, auscultacionCardiacaEF, auscultacionRespiratoriaEF,
    inspeccionAbdomenEF, palpacionAbdomenEF, exploracionHigadoEF, exploracionVasoEF, exploracionRinionesEF, anillosInguinalesEF,
    anilloUmbilicalEF, genitalesExternosEF, regionAnalEF, tactoRectalEF, tactoVaginalEF, extremidadesSuperioresEF,
    extremidadesInferioresEF, pulsosEF, columnaVertebralEF, articulacionesEF, especifiqueEMEFU, movilidadEFU, equilibrioEFU,
    marchaEFU, movilidadHombroEFU, movilidadCodoEFU, movilidadMuniecaEFU, signoTinelEFU, signoPhalenEFU, movilidadManosEFU,
    movilidadCaderaEFU, movilidadRodillaEFU, movilidadTobilloEFU, movilidadCuelloEFU, rotVisipitalEFU, rotRotuleanoEFU,
    extencionEFU, sensibilidadCaraAnteriorEFU, eversionPiesEFU, sensibilidadCaraLateralEFU, rotAquileanoEFU, signoLasegueEFU,
    indiceWellsEFU, observacionEFU, fechaRxToraxEPA, resultadoRxToraxEPA, observacionesRxToraxEPA, fechaEspirometriaEPA,
    resultadoEspirometriaEPA, observacionesEspirometriaEPA, fechaAudiometriaEPA, resultadoAudiometriaEPA,
    observacionesAudiometriaEPA, fechaVisiometriaEPA, resultadoVisiometriaEPA, observacionesVisiometriaEPA, fechaLaboratorioClinicoEPA,
    resultadoLaboratorioClinicoEPA, observacionesLaboratorioClinicoEPA, fechaCuestionarioSintomaEPA, resultadoCuestionarioSintomaEPA,
    observacionesCuestionarioSintomaEPA, fechaEkgEPA, resultadoEkgEPA, observacionesEkgEPA, fechaRnmLumbosacraEPA, resultadoRnmLumbosacraEPA,
    observacionesRnmLumbosacraEPA, fechaRnmCervicalEPA, resultadoRnmCervicalEPA, observacionesRnmCervicalEPA, observacionEPA,
    dxID, observacionID, recomendacionesID, idConceptoActitudID, fechaConceptoNETA, conceptoAplazadoNETA, conceptoActitudNETA,
    motivoAplazoNETA, descripcionResultadoNETA, recomendacionesNETA, remitidoNETA, remididoDondeNETA, idRiesgoCardiovascularNEMTA,
    idClasificacionNEMTA, idMenorEdadNEMTA, idMujerEmbarazadaNEMTA, idArimiaNEMTA, idEnfermedadNEMTA, idHistoriaNEMTA,
    idHipertensionNEMTA, idHipertrigliceridemiaNEMTA, idCifrasNEMTA, idDiabetesNEMTA, idDislipidemiaNEMTA, idDiagnosticoNEMTA,
    idRiesgoCardiovascular1NEMTA, idRiesgoCardiovascular2NEMTA, idHipertiroidismoNEMTA, idAlteracionAuditivaNEMTA,
    idVertigoAlteracionesNEMTA, idEpilegsiaNEMTA, idCegueraTemporalNEMTA, idHistoriaFobiasNEMTA, idTranstornoPsiquiatricoNEMTA,
    idLimitacionesNEMTA, idObesidadMorbidaNEMTA, idDeformaTemporalNEMTA, idOtrasAlteracionesNEMTA, observacionesNEMTA,
    conceptoActitudMedicoNEMTA, fechaFRA, tencionFRA, idTencionArterialFRA, idAntecedenteCardiovascularFRA, idDeporteFRA,
    idBebidaFRA, fechaLaboratorioFRA, colesterolTotalFRA, hdlfra, triglicericosFRA, idMetabolicoFRA, glisemiaFRA,
    fumaFRA, observacionFRA, ldlfra, relacionFRA, frlEdadFRA, frlColesterolFRA, frhdlfra, frGlisemiaFRA, frTencionFRA, frTabaquismoFRA,
    puntajeFRA, riesgoAbsolutoFRA, riesgoRelativoFRA, interpretacionFRA, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico,

    /* SINTOMAS RESPIRATORIOS */
    tosAUsualSin = false, tosEnLaSemanaSintR = false, tosMananaSintR = false, tosConsecutivaSintR = false, anosConTosSintR = 0, esputoASintR = false,
    esputoBSintR = false, esputoCSintR = false, esputoDSintR = false, esputoESintR = 0, episoTosEspuASintR = false, episoTosEsputoBSintR = 0,
    sibilanciasASintR = false, sibilanciasA1SintR = false, sibilanciasA2SintR = false, sibilanciasA3SintR = false, sibilanciasBSintR = 0, ataquesSilbiASintR = false,
    ataquesSilbiBSintR = 0, ataquesSilbiCSintR = false, ataquesSilbiDSintR = false, otrasEnfInhaASintR = false, otrasEnfInhaBSintR = false,
    otrasEnfInhaDescriSintR, disneaASintR = false, disneaBSintR = false, disneaCSintR = false, disneaDSintR = false, disneaESintR = false,
    enferToraxASintR = false, enferToraxBSintR = false, enferToraxCSintR = false, enferToraxD = 0, antecedentesASintR = false,
    antecedentesB1SintR = false, antecedentesB1ASintR = 0, antecedentesB2Sintr = false, antecedentesB2ASintR = 0, antecedentesB3SintR = false, antecedentesB3ASintR = 0,
    antecedentesB3BSintR = false, antecedentesB3CSintR = 0, antecdentesB4SintR = false, antecedenteB4ASintR = 0, antecedentesB4BSintR = false,
    antecedentesB4CSintR = 0, antecedentesB5SintR = false, antecedentesB5ASintR = 0, antecedentesB5BSintR = false, antecedentesB5CSintR = 0,
    otrasEnfToraxA = false, otrasEnfToraxB, ciruToraxASintR = false, ciruToraxBSintR, traumaToraxASintR = false,
    traumaToraxBSintR, problemCoraASintR = false, problemCoraBSintR, problemaCoraCSintR = false, presionAltaASintR = false, presionAltaBSintR = false,
    historiaOcupASintR = false, historiaOcupBSintR = false, historiaOcupB1SintR, historiaOcupB2SintR = 0, historiaOcupB3SintR = 0, historiaOcupCSintR = false,
    historiaOcupC1SintR, historiaOcupC2SintR = 0, historiaOcupC3SintR = 0, historiaOcupD1SintR, historiaOcupD2SintR = 0, historiaOcupD3,
    tabaquismoASintR = false, tabaquismoBSintR = false, tabaquismoCSintR = 0, tabaquismoDSintR = 0, tabaquismoESintR = 0, actDeportASintR = false, actDeporA1SintR,
    actDeporA2SintR = 0, actDeporA3SintR = 0, actDeporA4SintR = 0, recoSintR, parentesco1ANFA = 0, parentesco1ObserANFA, parentesco2ANFA = 0,
    parentesco2ObserANFA, parentesco3ANFA = 0, parentesco3ObserANFA, parentesco4ANFA = 0, parentesco4ObserANFA,
) {
    return {
        idHistoriaLaboral, documento, fecha, idAtencion, congenitosAP, inmunoPrevenibleAP, infecciososAP,
        ojoAP, agudezaVisualAP, oidosAP, nasoFaringeAP, cardiovascularAP, pulmonarAP, gastrointestinalAP, gimitoUrinarioAP,
        neurologicoAP, transtornoPielAP, osteoMuscularAP, alergicosAP, toxicoAP, faRmacologicosAP, quirurgicosAP,
        traumaticosAP, tranfuccionesAP, etsAP, deformidadesAP, psiquiatricosAP, farmacoDependenciaAP, emAP, renalAP,
        asmaAP, orlAP, cancerAP, especifiqueAP, anioAT, especifiqueAT, anio1AT, especifique1AT, tetanoIM, influenzaIM,
        fiebreAmarillaIM, rubeolaSarampionIM, covid19IM, otrasIM, anioVacuna1IM, anioVacuna2IM, anioVacuna3IM,
        anioVacuna4IM, anioVacuna5IM, anioVacuna6IM, fumaHB, cigarrillosDiasFumaHB, aniosCigaFumaHB, mesesCigaFumaHB,
        observacionFumaHB, fumabaHB, cigarrillosDiasFumabaHB, aniosCigaFumabaHB, mesesCigaFumabaHB, observacionFumabaHB,
        practicaDeporteHB, idFrecuenciaDeporteHB, idCualDeporteHB, observacionPracticaDeporHB, hobbiesPasatiempoHB, cualHobbiesHB,
        consumeBebidasAlcoholicasHB, idFrecuenciaBebidaAlHB, cualBebidasAlHB, fobiasHB, tipoFobiaHB, cualFobiaHB,

        menarquiaGO, idCiclosGO, duracionGO, amenoreaGO, disminureaGO, leucoreaGO, vidaMaritalGO, vidaObstetricaGO,
        ggo, pgo, ago, csgo, vgo, fupgo, furgo, etsgo, cualgo, quisteOvariosBiomasGO, endometriosisGO, epigo,
        planificaGO, idMetodoGO, ultimoAnioCitologiaGO, idResultadoGO,

        cabezaRS, ojosRS, oidosRS, narizRS, bocaRS, gargantaRS, cuellosRS, cardioRS, gastrointestinalRS,
        genitoUrinarioRS, osteoRS, neuroRS, pielRS, psiquiatricoRS, observacionRS, taSentadoEF, taAcostadoEF, pulsoEF,
        fcef, fref, temperaturaEF, pesoEF, tallaEF, imcef, clasificacionEF, idBiotipoEF, estadoNitricionalEF, pielFaneraEF,
        craneoEF, parpadoEF, conjuntivasEF, corniasEF, pupilasEF, reflejoFotomotorEF, reflejoCornialEF, fondoOjosEF,
        inspeccionEF, otoscopiaEF, inspeccionNarizEF, rinoscopioEF, labiosEF, mucosaEF, enciasEF, paladarEF, dientesEF,
        lenguaEF, faringeEF, amigdalasEF, cuellosEF, inspeccionToraxEF, auscultacionCardiacaEF, auscultacionRespiratoriaEF,
        inspeccionAbdomenEF, palpacionAbdomenEF, exploracionHigadoEF, exploracionVasoEF, exploracionRinionesEF, anillosInguinalesEF,
        anilloUmbilicalEF, genitalesExternosEF, regionAnalEF, tactoRectalEF, tactoVaginalEF, extremidadesSuperioresEF,
        extremidadesInferioresEF, pulsosEF, columnaVertebralEF, articulacionesEF, especifiqueEMEFU, movilidadEFU, equilibrioEFU,
        marchaEFU, movilidadHombroEFU, movilidadCodoEFU, movilidadMuniecaEFU, signoTinelEFU, signoPhalenEFU, movilidadManosEFU,
        movilidadCaderaEFU, movilidadRodillaEFU, movilidadTobilloEFU, movilidadCuelloEFU, rotVisipitalEFU, rotRotuleanoEFU,
        extencionEFU, sensibilidadCaraAnteriorEFU, eversionPiesEFU, sensibilidadCaraLateralEFU, rotAquileanoEFU, signoLasegueEFU,
        indiceWellsEFU, observacionEFU, fechaRxToraxEPA, resultadoRxToraxEPA, observacionesRxToraxEPA, fechaEspirometriaEPA,
        resultadoEspirometriaEPA, observacionesEspirometriaEPA, fechaAudiometriaEPA, resultadoAudiometriaEPA,
        observacionesAudiometriaEPA, fechaVisiometriaEPA, resultadoVisiometriaEPA, observacionesVisiometriaEPA, fechaLaboratorioClinicoEPA,
        resultadoLaboratorioClinicoEPA, observacionesLaboratorioClinicoEPA, fechaCuestionarioSintomaEPA, resultadoCuestionarioSintomaEPA,
        observacionesCuestionarioSintomaEPA, fechaEkgEPA, resultadoEkgEPA, observacionesEkgEPA, fechaRnmLumbosacraEPA, resultadoRnmLumbosacraEPA,
        observacionesRnmLumbosacraEPA, fechaRnmCervicalEPA, resultadoRnmCervicalEPA, observacionesRnmCervicalEPA, observacionEPA,
        dxID, observacionID, recomendacionesID, idConceptoActitudID, fechaConceptoNETA, conceptoAplazadoNETA, conceptoActitudNETA,
        motivoAplazoNETA, descripcionResultadoNETA, recomendacionesNETA, remitidoNETA, remididoDondeNETA, idRiesgoCardiovascularNEMTA,
        idClasificacionNEMTA, idMenorEdadNEMTA, idMujerEmbarazadaNEMTA, idArimiaNEMTA, idEnfermedadNEMTA, idHistoriaNEMTA,
        idHipertensionNEMTA, idHipertrigliceridemiaNEMTA, idCifrasNEMTA, idDiabetesNEMTA, idDislipidemiaNEMTA, idDiagnosticoNEMTA,
        idRiesgoCardiovascular1NEMTA, idRiesgoCardiovascular2NEMTA, idHipertiroidismoNEMTA, idAlteracionAuditivaNEMTA,
        idVertigoAlteracionesNEMTA, idEpilegsiaNEMTA, idCegueraTemporalNEMTA, idHistoriaFobiasNEMTA, idTranstornoPsiquiatricoNEMTA,
        idLimitacionesNEMTA, idObesidadMorbidaNEMTA, idDeformaTemporalNEMTA, idOtrasAlteracionesNEMTA, observacionesNEMTA,
        conceptoActitudMedicoNEMTA, fechaFRA, tencionFRA, idTencionArterialFRA, idAntecedenteCardiovascularFRA, idDeporteFRA,
        idBebidaFRA, fechaLaboratorioFRA, colesterolTotalFRA, hdlfra, triglicericosFRA, idMetabolicoFRA, glisemiaFRA,
        fumaFRA, observacionFRA, ldlfra, relacionFRA, frlEdadFRA, frlColesterolFRA, frhdlfra, frGlisemiaFRA, frTencionFRA, frTabaquismoFRA,
        puntajeFRA, riesgoAbsolutoFRA, riesgoRelativoFRA, interpretacionFRA, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico,

        /* SINTOMAS RESPIRATORIOS */
        tosAUsualSin, tosEnLaSemanaSintR, tosMananaSintR, tosConsecutivaSintR, anosConTosSintR, esputoASintR,
        esputoBSintR, esputoCSintR, esputoDSintR, esputoESintR, episoTosEspuASintR, episoTosEsputoBSintR,
        sibilanciasASintR, sibilanciasA1SintR, sibilanciasA2SintR, sibilanciasA3SintR, sibilanciasBSintR,
        ataquesSilbiASintR, ataquesSilbiBSintR, ataquesSilbiCSintR, ataquesSilbiDSintR, otrasEnfInhaASintR,
        otrasEnfInhaBSintR, otrasEnfInhaDescriSintR, disneaASintR, disneaBSintR, disneaCSintR, disneaDSintR,
        disneaESintR, enferToraxASintR, enferToraxBSintR, enferToraxCSintR, enferToraxD, antecedentesASintR,
        antecedentesB1SintR, antecedentesB1ASintR, antecedentesB2Sintr, antecedentesB2ASintR,
        antecedentesB3SintR, antecedentesB3ASintR, antecedentesB3BSintR, antecedentesB3CSintR, antecdentesB4SintR,
        antecedenteB4ASintR, antecedentesB4BSintR, antecedentesB4CSintR, antecedentesB5SintR, antecedentesB5ASintR,
        antecedentesB5BSintR, antecedentesB5CSintR, otrasEnfToraxA, otrasEnfToraxB,
        ciruToraxASintR, ciruToraxBSintR, traumaToraxASintR, traumaToraxBSintR, problemCoraASintR, problemCoraBSintR,
        problemaCoraCSintR, presionAltaASintR, presionAltaBSintR, historiaOcupASintR, historiaOcupBSintR,
        historiaOcupB1SintR, historiaOcupB2SintR, historiaOcupB3SintR, historiaOcupCSintR, historiaOcupC1SintR,
        historiaOcupC2SintR, historiaOcupC3SintR, historiaOcupD1SintR, historiaOcupD2SintR, historiaOcupD3,
        tabaquismoASintR, tabaquismoBSintR, tabaquismoCSintR, tabaquismoDSintR, tabaquismoESintR, actDeportASintR,
        actDeporA1SintR, actDeporA2SintR, actDeporA3SintR, actDeporA4SintR, recoSintR, parentesco1ANFA,
        parentesco1ObserANFA, parentesco2ANFA, parentesco2ObserANFA, parentesco3ANFA, parentesco3ObserANFA,
        parentesco4ANFA, parentesco4ObserANFA,
    };
}

export function PutOccupationalExamination(id, idHistoriaLaboral, documento, fecha, idAtencion,

    congenitosAP, inmunoPrevenibleAP, infecciososAP, ojoAP, agudezaVisualAP, oidosAP, nasoFaringeAP, cardiovascularAP, pulmonarAP, gastrointestinalAP,
    gimitoUrinarioAP, neurologicoAP, transtornoPielAP, osteoMuscularAP, alergicosAP, toxicoAP, faRmacologicosAP, quirurgicosAP, traumaticosAP, tranfuccionesAP,
    etsAP, deformidadesAP, psiquiatricosAP, farmacoDependenciaAP, emAP, renalAP, asmaAP, orlAP, cancerAP, especifiqueAP,

    anioAT, especifiqueAT, anio1AT, especifique1AT,

    tetanoIM, influenzaIM, fiebreAmarillaIM, rubeolaSarampionIM, covid19IM,
    otrasIM, anioVacuna1IM, anioVacuna2IM, anioVacuna3IM, anioVacuna4IM, anioVacuna5IM, anioVacuna6IM,

    fumaHB, cigarrillosDiasFumaHB, aniosCigaFumaHB, mesesCigaFumaHB, observacionFumaHB, fumabaHB, cigarrillosDiasFumabaHB, aniosCigaFumabaHB, mesesCigaFumabaHB,
    observacionFumabaHB, practicaDeporteHB, idFrecuenciaDeporteHB, idCualDeporteHB, observacionPracticaDeporHB, hobbiesPasatiempoHB, cualHobbiesHB,
    consumeBebidasAlcoholicasHB, idFrecuenciaBebidaAlHB, cualBebidasAlHB, fobiasHB, tipoFobiaHB, cualFobiaHB, heredoFamiliarHB, parentescoHB, observacionHeredoFamiHB,

    menarquiaGO, idCiclosGO, duracionGO, amenoreaGO, disminureaGO, leucoreaGO, vidaMaritalGO, vidaObstetricaGO, gGO, pGO, aGO, cSGO, vGO, fUPGO, fURGO, eTSGO, cUALGO,
    quisteOvariosBiomasGO, endometriosisGO, ePIGO, planificaGO, idMetodoGO, ultimoAnioCitologiaGO, idResultadoGO,

    cabezaRS, ojosRS, oidosRS, narizRS, bocaRS, gargantaRS, cuellosRS, cardioRS, gastrointestinalRS, genitoUrinarioRS, osteoRS, neuroRS,
    pielRS, psiquiatricoRS, observacionRS,

    tASentadoEF, tAAcostadoEF, pulsoEF, fCEF, fREF, temperaturaEF, pesoEF, tallaEF, iMCEF, clasificacionEF, idBiotipoEF, estadoNitricionalEF, pielFaneraEF, craneoEF,
    parpadoEF, conjuntivasEF, corniasEF, pupilasEF, reflejoFotomotorEF, reflejoCornialEF, fondoOjosEF, inspeccionEF, otoscopiaEF, inspeccionNarizEF, rinoscopioEF,
    labiosEF, mucosaEF, enciasEF, paladarEF, dientesEF, lenguaEF, faringeEF, amigdalasEF, cuellosEF, inspeccionToraxEF, auscultacionCardiacaEF, auscultacionRespiratoriaEF,
    inspeccionAbdomenEF, palpacionAbdomenEF, exploracionHigadoEF, exploracionVasoEF, exploracionRinionesEF, anillosInguinalesEF, anilloUmbilicalEF, genitalesExternosEF,
    regionAnalEF, tactoRectalEF, tactoVaginalEF, extremidadesSuperioresEF, extremidadesInferioresEF, pulsosEF, columnaVertebralEF, articulacionesEF,

    especifiqueEMEFU, movilidadEFU, equilibrioEFU, marchaEFU, movilidadHombroEFU, movilidadCodoEFU, movilidadMuniecaEFU, signoTinelEFU, signoPhalenEFU, movilidadManosEFU,
    movilidadCaderaEFU, movilidadRodillaEFU, movilidadTobilloEFU, movilidadCuelloEFU, rOTVisipitalEFU, rOTRotuleanoEFU, extencionEFU, sensibilidadCaraAnteriorEFU,
    eversionPiesEFU, sensibilidadCaraLateralEFU, rOTAquileanoEFU, signoLasegueEFU, indiceWellsEFU, observacionEFU,

    fechaRxToraxEPA, resultadoRxToraxEPA, observacionesRxToraxEPA, fechaEspirometriaEPA, resultadoEspirometriaEPA, observacionesEspirometriaEPA, fechaAudiometriaEPA,
    resultadoAudiometriaEPA, observacionesAudiometriaEPA, fechaVisiometriaEPA, resultadoVisiometriaEPA, observacionesVisiometriaEPA, fechaLaboratorioClinicoEPA,
    resultadoLaboratorioClinicoEPA, observacionesLaboratorioClinicoEPA, fechaCuestionarioSintomaEPA, resultadoCuestionarioSintomaEPA, observacionesCuestionarioSintomaEPA,
    fechaEkgEPA, resultadoEkgEPA, observacionesEkgEPA, fechaRnmLumbosacraEPA, resultadoRnmLumbosacraEPA, observacionesRnmLumbosacraEPA, fechaRnmCervicalEPA,
    resultadoRnmCervicalEPA, observacionesRnmCervicalEPA, observacionEPA,

    dxID, observacionID, recomendacionesID, idConceptoActitudID,

    fechaConceptoNETA, conceptoAplazadoNETA, conceptoActitudNETA, motivoAplazoNETA, descripcionResultadoNETA, recomendacionesNETA, remitidoNETA, remididoDondeNETA,

    idRiesgoCardiovascularNEMTA, idClasificacionNEMTA, idMenorEdadNEMTA, idMujerEmbarazadaNEMTA, idArimiaNEMTA, idEnfermedadNEMTA, idHistoriaNEMTA, idHipertensionNEMTA,
    idHipertrigliceridemiaNEMTA, idCifrasNEMTA, idDiabetesNEMTA, idDislipidemiaNEMTA, idDiagnosticoNEMTA, idRiesgoCardiovascular1NEMTA, idRiesgoCardiovascular2NEMTA,
    idHipertiroidismoNEMTA, idAlteracionAuditivaNEMTA, idVertigoAlteracionesNEMTA, idEpilegsiaNEMTA, idCegueraTemporalNEMTA, idHistoriaFobiasNEMTA,
    idTranstornoPsiquiatricoNEMTA, idLimitacionesNEMTA, idObesidadMorbidaNEMTA, idDeformaTemporalNEMTA, idOtrasAlteracionesNEMTA, observacionesNEMTA, conceptoActitudMedicoNEMTA,

    fechaFRA, tencionFRA, idTencionArterialFRA, idAntecedenteCardiovascularFRA, idDeporteFRA, idBebidaFRA, fechaLaboratorioFRA, colesterolTotalFRA, hDLFRA, triglicericosFRA,
    idMetabolicoFRA, glisemiaFRA, fumaFRA, observacionFRA, lDLFRA, relacionFRA, fRLEdadFRA, fRLColesterolFRA, fRHDLFRA, fRGlisemiaFRA, fRTencionFRA, fRTabaquismoFRA, puntajeFRA,
    riesgoAbsolutoFRA, riesgoRelativoFRA, interpretacionFRA, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico) {
    return {
        id, idHistoriaLaboral, documento, fecha, idAtencion,

        congenitosAP, inmunoPrevenibleAP, infecciososAP, ojoAP, agudezaVisualAP, oidosAP, nasoFaringeAP, cardiovascularAP, pulmonarAP, gastrointestinalAP,
        gimitoUrinarioAP, neurologicoAP, transtornoPielAP, osteoMuscularAP, alergicosAP, toxicoAP, faRmacologicosAP, quirurgicosAP, traumaticosAP, tranfuccionesAP,
        etsAP, deformidadesAP, psiquiatricosAP, farmacoDependenciaAP, emAP, renalAP, asmaAP, orlAP, cancerAP, especifiqueAP,

        anioAT, especifiqueAT, anio1AT, especifique1AT,

        tetanoIM, influenzaIM, fiebreAmarillaIM, rubeolaSarampionIM, covid19IM,
        otrasIM, anioVacuna1IM, anioVacuna2IM, anioVacuna3IM, anioVacuna4IM, anioVacuna5IM, anioVacuna6IM,

        fumaHB, cigarrillosDiasFumaHB, aniosCigaFumaHB, mesesCigaFumaHB, observacionFumaHB, fumabaHB, cigarrillosDiasFumabaHB, aniosCigaFumabaHB, mesesCigaFumabaHB,
        observacionFumabaHB, practicaDeporteHB, idFrecuenciaDeporteHB, idCualDeporteHB, observacionPracticaDeporHB, hobbiesPasatiempoHB, cualHobbiesHB,
        consumeBebidasAlcoholicasHB, idFrecuenciaBebidaAlHB, cualBebidasAlHB, fobiasHB, tipoFobiaHB, cualFobiaHB, heredoFamiliarHB, parentescoHB, observacionHeredoFamiHB,

        menarquiaGO, idCiclosGO, duracionGO, amenoreaGO, disminureaGO, leucoreaGO, vidaMaritalGO, vidaObstetricaGO, gGO, pGO, aGO, cSGO, vGO, fUPGO, fURGO, eTSGO, cUALGO,
        quisteOvariosBiomasGO, endometriosisGO, ePIGO, planificaGO, idMetodoGO, ultimoAnioCitologiaGO, idResultadoGO,

        cabezaRS, ojosRS, oidosRS, narizRS, bocaRS, gargantaRS, cuellosRS, cardioRS, gastrointestinalRS, genitoUrinarioRS, osteoRS, neuroRS,
        pielRS, psiquiatricoRS, observacionRS,

        tASentadoEF, tAAcostadoEF, pulsoEF, fCEF, fREF, temperaturaEF, pesoEF, tallaEF, iMCEF, clasificacionEF, idBiotipoEF, estadoNitricionalEF, pielFaneraEF, craneoEF,
        parpadoEF, conjuntivasEF, corniasEF, pupilasEF, reflejoFotomotorEF, reflejoCornialEF, fondoOjosEF, inspeccionEF, otoscopiaEF, inspeccionNarizEF, rinoscopioEF,
        labiosEF, mucosaEF, enciasEF, paladarEF, dientesEF, lenguaEF, faringeEF, amigdalasEF, cuellosEF, inspeccionToraxEF, auscultacionCardiacaEF, auscultacionRespiratoriaEF,
        inspeccionAbdomenEF, palpacionAbdomenEF, exploracionHigadoEF, exploracionVasoEF, exploracionRinionesEF, anillosInguinalesEF, anilloUmbilicalEF, genitalesExternosEF,
        regionAnalEF, tactoRectalEF, tactoVaginalEF, extremidadesSuperioresEF, extremidadesInferioresEF, pulsosEF, columnaVertebralEF, articulacionesEF,

        especifiqueEMEFU, movilidadEFU, equilibrioEFU, marchaEFU, movilidadHombroEFU, movilidadCodoEFU, movilidadMuniecaEFU, signoTinelEFU, signoPhalenEFU, movilidadManosEFU,
        movilidadCaderaEFU, movilidadRodillaEFU, movilidadTobilloEFU, movilidadCuelloEFU, rOTVisipitalEFU, rOTRotuleanoEFU, extencionEFU, sensibilidadCaraAnteriorEFU,
        eversionPiesEFU, sensibilidadCaraLateralEFU, rOTAquileanoEFU, signoLasegueEFU, indiceWellsEFU, observacionEFU,

        fechaRxToraxEPA, resultadoRxToraxEPA, observacionesRxToraxEPA, fechaEspirometriaEPA, resultadoEspirometriaEPA, observacionesEspirometriaEPA, fechaAudiometriaEPA,
        resultadoAudiometriaEPA, observacionesAudiometriaEPA, fechaVisiometriaEPA, resultadoVisiometriaEPA, observacionesVisiometriaEPA, fechaLaboratorioClinicoEPA,
        resultadoLaboratorioClinicoEPA, observacionesLaboratorioClinicoEPA, fechaCuestionarioSintomaEPA, resultadoCuestionarioSintomaEPA, observacionesCuestionarioSintomaEPA,
        fechaEkgEPA, resultadoEkgEPA, observacionesEkgEPA, fechaRnmLumbosacraEPA, resultadoRnmLumbosacraEPA, observacionesRnmLumbosacraEPA, fechaRnmCervicalEPA,
        resultadoRnmCervicalEPA, observacionesRnmCervicalEPA, observacionEPA,

        dxID, observacionID, recomendacionesID, idConceptoActitudID,

        fechaConceptoNETA, conceptoAplazadoNETA, conceptoActitudNETA, motivoAplazoNETA, descripcionResultadoNETA, recomendacionesNETA, remitidoNETA, remididoDondeNETA,

        idRiesgoCardiovascularNEMTA, idClasificacionNEMTA, idMenorEdadNEMTA, idMujerEmbarazadaNEMTA, idArimiaNEMTA, idEnfermedadNEMTA, idHistoriaNEMTA, idHipertensionNEMTA,
        idHipertrigliceridemiaNEMTA, idCifrasNEMTA, idDiabetesNEMTA, idDislipidemiaNEMTA, idDiagnosticoNEMTA, idRiesgoCardiovascular1NEMTA, idRiesgoCardiovascular2NEMTA,
        idHipertiroidismoNEMTA, idAlteracionAuditivaNEMTA, idVertigoAlteracionesNEMTA, idEpilegsiaNEMTA, idCegueraTemporalNEMTA, idHistoriaFobiasNEMTA,
        idTranstornoPsiquiatricoNEMTA, idLimitacionesNEMTA, idObesidadMorbidaNEMTA, idDeformaTemporalNEMTA, idOtrasAlteracionesNEMTA, observacionesNEMTA, conceptoActitudMedicoNEMTA,

        fechaFRA, tencionFRA, idTencionArterialFRA, idAntecedenteCardiovascularFRA, idDeporteFRA, idBebidaFRA, fechaLaboratorioFRA, colesterolTotalFRA, hDLFRA, triglicericosFRA,
        idMetabolicoFRA, glisemiaFRA, fumaFRA, observacionFRA, lDLFRA, relacionFRA, fRLEdadFRA, fRLColesterolFRA, fRHDLFRA, fRGlisemiaFRA, fRTencionFRA, fRTabaquismoFRA, puntajeFRA,
        riesgoAbsolutoFRA, riesgoRelativoFRA, interpretacionFRA, usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico
    };
}