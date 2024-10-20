import { GetEdad, ViewFormat } from "components/helpers/Format";
import jsPDF from "jspdf";
import ImgWhite from "assets/img/ImgWhite.png";
import { DefaultValue } from "components/helpers/Enums";
import autoTable from 'jspdf-autotable';
import config from "config";

function getFirma(doc = new jsPDF(), lsDataUser, my = 0) {
  doc.addImage(
    `${lsDataUser.firma}`,
    "PNG",
    5,
    doc.internal.pageSize.height - (70 - my),
    50,
    20
  );
  doc.setLineWidth(0.5);
  doc.setDrawColor(128, 128, 128);
  doc.line(
    5,
    doc.internal.pageSize.height - (48 - my),
    60,
    doc.internal.pageSize.height - (48 - my)
  );
  doc.setFontSize(8);
  doc.text(`${lsDataUser.nombre}`, 5, doc.internal.pageSize.height - (44 - my));
  doc.text(`${lsDataUser.nameEspecialidad}`, 5, doc.internal.pageSize.height - (40 - my));
  doc.text(
    `${lsDataUser.licencia} - ${lsDataUser.registroMedico}`,
    5,
    doc.internal.pageSize.height - (36 - my)
  );
}

function getFirmaEmployee(doc, lsDataReport, my = 0) {
  doc.addImage(
    ImgWhite,
    "PNG",
    130,
    doc.internal.pageSize.height - (70 - my),
    50,
    20
  );
  doc.setLineWidth(0.5);
  doc.setDrawColor(128, 128, 128);
  doc.line(
    130,
    doc.internal.pageSize.height - (48 - my),
    195,
    doc.internal.pageSize.height - (48 - my)
  );
  doc.setFontSize(8);
  doc.text(
    `${lsDataReport.nameEmpleado}`,
    130,
    doc.internal.pageSize.height - (44 - my)
  );
  doc.text(`FIRMA DEL ${lsDataReport.nameTipoContrato}`, 130, doc.internal.pageSize.height - (40 - my));
}

function generateImmunization(doc = new jsPDF(), lsDataReport) {
  const vacunas = [
    {
      vacuna: lsDataReport.tetanoIM,
      anio: lsDataReport.anioVacuna1IM,
      name: "TETANO",
      refuerzo: "",
    },
    {
      vacuna: lsDataReport.influenzaIM,
      anio: lsDataReport.anioVacuna2IM,
      name: "INFLUENZA",
      refuerzo: "",
    },
    {
      vacuna: lsDataReport.fiebreAmarillaIM,
      anio: lsDataReport.anioVacuna3IM,
      name: "FIEBRE AMARILLA",
      refuerzo: "",
    },
    {
      vacuna: lsDataReport.rubeolaSarampionIM,
      anio: lsDataReport.anioVacuna4IM,
      name: "RUBÉOLA SARAMPIÓN",
      refuerzo: "",
    },
    {
      vacuna: lsDataReport.covid19IM,
      anio: lsDataReport.anioVacuna5IM,
      name: "COVID-19",
      refuerzo: `REFUERZOS:  ${lsDataReport.nameRefuerzoIM}`,
    },
    {
      vacuna: lsDataReport.otrasIM,
      anio: lsDataReport.anioVacuna6IM,
      name: "OTRAS",
      refuerzo: `${lsDataReport.vacunaBCGIM !== "" ? lsDataReport.vacunaBCGIM + ((lsDataReport.vacunaVHBIM !== '' || lsDataReport.vacunaVHCIM !== '') ? ' - ' : "") : ""}${lsDataReport.vacunaVHBIM !== "" ? lsDataReport.vacunaVHBIM + ((lsDataReport.vacunaBCGIM !== '' || lsDataReport.vacunaVHCIM !== '') ? ' - ' : "") : ""}${lsDataReport.vacunaVHCIM !== "" ? lsDataReport.vacunaVHCIM : ""}`,
    },
  ];

  if (
    lsDataReport.tetanoIM ||
    lsDataReport.influenzaIM ||
    lsDataReport.fiebreAmarillaIM ||
    lsDataReport.rubeolaSarampionIM ||
    lsDataReport.covid19IM ||
    lsDataReport.otrasIM
  ) {
    doc.setFont("helvetica", "bold");
    doc.text("VACUNAS", 7, 220);
    doc.text("AÑOS", 50, 220);

    doc.setFont("helvetica", "normal");
    doc.text(
      vacunas
        .filter((vacu) => vacu.vacuna === true)
        .map((vacu, index) => {
          return String(`${vacu.name}`);
        }),
      7,
      230,
      { maxWidth: 200, lineHeightFactor: 2 }
    );

    doc.text(
      vacunas
        .filter((vacu) => vacu.vacuna === true)
        .map((vacu, index) => {
          return String(`${vacu.anio}`);
        }),
      50,
      230,
      { maxWidth: 200, lineHeightFactor: 2 }
    );

    doc.text(
      vacunas
        .filter((vacu) => vacu.vacuna === true)
        .map((vacu, index) => {
          return String(`${vacu.refuerzo}`);
        }),
      100,
      230,
      { maxWidth: 200, lineHeightFactor: 2 }
    );
  } else {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("NO REFIERE", 12, 230);
  }
}

function generateParentesco(doc = new jsPDF(), lsDataReport) {
  const parentesco = [
    {
      name: lsDataReport.nameParentesco1ANFA,
      observacion: lsDataReport.parentesco1ObserANFA,
    },
    {
      name: lsDataReport.nameParentesco2ANFA,
      observacion: lsDataReport.parentesco2ObserANFA,
    },
    {
      name: lsDataReport.nameParentesco3ANFA,
      observacion: lsDataReport.parentesco3ObserANFA,
    },
    {
      name: lsDataReport.nameParentesco4ANFA,
      observacion: lsDataReport.parentesco4ObserANFA,
    },
  ];

  if (
    lsDataReport.nameParentesco1ANFA !== "SIN REGISTRO" ||
    lsDataReport.nameParentesco2ANFA !== "SIN REGISTRO" ||
    lsDataReport.nameParentesco3ANFA !== "SIN REGISTRO" ||
    lsDataReport.nameParentesco4ANFA !== "SIN REGISTRO"
  ) {
    doc.setFont("helvetica", "bold");
    doc.text("PARENTESCO", 7, 124);
    doc.text("OBSERVACIÓN", 50, 124);

    doc.setFont("helvetica", "normal");

    doc.text(
      parentesco
        .filter((paren) => paren.name !== "SIN REGISTRO")
        .map((paren, index) => {
          return String(`${paren.name}`);
        }),
      7,
      130,
      { maxWidth: 200, lineHeightFactor: 2 }
    );

    doc.text(
      parentesco
        .filter((paren) => paren.name !== "SIN REGISTRO")
        .map((paren, index) => {
          return String(`${paren.observacion}`);
        }),
      50,
      130,
      { maxWidth: 200, lineHeightFactor: 2 }
    );
  } else {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    // doc.text("NO REFIERE", 12, 200);
  }
}

function generateGineco(doc = new jsPDF(), lsDataReport) {
  if (lsDataReport.idGenero === DefaultValue.GeneroWomen) {
    var marXR = doc.internal.pageSize.width - 5;
    doc.setFont("helvetica", "bold");
    /* GINECO OBSTÉTRICOS */
    doc.text("1. MENARQUÍA:", 7, 164);
    doc.text("2. CICLOS:", 7, 169);
    doc.text("3. DATOS:", 7, 174);
    doc.text("AMENOREA:", 40, 174);
    doc.text("4. VIDA MARITAL:", 7, 179);
    doc.text("5. G:", 7, 184);
    doc.text("P:", 40, 184);
    doc.text("6. FUP:", 7, 189);
    /* SEGUNDA COLUMNA DE GINECO OBSTÉTRICOS */
    doc.text("DURACIÓN:", 76, 169);
    doc.text("DISMENORREA:", 76, 174);
    doc.text("LEUCORREA:", 112, 174);
    doc.text("VIDA OBSTÉTRICA:", 76, 179);
    doc.text("A:", 76, 184);
    doc.text("C:", 112, 184);
    doc.text("V:", 138, 184);
    doc.text("FUR:", 76, 189);
    /* TERCERA COLUMNA DE GINECO OBSTÉTRICOS */
    doc.text("7. ETS:", 150, 164);
    doc.text("8. QUISTE DE OVARIOS - MIOMAS:", 150, 169);
    doc.text("9. ENDOMETRIOSIS:", 150, 174);
    doc.text("10. PLANIFICA:", 150, 179);
    doc.text("METODO:", 150, 184);
    doc.text("11. ULTIMA CITOLOGÍA - AÑO:", 150, 189);
    doc.text("RESULTADO:", 7, 197);

    doc.line(5, 205, marXR, 205); /* HORI TWO */
    doc.line(5, 213, marXR, 213); /* HORI TWO */

    doc.text("OBSERVACIONES:", 7, 210);

    doc.setFont("helvetica", "normal");
    /* RENDERIZADO DE GINECO */
    doc.text(`${lsDataReport.menarquiaGO}`, 40, 164);
    doc.text(`${lsDataReport.nameCiclosGO}`, 40, 169);
    doc.text(`${lsDataReport.amenoreaGO}`, 64, 174);
    doc.text(`${lsDataReport.vidaMaritalGO}`, 40, 179);
    doc.text(`${lsDataReport.ggo}`, 13, 184);
    doc.text(`${lsDataReport.pgo}`, 45, 184);
    doc.text(`${ViewFormat(lsDataReport.fupgo)}`, 40, 189);
    /* SEGUNDA COLUMNA GINECO OBSTÉTRICOS */
    doc.text(`${lsDataReport.duracionGO}`, 112, 169);
    doc.text(`${lsDataReport.disminureaGO}`, 102, 174);
    doc.text(`${lsDataReport.leucoreaGO}`, 138, 174);
    doc.text(`${lsDataReport.vidaObstetricaGO}`, 112, 179);
    doc.text(`${lsDataReport.ago}`, 81, 184);
    doc.text(`${lsDataReport.csgo}`, 117, 184);
    doc.text(`${lsDataReport.vgo}`, 143, 184);
    doc.text(`${ViewFormat(lsDataReport.furgo)}`, 112, 189);
    /* TERCERA COLUMNA GINECO OBSTÉTRICOS */
    doc.text(`${lsDataReport.etsgo}`, 185, 164);
    doc.text(`${lsDataReport.quisteOvariosBiomasGO}`, 200, 169);
    doc.text(`${lsDataReport.endometriosisGO}`, 185, 174);
    doc.text(`${lsDataReport.planificaGO}`, 185, 179);
    doc.text(`${lsDataReport.nameMetodoGO}`, 185, 184);
    doc.text(`${lsDataReport.ultimoAnioCitologiaGO}`, 195, 189);

    doc.text(`${lsDataReport.nameResultadoGO}`, 30, 197);

    doc.text(`${lsDataReport.observacionesGO}`, 7, 218, { maxWidth: 200, lineHeightFactor: 1.5, });
  } else {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("NO APLICA", 12, 167);
  }
}

