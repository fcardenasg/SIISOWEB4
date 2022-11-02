import { GetEdad, ViewFormat } from "components/helpers/Format";
import jsPDF from "jspdf";
import ImgWhite from "assets/img/ImgWhite.png";
import { DefaultValue } from "components/helpers/Enums";

function getFirma(doc, lsDataUser, my = 0) {
  doc.addImage(
    `${lsDataUser.firma}`,
    "PNG",
    7,
    doc.internal.pageSize.height - (70 - my),
    50,
    20
  );
  doc.setLineWidth(0.5);
  doc.setDrawColor(128, 128, 128);
  doc.line(
    7,
    doc.internal.pageSize.height - (48 - my),
    60,
    doc.internal.pageSize.height - (48 - my)
  );
  doc.setFontSize(8);
  doc.text(`${lsDataUser.nombre}`, 7, doc.internal.pageSize.height - (44 - my));
  doc.text("MEDICINA GENERAL", 7, doc.internal.pageSize.height - (40 - my));
  doc.text(
    `Lic: TP ${lsDataUser.licencia} - RM: ${lsDataUser.registroMedico}`,
    7,
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
  doc.text("FIRMA DEL EMPLEADO", 130, doc.internal.pageSize.height - (40 - my));
}

function generateImmunization(
  doc = new jsPDF(), lsDataReport) {
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
      refuerzo: "",
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
    doc.text("VACUNAS", 7, 195);
    doc.text("AÑOS", 50, 195);

    doc.setFont("helvetica", "normal");
    doc.text(
      vacunas
        .filter((vacu) => vacu.vacuna === true)
        .map((vacu, index) => {
          return String(`${vacu.name}`);
        }),
      7,
      200,
      { maxWidth: 200, lineHeightFactor: 2 }
    );

    doc.text(
      vacunas
        .filter((vacu) => vacu.vacuna === true)
        .map((vacu, index) => {
          return String(`${vacu.anio}`);
        }),
      50,
      200,
      { maxWidth: 200, lineHeightFactor: 2 }
    );

    doc.text(
      vacunas
        .filter((vacu) => vacu.vacuna === true)
        .map((vacu, index) => {
          return String(`${vacu.refuerzo}`);
        }),
      100,
      200,
      { maxWidth: 200, lineHeightFactor: 2 }
    );
  } else {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("NO REFIERE", 12, 200);
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
    doc.text("NO REFIERE", 12, 200);
  }
}

