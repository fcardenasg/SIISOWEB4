import { DefaultValue } from 'components/helpers/Enums';

export function PostOccupationalExamination(
    idRegistroAtencion, documento, fecha, idAtencion,

    congenitosAP = false, inmunoPrevenibleAP = false, infecciososAP = false, ojoAP = false, agudezaVisualAP = false,
    oidosAP = false, nasoFaringeAP = false, cardiovascularAP = false, pulmonarAP = false, gastrointestinalAP = false,
    gimitoUrinarioAP = false, neurologicoAP = false, transtornoPielAP = false, osteoMuscularAP = false, alergicosAP = false,
    toxicoAP = false, faRmacologicosAP = false, quirurgicosAP = false, traumaticosAP = false, tranfuccionesAP = false,
    etsAP = false, deformidadesAP = false, psiquiatricosAP = false, farmacoDependenciaAP = false, emAP = false, renalAP = false,
    asmaAP = false, orlAP = false, cancerAP = false, especifiqueAP = "",

    anioAT = "", especifiqueAT = "", anio1AT = "", especifique1AT = "",

    tetanoIM = false, influenzaIM = false, fiebreAmarillaIM = false, rubeolaSarampionIM = false, covid19IM = false, otrasIM = false,
    anioVacuna1IM = 0, anioVacuna2IM = 0, anioVacuna3IM = 0, anioVacuna4IM = 0, anioVacuna5IM = 0,
    idRefuerzoIM = DefaultValue.SINREGISTRO_GLOBAL, anioVacuna6IM = "",

    fumaHB = false, cigarrillosDiasFumaHB = 0, aniosCigaFumaHB = 0, mesesCigaFumaHB = 0, observacionFumaHB = "",

    fumabaHB = false, cigarrillosDiasFumabaHB = 0, aniosCigaFumabaHB = 0, mesesCigaFumabaHB = 0, observacionFumabaHB = "",
    practicaDeporteHB = false, idFrecuenciaDeporteHB = DefaultValue.SINREGISTRO_GLOBAL, idCualDeporteHB = DefaultValue.SINREGISTRO_GLOBAL,
    observacionPracticaDeporHB = "", hobbiesPasatiempoHB = false, cualHobbiesHB = "",
    consumeBebidasAlcoholicasHB = false, idFrecuenciaBebidaAlHB = DefaultValue.SINREGISTRO_GLOBAL, cualBebidasAlHB = "",
    fobiasHB = false, tipoFobiaHB = "", cualFobiaHB = "",

    menarquiaGO = 0, idCiclosGO = DefaultValue.SINREGISTRO_GLOBAL, duracionGO = 0, amenoreaGO = false, disminureaGO = false,
    leucoreaGO = false, vidaMaritalGO = 0, vidaObstetricaGO = 0, ggo = 0, pgo = 0, ago = 0, csgo = 0, vgo = 0,
    fupgo = null, furgo = null, etsgo = false, cualgo = "",
    quisteOvariosBiomasGO = false, endometriosisGO = false, epigo = false, planificaGO = false,
    idMetodoGO = DefaultValue.SINREGISTRO_GLOBAL, ultimoAnioCitologiaGO = 0, idResultadoGO = DefaultValue.SINREGISTRO_GLOBAL, observacionesGO = "",

    cabezaRS = false, ojosRS = false, oidosRS = false, narizRS = false, bocaRS = false, gargantaRS = false, cuellosRS = false,
    cardioRS = false, gastrointestinalRS = false, genitoUrinarioRS = false, osteoRS = false, neuroRS = false, pielRS = false,
    psiquiatricoRS = false, observacionRS = "",

    taSentadoEF = "", taAcostadoEF = "", pulsoEF = 0, fcef = 0, fref = 0, temperaturaEF = 0, pesoEF = 0, tallaEF = 0, imcef = 0,
    clasificacionEF = "", idBiotipoEF = DefaultValue.SINREGISTRO_GLOBAL,

    estadoNitricionalEF = false, pielFaneraEF = false, craneoEF = false, parpadoEF = false, conjuntivasEF = false, corniasEF = false,
    pupilasEF = false, reflejoFotomotorEF = false, reflejoCornialEF = false, fondoOjosEF = false, inspeccionEF = false,
    otoscopiaEF = false, inspeccionNarizEF = false, rinoscopioEF = false, labiosEF = false, mucosaEF = false, enciasEF = false,
    paladarEF = false, dientesEF = false, lenguaEF = false, faringeEF = false, amigdalasEF = false, cuellosEF = false,
    inspeccionToraxEF = false, auscultacionCardiacaEF = false, auscultacionRespiratoriaEF = false, inspeccionAbdomenEF = false,
    palpacionAbdomenEF = false, exploracionHigadoEF = false, exploracionVasoEF = false, exploracionRinionesEF = false,
    anillosInguinalesEF = false, anilloUmbilicalEF = false, genitalesExternosEF = false, regionAnalEF = false, tactoRectalEF = false,
    tactoVaginalEF = false, extremidadesSuperioresEF = false, extremidadesInferioresEF = false, pulsosEF = false,
    columnaVertebralEF = false, articulacionesEF = false, especifiqueEMEFU = "",

    movilidadEFU = false, equilibrioEFU = false, marchaEFU = false, movilidadHombroEFU = false, movilidadCodoEFU = false,
    movilidadMuniecaEFU = false, signoTinelEFU = false, signoPhalenEFU = false, movilidadManosEFU = false, movilidadCaderaEFU = false,
    movilidadRodillaEFU = false, movilidadTobilloEFU = false, movilidadCuelloEFU = false, rotVisipitalEFU = false,
    rotRotuleanoEFU = false, extencionEFU = false, sensibilidadCaraAnteriorEFU = false, eversionPiesEFU = false,
    sensibilidadCaraLateralEFU = false, rotAquileanoEFU = false, signoLasegueEFU = false, indiceWellsEFU = false, valorIndiceWellsEFU = "", observacionEFU = "",

    fechaRxToraxEPA, resultadoRxToraxEPA = 4017, observacionesRxToraxEPA = "",
    fechaEspirometriaEPA, resultadoEspirometriaEPA = 4017, observacionesEspirometriaEPA = "",
    fechaAudiometriaEPA, resultadoAudiometriaEPA = 4017, observacionesAudiometriaEPA = "",
    fechaVisiometriaEPA, resultadoVisiometriaEPA = 4017, observacionesVisiometriaEPA = "",
    fechaLaboratorioClinicoEPA, resultadoLaboratorioClinicoEPA = 4017, observacionesLaboratorioClinicoEPA = "",
    fechaCuestionarioSintomaEPA, resultadoCuestionarioSintomaEPA = 9514, observacionesCuestionarioSintomaEPA = "",
    fechaEkgEPA, resultadoEkgEPA = 4017, observacionesEkgEPA = "",
    fechaRnmLumbosacraEPA, resultadoRnmLumbosacraEPA = 4017, observacionesRnmLumbosacraEPA = "",
    fechaRnmCervicalEPA, resultadoRnmCervicalEPA = 4017, observacionesRnmCervicalEPA = "", observacionEPA = "",

    dx1 = "", dx2 = "", dx3 = "", observacionID = "", recomendacionesID = "", idConceptoActitudID = DefaultValue.SINREGISTRO_GLOBAL,

    fechaConceptoNETA = null, conceptoAplazadoNETA = DefaultValue.SINREGISTRO_GLOBAL,
    conceptoActitudNETA = DefaultValue.SINREGISTRO_GLOBAL, idConceptoEspacioConfinado = DefaultValue.SINREGISTRO_GLOBAL,
    motivoAplazoNETA = "", descripcionResultadoNETA = "", recomendacionesNETA = "",
    remitidoNETA = DefaultValue.SINREGISTRO_GLOBAL, remididoDondeNETA = DefaultValue.SINREGISTRO_GLOBAL,

    idRiesgoCardiovascularNEMTA = DefaultValue.SINREGISTRO_GLOBAL, idClasificacionNEMTA = DefaultValue.SINREGISTRO_GLOBAL,

    idMenorEdadNEMTA = false, idMujerEmbarazadaNEMTA = false, idArimiaNEMTA = false, idEnfermedadNEMTA = false, idHistoriaNEMTA = false,
    idHipertensionNEMTA = false, idHipertrigliceridemiaNEMTA = false, idCifrasNEMTA = false, idDiabetesNEMTA = false,
    idDislipidemiaNEMTA = false, idDiagnosticoNEMTA = false, idRiesgoCardiovascular1NEMTA = false, idRiesgoCardiovascular2NEMTA = false,
    idHipertiroidismoNEMTA = false, idAlteracionAuditivaNEMTA = false, idVertigoAlteracionesNEMTA = false, idEpilegsiaNEMTA = false,
    idCegueraTemporalNEMTA = false, idHistoriaFobiasNEMTA = false, idTranstornoPsiquiatricoNEMTA = false,
    idLimitacionesNEMTA = false, idObesidadMorbidaNEMTA = false, idDeformaTemporalNEMTA = false, idOtrasAlteracionesNEMTA = false,
    observacionesNEMTA = "", conceptoActitudMedicoNEMTA = DefaultValue.SINREGISTRO_GLOBAL,

    fechaFRA = null, tencionFRA = "", idTencionArterialFRA = DefaultValue.SINREGISTRO_GLOBAL,
    idAntecedenteCardiovascularFRA = "", idDeporteFRA = DefaultValue.SINREGISTRO_GLOBAL, idBebidaFRA = DefaultValue.SINREGISTRO_GLOBAL,
    fechaLaboratorioFRA = null, colesterolTotalFRA = 0, hdlfra = 0, triglicericosFRA = 0, idMetabolicoFRA = "",
    glisemiaFRA = 0, fumaFRA = DefaultValue.SINREGISTRO_GLOBAL, observacionFRA = "",

    ldlfra = 0, relacionFRA = "",
    frlEdadFRA = 0, frlColesterolFRA = 0, frhdlfra = 0, frGlisemiaFRA = 0, frTencionFRA = 0, frTabaquismoFRA = 0, puntajeFRA = 0, riesgoAbsolutoFRA = 0,
    riesgoRelativoFRA = "", interpretacionFRA = "", usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico,

    /* SINTOMAS RESPIRATORIOS */
    tosAUsualSin = false, tosEnLaSemanaSintR = false, tosMananaSintR = false, tosConsecutivaSintR = false, anosConTosSintR = 0,

    esputoASintR = false, esputoBSintR = false, esputoCSintR = false, esputoDSintR = false, esputoESintR = "",

    episoTosEspuASintR = false, episoTosEsputoBSintR = "",

    sibilanciasASintR = false, sibilanciasA1SintR = false, sibilanciasA2SintR = false, sibilanciasA3SintR = false, sibilanciasBSintR = "",

    ataquesSilbiASintR = false, ataquesSilbiBSintR = "", ataquesSilbiCSintR = false, ataquesSilbiDSintR = false,

    otrasEnfInhaASintR = false, otrasEnfInhaBSintR = false, otrasEnfInhaDescriSintR = "",

    disneaASintR = false, disneaBSintR = false, disneaCSintR = false, disneaDSintR = false, disneaESintR = false,

    enferToraxASintR = false, enferToraxBSintR = false, enferToraxCSintR = false, enferToraxD = "",

    antecedentesASintR = false,

    antecedentesB1SintR = false, antecedentesB1ASintR = "", antecedentesB2Sintr = false, antecedentesB2ASintR = "",

    antecedentesB3SintR = false, antecedentesB3ASintR = "", antecedentesB3BSintR = false, antecedentesB3CSintR = "",

    antecdentesB4SintR = false, antecedenteB4ASintR = "", antecedentesB4BSintR = false, antecedentesB4CSintR = "",

    antecedentesB5SintR = false, antecedentesB5ASintR = "", antecedentesB5BSintR = false, antecedentesB5CSintR = "",

    otrasEnfToraxA = false, otrasEnfToraxB = "", ciruToraxASintR = false, ciruToraxBSintR = "",

    traumaToraxASintR = false, traumaToraxBSintR = "", problemCoraASintR = false, problemCoraBSintR = "",

    problemaCoraCSintR = false, presionAltaASintR = false, presionAltaBSintR = false,

    historiaOcupASintR = false, historiaOcupBSintR = false, historiaOcupB1SintR = "", historiaOcupB2SintR = "",
    historiaOcupB3SintR = DefaultValue.SINREGISTRO_GLOBAL, historiaOcupCSintR = false, historiaOcupC1SintR = "",
    historiaOcupC2SintR = "", historiaOcupC3SintR = DefaultValue.SINREGISTRO_GLOBAL, historiaOcupD1SintR = "",
    historiaOcupD2SintR = "", historiaOcupD3 = "",

    tabaquismoASintR = false, tabaquismoBSintR = false, tabaquismoCSintR = "", tabaquismoDSintR = "", tabaquismoESintR = "",

    actDeportASintR = false, actDeporA1SintR = "", actDeporA2SintR = "", actDeporA3SintR = "", actDeporA4SintR = "",

    recoSintR = "",

    parentesco1ANFA = 9537, parentesco1ObserANFA = "",
    parentesco2ANFA = 9537, parentesco2ObserANFA = "",
    parentesco3ANFA = 9537, parentesco3ObserANFA = "",
    parentesco4ANFA = 9537, parentesco4ObserANFA = "",
    lateralidadExamenesFisico = DefaultValue.SINREGISTRO_GLOBAL
) {
    return {
        idRegistroAtencion, documento, fecha, idAtencion, congenitosAP, inmunoPrevenibleAP, infecciososAP,
        ojoAP, agudezaVisualAP, oidosAP, nasoFaringeAP, cardiovascularAP, pulmonarAP, gastrointestinalAP, gimitoUrinarioAP,
        neurologicoAP, transtornoPielAP, osteoMuscularAP, alergicosAP, toxicoAP, faRmacologicosAP, quirurgicosAP,
        traumaticosAP, tranfuccionesAP, etsAP, deformidadesAP, psiquiatricosAP, farmacoDependenciaAP, emAP, renalAP,
        asmaAP, orlAP, cancerAP, especifiqueAP, anioAT, especifiqueAT, anio1AT, especifique1AT, tetanoIM, influenzaIM,
        fiebreAmarillaIM, rubeolaSarampionIM, covid19IM, otrasIM, anioVacuna1IM, anioVacuna2IM, anioVacuna3IM,
        anioVacuna4IM, anioVacuna5IM, idRefuerzoIM, anioVacuna6IM, fumaHB, cigarrillosDiasFumaHB, aniosCigaFumaHB, mesesCigaFumaHB,
        observacionFumaHB, fumabaHB, cigarrillosDiasFumabaHB, aniosCigaFumabaHB, mesesCigaFumabaHB, observacionFumabaHB,
        practicaDeporteHB, idFrecuenciaDeporteHB, idCualDeporteHB, observacionPracticaDeporHB, hobbiesPasatiempoHB, cualHobbiesHB,
        consumeBebidasAlcoholicasHB, idFrecuenciaBebidaAlHB, cualBebidasAlHB, fobiasHB, tipoFobiaHB, cualFobiaHB,

        menarquiaGO, idCiclosGO, duracionGO, amenoreaGO, disminureaGO, leucoreaGO, vidaMaritalGO, vidaObstetricaGO,
        ggo, pgo, ago, csgo, vgo, fupgo, furgo, etsgo, cualgo, quisteOvariosBiomasGO, endometriosisGO, epigo,
        planificaGO, idMetodoGO, ultimoAnioCitologiaGO, idResultadoGO, observacionesGO,

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
        indiceWellsEFU, valorIndiceWellsEFU, observacionEFU, fechaRxToraxEPA, resultadoRxToraxEPA, observacionesRxToraxEPA, fechaEspirometriaEPA,
        resultadoEspirometriaEPA, observacionesEspirometriaEPA, fechaAudiometriaEPA, resultadoAudiometriaEPA,
        observacionesAudiometriaEPA, fechaVisiometriaEPA, resultadoVisiometriaEPA, observacionesVisiometriaEPA, fechaLaboratorioClinicoEPA,
        resultadoLaboratorioClinicoEPA, observacionesLaboratorioClinicoEPA, fechaCuestionarioSintomaEPA, resultadoCuestionarioSintomaEPA,
        observacionesCuestionarioSintomaEPA, fechaEkgEPA, resultadoEkgEPA, observacionesEkgEPA, fechaRnmLumbosacraEPA, resultadoRnmLumbosacraEPA,
        observacionesRnmLumbosacraEPA, fechaRnmCervicalEPA, resultadoRnmCervicalEPA, observacionesRnmCervicalEPA, observacionEPA,

        dx1, dx2, dx3, observacionID, recomendacionesID, idConceptoActitudID, fechaConceptoNETA, conceptoAplazadoNETA, conceptoActitudNETA,
        idConceptoEspacioConfinado,

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
        parentesco4ANFA, parentesco4ObserANFA, lateralidadExamenesFisico
    };
}