function generatePhysicalExam(doc = new jsPDF(), lsDataReport) {
  var marXR = doc.internal.pageSize.width - 5;

  doc.setFont("helvetica", "bold");
  doc.line(110, 108, 110, 132); /* VERTI ONE */

  doc.line(24, 116, 24, 132); /* VERTI ONE */
  doc.line(47, 116, 47, 132); /* VERTI TWO */
  doc.line(66, 116, 66, 132); /* VERTI THREE */
  doc.line(80, 116, 80, 132); /* VERTI FOUR */
  doc.line(93, 116, 93, 132); /* VERTI FIVE */

  doc.line(128, 116, 128, 132); /* VERTI ONE */
  doc.line(147, 116, 147, 132); /* VERTI TWO */
  doc.line(158, 116, 158, 132); /* VERTI THREE */
  doc.line(191, 116, 191, 132); /* VERTI FOUR */

  doc.line(5, 116, marXR, 116); /* HORI ONE */
  doc.line(5, 124, marXR, 124); /* HORI TWO */

  doc.text("6.2 SIGNOS VITALES - TENSIÓN ARTERIAL", 7, 113);
  doc.text("6.3 ANTROPOMETRIA", 112, 113);

  doc.text("SENTADO", 7, 121);
  doc.text("ACOSTADO", 27, 121);
  doc.text("PULSO", 51, 121);
  doc.text("FC", 71, 121);
  doc.text("FR", 84, 121);
  doc.text("T. °C", 98, 121);

  doc.text("PESO (KG)", 112, 121);
  doc.text("TALLA (M)", 130, 121);
  doc.text("IMC", 149, 121);
  doc.text("CLASIFICACIÓN", 160, 121);
  doc.text("BIOTIPO", 195, 121);

  doc.setFont("helvetica", "normal");
  doc.text(`${lsDataReport.taSentadoEF}`, 7, 128);
  doc.text(`${lsDataReport.taAcostadoEF}`, 27, 128);
  doc.text(`${lsDataReport.pulsoEF}`, 51, 128);
  doc.text(`${lsDataReport.fcef}`, 71, 128);
  doc.text(`${lsDataReport.fref}`, 84, 128);
  doc.text(`${lsDataReport.temperaturaEF}`, 98, 128);

  doc.text(`${lsDataReport.pesoEF}`, 112, 128);
  doc.text(`${lsDataReport.tallaEF}`, 132, 128);
  doc.text(`${lsDataReport.imcef}`, 149, 128);
  doc.text(`${lsDataReport.clasificacionEF}`, 160, 128);
  doc.text(`${lsDataReport.nameBiotipoEF}`, 192, 128);
}

function generateExploracionMorfologica(doc = new jsPDF(), lsDataReport) {
  const marXR = doc.internal.pageSize.width - 5;
  doc.setFont("helvetica", "bold");

  /* PRIMERA COLUMNA */
  doc.text("1. ESTADO NUTRICIONAL", 7, 145);
  doc.text("2. PIEL FANERAS ", 7, 150);
  doc.text("3. CRÁNEO", 7, 155);
  doc.text("4. PARPADOS", 7, 160);
  doc.text("5. CONJUNTIVAS", 7, 165);
  doc.text("6. CORNEAS", 7, 170);
  doc.text("7. PUPILAS", 7, 175);
  doc.text("8. REFLEJO FOTOMOTOR", 7, 180);
  doc.text("9. REFLEJO CORNEAL", 7, 185);
  doc.text("10. FONDO OJOS", 7, 190);
  doc.text("11. INSPECCIÓN EXTERNA OÍDOS", 7, 195);
  doc.text("12. OTOSCOPIA", 7, 200);
  doc.text("13. INSPECCIÓN EXTERNA NARIZ", 7, 205);
  doc.text("14. RINOSCOPIA", 7, 210);
  /* SEGUNDA COLUMNA */
  doc.text("15. LABIOS", 72, 145);
  doc.text("16. MUCOSA ORAL", 72, 150);
  doc.text("17. ENCÍAS", 72, 155);
  doc.text("18. PALADAR", 72, 160);
  doc.text("19. DIENTES ", 72, 165);
  doc.text("20. LENGUA", 72, 170);
  doc.text("21. FARINGE", 72, 175);
  doc.text("22. AMÍGDALAS", 72, 180);
  doc.text("23. CUELLO - TIROIDES ", 72, 185);
  doc.text("24. INSPECCIÓN DE TORAX-MAMAS ", 72, 190);
  doc.text("25. AUSCULTACIÓN CARDIACA", 72, 195);
  doc.text("26. AUSCULTACIÓN RESPIRATORIA", 72, 200);
  doc.text("27. INSPECCIÓN ABDOMEN", 72, 205);
  doc.text("28. PALPACIÓN ABDOMEN", 72, 210);
  /* TERCERA COLUMNA */
  doc.text("29. EXPLORACIÓN DE HÍGADO", 142, 145);
  doc.text("30. EXPLORACIÓN DE BAZO", 142, 150);
  doc.text("31. EXPLORACIÓN DE RIÑONES", 142, 155);
  doc.text("32. ANILLOS INGUINALES", 142, 160);
  doc.text("33. ANILLO UMBILICAL", 142, 165);
  doc.text("34. GENITALES EXTERNOS", 142, 170);
  doc.text("35. REGIÓN ANAL", 142, 175);
  doc.text("36. TACTO RECTAL", 142, 180);
  doc.text("37. TACTO VAGINAL", 142, 185);
  doc.text("38. EXTREMIDADES SUPERIORES", 142, 190);
  doc.text("39. EXTREMIDADES INFERIORES", 142, 195);
  doc.text("40. PULSOS", 142, 200);
  doc.text("41. COLUMNA VERTEBRAL", 142, 205);
  doc.text("42. ARTICULACIONES", 142, 210);

  doc.text("OBSERVACIONES:", 7, 217);

  /* RENDERIZADO DE DATOS */
  doc.setFont("helvetica", "normal");
  /* PRIMERA COLUMNA */
  doc.text(`${lsDataReport.estadoNitricionalEF}`, 68, 145, { align: "right" });
  doc.text(`${lsDataReport.pielFaneraEF}`, 68, 150, { align: "right" });
  doc.text(`${lsDataReport.craneoEF}`, 68, 155, { align: "right" });
  doc.text(`${lsDataReport.parpadoEF}`, 68, 160, { align: "right" });
  doc.text(`${lsDataReport.conjuntivasEF}`, 68, 165, { align: "right" });
  doc.text(`${lsDataReport.corniasEF}`, 68, 170, { align: "right" });
  doc.text(`${lsDataReport.pupilasEF}`, 68, 175, { align: "right" });
  doc.text(`${lsDataReport.reflejoFotomotorEF}`, 68, 180, { align: "right" });
  doc.text(`${lsDataReport.reflejoCornialEF}`, 68, 185, { align: "right" });
  doc.text(`${lsDataReport.fondoOjosEF}`, 68, 190, { align: "right" });
  doc.text(`${lsDataReport.inspeccionEF}`, 68, 195, { align: "right" });
  doc.text(`${lsDataReport.otoscopiaEF}`, 68, 200, { align: "right" });
  doc.text(`${lsDataReport.inspeccionNarizEF}`, 68, 205, { align: "right" });
  doc.text(`${lsDataReport.rinoscopioEF}`, 68, 210, { align: "right" });
  /* SEGUNDA COLUMNA */
  doc.text(`${lsDataReport.labiosEF}`, 138, 145, { align: "right" });
  doc.text(`${lsDataReport.mucosaEF}`, 138, 150, { align: "right" });
  doc.text(`${lsDataReport.enciasEF}`, 138, 155, { align: "right" });
  doc.text(`${lsDataReport.paladarEF}`, 138, 160, { align: "right" });
  doc.text(`${lsDataReport.dientesEF}`, 138, 165, { align: "right" });
  doc.text(`${lsDataReport.lenguaEF}`, 138, 170, { align: "right" });
  doc.text(`${lsDataReport.faringeEF}`, 138, 175, { align: "right" });
  doc.text(`${lsDataReport.amigdalasEF}`, 138, 180, { align: "right" });
  doc.text(`${lsDataReport.cuellosEF}`, 138, 185, { align: "right" });
  doc.text(`${lsDataReport.inspeccionToraxEF}`, 138, 190, { align: "right" });
  doc.text(`${lsDataReport.auscultacionCardiacaEF}`, 138, 195, {
    align: "right",
  });
  doc.text(`${lsDataReport.auscultacionRespiratoriaEF}`, 138, 200, {
    align: "right",
  });
  doc.text(`${lsDataReport.inspeccionAbdomenEF}`, 138, 205, { align: "right" });
  doc.text(`${lsDataReport.palpacionAbdomenEF}`, 138, 210, { align: "right" });
  /* TERCERA COLUMNA */
  doc.text(`${lsDataReport.exploracionHigadoEF}`, marXR - 2, 145, {
    align: "right",
  });
  doc.text(`${lsDataReport.exploracionVasoEF}`, marXR - 2, 150, {
    align: "right",
  });
  doc.text(`${lsDataReport.exploracionRinionesEF}`, marXR - 2, 155, {
    align: "right",
  });
  doc.text(`${lsDataReport.anillosInguinalesEF}`, marXR - 2, 160, {
    align: "right",
  });
  doc.text(`${lsDataReport.anilloUmbilicalEF}`, marXR - 2, 165, {
    align: "right",
  });
  doc.text(`${lsDataReport.genitalesExternosEF}`, marXR - 2, 170, {
    align: "right",
  });
  doc.text(`${lsDataReport.regionAnalEF}`, marXR - 2, 175, { align: "right" });
  doc.text(`${lsDataReport.tactoRectalEF}`, marXR - 2, 180, { align: "right" });
  doc.text(`${lsDataReport.nameGenero === 'FEMENINO' ? lsDataReport.tactoVaginalEF : 'NO APLICA'}`, marXR - 2, 185, {
    align: "right",
  });
  doc.text(`${lsDataReport.extremidadesSuperioresEF}`, marXR - 2, 190, {
    align: "right",
  });
  doc.text(`${lsDataReport.extremidadesInferioresEF}`, marXR - 2, 195, {
    align: "right",
  });
  doc.text(`${lsDataReport.pulsosEF}`, marXR - 2, 200, { align: "right" });
  doc.text(`${lsDataReport.columnaVertebralEF}`, marXR - 2, 205, {
    align: "right",
  });
  doc.text(`${lsDataReport.articulacionesEF}`, marXR - 2, 210, {
    align: "right",
  });

  doc.text(`${lsDataReport.especifiqueEMEFU}`, 7, 222, {
    maxWidth: 200,
    lineHeightFactor: 1.5,
  });
}