function generateGineco(doc = new jsPDF(), lsDataReport) {
  if (lsDataReport.idGenero === DefaultValue.GeneroWomen) {
    doc.setFont("helvetica", "bold");
    /* GINECO OBSTÉTRICOS */
    doc.text("1. MENARQUÍA:", 7, 164);
    doc.text("2. CICLOS:", 7, 169);
    doc.text("3. DATOS:", 7, 174);
    doc.text("AMENOREA:", 40, 174);
    doc.text("4. VIDA MARITAL:", 7, 179);
    doc.text("5. G:", 7, 184);
    doc.text("6. FUP:", 7, 189);
    /* SEGUNDA COLUMNA DE GINECO OBSTÉTRICOS */
    doc.text("DURACIÓN:", 76, 169);
    doc.text("DISMENORREA:", 76, 174);
    doc.text("LEUCORREA:", 112, 174);
    doc.text("VIDA OBSTÉTRICA:", 76, 179);
    doc.text("A:", 76, 184);
    doc.text("C:", 112, 184);
    doc.text("FUR:", 76, 189);
    /* TERCERA COLUMNA DE GINECO OBSTÉTRICOS */
    doc.text("7. ETS:", 150, 164);
    doc.text("8. QUISTE DE OVARIOS - MIOMAS:", 150, 169);
    doc.text("9. ENDOMETRIOSIS:", 150, 174);
    doc.text("10. PLANIFICA:", 150, 179);
    doc.text("METODO:", 150, 184);
    doc.text("11. ULTIMA CITOLOGÍA - AÑO:", 150, 189);
    doc.text("RESULTADO:", 7, 197);

    doc.setFont("helvetica", "normal");
    /* RENDERIZADO DE GINECO */
    doc.text(`${lsDataReport.menarquiaGO}`, 40, 164);
    doc.text(`${lsDataReport.nameCiclosGO}`, 40, 169);
    doc.text(`${lsDataReport.amenoreaGO}`, 64, 174);
    doc.text(`${lsDataReport.vidaMaritalGO}`, 40, 179);
    doc.text(`${lsDataReport.ggo}`, 40, 184);
    doc.text(`${ViewFormat(lsDataReport.fupgo)}`, 40, 189);
    /* SEGUNDA COLUMNA GINECO OBSTÉTRICOS */
    doc.text(`${lsDataReport.duracionGO}`, 112, 169);
    doc.text(`${lsDataReport.disminureaGO}`, 102, 174);
    doc.text(`${lsDataReport.leucoreaGO}`, 138, 174);
    doc.text(`${lsDataReport.vidaObstetricaGO}`, 112, 179);
    doc.text(`${lsDataReport.ago}`, 102, 184);
    doc.text(`${lsDataReport.csgo}`, 138, 184);
    doc.text(`${ViewFormat(lsDataReport.furgo)}`, 112, 189);
    /* TERCERA COLUMNA GINECO OBSTÉTRICOS */
    doc.text(`${lsDataReport.etsgo}`, 185, 164);
    doc.text(`${lsDataReport.quisteOvariosBiomasGO}`, 200, 169);
    doc.text(`${lsDataReport.endometriosisGO}`, 185, 174);
    doc.text(`${lsDataReport.planificaGO}`, 185, 179);
    doc.text(`${lsDataReport.nameMetodoGO}`, 185, 184);
    doc.text(`${lsDataReport.ultimoAnioCitologiaGO}`, 195, 189);

    doc.text(`${lsDataReport.nameResultadoGO}`, 30, 197);
  } else {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("NO REFIERE", 12, 167);
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

  doc.text("6.1 SIGNOS VITALES - TENSIÓN ARTERIAL", 7, 113);
  doc.text("6.2. ANTROPOMETRIA", 112, 113);

  doc.text("SENTADO", 7, 121);
  doc.text("ACOSTADO", 27, 121);
  doc.text("PULSO", 51, 121);
  doc.text("FC", 71, 121);
  doc.text("FR", 84, 121);
  doc.text("T. °C", 98, 121);

  doc.text("PESO (K)", 112, 121);
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
  doc.text("11. INS. EXTERNA OÍDOS", 7, 195);
  doc.text("12. OTOSCOPIA", 7, 200);
  doc.text("13. INS. EXTERNA NARIZ N", 7, 205);
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
  doc.text("24. INS. DE TORAXMAMAS ", 72, 190);
  doc.text("25. AUSCUL. CARDIACA", 72, 195);
  doc.text("26. AUSCUL. RESPIRATORIA", 72, 200);
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
  doc.text("38. EXTRE SUPERIORES", 142, 190);
  doc.text("39. EXTRE INFERIORES", 142, 195);
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
  doc.text(`${lsDataReport.tactoVaginalEF}`, marXR - 2, 185, {
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
    align: "justify",
    lineHeightFactor: 1.5,
  });
}

function generateExamenParaclinico(doc = new jsPDF(), lsDataReport) {
  doc.setFont("helvetica", "bold");
  doc.text("FECHA", 7, 132);
  doc.text("ESTUDIO", 30, 132);
  doc.text("RESULTADO", 80, 132);
  doc.text("OBSERVACIÓN", 110, 132);

  const parentesco = [
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

  const longitud = parentesco.filter((log) => log.resultado !== "SIN REGISTRO");
  doc.text("OBSERVACIONES", 7, 137 + 6 * longitud.length);

  doc.setFont("helvetica", "normal");
  doc.text(`${lsDataReport.observacionEPA}`, 7, 142 + 6 * longitud.length);
  doc.text(
    parentesco
      .filter((exam) => exam.resultado !== "SIN REGISTRO")
      .map((exam, index) => {
        return String(`${ViewFormat(exam.fecha)}`);
      }),
    7,
    137,
    { maxWidth: 200, lineHeightFactor: 2 }
  );
  doc.text(
    parentesco
      .filter((exam) => exam.resultado !== "SIN REGISTRO")
      .map((exam, index) => {
        return String(`${exam.estudio}`);
      }),
    30,
    137,
    { maxWidth: 200, lineHeightFactor: 2 }
  );
  doc.text(
    parentesco
      .filter((exam) => exam.resultado !== "SIN REGISTRO")
      .map((exam, index) => {
        return String(`${exam.resultado}`);
      }),
    80,
    137,
    { maxWidth: 200, lineHeightFactor: 2 }
  );
  doc.text(
    parentesco
      .filter((exam) => exam.resultado !== "SIN REGISTRO")
      .map((exam, index) => {
        return String(`${exam.observacion}`);
      }),
    110,
    137,
    { maxWidth: 200, lineHeightFactor: 2 }
  );
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

  doc.text("DATOS DEL REGISTRO", 7, 37);
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);

  /* CUADRO DATOS */
  doc.line(5, 25, 5, 140); /* IZQUIERDA */
  doc.line(5, 32, marXR, 32); /* HORI ONE */
  doc.line(5, 39, marXR, 39); /* HORI TWO  */
  doc.line(5, 74, marXR, 74); /* HORI THREE */
  doc.line(5, 82, marXR, 82); /* HORI FOUR */
  doc.line(5, 140, marXR, 140); /* HORI FIVE */
  doc.line(40, 39, 40, 74); /* LINEA VERTI ONE */
  doc.line(marXR, 25, marXR, 140); /* DERECHA */

  /* TITULOS DE CONTENIDO */
  doc.text("DOCUMENTO:", 45, 45);
  doc.text("NOMBRES:", 45, 50);
  doc.text("CARGO:", 45, 55);
  doc.text("AREA:", 45, 60);
  doc.text("DEPARTAMENTO:", 45, 65);
  doc.text("CONCEPTO DE APTITUD:", 45, 70);

  doc.text("RECOMENDACIONES:", 7, 79);

  doc.setFont("helvetica", "normal");
  doc.addImage(`${lsDataReport.empleadoFoto}`, "JPEG", 7.5, 41, 30, 30);
  doc.text(`${lsDataReport.documento}`, 95, 45);
  doc.text(`${lsDataReport.nameEmpleado}`, 95, 50);
  doc.text(`${lsDataReport.nameCargo}`, 95, 55);
  doc.text(`${lsDataReport.nameArea}`, 95, 60);
  doc.text(`${lsDataReport.nameDepartamentoTrabajo}`, 95, 65);
  doc.text(`${lsDataReport.nameConceptoActitudNETA}`, 95, 70);
  doc.setFontSize(9);
  doc.text(`${lsDataReport.recomendacionesNETA}`, 7, 87, {
    maxWidth: 200,
    align: "justify",
    lineHeightFactor: 1.5,
  });

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

  doc.text("DATOS DEL REGISTRO", 7, 37);
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);

  /* CUADRO DATOS */
  doc.line(5, 25, 5, 210); /* IZQUIERDA */
  doc.line(5, 32, marXR, 32); /* HORI ONE */
  doc.line(5, 39, marXR, 39); /* HORI TWO  */
  doc.line(5, 68, marXR, 68); /* HORI THREE */
  doc.line(5, 76, marXR, 76); /* HORI FOUR */
  doc.line(5, 90, marXR, 90); /* HORI FIVE */
  doc.line(5, 98, marXR, 98); /* HORI SIX */
  doc.line(5, 150, marXR, 150); /* HORI SEVEN */
  doc.line(5, 158, marXR, 158); /* HORI EIGHT */
  doc.line(5, 210, marXR, 210); /* HORI ULTIMA */
  doc.line(marXR, 25, marXR, 210); /* DERECHA */

  /* TITULOS DE CONTENIDO */
  doc.text("DOCUMENTO:", 7, 45);
  doc.text("NOMBRES:", 7, 50);
  doc.text("CARGO:", 7, 55);
  doc.text("AREA:", 7, 60);
  doc.text("DEPARTAMENTO:", 7, 65);
  doc.text("CONCEPTO DE DIAGNÓSTICOS:", 7, 73);
  doc.text("RECOMENDACIONES DE DIAGNÓSTICOS:", 7, 95);
  doc.text(
    `RECOMENDACIONES PARA APTITUD DE ${lsDataReport.nameAtencion}`,
    7,
    155
  );

  /* RENDERIZADO */
  doc.setFont("helvetica", "normal");
  doc.text(`${lsDataReport.documento}`, 55, 45);
  doc.text(`${lsDataReport.nameEmpleado}`, 55, 50);
  doc.text(`${lsDataReport.nameCargo}`, 55, 55);
  doc.text(`${lsDataReport.nameArea}`, 55, 60);
  doc.text(`${lsDataReport.nameDepartamentoTrabajo}`, 55, 65);

  if (lsDataReport.dx1 !== "")
    doc.text(`Dx1:   ${lsDataReport.dx1}   ${lsDataReport.nameDx1.toUpperCase()}`, 7, 82, { maxWidth: 200, lineHeightFactor: 1.5 });

  doc.text(`${lsDataReport.observacionID}`, 7, 103, {
    maxWidth: 200,
    align: "justify",
    lineHeightFactor: 1.5,
  });
  doc.text(`${lsDataReport.recomendacionesID}`, 7, 163, {
    maxWidth: 200,
    align: "justify",
    lineHeightFactor: 1.5,
  });

  getFirma(doc, lsDataUser, 10);
  getFirmaEmployee(doc, lsDataReport, 10);
}