export function PutOccupationalExamination(id,
    idRegistroAtencion, documento, fecha, idAtencion,

    congenitosAP = false, inmunoPrevenibleAP = false, infecciososAP = false, ojoAP = false, agudezaVisualAP = false,
    oidosAP = false, nasoFaringeAP = false, cardiovascularAP = false, pulmonarAP = false, gastrointestinalAP = false,
    gimitoUrinarioAP = false, neurologicoAP = false, transtornoPielAP = false, osteoMuscularAP = false, alergicosAP = false,
    toxicoAP = false, faRmacologicosAP = false, quirurgicosAP = false, traumaticosAP = false, tranfuccionesAP = false,
    etsAP = false, deformidadesAP = false, psiquiatricosAP = false, farmacoDependenciaAP = false, emAP = false, renalAP = false,
    asmaAP = false, orlAP = false, cancerAP = false, especifiqueAP = "",

    anioAT = "", especifiqueAT = "", anio1AT = "", especifique1AT = "",

    tetanoIM = false, influenzaIM = false, fiebreAmarillaIM = false, rubeolaSarampionIM = false, covid19IM = false, otrasIM = false,
    anioVacuna1IM = 0, anioVacuna2IM = 0, anioVacuna3IM = 0, anioVacuna4IM = 0, anioVacuna5IM = 0,
    idRefuerzoIM = DefaultValue.SINREGISTRO_GLOBAL, anioVacuna6IM = "",

    fumaHB = false, cigarrillosDiasFumaHB = 0, aniosCigaFumaHB = 0, mesesCigaFumaHB = 0, observacionFumaHB = "",

    fumabaHB = false, cigarrillosDiasFumabaHB = 0, aniosCigaFumabaHB = 0, mesesCigaFumabaHB = 0, observacionFumabaHB = "",
    practicaDeporteHB = false, idFrecuenciaDeporteHB = DefaultValue.SINREGISTRO_GLOBAL, idCualDeporteHB = DefaultValue.SINREGISTRO_GLOBAL,
    observacionPracticaDeporHB = "", hobbiesPasatiempoHB = false, cualHobbiesHB = "",
    consumeBebidasAlcoholicasHB = false, idFrecuenciaBebidaAlHB = DefaultValue.SINREGISTRO_GLOBAL, cualBebidasAlHB = "",
    fobiasHB = false, tipoFobiaHB = "", cualFobiaHB = "",

    menarquiaGO = 0, idCiclosGO = DefaultValue.SINREGISTRO_GLOBAL, duracionGO = 0, amenoreaGO = false, disminureaGO = false,
    leucoreaGO = false, vidaMaritalGO = 0, vidaObstetricaGO = 0, ggo = 0, pgo = 0, ago = 0, csgo = 0, vgo = 0,
    fupgo = null, furgo = null, etsgo = false, cualgo = "",
    quisteOvariosBiomasGO = false, endometriosisGO = false, epigo = false, planificaGO = false,
    idMetodoGO = DefaultValue.SINREGISTRO_GLOBAL, ultimoAnioCitologiaGO = 0, idResultadoGO = DefaultValue.SINREGISTRO_GLOBAL, observacionesGO = "",

    cabezaRS = false, ojosRS = false, oidosRS = false, narizRS = false, bocaRS = false, gargantaRS = false, cuellosRS = false,
    cardioRS = false, gastrointestinalRS = false, genitoUrinarioRS = false, osteoRS = false, neuroRS = false, pielRS = false,
    psiquiatricoRS = false, observacionRS = "",

    taSentadoEF = "", taAcostadoEF = "", pulsoEF = 0, fcef = 0, fref = 0, temperaturaEF = 0, pesoEF = 0, tallaEF = 0, imcef = 0,
    clasificacionEF = "", idBiotipoEF = DefaultValue.SINREGISTRO_GLOBAL,

    estadoNitricionalEF = false, pielFaneraEF = false, craneoEF = false, parpadoEF = false, conjuntivasEF = false, corniasEF = false,
    pupilasEF = false, reflejoFotomotorEF = false, reflejoCornialEF = false, fondoOjosEF = false, inspeccionEF = false,
    otoscopiaEF = false, inspeccionNarizEF = false, rinoscopioEF = false, labiosEF = false, mucosaEF = false, enciasEF = false,
    paladarEF = false, dientesEF = false, lenguaEF = false, faringeEF = false, amigdalasEF = false, cuellosEF = false,
    inspeccionToraxEF = false, auscultacionCardiacaEF = false, auscultacionRespiratoriaEF = false, inspeccionAbdomenEF = false,
    palpacionAbdomenEF = false, exploracionHigadoEF = false, exploracionVasoEF = false, exploracionRinionesEF = false,
    anillosInguinalesEF = false, anilloUmbilicalEF = false, genitalesExternosEF = false, regionAnalEF = false, tactoRectalEF = false,
    tactoVaginalEF = false, extremidadesSuperioresEF = false, extremidadesInferioresEF = false, pulsosEF = false,
    columnaVertebralEF = false, articulacionesEF = false, especifiqueEMEFU = "",

    movilidadEFU = false, equilibrioEFU = false, marchaEFU = false, movilidadHombroEFU = false, movilidadCodoEFU = false,
    movilidadMuniecaEFU = false, signoTinelEFU = false, signoPhalenEFU = false, movilidadManosEFU = false, movilidadCaderaEFU = false,
    movilidadRodillaEFU = false, movilidadTobilloEFU = false, movilidadCuelloEFU = false, rotVisipitalEFU = false,
    rotRotuleanoEFU = false, extencionEFU = false, sensibilidadCaraAnteriorEFU = false, eversionPiesEFU = false,
    sensibilidadCaraLateralEFU = false, rotAquileanoEFU = false, signoLasegueEFU = false, indiceWellsEFU = false, valorIndiceWellsEFU = "", observacionEFU = "",

    fechaRxToraxEPA, resultadoRxToraxEPA = 4017, observacionesRxToraxEPA = "",
    fechaEspirometriaEPA, resultadoEspirometriaEPA = 4017, observacionesEspirometriaEPA = "",
    fechaAudiometriaEPA, resultadoAudiometriaEPA = 4017, observacionesAudiometriaEPA = "",
    fechaVisiometriaEPA, resultadoVisiometriaEPA = 4017, observacionesVisiometriaEPA = "",
    fechaLaboratorioClinicoEPA, resultadoLaboratorioClinicoEPA = 4017, observacionesLaboratorioClinicoEPA = "",
    fechaCuestionarioSintomaEPA, resultadoCuestionarioSintomaEPA = 9514, observacionesCuestionarioSintomaEPA = "",
    fechaEkgEPA, resultadoEkgEPA = 4017, observacionesEkgEPA = "",
    fechaRnmLumbosacraEPA, resultadoRnmLumbosacraEPA = 4017, observacionesRnmLumbosacraEPA = "",
    fechaRnmCervicalEPA, resultadoRnmCervicalEPA = 4017, observacionesRnmCervicalEPA = "", observacionEPA = "",

    dx1 = "", dx2 = "", dx3 = "", observacionID = "", recomendacionesID = "", idConceptoActitudID = DefaultValue.SINREGISTRO_GLOBAL,

    fechaConceptoNETA = null, conceptoAplazadoNETA = DefaultValue.SINREGISTRO_GLOBAL,
    conceptoActitudNETA = DefaultValue.SINREGISTRO_GLOBAL, idConceptoEspacioConfinado = DefaultValue.SINREGISTRO_GLOBAL,
    motivoAplazoNETA = "", descripcionResultadoNETA = "", recomendacionesNETA = "",
    remitidoNETA = DefaultValue.SINREGISTRO_GLOBAL, remididoDondeNETA = DefaultValue.SINREGISTRO_GLOBAL,

    idRiesgoCardiovascularNEMTA = DefaultValue.SINREGISTRO_GLOBAL, idClasificacionNEMTA = DefaultValue.SINREGISTRO_GLOBAL,

    idMenorEdadNEMTA = false, idMujerEmbarazadaNEMTA = false, idArimiaNEMTA = false, idEnfermedadNEMTA = false, idHistoriaNEMTA = false,
    idHipertensionNEMTA = false, idHipertrigliceridemiaNEMTA = false, idCifrasNEMTA = false, idDiabetesNEMTA = false,
    idDislipidemiaNEMTA = false, idDiagnosticoNEMTA = false, idRiesgoCardiovascular1NEMTA = false, idRiesgoCardiovascular2NEMTA = false,
    idHipertiroidismoNEMTA = false, idAlteracionAuditivaNEMTA = false, idVertigoAlteracionesNEMTA = false, idEpilegsiaNEMTA = false,
    idCegueraTemporalNEMTA = false, idHistoriaFobiasNEMTA = false, idTranstornoPsiquiatricoNEMTA = false,
    idLimitacionesNEMTA = false, idObesidadMorbidaNEMTA = false, idDeformaTemporalNEMTA = false, idOtrasAlteracionesNEMTA = false,
    observacionesNEMTA = "", conceptoActitudMedicoNEMTA = DefaultValue.SINREGISTRO_GLOBAL,

    fechaFRA = null, tencionFRA = "", idTencionArterialFRA = DefaultValue.SINREGISTRO_GLOBAL,
    idAntecedenteCardiovascularFRA = "", idDeporteFRA = DefaultValue.SINREGISTRO_GLOBAL, idBebidaFRA = DefaultValue.SINREGISTRO_GLOBAL,
    fechaLaboratorioFRA = null, colesterolTotalFRA = 0, hdlfra = 0, triglicericosFRA = 0, idMetabolicoFRA = "",
    glisemiaFRA = 0, fumaFRA = DefaultValue.SINREGISTRO_GLOBAL, observacionFRA = "",

    ldlfra = 0, relacionFRA = "",
    frlEdadFRA = 0, frlColesterolFRA = 0, frhdlfra = 0, frGlisemiaFRA = 0, frTencionFRA = 0, frTabaquismoFRA = 0, puntajeFRA = 0, riesgoAbsolutoFRA = 0,
    riesgoRelativoFRA = "", interpretacionFRA = "", usuarioRegistro, fechaRegistro, usuarioModifico, fechaModifico,

    /* SINTOMAS RESPIRATORIOS */
    tosAUsualSin = false, tosEnLaSemanaSintR = false, tosMananaSintR = false, tosConsecutivaSintR = false, anosConTosSintR = 0,

    esputoASintR = false, esputoBSintR = false, esputoCSintR = false, esputoDSintR = false, esputoESintR = "",

    episoTosEspuASintR = false, episoTosEsputoBSintR = "",

    sibilanciasASintR = false, sibilanciasA1SintR = false, sibilanciasA2SintR = false, sibilanciasA3SintR = false, sibilanciasBSintR = "",

    ataquesSilbiASintR = false, ataquesSilbiBSintR = "", ataquesSilbiCSintR = false, ataquesSilbiDSintR = false,

    otrasEnfInhaASintR = false, otrasEnfInhaBSintR = false, otrasEnfInhaDescriSintR = "",

    disneaASintR = false, disneaBSintR = false, disneaCSintR = false, disneaDSintR = false, disneaESintR = false,

    enferToraxASintR = false, enferToraxBSintR = false, enferToraxCSintR = false, enferToraxD = "",

    antecedentesASintR = false,

    antecedentesB1SintR = false, antecedentesB1ASintR = "", antecedentesB2Sintr = false, antecedentesB2ASintR = "",

    antecedentesB3SintR = false, antecedentesB3ASintR = "", antecedentesB3BSintR = false, antecedentesB3CSintR = "",

    antecdentesB4SintR = false, antecedenteB4ASintR = "", antecedentesB4BSintR = false, antecedentesB4CSintR = "",

    antecedentesB5SintR = false, antecedentesB5ASintR = "", antecedentesB5BSintR = false, antecedentesB5CSintR = "",

    otrasEnfToraxA = false, otrasEnfToraxB = "", ciruToraxASintR = false, ciruToraxBSintR = "",

    traumaToraxASintR = false, traumaToraxBSintR = "", problemCoraASintR = false, problemCoraBSintR = "",

    problemaCoraCSintR = false, presionAltaASintR = false, presionAltaBSintR = false,

    historiaOcupASintR = false, historiaOcupBSintR = false, historiaOcupB1SintR = "", historiaOcupB2SintR = "",
    historiaOcupB3SintR = DefaultValue.SINREGISTRO_GLOBAL, historiaOcupCSintR = false, historiaOcupC1SintR = "",
    historiaOcupC2SintR = "", historiaOcupC3SintR = DefaultValue.SINREGISTRO_GLOBAL, historiaOcupD1SintR = "",
    historiaOcupD2SintR = "", historiaOcupD3 = "",

    tabaquismoASintR = false, tabaquismoBSintR = false, tabaquismoCSintR = "", tabaquismoDSintR = "", tabaquismoESintR = "",

    actDeportASintR = false, actDeporA1SintR = "", actDeporA2SintR = "", actDeporA3SintR = "", actDeporA4SintR = "",

    recoSintR = "",

    parentesco1ANFA = 9537, parentesco1ObserANFA = "",
    parentesco2ANFA = 9537, parentesco2ObserANFA = "",
    parentesco3ANFA = 9537, parentesco3ObserANFA = "",
    parentesco4ANFA = 9537, parentesco4ObserANFA = "",
    lateralidadExamenesFisico = DefaultValue.SINREGISTRO_GLOBAL
) {
    return {
        id, idRegistroAtencion, documento, fecha, idAtencion, congenitosAP, inmunoPrevenibleAP, infecciososAP,
        ojoAP, agudezaVisualAP, oidosAP, nasoFaringeAP, cardiovascularAP, pulmonarAP, gastrointestinalAP, gimitoUrinarioAP,
        neurologicoAP, transtornoPielAP, osteoMuscularAP, alergicosAP, toxicoAP, faRmacologicosAP, quirurgicosAP,
        traumaticosAP, tranfuccionesAP, etsAP, deformidadesAP, psiquiatricosAP, farmacoDependenciaAP, emAP, renalAP,
        asmaAP, orlAP, cancerAP, especifiqueAP, anioAT, especifiqueAT, anio1AT, especifique1AT, tetanoIM, influenzaIM,
        fiebreAmarillaIM, rubeolaSarampionIM, covid19IM, otrasIM, anioVacuna1IM, anioVacuna2IM, anioVacuna3IM,
        anioVacuna4IM, anioVacuna5IM, idRefuerzoIM, anioVacuna6IM, fumaHB, cigarrillosDiasFumaHB, aniosCigaFumaHB, mesesCigaFumaHB,
        observacionFumaHB, fumabaHB, cigarrillosDiasFumabaHB, aniosCigaFumabaHB, mesesCigaFumabaHB, observacionFumabaHB,
        practicaDeporteHB, idFrecuenciaDeporteHB, idCualDeporteHB, observacionPracticaDeporHB, hobbiesPasatiempoHB, cualHobbiesHB,
        consumeBebidasAlcoholicasHB, idFrecuenciaBebidaAlHB, cualBebidasAlHB, fobiasHB, tipoFobiaHB, cualFobiaHB,

        menarquiaGO, idCiclosGO, duracionGO, amenoreaGO, disminureaGO, leucoreaGO, vidaMaritalGO, vidaObstetricaGO,
        ggo, pgo, ago, csgo, vgo, fupgo, furgo, etsgo, cualgo, quisteOvariosBiomasGO, endometriosisGO, epigo,
        planificaGO, idMetodoGO, ultimoAnioCitologiaGO, idResultadoGO, observacionesGO,

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
        indiceWellsEFU, valorIndiceWellsEFU, observacionEFU, fechaRxToraxEPA, resultadoRxToraxEPA, observacionesRxToraxEPA, fechaEspirometriaEPA,
        resultadoEspirometriaEPA, observacionesEspirometriaEPA, fechaAudiometriaEPA, resultadoAudiometriaEPA,
        observacionesAudiometriaEPA, fechaVisiometriaEPA, resultadoVisiometriaEPA, observacionesVisiometriaEPA, fechaLaboratorioClinicoEPA,
        resultadoLaboratorioClinicoEPA, observacionesLaboratorioClinicoEPA, fechaCuestionarioSintomaEPA, resultadoCuestionarioSintomaEPA,
        observacionesCuestionarioSintomaEPA, fechaEkgEPA, resultadoEkgEPA, observacionesEkgEPA, fechaRnmLumbosacraEPA, resultadoRnmLumbosacraEPA,
        observacionesRnmLumbosacraEPA, fechaRnmCervicalEPA, resultadoRnmCervicalEPA, observacionesRnmCervicalEPA, observacionEPA,

        dx1, dx2, dx3, observacionID, recomendacionesID, idConceptoActitudID, fechaConceptoNETA, conceptoAplazadoNETA, conceptoActitudNETA,
        idConceptoEspacioConfinado,

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
        parentesco4ANFA, parentesco4ObserANFA, lateralidadExamenesFisico
    };
}