function generateExamenParaclinico(doc = new jsPDF(), lsDataReport) {
  doc.setFont("helvetica", "bold");
  doc.text("FECHA", 7, 132);
  doc.text("ESTUDIO", 30, 132);
  doc.text("RESULTADO", 68, 132);
  doc.text("OBSERVACIÓN", 90, 132);

  var marXR = doc.internal.pageSize.width - 5;

  const examenes = [
    {
      fecha: lsDataReport.fechaRxToraxEPA,
      estudio: "RX TORAX",
      resultado: lsDataReport.nameResultadoRxToraxEPA,
      observacion: lsDataReport.observacionesRxToraxEPA,
    },
    {
      fecha: lsDataReport.fechaEspirometriaEPA,
      estudio: "ESPIROMETRÍA",
      resultado: lsDataReport.nameResultadoEspirometriaEPA,
      observacion: lsDataReport.observacionesEspirometriaEPA,
    },
    {
      fecha: lsDataReport.fechaAudiometriaEPA,
      estudio: "AUDIOMETRÍA",
      resultado: lsDataReport.nameResultadoAudiometriaEPA,
      observacion: lsDataReport.observacionesAudiometriaEPA,
    },
    {
      fecha: lsDataReport.fechaVisiometriaEPA,
      estudio: "VISIOMETRÍA",
      resultado: lsDataReport.nameResultadoVisiometriaEPA,
      observacion: lsDataReport.observacionesVisiometriaEPA,
    },
    {
      fecha: lsDataReport.fechaLaboratorioClinicoEPA,
      estudio: "LABORATORIO CLÍNICO",
      resultado: lsDataReport.nameResultadoLaboratorioClinicoEPA,
      observacion: lsDataReport.observacionesLaboratorioClinicoEPA,
    },
    {
      fecha: lsDataReport.fechaCuestionarioSintomaEPA,
      estudio: "CUESTIONARIO DE SINTOMAS",
      resultado: lsDataReport.nameResultadoCuestionarioSintomaEPA,
      observacion: lsDataReport.observacionesCuestionarioSintomaEPA,
    },
    {
      fecha: lsDataReport.fechaEkgEPA,
      estudio: "EKG",
      resultado: lsDataReport.nameResultadoEkgEPA,
      observacion: lsDataReport.observacionesEkgEPA,
    },
    {
      fecha: lsDataReport.fechaRnmLumbosacraEPA,
      estudio: "RNM LUMBOSACRA",
      resultado: lsDataReport.nameResultadoRnmLumbosacraEPA,
      observacion: lsDataReport.observacionesRnmLumbosacraEPA,
    },
    {
      fecha: lsDataReport.fechaRnmCervicalEPA,
      estudio: "RNM CERVICAL",
      resultado: lsDataReport.nameResultadoRnmCervicalEPA,
      observacion: lsDataReport.observacionesRnmCervicalEPA,
    },
  ];

  const longitud = examenes.filter((log) => log.resultado !== "SIN RESULTADO");
  doc.text("OBSERVACIONES:", 7, 137 + 6 * longitud.length);
  doc.line(5, 132 + 6 * longitud.length, marXR, 132 + 6 * longitud.length);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6);
  doc.text(`${lsDataReport.observacionEPA}`, 7, 142 + 6 * longitud.length);
  doc.text(
    examenes
      .filter((exam) => exam.resultado !== "SIN RESULTADO")
      .map((exam, index) => {
        return String(`${ViewFormat(exam.fecha)}`);
      }),
    7,
    137,
    { maxWidth: 200, lineHeightFactor: 2 }
  );
  doc.text(
    examenes
      .filter((exam) => exam.resultado !== "SIN RESULTADO")
      .map((exam, index) => {
        return String(`${exam.estudio}`);
      }),
    30,
    137,
    { maxWidth: 200, lineHeightFactor: 2 }
  );
  doc.text(
    examenes
      .filter((exam) => exam.resultado !== "SIN RESULTADO")
      .map((exam, index) => {
        return String(`${exam.resultado}`);
      }),
    68,
    137,
    { maxWidth: 200, lineHeightFactor: 2 }
  );

  doc.text(
    examenes
      .filter((exam) => exam.resultado !== "SIN RESULTADO")
      .map((exam, index) => {
        return String(`${exam.observacion}`);
      }),
    90,
    137,
    { maxWidth: 200, lineHeightFactor: 2 }
  );

  doc.setFontSize(11);
}

export function generateReportConceptAptitude(
  doc = new jsPDF(),
  lsDataReport = [],
  lsDataUser
) {
  var marXR = doc.internal.pageSize.width - 5;

  doc.text("CONCEPTO EXAMEN OCUPACIONAL", 7, 30);
  doc.text(
    `FECHA DE CONCEPTO:  ${ViewFormat(lsDataReport.fechaConceptoNETA)}`,
    doc.internal.pageSize.width - 7,
    30,
    { align: "right" }
  );

  doc.text("DATOS PERSONALES", 7, 37);
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);

  /* CUADRO DATOS */
  doc.line(5, 25, 5, 140); /* IZQUIERDA */
  doc.line(5, 32, marXR, 32); /* HORI ONE */
  doc.line(5, 39, marXR, 39); /* HORI TWO  */
  doc.line(5, 90, marXR, 90); /* HORI THREE */
  doc.line(5, 98, marXR, 98); /* HORI FOUR */

  doc.line(5, 140, marXR, 140); /* HORI FIVE */
  doc.line(40, 39, 40, 90); /* LINEA VERTI ONE */
  doc.line(marXR, 25, marXR, 140); /* DERECHA */

  /* TITULOS DE CONTENIDO */
  doc.text("DOCUMENTO:", 45, 45);
  doc.text("NOMBRE:", 120, 45);

  doc.text(`${lsDataReport.nameAtencion === "INGRESO" ? "CARGO AL QUE ASPIRA:" : "CARGO:"}`, 45, 50);

  doc.text("PROFESIÓN:", 45, 55);
  doc.text("AREA:", 45, 60);
  doc.text("DEPARTAMENTO:", 45, 65);

  if (lsDataReport.nameAtencion !== 'EGRESO') {
    doc.text("CONCEPTO DE APTITUD:", 45, 70);

    if (lsDataReport.nameConceptoActitudNETA !== 'SIN REGISTRO' || lsDataReport.nameAtencion !== 'EGRESO') {
      doc.text(`${lsDataReport.nameConceptoActitudID}`, 95, 70, {
        maxWidth: 110,
        lineHeightFactor: 1.5,
      });
    }
  }

  doc.text("RECOMENDACIONES:", 7, 95);

  doc.setFont("helvetica", "normal");
  doc.addImage(`${lsDataReport.empleadoFoto}`, "JPEG", 7.5, 41, 30, 30);
  doc.text(`${lsDataReport.documento}`, 95, 45);

  doc.setFontSize(8);
  doc.text(`${lsDataReport.nameEmpleado}`, 142, 45);

  doc.setFontSize(10);
  doc.text(`${lsDataReport.nameCargo}`, 95, 50);
  doc.text(`${lsDataReport.nameOficio}`, 95, 55);
  doc.text(`${lsDataReport.nameArea}`, 95, 60);
  doc.text(`${lsDataReport.nameDepartamentoTrabajo}`, 95, 65);

  doc.setFontSize(9);
  doc.text(`${lsDataReport.recomendacionesID}`, 7, 105, {
    maxWidth: 200,
    lineHeightFactor: 1.5,
  });


  doc.text("Cordialmente,", 7, 200);
  getFirma(doc, lsDataUser);
}