export function generateClinicHistoryOtherCompany(doc = new jsPDF(), lsDataReport = []
) {
  var marXR = doc.internal.pageSize.width - 5;

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

  doc.text("1. DATOS DEL REGISTRO", 7, 37);
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);

  /* CUADRO DATOS */
  doc.line(5, 25, 5, 250); /* IZQUIERDA */
  doc.line(5, 32, marXR, 32); /* HORI ONE */
  doc.line(5, 39, marXR, 39); /* HORI TWO  */
  doc.line(5, 78, marXR, 78); /* HORI THREE */
  doc.line(5, 86, marXR, 86); /* HORI FOUR */
  doc.line(5, 110, marXR, 110); /* HORI FIVE */
  doc.line(5, 118, marXR, 118); /* HORI SIX */
  doc.line(5, 126, marXR, 126); /* HORI SEVEN */

  doc.line(110, 39, 110, 78); /* VERTI ONE */
  doc.line(110, 86, 110, 110); /* VERTI TWO */
  doc.line(5, 250, marXR, 250); /* HORI ULTIMA */
  doc.line(marXR, 25, marXR, 250); /* DERECHA */

  /* TITULOS DE CONTENIDO */
  doc.text("DOCUMENTO:", 7, 45);
  doc.text("GENERO:", 7, 50);
  doc.text("EDAD:", 7, 55);
  doc.text("ESTADO CIVIL:", 7, 60);
  doc.text("CELULAR:", 7, 65);
  doc.text("GRUPO:", 7, 70);
  doc.text("DIRECCIÓN:", 7, 75);
  /* SEGUNDA COLUMNA */
  doc.text("NOMBRES:", 112, 45);
  doc.text("F. NACIMIENTO:", 112, 50);
  doc.text("DPTO. NACIMIENTO:", 112, 55);
  doc.text("TURNO:", 112, 60);
  doc.text("EMAIL:", 112, 65);
  doc.text("EPS:", 112, 70);
  doc.text("C. NACIMIENTO:", 112, 75);

  /* 2. INFORMACIÓN DE EMPRESA Y CARGO */
  doc.text("2. INFORMACIÓN DE LA EMPRESA Y CARGO:", 7, 83);
  doc.text("SEDE DE TRABAJO:", 7, 92);
  doc.text("AREA:", 7, 97);
  doc.text("POSICIÓN:", 7, 102);
  doc.text("FECHA CONTRATO:", 7, 107);
  /* SEGUNDA COLUMNA */
  doc.text("DPTO. TRABAJO:", 112, 92);
  doc.text("GRUPO:", 112, 97);
  doc.text("TIPO CONTRATO:", 112, 102);
  doc.text("ANTIGUEDAD:", 112, 107);

  /* ENCABEZADO DE LA TABLA HISTORIA LABORAL EN OTRAS EMPRESAS */
  doc.text("NOMBRE DE LA EMPRESA", 7, 131);
  doc.text("CARGO", 80, 131);
  doc.text("AÑOS", 160, 131);
  doc.text("MESES", 190, 131);

  /* 3. ANTECEDENTES LABORALES */
  doc.text("3. ANTECEDENTES LABORALES", 7, 115);
  /* 3.1. HISTORIA LABORAL EN OTRAS EMPRESAS */
  doc.text("3.1. HISTORIA LABORAL EN OTRAS EMPRESAS", 7, 123);

  /* RENDERIZADO */
  doc.setFont("helvetica", "normal");
  doc.text(`${lsDataReport.documento}`, 45, 45);
  doc.text(`${lsDataReport.nameGenero}`, 45, 50);
  doc.text(`${GetEdad(lsDataReport.fechaNacimiento)}`, 45, 55);
  doc.text(`${lsDataReport.nameEstadoCivil}`, 45, 60);
  doc.text(`${lsDataReport.celularEmpleado}`, 45, 65);
  doc.text(`${lsDataReport.nameGrupo}`, 45, 70);
  doc.text(`${lsDataReport.direccionEmpleado}`, 45, 75);
  /* SEGUNDA COLUMNA */
  doc.text(`${lsDataReport.nameEmpleado}`, 150, 45);
  doc.text(`${ViewFormat(lsDataReport.fechaNacimiento)}`, 150, 50);
  doc.text(`${lsDataReport.nameDptoNacimiento}`, 150, 55);
  doc.text(`${lsDataReport.nameTurno}`, 150, 60);
  doc.text(`${lsDataReport.correoEmpleado}`, 150, 65);
  doc.text(`${lsDataReport.nameEps}`, 150, 70);
  doc.text(`${lsDataReport.nameCiudadNacimiento}`, 150, 75);
  /* 2. INFORMACIÓN DE EMPRESA Y CARGO */
  doc.text(`${lsDataReport.nameSede}`, 45, 92);
  doc.text(`${lsDataReport.nameArea}`, 45, 97);
  doc.text(`Community Relations Auxiliary`, 45, 102);
  doc.text(`${ViewFormat(lsDataReport.fechaContratoEmpleado)}`, 45, 107);
  /* SEGUNDA COLUMNA */
  doc.text(`${lsDataReport.nameDptoNacimiento}`, 150, 92);
  doc.text(`${lsDataReport.nameGrupo}`, 150, 97);
  doc.text(`${lsDataReport.nameTipoContrato}`, 150, 102);
  doc.text(`${GetEdad(lsDataReport.fechaContratoEmpleado)}`, 150, 107);
}