export function generateReportDiagnosis(
  doc = new jsPDF(),
  lsDataReport = [],
  lsDataUser = []
) {
  var marXR = doc.internal.pageSize.width - 5;

  doc.text("CONCEPTO EXAMEN OCUPACIONAL", 7, 30);
  doc.text(
    `FECHA DE CONCEPTO:  ${ViewFormat(lsDataReport.fechaConceptoNETA)}`,
    doc.internal.pageSize.width - 7,
    30,
    { align: "right" }
  );

  doc.text("DATOS PERSONALES", 7, 37);
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);

  /* CUADRO DATOS */
  doc.line(5, 25, 5, 210); /* IZQUIERDA */
  doc.line(5, 32, marXR, 32); /* HORI ONE */
  doc.line(5, 39, marXR, 39); /* HORI TWO  */
  doc.line(5, 68, marXR, 68); /* HORI THREE */
  doc.line(5, 76, marXR, 76); /* HORI FOUR */
  doc.line(5, 95, marXR, 95); /* HORI FIVE */
  doc.line(5, 104, marXR, 104); /* HORI SIX */
  doc.line(5, 150, marXR, 150); /* HORI SEVEN */
  doc.line(5, 158, marXR, 158); /* HORI EIGHT */
  doc.line(5, 210, marXR, 210); /* HORI ULTIMA */
  doc.line(marXR, 25, marXR, 210); /* DERECHA */

  /* TITULOS DE CONTENIDO */
  doc.text("DOCUMENTO:", 7, 45);
  doc.text("NOMBRE:", 120, 45);
  doc.text(`${lsDataReport.nameAtencion === "INGRESO" ? "CARGO AL QUE ASPIRA:" : "CARGO:"}`, 7, 50);
  doc.text("PROFESIÓN:", 7, 55);
  doc.text("AREA:", 7, 60);
  doc.text("DEPARTAMENTO:", 7, 65);
  doc.text("CONCEPTO DE DIAGNÓSTICOS:", 7, 73);

  doc.text("RECOMENDACIONES DE DIAGNÓSTICOS:", 7, 101);
  doc.text(
    `RECOMENDACIONES PARA APTITUD DE ${lsDataReport.nameAtencion}`,
    7,
    155
  );

  /* RENDERIZADO */
  doc.setFont("helvetica", "normal");
  doc.text(`${lsDataReport.documento}`, 55, 45);

  doc.setFontSize(8);
  doc.text(`${lsDataReport.nameEmpleado}`, 142, 45);

  doc.setFontSize(10);
  doc.text(`${lsDataReport.nameCargo}`, 55, 50);
  doc.text(`${lsDataReport.nameOficio}`, 55, 55);
  doc.text(`${lsDataReport.nameArea}`, 55, 60);
  doc.text(`${lsDataReport.nameDepartamentoTrabajo}`, 55, 65);

  if (lsDataReport.dx1 !== "") {
    doc.text(
      `Dx1:   ${lsDataReport.dx1}   ${lsDataReport.nameDx1.toUpperCase()}`,
      7,
      80,
      { maxWidth: 200, lineHeightFactor: 1.5 }
    );
  }

  if (lsDataReport.dx2 !== "") {
    doc.text(
      `Dx2:   ${lsDataReport.dx2}   ${lsDataReport.nameDx2.toUpperCase()}`,
      7,
      85,
      { maxWidth: 200, lineHeightFactor: 1.5 }
    );
  }

  if (lsDataReport.dx3 !== "") {
    doc.text(
      `Dx3:   ${lsDataReport.dx3}   ${lsDataReport.nameDx3.toUpperCase()}`,
      7,
      90,
      { maxWidth: 200, lineHeightFactor: 1.5 }
    );
  }

  doc.text(`${lsDataReport.observacionID}`, 7, 110, {
    maxWidth: 200,
    lineHeightFactor: 1.5,
  });
  doc.text(`${lsDataReport.recomendacionesID}`, 7, 163, {
    maxWidth: 200,
    lineHeightFactor: 1.5,
  });

  doc.text("Cordialmente,", 7, 220);

  getFirma(doc, lsDataUser, 20);
  getFirmaEmployee(doc, lsDataReport, 20);
}

/* REPORTE DE RIESGOS OTRAS EMPRESA */
export function generateClinicHistoryOtherCompany(doc = new jsPDF(), lsDataReport = [], lsRiesgoHLDO = [], lsWorkHistoryOtherCompany = []) {
  var marXR = doc.internal.pageSize.width - 5;
  var longitud = lsWorkHistoryOtherCompany.length;

  doc.text(`TIPO DE EXAMEN:  ${lsDataReport.nameAtencion}`, 7, 30);
  doc.text(`FECHA:  ${ViewFormat(lsDataReport.fecha)}`, 110, 30, {
    align: "center",
  });
  doc.text(
    `VALORACIÓN MÉDICA NRO:  ${lsDataReport.id}`,
    doc.internal.pageSize.width - 7,
    30,
    { align: "right" }
  );

  doc.text("1. DATOS PERSONALES", 7, 37);
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);

  /* CUADRO DATOS */
  doc.line(5, 25, 5, 260); /* IZQUIERDA */

  doc.line(5, 32, marXR, 32); /* HORI 1 */
  doc.line(5, 39, marXR, 39); /* HORI 2 */

  doc.line(5, 82, marXR, 82); /* HORI 3 */
  doc.line(5, 90, marXR, 90); /* HORI 4 */


  doc.line(5, 114, marXR, 114); /* HORI 5 */

  doc.line(5, 122, marXR, 122); /* HORI 5 */
  doc.line(5, 130, marXR, 130); /* HORI 5 */

  doc.line(5, 260, marXR, 260); /* HORI 6 */

  doc.line(5, 137 + (8 * longitud), marXR, 137 + (8 * longitud)); /* HORI 5 */
  doc.line(5, 144 + (8 * longitud), marXR, 144 + (8 * longitud)); /* HORI 6 */

  doc.line(marXR, 25, marXR, 260); /* DERECHA */

  /* TITULOS DE CONTENIDO */
  doc.text("DOCUMENTO:", 7, 43);
  doc.text("GENERO:", 7, 48);
  doc.text("FECHA DE NACIMIENTO:", 7, 53);
  doc.text(DefaultValue.EMO_ATENCION_CONTRO === lsDataReport.idAtencion ? "" : "TURNO:", 7, 58);
  doc.text("CELULAR:", 7, 63);
  doc.text("EMAIL:", 7, 68);
  doc.text("DPTO. DE NACIMIENTO:", 7, 73);
  doc.text("EPS:", 7, 78);

  /* SEGUNDA COLUMNA */
  doc.text("NOMBRE:", 112, 43);
  doc.text("EDAD:", 112, 48);
  doc.text("ESTADO CIVIL:", 112, 53);
  doc.text("DIRECCIÓN:", 112, 58);
  doc.text(DefaultValue.EMO_ATENCION_INGRESO === lsDataReport.idAtencion ? "" : "GRUPO:", 112, 63);
  doc.text(DefaultValue.EMO_ATENCION_INGRESO === lsDataReport.idAtencion ? "" : "ARL:", 112, 68);
  doc.text("CIUDAD DE NACIMIENTO:", 112, 73);
  doc.text("CONTACTO:", 112, 78);

  /* RENDERIZADO */
  doc.setFont("helvetica", "normal");
  doc.text(`${lsDataReport.documento}`, 32, 43);
  doc.text(`${lsDataReport.nameGenero}`, 26, 48);
  doc.text(`${ViewFormat(lsDataReport.fechaNacimiento)}`, 51, 53);
  doc.text(`${DefaultValue.EMO_ATENCION_CONTRO === lsDataReport.idAtencion ? "" : lsDataReport.nameTurno}`, 22, 58);
  doc.text(`${lsDataReport.celularEmpleado}`, 30, 63);
  doc.text(`${lsDataReport.correoEmpleado}`, 21, 68);
  doc.text(`${lsDataReport.nameDptoNacimiento}`, 49, 73);
  doc.text(`${lsDataReport.nameEps}`, 17, 78);

  doc.setFontSize(8);
  doc.text(`${lsDataReport.nameEmpleado}`, 130, 43);

  doc.setFontSize(10);
  doc.text(`${GetEdad(lsDataReport.fechaNacimiento)}`, 125, 48);
  doc.text(`${lsDataReport.nameEstadoCivil}`, 139, 53);
  doc.text(`${lsDataReport.direccionEmpleado}`, 134, 58);
  doc.text(`${DefaultValue.EMO_ATENCION_INGRESO === lsDataReport.idAtencion ? "" : lsDataReport.nameGrupo}`, 128, 63);
  doc.text(`${DefaultValue.EMO_ATENCION_INGRESO === lsDataReport.idAtencion ? "" : lsDataReport.nameArl}`, 122, 68);
  doc.text(`${lsDataReport.nameCiudadNacimiento}`, 158, 73);
  doc.text(`${lsDataReport.nameContacto}`, 135, 78);

  /* 2. INFORMACION DE LA EMPRESA Y CARGO */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("2. INFORMACION DE LA EMPRESA Y CARGO", 7, 87);

  /* PRIMERA COLUMNA */
  doc.setFont("helvetica", "bold");
  doc.text("SEDE:", 7, 96);
  doc.text("ÁREA:", 7, 103);
  doc.text("POSICIÓN:", 7, 110);
  /* SEGUNDA COLUMNA */
  doc.text("DPTO. TRABAJO:", 112, 96);
  doc.text(DefaultValue.EMO_ATENCION_INGRESO === lsDataReport.idAtencion ? "" : "GRUPO:", 112, 103);
  doc.text("ANTIGUEDAD:", 112, 110);

  /* 2. RENDERIZADO */
  doc.setFont("helvetica", "normal");
  doc.text(`${lsDataReport.nameSede}`, 30, 96);
  doc.text(`${lsDataReport.nameArea}`, 30, 103);
  doc.text(`${lsDataReport.nameCargo}`, 30, 110);

  doc.text(`${lsDataReport.nameDepartamentoTrabajo}`, 145, 96);
  doc.text(`${DefaultValue.EMO_ATENCION_INGRESO === lsDataReport.idAtencion ? "" : lsDataReport.nameGrupo}`, 145, 103);
  doc.text(`${GetEdad(lsDataReport.fechaContratoEmpleado)} AÑOS`, 145, 110);

  /* 3. ANTECEDENTES LABORALES */
  doc.setFont("helvetica", "bold");
  doc.text("3. ANTECEDENTES LABORALES", 7, 119);
  doc.setFontSize(10);
  doc.text("3.1. HISTORIA LABORAL EN OTRAS EMPRESAS", 7, 127);
  doc.setFontSize(10);

  //TABLA DE RENDERIZADO DE RIESGOS
  autoTable(doc, ({
    styles: { fontSize: 10 },
    theme: 'plain',
    fontStyle: 'normal',
    margin: { top: 130, left: 7, right: 7 },
    body: lsWorkHistoryOtherCompany,
    columns: [
      { header: 'Empresa', dataKey: 'empresa' },
      { header: 'Cargo', dataKey: 'cargo' },
      { header: 'Año', dataKey: 'anio' },
      { header: 'Mes', dataKey: 'meses' },
    ],
  }))
  /* doc.setFont("helvetica", "normal"); */
  doc.text("3.1.1. EXPOSICIÓN OCUPACIONAL EN OTRAS EMPRESAS", 7, 142 + (8 * longitud));
  doc.setFontSize(10);


  //TABLA DE RENDERIZADO DE RIESGOS
  autoTable(doc, ({
    styles: { fontSize: 7 },
    theme: 'plain',
    fontStyle: 'normal',
    margin: { left: 7, right: 7 },
    body: lsRiesgoHLDO,
    columns: [
      /* { header: 'Empresa', dataKey: 'empresa' }, */
      { header: 'Riesgo', dataKey: 'riesgo' },
      { header: 'Clase', dataKey: 'clase' },
      // { header: 'Exposición', dataKey: 'exposicion' },
      // { header: 'Grado Sin Epp', dataKey: 'gradoSinEpp' },
      // { header: 'Grado Con Epp', dataKey: 'gradosConEpp' },
      // { header: 'Medidas ', dataKey: 'gradosConEpp' },
      { header: 'Año', dataKey: 'anio' },
      { header: 'Mes', dataKey: 'mes' },
    ],
  }))
}

/* REPORTE RIESGOS HLDRUMMOND */
export function generateClinicHistoryDLTD(
  doc = new jsPDF({ putOnlyUsedFonts: true }),
  resultExpoDLTD = [],
  lsRiesgoHLD = [],
  lsWorkHistory = []
) {
  var marXR = doc.internal.pageSize.width - 5;
  var longitud = lsWorkHistory.length;

  doc.text("3.2. HISTORIA LABORAL EN DRUMMOND LTD.", 7, 37);
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);

  /* CUADRO DATOS */
  doc.line(5, 32, 5, 260); /* IZQUIERDA */
  doc.line(5, 32, marXR, 32); /* HORI ONE */
  doc.line(5, 39, marXR, 39); /* HORI TWO  */

  doc.line(5, 78 + 150, marXR, 78 + 150); /* HORI THREE */
  doc.line(5, 86 + 150, marXR, 86 + 150); /* HORI FOUR */

  doc.line(5, 260, marXR, 260); /* HORI ULTIMA */
  doc.line(marXR, 32, marXR, 260); /* DERECHA */


  doc.text("3.3 EXPOSICIÓN ACUMULADA DE FACTORES DE RIESGO", 7, 83 + 150);
  doc.line(5, 242, marXR, 242); /* HORI ULTIMA */
  doc.text(`${config.typeDashboard === 'DLTD' ? "EN DLTD" : "EN D. Energy"}`, 40, 91 + 150, { align: "center" });
  doc.text("EN OTRAS EMPRESAS", 103, 91 + 150, { align: "center" });
  doc.text("TOTAL EXPOSICIÓN", 175, 91 + 150, { align: "center" });

  doc.line(40, 242, 40, 260); /* LINEA ONE */
  doc.line(70, 236, 70, 260); /* LINEA MEDIA */
  doc.text("MPI:", 7, 97 + 150);
  doc.text("RUDIO:", 7, 104 + 150);

  doc.line(106, 242, 106, 260); /* LINEA MEDIA */
  doc.line(133, 236, 133, 260); /* LINEA FINAL */

  doc.text("MPI:", 72, 97 + 150);
  doc.text("RUDIO:", 72, 104 + 150);
  doc.line(180, 242, 180, 260); /* LINEA MEDIA */

  doc.line(5, 250, marXR, 250); /* HORI ULTIMA */
  doc.text("MPI:", 135, 97 + 150);
  doc.text("RUDIO:", 135, 104 + 150);

  doc.line(5, 48 + (8 * longitud), marXR, 48 + (8 * longitud)); /* HORI 5 */
  doc.line(5, 54 + (8 * longitud), marXR, 54 + (8 * longitud)); /* HORI 6 */

  autoTable(doc, ({
    styles: { fontSize: 10 },
    theme: 'plain',
    fontStyle: 'normal',
    margin: { top: 40, left: 7, right: 7 },
    body: lsWorkHistory,
    columns: [
      { header: 'Cargo', dataKey: 'nameCargo' },
      { header: 'Año', dataKey: 'anio' },
      { header: 'Mes', dataKey: 'meses' },
    ],
  }))
  /* doc.setFont("helvetica", "normal"); */
  doc.text("3.2.1. EXPOSICIÓN OCUPACIONAL EN DRUMMOND LTD.", 7, 52 + (8 * longitud));
  doc.setFontSize(10);

  //TABLA DE RENDERIZADO DE RIESGOS
  autoTable(doc, ({
    styles: { fontSize: 7 },
    theme: 'plain',
    fontStyle: 'normal',
    margin: { left: 7, right: 7 },
    body: lsRiesgoHLD,
    columns: [
      /* { header: 'Cargo', dataKey: 'cargo' }, */
      { header: 'Riesgo', dataKey: 'riesgo' },
      { header: 'Clase', dataKey: 'clase' },

      { header: 'Medidas De Control', dataKey: 'medidasControl' },

      { header: 'Grado Sin Epp', dataKey: 'gradoSinEpp' },
      { header: 'Grado Con Epp', dataKey: 'gradosConEpp' },
      { header: 'Año', dataKey: 'anio' },
      { header: 'Mes', dataKey: 'mes' },
    ],
  }))

  /* RENDERIZADO DE EXPOSICIÓN ACUMULADA DE FACTORES DE RIESGO */
  doc.setFont("helvetica", "normal");
  doc.text(`${resultExpoDLTD.aniosMpiDLTD} AÑOS`, 21, 97 + 150);
  doc.text(`${resultExpoDLTD.mesMpiDLTD} MESES`, 47, 97 + 150);
  doc.text(`${resultExpoDLTD.aniosRuidoDLTD} AÑOS`, 21, 104 + 150);
  doc.text(`${resultExpoDLTD.mesRuidoDLTD} MESES`, 47, 104 + 150);

  doc.text(`${resultExpoDLTD.aniosMpiCompany} AÑOS`, 87, 97 + 150);
  doc.text(`${resultExpoDLTD.mesMpiCompany} MESES`, 110, 97 + 150);
  doc.text(`${resultExpoDLTD.aniosRuidoCompany} AÑOS`, 87, 104 + 150);
  doc.text(`${resultExpoDLTD.mesRuidoCompany} MESES`, 110, 104 + 150);

  doc.text(`${resultExpoDLTD.aniosMpiDLTD + resultExpoDLTD.aniosMpiCompany} AÑOS`, 153, 97 + 150);
  doc.text(`${resultExpoDLTD.mesMpiDLTD + resultExpoDLTD.mesMpiCompany} MESES`, 185, 97 + 150);
  doc.text(`${resultExpoDLTD.aniosRuidoDLTD + resultExpoDLTD.aniosRuidoCompany} AÑOS`, 153, 104 + 150);
  doc.text(`${resultExpoDLTD.mesRuidoDLTD + resultExpoDLTD.mesRuidoCompany} MESES`, 185, 104 + 150);
}