export function generateClinicHistoryDLTD(doc = new jsPDF(), resultExpoDLTD) {
  var marXR = doc.internal.pageSize.width - 5;

  doc.text("3.2. HISTORIA LABORAL EN DRUMMOND LTD.", 7, 37);
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);

  /* CUADRO DATOS */
  doc.line(5, 32, 5, 250); /* IZQUIERDA */
  doc.line(5, 32, marXR, 32); /* HORI ONE */
  doc.line(5, 39, marXR, 39); /* HORI TWO  */
  doc.line(5, 78, marXR, 78); /* HORI THREE */
  doc.line(5, 86, marXR, 86); /* HORI FOUR */
  doc.line(5, 108, marXR, 108); /* HORI FIVE */
  doc.line(70, 86, 70, 108); /* VERTI ONE */
  doc.line(140, 86, 140, 108); /* VERTI TWO */
  doc.line(5, 250, marXR, 250); /* HORI ULTIMA */
  doc.line(marXR, 32, marXR, 250); /* DERECHA */

  /* ENCABEZADO DE LA TABLA HISTORIA LABORAL DLTD */
  doc.text("CARGO", 7, 46);
  doc.text("AÑOS", 150, 46);
  doc.text("MESES", 190, 46);

  doc.text("3.3 EXPOSICIÓN ACUMULADA DE FACTORES DE RIESGO", 7, 83);

  doc.text("EN DLTD", 35, 91, { align: "center" });
  doc.text("EN OTRAS EMPRESAS", 105, 91, { align: "center" });
  doc.text("TOTALES", 175, 91, { align: "center" });

  doc.text("MPI:", 7, 97);
  doc.text("RUDIO:", 7, 104);
  doc.text("MPI:", 72, 97);
  doc.text("RUDIO:", 72, 104);
  doc.text("MPI:", 142, 97);
  doc.text("RUDIO:", 142, 104);

  /* RENDERIZADO DE EXPOSICIÓN ACUMULADA DE FACTORES DE RIESGO */
  doc.setFont("helvetica", "normal");
  doc.text(`${resultExpoDLTD.aniosMpiDLTD} AÑOS`, 25, 97);
  doc.text(`${resultExpoDLTD.mesMpiDLTD} MESES`, 50, 97);
  doc.text(`${resultExpoDLTD.aniosRuidoDLTD} AÑOS`, 25, 104);
  doc.text(`${resultExpoDLTD.mesRuidoDLTD} MESES`, 50, 104);

  doc.text(`${resultExpoDLTD.aniosMpiCompany} AÑOS`, 98, 97);
  doc.text(`${resultExpoDLTD.mesMpiCompany} MESES`, 120, 97);
  doc.text(`${resultExpoDLTD.aniosRuidoCompany} AÑOS`, 98, 104);
  doc.text(`${resultExpoDLTD.mesRuidoCompany} MESES`, 120, 104);

  doc.text(
    `${resultExpoDLTD.aniosMpiDLTD + resultExpoDLTD.aniosMpiCompany} AÑOS`,
    160,
    97
  );
  doc.text(
    `${resultExpoDLTD.mesMpiDLTD + resultExpoDLTD.mesMpiCompany} MESES`,
    190,
    97
  );
  doc.text(
    `${resultExpoDLTD.aniosRuidoDLTD + resultExpoDLTD.aniosRuidoCompany} AÑOS`,
    160,
    104
  );
  doc.text(
    `${resultExpoDLTD.mesRuidoDLTD + resultExpoDLTD.mesRuidoCompany} MESES`,
    190,
    104
  );
}