export function generatePathologicalAntecedents(
  doc = new jsPDF(),
  lsDataReport = []
) {
  var marXR = doc.internal.pageSize.width - 5;

  doc.text("4. ANTECEDENTES PERSONALES", 7, 30);
  doc.text("4.2 ENFERMEDAD LABORAL", 7, 165);
  doc.text("4.3 ACCIDENTE DE TRABAJO", 7, 185);
  doc.text("4.4 INMUNIZACIONES", 7, 209);

  doc.text("4.1 PATOLÓGICOS", 7, 37);
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);

  /* CUADRO DATOS */
  doc.line(5, 25, 5, 265); /* IZQUIERDA */
  doc.line(5, 32, marXR, 32); /* HORI ONE */
  doc.line(5, 39, marXR, 39); /* HORI TWO  */
  doc.line(5, 94, marXR, 94); /* HORI THREE*/

  doc.line(5, 160, marXR, 160); /* HORI FOUR */
  doc.line(5, 168, marXR, 168); /* HORI FIVE */

  doc.line(5, 180, marXR, 180); /* HORI SIX */
  doc.line(5, 188, marXR, 188); /* HORI SEVEN */

  doc.line(5, 204, marXR, 204); /* HORI EIGHT */
  doc.line(5, 212, marXR, 212); /* HORI NINE */

  doc.line(70, 39, 70, 94); /* VERTI ONE */
  doc.line(140, 39, 140, 94); /* VERTI TWO */
  doc.line(5, 265, marXR, 265); /* HORI ULTIMA */
  doc.line(marXR, 25, marXR, 265); /* DERECHA */

  /* PATOLÓGICOS */
  doc.setFontSize(8);
  doc.text("1. CONGÉNITOS:", 7, 45);
  doc.text("2. INMUNOPREVENIBLES:", 7, 50);
  doc.text("3. INFECCIOSOS:", 7, 55);
  doc.text("4. OJOS:", 7, 60);
  doc.text("5. AGUDEZA VISUAL:", 7, 65);
  doc.text("6. OIDOS:", 7, 70);
  doc.text("7. NASOFARINGE:", 7, 75);
  doc.text("8. CARDIOVASCULAR:", 7, 80);
  doc.text("9. PULMONAR:", 7, 85);
  doc.text("10. GASTROINTESTINAL:", 7, 90);

  doc.text("11. GENITOURINARIO:", 72, 45);
  doc.text("12. NEUROLÓGICO:", 72, 50);
  doc.text("13. PROBLEMAS DE PIEL:", 72, 55);
  doc.text("14. OSTEOMUSCULARES:", 72, 60);
  doc.text("15. ALÉRGICOS:", 72, 65);
  doc.text("16. TÓXICOS:", 72, 70);
  doc.text("17. FARMACÓLOGICOS:", 72, 75);
  doc.text("18. QUIRÚRGICOS:", 72, 80);
  doc.text("19. TRAUMÁTICOS:", 72, 85);
  doc.text("20. TRANSFUSIONES:", 72, 90);

  doc.setFontSize(6);
  doc.text("21. ENFERMEDAD DE TRASMISIÓN SEXUAL", 142, 45);

  doc.setFontSize(8);
  doc.text("22. DEFORMIDADES:", 142, 50);
  doc.text("23. PSIQUIÁTRICO:", 142, 55);
  doc.text("24. FARMACODEPENCIA:", 142, 60);
  doc.text("25. ENFERMEDAD METABOLICA:", 142, 65);
  doc.text("26. RENAL:", 142, 70);
  doc.text("27. ASMA:", 142, 75);
  doc.text("28. O.R.L.:", 142, 80);
  doc.text("29. CANCER:", 142, 85);

  doc.text("ESPECIFICACIONES", 7, 98);

  /* ENFERMEDAD PROFESIONAL/ACCIDENTE DE TRABAJO */
  if (lsDataReport.anio1AT !== '') {
    doc.text("AÑO:", 7, 172);
  }

  /* doc.text("OBSERVACIÓN", 7, 138); */
  if (lsDataReport.anioAT !== '') {
    doc.text("AÑO:", 7, 192);
  }

  /* doc.text("OBSERVACIÓN", 7, 168); */

  /* RENDERIZADO DE DATOS DE ANTECEDENTES PATOLÓGICOS */
  doc.setFont("helvetica", "normal");
  doc.text(`${lsDataReport.congenitosAP}`, 50, 45);
  doc.text(`${lsDataReport.inmunoPrevenibleAP}`, 50, 50);
  doc.text(`${lsDataReport.infecciososAP}`, 50, 55);
  doc.text(`${lsDataReport.ojoAP}`, 50, 60);
  doc.text(`${lsDataReport.agudezaVisualAP}`, 50, 65);
  doc.text(`${lsDataReport.oidosAP}`, 50, 70);
  doc.text(`${lsDataReport.nasoFaringeAP}`, 50, 75);
  doc.text(`${lsDataReport.cardiovascularAP}`, 50, 80);
  doc.text(`${lsDataReport.pulmonarAP}`, 50, 85);
  doc.text(`${lsDataReport.gastrointestinalAP}`, 50, 90);

  doc.text(`${lsDataReport.gimitoUrinarioAP}`, 115, 45);
  doc.text(`${lsDataReport.neurologicoAP}`, 115, 50);
  doc.text(`${lsDataReport.transtornoPielAP}`, 115, 55);
  doc.text(`${lsDataReport.osteoMuscularAP}`, 115, 60);
  doc.text(`${lsDataReport.alergicosAP}`, 115, 65);
  doc.text(`${lsDataReport.toxicoAP}`, 115, 70);
  doc.text(`${lsDataReport.faRmacologicosAP}`, 115, 75);
  doc.text(`${lsDataReport.quirurgicosAP}`, 115, 80);
  doc.text(`${lsDataReport.traumaticosAP}`, 115, 85);
  doc.text(`${lsDataReport.tranfuccionesAP}`, 115, 90);

  doc.text(`${lsDataReport.etsAP}`, 190, 45);
  doc.text(`${lsDataReport.deformidadesAP}`, 190, 50);
  doc.text(`${lsDataReport.psiquiatricosAP}`, 190, 55);
  doc.text(`${lsDataReport.farmacoDependenciaAP}`, 190, 60);
  doc.text(`${lsDataReport.emAP}`, 190, 65);
  doc.text(`${lsDataReport.renalAP}`, 190, 70);
  doc.text(`${lsDataReport.asmaAP}`, 190, 75);
  doc.text(`${lsDataReport.orlAP}`, 190, 80);
  doc.text(`${lsDataReport.cancerAP}`, 190, 85);

  doc.text(`${lsDataReport.especifiqueAP}`, 7, 104, {
    maxWidth: 200,
    lineHeightFactor: 1.5,
  });

  doc.text(`${lsDataReport.anio1AT}`, 20, 172);
  doc.text(`${lsDataReport.especifique1AT}`, 7, 177, {
    maxWidth: 200,
    lineHeightFactor: 1.5,
  });

  doc.text(`${lsDataReport.anioAT}`, 20, 192);
  doc.text(`${lsDataReport.especifiqueAT}`, 7, 197, {
    maxWidth: 200,
    lineHeightFactor: 1.5,
  });

  generateImmunization(doc, lsDataReport);
}