export function generatePathologicalAntecedents(
  doc = new jsPDF(),
  lsDataReport = []
) {
  var marXR = doc.internal.pageSize.width - 5;

  doc.text("4. ANTECEDENTES PERSONALES", 7, 30);
  doc.text("4.2 ENFERMEDAD LABORAL", 7, 125);
  doc.text("4.3 ACCIDENTE DE TRABAJO", 7, 155);
  doc.text("4.4 INMUNIZACIONES", 7, 185);

  doc.text("4.1 PATOLÓGICOS", 7, 37);
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);

  /* CUADRO DATOS */
  doc.line(5, 25, 5, 250); /* IZQUIERDA */
  doc.line(5, 32, marXR, 32); /* HORI ONE */
  doc.line(5, 39, marXR, 39); /* HORI TWO  */
  doc.line(5, 94, marXR, 94); /* HORI THREE*/

  doc.line(5, 120, marXR, 120); /* HORI FOUR */
  doc.line(5, 128, marXR, 128); /* HORI FIVE */

  doc.line(5, 150, marXR, 150); /* HORI SIX */
  doc.line(5, 158, marXR, 158); /* HORI SEVEN */

  doc.line(5, 180, marXR, 180); /* HORI EIGHT */
  doc.line(5, 188, marXR, 188); /* HORI NINE */

  doc.line(70, 39, 70, 94); /* VERTI ONE */
  doc.line(140, 39, 140, 94); /* VERTI TWO */
  doc.line(5, 250, marXR, 250); /* HORI ULTIMA */
  doc.line(marXR, 25, marXR, 250); /* DERECHA */

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

  doc.text("21. ETS:", 142, 45);
  doc.text("22. DEFORMIDADES:", 142, 50);
  doc.text("23. PSIQUIÁTRICO:", 142, 55);
  doc.text("24. FARMACODEPENCIA:", 142, 60);
  doc.text("25. E.M.:", 142, 65);
  doc.text("26. RENAL:", 142, 70);
  doc.text("27. ASMA:", 142, 75);
  doc.text("28. O.R.L.:", 142, 80);
  doc.text("29. CANCER:", 142, 85);

  doc.text("ESPECIFICACIONES", 7, 98);

  /* ENFERMEDAD PROFESIONAL/ACCIDENTE DE TRABAJO */
  doc.text("AÑO:", 7, 133);
  doc.text("OBSERVACIÓN", 7, 138);

  doc.text("AÑO:", 7, 163);
  doc.text("OBSERVACIÓN", 7, 168);

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

  doc.text(`${lsDataReport.etsAP}`, 185, 45);
  doc.text(`${lsDataReport.deformidadesAP}`, 185, 50);
  doc.text(`${lsDataReport.psiquiatricosAP}`, 185, 55);
  doc.text(`${lsDataReport.farmacoDependenciaAP}`, 185, 60);
  doc.text(`${lsDataReport.emAP}`, 185, 65);
  doc.text(`${lsDataReport.renalAP}`, 185, 70);
  doc.text(`${lsDataReport.asmaAP}`, 185, 75);
  doc.text(`${lsDataReport.orlAP}`, 185, 80);
  doc.text(`${lsDataReport.cancerAP}`, 185, 85);

  doc.text(`${lsDataReport.especifiqueAP}`, 7, 104, {
    maxWidth: 200,
    lineHeightFactor: 1.5,
  });

  doc.text(`${lsDataReport.anioAT}`, 20, 133);
  doc.text(`${lsDataReport.especifiqueAT}`, 7, 142, {
    maxWidth: 200,
    lineHeightFactor: 1.5,
  });

  doc.text(`${lsDataReport.anio1AT}`, 20, 163);
  doc.text(`${lsDataReport.especifique1AT}`, 7, 172, {
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
  /* doc.line(74, 158, 74, 190); */ /* doc.line(148, 158, 148, 190); */ doc.line(
    5,
    250,
    marXR,
    250
  ); /* HORI ULTIMA */
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
  doc.text("CIGARRILLOS DÍA:", 100, 45);
  doc.text("MESES:", 100, 50);
  doc.text("CIGARRILLOS DÍA:", 100, 55);
  doc.text("MESES:", 100, 60);
  doc.text("CUAL DEPORTE:", 100, 65);
  doc.text("CONSUME BEBIDAS ALCOHOLICAS:", 100, 70);
  doc.text("FRECUENCIA:", 100, 75);

  doc.text("HOBBY/PASATIEMPO:", 7, 80);

  /* FOBIAS */
  doc.text("FOBIAS:", 7, 97);
  doc.text("TIPO DE FOBIA:", 120, 97);
  doc.text("DESCRIPCIÓN:", 7, 102);

  /* RENDERIZADO DE DATOS DE HÁBITOS */
  doc.setFont("helvetica", "normal");
  doc.text(`${lsDataReport.fumaHB}`, 50, 45);
  doc.text(`${lsDataReport.aniosCigaFumaHB}`, 50, 50);
  doc.text(`${lsDataReport.fumabaHB}`, 50, 55);
  doc.text(`${lsDataReport.aniosCigaFumabaHB}`, 50, 60);
  doc.text(`${lsDataReport.practicaDeporteHB}`, 50, 65);
  doc.text(`${lsDataReport.nameFrecuenciaDeporteHB}`, 50, 70);
  doc.text(`${lsDataReport.cualBebidasAlHB}`, 50, 75);
  /* SEGUNDA COLUMNA DE HÁBITOS */
  doc.text(`${lsDataReport.cigarrillosDiasFumaHB}`, 160, 45);
  doc.text(`${lsDataReport.mesesCigaFumaHB}`, 160, 50);
  doc.text(`${lsDataReport.cigarrillosDiasFumabaHB}`, 160, 55);
  doc.text(`${lsDataReport.mesesCigaFumabaHB}`, 160, 60);
  doc.text(`${lsDataReport.nameCualDeporteHB}`, 160, 65);
  doc.text(`${lsDataReport.consumeBebidasAlcoholicasHB}`, 160, 70);
  doc.text(`${lsDataReport.nameFrecuenciaBebidaAlHB}`, 160, 75);
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

  doc.text("6. EXAMEN FISICO", 7, 105);
  doc.text("6.3 EXPLORACIÓN MORFOLÓGICA - ASPECTOS", 7, 137);

  doc.text("5. REVISIÓN POR SISTEMAS - PATOLOGÍAS", 7, 36);
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);

  /* CUADRO DATOS */
  doc.line(5, 31, 5, 250); /* IZQUIERDA */
  doc.line(5, 31, marXR, 31); /* HORI ONE */
  doc.line(5, 39, marXR, 39); /* HORI TWO  */
  doc.line(5, 79, marXR, 79); /* HORI THREE*/
  doc.line(5, 100, marXR, 100); /* HORI FOUR*/
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
  doc.text(`${lsDataReport.signoTinelEFU}`, 108, 60, { align: "right" });
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
  doc.text(`${lsDataReport.signoLasegueEFU}`, 108, 95, { align: "right" });

  /* SEGUNDA COLUMNA DE ENCABEZADO REVISIÓN POR SISTEMAS - PATOLOGÍAS */
  doc.text(`${lsDataReport.equilibrioEFU}`, marXR - 2, 45, { align: "right" });
  doc.text(`${lsDataReport.movilidadHombroEFU}`, marXR - 2, 50, {
    align: "right",
  });
  doc.text(`${lsDataReport.movilidadMuniecaEFU}`, marXR - 2, 55, {
    align: "right",
  });
  doc.text(`${lsDataReport.signoPhalenEFU}`, marXR - 2, 60, { align: "right" });
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
  doc.text(`${lsDataReport.indiceWellsEFU}`, marXR - 2, 95, { align: "right" });

  doc.text(`${lsDataReport.observacionRS}`, 7, 110, {
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
  doc.text("RECOMENDACIONES", 7, 120);
  doc.line(5, 122, marXR, 122); /* HORI TWO  */

  doc.line(5, 145, marXR, 145); /* HORI TWO  */

  doc.text("CONSENTIMIENTO INFORMADO DEL TRABAJADOR", 7, 150);
  doc.line(5, 152, marXR, 152); /* HORI TWO  */
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");

  if (lsDataReport.dx1 !== "")
    doc.text(`Dx1:   ${lsDataReport.dx1}   ${lsDataReport.nameDx1.toUpperCase()}`, 7, 47, { maxWidth: 200, lineHeightFactor: 1.5 });

  if (lsDataReport.dx2 !== "")
    doc.text(`Dx2:   ${lsDataReport.dx2}   ${lsDataReport.nameDx2.toUpperCase()}`, 7, 55, { maxWidth: 200, lineHeightFactor: 1.5 });

  if (lsDataReport.dx3 !== "")
    doc.text(`Dx3:   ${lsDataReport.dx3}   ${lsDataReport.nameDx3.toUpperCase()}`, 7, 63, { maxWidth: 200, lineHeightFactor: 1.5 });

  doc.text(`${lsDataReport.observacionID}`, 7, 79, {
    maxWidth: 200,
    lineHeightFactor: 1.5,
  });

  doc.text(`${lsDataReport.nameConceptoActitudID}`, 7, 106);
  doc.text(`${lsDataReport.recomendacionesID}`, 7, 126, {
    maxWidth: 200,
    lineHeightFactor: 1.5,
  });

  doc.setFontSize(9);
  doc.text(consentimientoInfo, 7, 157, {
    maxWidth: 200,
    lineHeightFactor: 1.5,
  });

  getFirma(doc, lsDataUser);
  getFirmaEmployee(doc, lsDataReport);
}