export function generateHabitsGineco(doc = new jsPDF(), lsDataReport) {
  var marXR = doc.internal.pageSize.width - 5;

  doc.text("4.7 HEREDO FAMILIARES", 7, 115);
  doc.text("4.8 GINECO OBSTÉTRICOS", 7, 155);

  doc.text("4.5 HÁBITOS", 7, 36);
  doc.text("4.6 FOBIAS", 7, 88);
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);

  /* CUADRO DATOS */
  doc.line(5, 31, 5, 250); /* IZQUIERDA */
  doc.line(5, 31, marXR, 31); /* HORI ONE */
  doc.line(5, 39, marXR, 39); /* HORI TWO  */
  doc.line(5, 83, marXR, 83); /* HORI THREE*/
  doc.line(5, 91, marXR, 91); /* HORI FOUR*/
  doc.line(5, 110, marXR, 110); /* HORI FIVE */
  doc.line(5, 118, marXR, 118); /* HORI SIX */
  doc.line(5, 150, marXR, 150); /* HORI SEVEN */
  doc.line(5, 158, marXR, 158); /* HORI EIGHT */ /* VERTI TWO */ /* VERTI TWO */
  doc.line(5, 250, marXR, 250); /* HORI ULTIMA */
  doc.line(marXR, 31, marXR, 250); /* DERECHA */

  /* HÁBITOS */
  doc.setFontSize(8);
  doc.text("FUMA:", 7, 45);
  doc.text("AÑOS:", 7, 50);
  doc.text("FUMABA:", 7, 55);
  doc.text("AÑOS:", 7, 60);
  doc.text("PRACTICA DEPORTE:", 7, 65);
  doc.text("FRECUENCIA:", 7, 70);
  doc.text("CUAL BEBIDA:", 7, 75);
  /* SEGUNDA COLUMNA DE HÁBITOS */
  doc.text("CIGARRILLOS DÍA:", 60, 45);

  doc.text("OBSERVACIÓN:", 140, 50);
  doc.text("OBSERVACIÓN:", 140, 60);
  doc.text("OBSERVACIÓN:", 140, 65);

  doc.text("MESES:", 60, 50);
  doc.text("CIGARRILLOS DÍA:", 60, 55);
  doc.text("MESES:", 60, 60);
  doc.text("CUAL DEPORTE:", 60, 65);
  doc.text("CONSUME BEBIDAS ALCOHOLICAS:", 60, 70);
  doc.text("FRECUENCIA:", 60, 75);

  doc.text("HOBBY/PASATIEMPO:", 7, 80);

  /* FOBIAS */
  doc.text("FOBIAS:", 7, 97);
  doc.text("TIPO DE FOBIA:", 120, 97);
  doc.text("DESCRIPCIÓN:", 7, 102);

  /* RENDERIZADO DE DATOS DE HÁBITOS */
  doc.setFont("helvetica", "normal");
  doc.text(`${lsDataReport.fumaHB}`, 38, 45);
  doc.text(`${lsDataReport.aniosCigaFumaHB}`, 38, 50);
  doc.text(`${lsDataReport.fumabaHB}`, 38, 55);
  doc.text(`${lsDataReport.aniosCigaFumabaHB}`, 38, 60);
  doc.text(`${lsDataReport.practicaDeporteHB}`, 38, 65);
  doc.text(`${lsDataReport.nameFrecuenciaDeporteHB}`, 38, 70);
  doc.text(`${lsDataReport.cualBebidasAlHB}`, 38, 75);
  /* SEGUNDA COLUMNA DE HÁBITOS */
  doc.text(`${lsDataReport.cigarrillosDiasFumaHB}`, 115, 45);
  doc.text(`${lsDataReport.mesesCigaFumaHB}`, 115, 50);
  doc.text(`${lsDataReport.cigarrillosDiasFumabaHB}`, 115, 55);

  doc.text(`${lsDataReport.observacionFumaHB}`, 165, 50);
  doc.text(`${lsDataReport.observacionFumabaHB}`, 165, 60);
  doc.text(`${lsDataReport.observacionPracticaDeporHB}`, 165, 65);

  doc.text(`${lsDataReport.mesesCigaFumabaHB}`, 115, 60);
  doc.text(`${lsDataReport.nameCualDeporteHB}`, 115, 65);
  doc.text(`${lsDataReport.consumeBebidasAlcoholicasHB}`, 115, 70);
  doc.text(`${lsDataReport.nameFrecuenciaBebidaAlHB}`, 115, 75);
  /* RENDERIZADO DE FOBIAS */
  doc.text(`${lsDataReport.cualHobbiesHB}`, 50, 80);

  doc.text(`${lsDataReport.fobiasHB}`, 40, 97);
  doc.text(`${lsDataReport.cualFobiaHB}`, 40, 102, {
    maxWidth: 75,
    lineHeightFactor: 1.5,
  });
  doc.text(
    JSON.parse(lsDataReport.tipoFobiaHB).map((fobi, index) => {
      return String(`${fobi.label.toUpperCase()}`);
    }),
    150,
    97,
    { maxWidth: 200, lineHeightFactor: 1.5 }
  );
  generateParentesco(doc, lsDataReport);
  generateGineco(doc, lsDataReport);
}

export function generateSystemReview(doc = new jsPDF(), lsDataReport) {
  const marXR = doc.internal.pageSize.width - 5;

  doc.text("6. EXAMEN FISICO", 7, 101);
  doc.text("6.1 LATERALIDAD:", 7, 107);
  doc.text("6.4 EXPLORACIÓN MORFOLÓGICA - ASPECTOS", 7, 137);

  doc.text("5. REVISIÓN POR SISTEMAS - PATOLOGÍAS", 7, 36);
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);

  /* CUADRO DATOS */
  doc.line(5, 31, 5, 250); /* IZQUIERDA */
  doc.line(5, 31, marXR, 31); /* HORI ONE */
  doc.line(5, 39, marXR, 39); /* HORI TWO  */
  doc.line(5, 79, marXR, 79); /* HORI THREE*/
  doc.line(5, 97, marXR, 97); /* HORI FOUR*/
  doc.line(5, 103, marXR, 103); /* HORI FOUR*/
  doc.line(5, 108, marXR, 108); /* HORI FIVE */

  doc.line(5, 132, marXR, 132); /* HORI SIX */
  doc.line(5, 140, marXR, 140); /* HORI SEVEN */
  doc.line(5, 213, marXR, 213); /* HORI OCHO */

  doc.line(110, 39, 110, 79); /* VERTI ONE */

  doc.line(70, 140, 70, 213); /* VERTI TWO */
  doc.line(140, 140, 140, 213); /* VERTI THREE */

  doc.line(5, 250, marXR, 250); /* HORI ULTIMA */
  doc.line(marXR, 31, marXR, 250); /* DERECHA */

  doc.setFontSize(8);
  /* ENCABEZADO REVISIÓN POR SISTEMAS - PATOLOGÍAS */
  doc.text("1. CABEZA - CEFALEA", 7, 45);
  doc.text("3. OÍDOS (A. AUDITIVA, DOLOR, SECRECIÓN, ETC.)", 7, 50);
  doc.text("5. BOCA (ULCERACIONES, SANGRADO DE ENCÍAS)", 7, 55);
  doc.text("7. CUELLO (DOLOR, TORTICOLIS, ADENOPATÍAS)", 7, 60);
  doc.text("9. GASTROINTESTINAL", 7, 65);
  doc.text("11. OSTEO - ARTICULAR", 7, 70);
  doc.text("13. PIEL Y ANEXOS", 7, 75);
  /* SEGUNDA COLUMNA DE ENCABEZADO REVISIÓN POR SISTEMAS - PATOLOGÍAS */
  doc.text("2. OJOS (A. VISUAL, DOLOR, CONGESTIÓN, ETC.)", 112, 45);
  doc.text("4. NARIZ (CONGESTIÓN, EPISTAXIS, RINORREA)", 112, 50);
  doc.text("6. GARGANTA (DOLOR, ARDOR, DISFAGIA, DISFONÍA)", 112, 55);
  doc.text("8. CARDIO RESPIRATORIO", 112, 60);
  doc.text("10. GENITOURINARIO", 112, 65);
  doc.text("12. NEURO - MUSCULAR", 112, 70);
  doc.text("14. PSIQUIÁTRICO", 112, 75);

  doc.text("OBSERVACIONES:", 7, 84);

  /* RENDERIZADO DE REVISIÓN POR SISTEMAS - PATOLOGÍAS */
  doc.setFont("helvetica", "normal");
  doc.text(`${lsDataReport.cabezaRS}`, 108, 45, { align: "right" });
  doc.text(`${lsDataReport.oidosRS}`, 108, 50, { align: "right" });
  doc.text(`${lsDataReport.bocaRS}`, 108, 55, { align: "right" });
  doc.text(`${lsDataReport.cuellosRS}`, 108, 60, { align: "right" });
  doc.text(`${lsDataReport.gastrointestinalRS}`, 108, 65, { align: "right" });
  doc.text(`${lsDataReport.osteoRS}`, 108, 70, { align: "right" });
  doc.text(`${lsDataReport.pielRS}`, 108, 75, { align: "right" });

  doc.text(`${lsDataReport.ojosRS}`, marXR - 2, 45, { align: "right" });
  doc.text(`${lsDataReport.narizRS}`, marXR - 2, 50, { align: "right" });
  doc.text(`${lsDataReport.gargantaRS}`, marXR - 2, 55, { align: "right" });
  doc.text(`${lsDataReport.cardioRS}`, marXR - 2, 60, { align: "right" });
  doc.text(`${lsDataReport.genitoUrinarioRS}`, marXR - 2, 65, {
    align: "right",
  });
  doc.text(`${lsDataReport.neuroRS}`, marXR - 2, 70, { align: "right" });
  doc.text(`${lsDataReport.psiquiatricoRS}`, marXR - 2, 75, { align: "right" });

  doc.text(`${lsDataReport.observacionRS}`, 7, 90, {
    maxWidth: 200,
    lineHeightFactor: 1.5,
  });

  doc.text(`${lsDataReport.nameLateralidadExamenesFisico}`, 45, 107);

  generatePhysicalExam(doc, lsDataReport);
  generateExploracionMorfologica(doc, lsDataReport);
}

export function generateFunctionalExploration(doc = new jsPDF(), lsDataReport) {
  const marXR = doc.internal.pageSize.width - 5;

  doc.text("7. EXPLORACIÓN FUNCIONAL", 7, 36);
  doc.text("8. EXÁMENES PARACLÍNICOS", 7, 125);
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);

  /* CUADRO DATOS */
  doc.line(5, 31, 5, 250); /* IZQUIERDA */
  doc.line(5, 31, marXR, 31); /* HORI ONE */
  doc.line(5, 39, marXR, 39); /* HORI TWO  */
  doc.line(5, 100, marXR, 100); /* HORI THREE*/

  doc.line(5, 120, marXR, 120); /* HORI FOUR*/
  doc.line(5, 128, marXR, 128); /* HORI FIVE */

  doc.line(5, 250, marXR, 250); /* HORI ULTIMA */
  doc.line(marXR, 31, marXR, 250); /* DERECHA */

  doc.setFontSize(8);
  /* ENCABEZADO REVISIÓN POR SISTEMAS - PATOLOGÍAS */
  doc.text("1. MOVILIDAD OCULAR ", 7, 45);
  doc.text("3. MARCHA - COORDINACIÓN", 7, 50);
  doc.text("5. MOVILIDAD - CODO", 7, 55);
  doc.text("7. SIGNO TÚNEL", 7, 60);
  doc.text("9. MOVILIDAD MANOS", 7, 65);
  doc.text("11. MOVILIDAD RODILLA", 7, 70);
  doc.text("13. MOVILIDAD CUELLO (C1-C4)", 7, 75);
  doc.text("15. ROT ROTULIANO(L4)", 7, 80);
  doc.text("17. SENSIBILIDAD CARA ANTERIOR", 7, 85);
  doc.text("19. SENSIBILIDAD CARA LATERAL PIE (S1)", 7, 90);
  doc.text("21. SIGNO DE LASÉGUE", 7, 95);

  /* SEGUNDA COLUMNA DE ENCABEZADO REVISIÓN POR SISTEMAS - PATOLOGÍAS */
  doc.text("2. EQUILIBRIO", 112, 45);
  doc.text("4. MOVILIDAD HOMBRO", 112, 50);
  doc.text("6. MOVILIDAD-MUÑECA", 112, 55);
  doc.text("8. SIGNOPHALEN ", 112, 60);
  doc.text("10. MOVILIDAD CADERA", 112, 65);
  doc.text("12. MOVILIDAD TOBILLO", 112, 70);
  doc.text("14. ROT BICIPITAL(C5)", 112, 75);
  doc.text("16. EXTENSIÓN PRIMER ARTEJO (L)", 112, 80);
  doc.text("18. EVERSIÓN PIE(S1)", 112, 85);
  doc.text("20. ROT AQUILIANO", 112, 90);
  doc.text("22. ÍNDICE DE WELLS", 112, 95);

  doc.text("OBSERVACIONES:", 7, 105);

  /* RENDERIZADO DE REVISIÓN POR SISTEMAS - PATOLOGÍAS */
  doc.setFont("helvetica", "normal");
  /* ENCABEZADO REVISIÓN POR SISTEMAS - PATOLOGÍAS */
  doc.text(`${lsDataReport.movilidadEFU}`, 108, 45, { align: "right" });
  doc.text(`${lsDataReport.marchaEFU}`, 108, 50, { align: "right" });
  doc.text(`${lsDataReport.movilidadCodoEFU}`, 108, 55, { align: "right" });

  doc.text(`${lsDataReport.signoTinelEFU}`, 108, 60, { align: "right" }); /* 1 */

  doc.text(`${lsDataReport.movilidadManosEFU}`, 108, 65, { align: "right" });
  doc.text(`${lsDataReport.movilidadRodillaEFU}`, 108, 70, { align: "right" });
  doc.text(`${lsDataReport.movilidadCuelloEFU}`, 108, 75, { align: "right" });
  doc.text(`${lsDataReport.rotRotuleanoEFU}`, 108, 80, { align: "right" });
  doc.text(`${lsDataReport.sensibilidadCaraAnteriorEFU}`, 108, 85, {
    align: "right",
  });
  doc.text(`${lsDataReport.sensibilidadCaraLateralEFU}`, 108, 90, {
    align: "right",
  });

  doc.text(`${lsDataReport.signoLasegueEFU}`, 108, 95, { align: "right" }); /* 2 */

  /* SEGUNDA COLUMNA DE ENCABEZADO REVISIÓN POR SISTEMAS - PATOLOGÍAS */
  doc.text(`${lsDataReport.equilibrioEFU}`, marXR - 2, 45, { align: "right" });
  doc.text(`${lsDataReport.movilidadHombroEFU}`, marXR - 2, 50, {
    align: "right",
  });
  doc.text(`${lsDataReport.movilidadMuniecaEFU}`, marXR - 2, 55, {
    align: "right",
  });

  doc.text(`${lsDataReport.signoPhalenEFU}`, marXR - 2, 60, { align: "right" }); /* 3 */

  doc.text(`${lsDataReport.movilidadCaderaEFU}`, marXR - 2, 65, {
    align: "right",
  });
  doc.text(`${lsDataReport.movilidadTobilloEFU}`, marXR - 2, 70, {
    align: "right",
  });
  doc.text(`${lsDataReport.rotVisipitalEFU}`, marXR - 2, 75, {
    align: "right",
  });
  doc.text(`${lsDataReport.extencionEFU}`, marXR - 2, 80, { align: "right" });
  doc.text(`${lsDataReport.eversionPiesEFU}`, marXR - 2, 85, {
    align: "right",
  });
  doc.text(`${lsDataReport.rotAquileanoEFU}`, marXR - 2, 90, {
    align: "right",
  });
  doc.text(`${lsDataReport.valorIndiceWellsEFU}`, marXR - 2, 95, { align: "right" });

  doc.text(`${lsDataReport.observacionEFU}`, 7, 110, {
    maxWidth: 200,
    lineHeightFactor: 1.5,
  });

  generateExamenParaclinico(doc, lsDataReport);
}

export function generateDefinitiveDiagnosis(
  doc = new jsPDF(),
  lsDataReport,
  lsDataUser
) {
  const marXR = doc.internal.pageSize.width - 5;
  const consentimientoInfo =
    "Autorizo al médico ocupacional, quien firma abajo, a realizar los exámenes médicos y pruebas complementarias sugeridas por la empresa. Certifico que he sido informado(a) acerca de la naturaleza y propósito de estos exámenes. Entendiendo que la realización de estos exámenes es voluntaria y que tuve la oportunidad de retirar mi consentimiento en cualquier momento. Certifico, además, que las respuestas que doy son completas y verídicas. Se me informó también que este documento es estrictamente confidencial y de reserva profesional. No puede comunicarse o darse a conocer, salvo a las personas o entidades previstas por la ley en la legislación vigente.";

  doc.text("9. DIAGNÓSTICO DEFINITIVO", 7, 36);
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);

  /* CUADRO DATOS */
  doc.line(5, 31, 5, 250); /* IZQUIERDA */
  doc.line(5, 31, marXR, 31); /* HORI ONE */
  doc.line(5, 39, marXR, 39); /* HORI TWO  */

  doc.line(5, 250, marXR, 250); /* HORI ULTIMA */
  doc.line(marXR, 31, marXR, 250); /* DERECHA */

  doc.line(5, 68, marXR, 68); /* HORI TWO  */
  doc.text("OBSERVACIONES", 7, 73);
  doc.line(5, 75, marXR, 75); /* HORI TWO  */

  doc.line(5, 96, marXR, 96); /* HORI TWO  */
  doc.text("CONCEPTO DE APTITUD", 7, 100);
  doc.line(5, 102, marXR, 102); /* HORI TWO  */

  doc.line(5, 116, marXR, 116); /* HORI TWO  */
  doc.text("RECOMENDACIONES", 7, 122);
  doc.line(5, 125, marXR, 125); /* HORI TWO  */


  doc.line(5, 165, marXR, 165); /* HORI TWO  */
  doc.text("CONSENTIMIENTO INFORMADO DEL TRABAJADOR", 7, 172);
  doc.line(5, 175, marXR, 175); /* HORI TWO  */
  doc.line(5, 205, marXR, 205); /* HORI TWO  */
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");

  if (lsDataReport.dx1 !== "")
    doc.text(
      `Dx1:   ${lsDataReport.dx1}   ${lsDataReport.nameDx1.toUpperCase()}`,
      7,
      45,
      { maxWidth: 200, lineHeightFactor: 1.5 }
    );

  if (lsDataReport.dx2 !== "")
    doc.text(
      `Dx2:   ${lsDataReport.dx2}   ${lsDataReport.nameDx2.toUpperCase()}`,
      7,
      50,
      { maxWidth: 200, lineHeightFactor: 1.5 }
    );

  if (lsDataReport.dx3 !== "")
    doc.text(
      `Dx3:   ${lsDataReport.dx3}   ${lsDataReport.nameDx3.toUpperCase()}`,
      7,
      55,
      { maxWidth: 200, lineHeightFactor: 1.5 }
    );

  doc.text(`${lsDataReport.observacionID}`, 7, 79, {
    maxWidth: 200,
    lineHeightFactor: 1.5,
  });

  if (lsDataReport.nameAtencion !== 'EGRESO' && lsDataReport.nameConceptoActitudID !== 'SIN REGISTRO') {
    doc.text(`${lsDataReport.nameConceptoActitudID}`, 7, 107, {
      maxWidth: 200,
      lineHeightFactor: 1.5,
    });
  }

  doc.text(`${lsDataReport.recomendacionesID}`, 7, 130, {
    maxWidth: 200,
    lineHeightFactor: 1.5,
  });

  doc.setFontSize(9);
  doc.text(consentimientoInfo, 7, 182, {
    maxWidth: 200,
    lineHeightFactor: 1.5,
  });

  getFirma(doc, lsDataUser);
  getFirmaEmployee(doc, lsDataReport);
}