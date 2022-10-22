import jsPDF from "jspdf";
import LogoReport from "assets/img/LogoReport.png";
import ImgWhite from "assets/img/ImgWhite.png";
import { GetEdad, ViewFormat } from "components/helpers/Format";

/* FIRMAS */
function getFirma(doc=new jsPDF(), lsDataUser, my = 0) {
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
  doc.text("MEDICINA GENERAL", 5, doc.internal.pageSize.height - (40 - my));
  doc.text(
    `Lic: TP ${lsDataUser.licencia} - RM: ${lsDataUser.registroMedico}`,
    5,
    doc.internal.pageSize.height - (36 - my)
  );
}

function getFirmaEmployee(doc, lsDataReport, my = 0) {
 
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

/* Encabezado */
function getHeader(doc) {
  /* ENCABEZADO REPORTE */
  doc.addImage(LogoReport, "PNG", 5, 5, 60, 15);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("DIVISIÓN MÉDICA", 120, 10, null, null, "center");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(
    "ANEXO DE APTITUD PARA ESPACIO CONFINADO",
    120,
    15,
    null,
    null,
    "center"
  );
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("SIG-0409", 200, 10, null, null, "center");
  doc.text("Versión 06", 200, 15, null, null, "center");

  /* LINEA DE DIVISIÓN */
  doc.setLineWidth(1);
  doc.setDrawColor(255, 0, 0);
  doc.line(5, 25, 210, 25);
}

/* Pie de Pag. */
function getPiePage(doc, lsDataUser, page, pageSize) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setLineWidth(1);
  doc.setDrawColor(255, 0, 0);
  doc.line(
    5,
    doc.internal.pageSize.height - 10,
    210,
    doc.internal.pageSize.height - 10
  );

  doc.text(
    `FECHA DE SISTEMA:  ${new Date().toLocaleString()}`,
    10,
    doc.internal.pageSize.height - 4
  );
  doc.text(
    `USUARIO ACTIVO:  ${lsDataUser.nombre}`,
    90,
    doc.internal.pageSize.height - 4
  );
  doc.text(
    `Pag. ${page} of ${pageSize}`,
    190,
    doc.internal.pageSize.height - 4
  );
}

/* Pag. 1 */
function pageCompanyNotificationEC(doc, lsDataReport = [], lsDataUser = []) {
  /* CUADRO DATOS */

  /* LISTA DE DATOS PACIENTE */
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);
  doc.text("NOTIFICACIÓN A LA EMPRESA", 7, 30);
  doc.line(5, 32, 210, 32);

  doc.text("DATOS BÁSICOS DE LA ATENCIÓN", 7, 37);

  /* CUADRO DATOS */
  doc.line(5, 40, 210, 40);
  doc.line(5, 25, 5, 200);
  doc.line(40, 40, 40, 74); /* LINEA ONE */
  doc.line(115, 40, 115, 74); /* LINEA TWO */
  doc.line(210, 25, 210, 200);
  doc.line(5, 74, 210, 74);
  doc.line(5, 82, 210, 82);
  doc.line(5, 91, 210, 91);
  doc.line(5, 99, 210, 99);
  doc.line(5, 108, 210, 108);
  doc.line(5, 132, 210, 132);
  doc.line(5, 141, 210, 141);
  doc.line(5, 164, 210, 164);
  doc.line(5, 174, 210, 174);
  doc.line(5, 192, 210, 192);
  doc.line(115, 192, 115, 200); /* LINEA TWO */
  doc.line(5, 200, 210, 200);

  /* TITULOS DE CONTENIDO */
  doc.text("CONSECUTIVO:", 45, 48);
  doc.text("FECHA:", 120, 48);
  doc.text("DOCUMENTO:", 45, 55);
  doc.text("NOMBRES:", 120, 55);
  doc.text("GENERO:", 45, 62);
  doc.text("AREA:", 120, 62);
  doc.text("EDAD:", 45, 69);
  doc.text("ANTIGUEDAD:", 120, 69);
  doc.text("VIGENCIA DEL CONCEPTO:", 6, 79);
  doc.text("TIPO DE EXAMEN:", 6, 88);
  doc.text("CONCEPTO DE APTITUD:", 6, 96);
  doc.text("CONCEPTO APTITUD APLAZADO:", 6, 105);
  doc.text("MOTIVO DE APLAZO:", 6, 113);

  doc.text("DESCRIPCIÓN DE RESULTADOS (Resumen de limitaciones o restricciones)",6,137);
  doc.text("RECOMENDACIONES (En términos sencillos resumen de cuidados y cotroles requeridos)",6,171);
  doc.text("REMITIDO:", 6, 197);
  doc.text("A DONDE:", 120, 197);

  /* RENDERIZADO DE CONTENIDO */
  doc.setFont("helvetica", "normal");
  doc.addImage(`${lsDataReport.empleadoFoto}`, "JPEG", 7.5, 42, 30, 30);
  doc.text(`${lsDataReport.id}`, 75, 48);
  doc.text(`${ViewFormat(lsDataReport.fecha)}`, 147, 48);
  doc.text(`${lsDataReport.documento}`, 75, 55);
  doc.text(`${lsDataReport.nameEmpleado}`, 147, 55);
  doc.text(`${lsDataReport.nameGenero}`, 75, 62);
  doc.text(`${lsDataReport.nameArea}`, 147, 62);
  doc.text(`${GetEdad(lsDataReport.fechaNacimiento)}`, 75, 69);
  doc.text(`${GetEdad(lsDataReport.fechaContratoEmpleado)}`, 147, 69);
  doc.text("1 AÑO", 75, 79);
  doc.text(`${lsDataReport.nameAtencion}`, 75, 88);

  doc.text(`${lsDataReport.nameConceptoActitudNETA}`, 75, 96);
  doc.text(`${lsDataReport.nameConceptoAplazadoNETA}`, 75, 104);

  doc.text(`${lsDataReport.motivoAplazoNETA}}`, 75, 115, {
    maxWidth: 190,
   /*  align: "justify", */
    lineHeightFactor: 1.0,
  });

  doc.text(`${lsDataReport.descripcionResultadoNETA}`, 6, 148, {
    maxWidth: 190,
   /*  align: "justify", */
    lineHeightFactor: 1.0,
  });
  doc.text(`${lsDataReport.recomendacionesNETA}`, 6, 178, {
    maxWidth: 190,
 /*    align: "justify", */
    lineHeightFactor: 1.0,
  });

  doc.text(`${lsDataReport.nameRemitidoNETA}`, 45, 197);
  doc.text(`${lsDataReport.nameRemididoDondeNETA}`, 140, 197);

  /* FIRMA */
  getFirma(doc, lsDataUser);
  getFirmaEmployee(doc, lsDataReport);
}
/* Pag. 2 */
function pageWorkerNotificationEC(doc, lsDataReport = [], lsDataUser = []) {
  /* LISTA DE DATOS PACIENTE */
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);
  doc.text("NOTIFICACIÓN AL TRABAJADOR", 7, 30);
  doc.line(5, 32, 210, 32);

  doc.text(
    "La siguiente lista se ha desarrollado con base en los resultados del examen médico ocupacional, los exámenes de laboratorio y las pruebas complementarias realizadas.",
    7,
    37,
    {
      maxWidth: 190,
      align: "justify",
      lineHeightFactor: 1.0,
    }
  );

  /* CUADRO DATOS */
  doc.line(5, 43, 210, 43);
  doc.line(5, 25, 5, 229);
  doc.line(43, 43, 43, 73); /* LINEA ONE */
  doc.line(115, 43, 115, 65); /* LINEA TWO */
  doc.line(210, 25, 210, 229);

  doc.line(43, 49, 210, 49);
  doc.line(43, 54, 210, 54);
  doc.line(43, 59, 210, 59);
  doc.line(43, 65, 210, 65);

  doc.line(5, 74, 210, 74);
  doc.line(5, 82, 210, 82);

  /* LINEA FINAL */
  doc.line(197, 75, 197, 229);    /* LINEA DEL SI/NO */
  
  doc.line(5, 87, 210, 87);
  doc.line(5, 92, 210, 92);
  doc.line(5, 97, 210, 97);
  
  doc.line(5, 102, 210, 102);
  doc.line(5, 107, 210, 107);
  doc.line(5, 112, 210, 112);
  doc.line(5, 117, 210, 117);
  doc.line(5, 122, 210, 122);
  doc.line(5, 127, 210, 127);
  doc.line(5, 132, 210, 132);
  doc.line(5, 137, 210, 137);
  doc.line(5, 142, 210, 142);
  doc.line(5, 147, 210, 147);
  doc.line(5, 152, 210, 152);
  doc.line(5, 157, 210, 157);
  doc.line(5, 162, 210, 162);
  doc.line(5, 167, 210, 167);
  doc.line(5, 172, 210, 172);
  doc.line(5, 177, 210, 177);
  doc.line(5, 182, 210, 182);
  
  doc.line(5, 191, 210, 191);
  doc.line(5, 196, 210, 196);
  doc.line(5, 201, 210, 201);

  doc.line(5, 215, 210, 215);
  doc.line(5, 220, 210, 220);
  doc.line(5, 229, 210, 229);



  /* TITULOS DE CONTENIDO */
  doc.text("SEDE:", 45, 48);
  doc.text("FECHA:", 117, 48);
  doc.text("DOCUMENTO:", 45, 53);
  doc.text("NOMBRES:", 117, 53);
  doc.text("RIESGO CARDIOVASCULAR:", 45, 58);
  doc.text("CLASIFICACIÓN:", 117, 58);
  doc.text("PESO (Kilos):", 45, 63);
  doc.text("IMC:", 76, 63);
  doc.text("CONCEPTO DE APTITUD:", 45, 70);
  doc.text("VIGENCIA DEL CONCEPTO:  1 Año.", 117, 63);
  doc.text("CONDICIONES REVISADAS", 6, 79);

  doc.text("1. Menor de Edad.", 6, 86);
  doc.text("2. Mujer embarazada con cualquier edad de Gestación.", 6, 91);
  doc.text("3. Arritmias Cardiacas.", 6, 96);
  doc.text("4. Enfermedades o malformaciones cardiacas asintomáticas.", 6, 101);

  doc.text(
    "5. Historia de Hipotensión ortostática (no basta presentar episodios aislados).",
    6,
    106
  );
  doc.text(
    "6. Hipertensión arterial no controlada o resistente al tratamiento.",
    6,
    111
  );
  doc.text(
    "7. Hipertrigliceridemia aislada severa, con cifras mayores a 500 mg/dl.",
    6,
    116
  );
  doc.text("8. Cifras LDL mayores a 190 mg/dl.", 6, 121);

  doc.text("9. Diabetes controladas.", 6, 126);
  doc.text(
    "10. Dislipemia de moderada a severa asociada a diabetes, HTA, obesidad, hipotiroidismo.",
    6,
    131
  );
  doc.text(
    "11. Diagnóstico o sospecha de displidemia de origen familiar (genético).",
    6,
    136
  );
  doc.text(
    "12. Riesgo Cardiovascular a 10 años 20% según Método de Framingham.",
    6,
    141
  );
  doc.text(
    "13. Riesgo Cardiovascular entre 10 y 20% si existen dos o más factores mayores de riesgo.",
    6,
    146
  );
  doc.text("14. Hipertiroidismo no controlado o sintomático", 6, 151);
  doc.text(
    "15. Alteración auditiva severa y bilateral que comprometa bandas conversacionales (500 a 2000 Hz).",
    6,
    156
  );
  doc.text("16. Vértigo y otras alteraciones del equilibrio.", 6, 161);
  doc.text(
    "17. Epilepsia u otra enfermedad neurológica, que pueda generar alteraciones de la conciencia o el equilibrio.",
    6,
    166
  );
  doc.text(
    "18. Ceguera Temporal o permanente o alteraciones visuales significativas y severas.",
    6,
    171
  );
  doc.text(
    "19. Historia de fobias o episodios de pánico relacionados con altura.",
    6,
    176
  );
  doc.text(
    "20. Trastornos psiquiátricos, incluyendo adicciones a sustancias psicoactivas.",
    6,
    181
  );

  doc.text(
    "21. Limitaciones permanentes para deambular por sus propios medios o lesiones con compromiso funcional del cuello, espalda o extremidades, que afecten el agarre requerido en estas labores.",
    6,
    186,
    {
      maxWidth: 190,
      align: "justify",
      lineHeightFactor: 1.2,
    }
  );

  doc.text(
    "22. Obesidad Mórbida (IMC mayor a 35) o peso mayor de 120 kg, por limitaciones de sistemas de arneses.",6,195);
  doc.text(
    "23. De forma temporal, el uso de medicamentos que produzcan sueño o de privación de sueño más de un turno.",6,200);

  doc.text(
    "24. Otras alteraciones Cardiovasculares, pulmonares, musculares, hepáticas, sanguíneas o renales, que por su severidad o progreso puedan generar alteraciones del equilibrio o de la conciencia en concepto del Medico tratante",6,205,
    {
      maxWidth: 190,
      align: "justify",
      lineHeightFactor: 1.2,
    }
  );

  doc.text("OBSERVACIONES", 6, 219);

  /* RENDERIZADO DE CONTENIDO */
  /* 
  doc.addImage(`${lsDataReport.empleadoFoto}`, "JPEG", 7.5, 42, 30, 3); */

  doc.setFont("helvetica", "normal");
  doc.addImage(`${lsDataReport.empleadoFoto}`, "JPEG", 7, 44, 34, 29);
  doc.text(`${lsDataReport.nameSede}`, 71, 48);
  doc.text(`${ViewFormat(lsDataReport.fecha)}`, 138, 48);
  doc.text(`${lsDataReport.documento}`, 71, 53);
  doc.text(`${lsDataReport.nameEmpleado}`, 138, 53);
  doc.text(`${lsDataReport.nameRiesgoCardiovascularNEMTA}`, 95, 58);
  doc.text(`${lsDataReport.nameClasificacionNEMTA}`, 146, 58);

  doc.text(`${lsDataReport.nameConceptoActitudMedicoNEMTA}`, 89, 70);
  doc.text(`${lsDataReport.pesoEF}`, 69, 63);
  doc.text(`${lsDataReport.imcef}`, 86, 63);

  /* RENDERIZADO DE CUESTIONARIO */
  doc.text("SI/NO", 199, 79);
  doc.text(`${lsDataReport.idMenorEdadNEMTA}`, 201, 86);
  doc.text(`${lsDataReport.idMujerEmbarazadaNEMTA}`, 201, 91);
  doc.text(`${lsDataReport.idArimiaNEMTA}`, 201, 96);
  doc.text(`${lsDataReport.idEnfermedadNEMTA}`, 201, 101);

  doc.text(`${lsDataReport.idHistoriaNEMTA}`, 201, 106);
  doc.text(`${lsDataReport.idHipertensionNEMTA}`, 201, 111);
  doc.text(`${lsDataReport.idHipertrigliceridemiaNEMTA}`, 201, 116);
  doc.text(`${lsDataReport.idCifrasNEMTA}`, 201, 121);
  doc.text(`${lsDataReport.idDiabetesNEMTA}`, 201, 126);
  doc.text(`${lsDataReport.idDislipidemiaNEMTA}`, 201, 131);
  doc.text(`${lsDataReport.idDiagnosticoNEMTA}`, 201, 136);
  doc.text(`${lsDataReport.idRiesgoCardiovascular1NEMTA}`, 201, 141);
  doc.text(`${lsDataReport.idRiesgoCardiovascular2NEMTA}`, 201, 146);
  doc.text(`${lsDataReport.idHipertiroidismoNEMTA}`, 201, 151);
  doc.text(`${lsDataReport.idAlteracionAuditivaNEMTA}`, 201, 156);
  doc.text(`${lsDataReport.idVertigoAlteracionesNEMTA}`, 201, 161);
  doc.text(`${lsDataReport.idEpilegsiaNEMTA}`, 201, 166);
  doc.text(`${lsDataReport.idCegueraTemporalNEMTA}`, 201, 171);
  doc.text(`${lsDataReport.idHistoriaFobiasNEMTA}`, 201, 176);
  doc.text(`${lsDataReport.idTranstornoPsiquiatricoNEMTA}`, 201, 181);
  doc.text(`${lsDataReport.idLimitacionesNEMTA}`, 201, 186);
  doc.text(`${lsDataReport.idObesidadMorbidaNEMTA}`, 201, 195);
  doc.text(`${lsDataReport.idDeformaTemporalNEMTA}`, 201, 200);
  doc.text(`${lsDataReport.idOtrasAlteracionesNEMTA}`, 201, 205);


  doc.text(`${lsDataReport.observacionesNEMTA}`, 6, 223, {
    maxWidth: 190,
    lineHeightFactor: 1.0,
  });




  /* FIRMA */
  getFirma(doc, lsDataUser, 22);
  getFirmaEmployee(doc, lsDataReport, 22);
}

/* Renderizado Principal INDEX  */
export function generateReportConfinedSpace(lsDataReport = [], lsDataUser = []) {
  var doc = new jsPDF("p", "mm", "letter");
  /* Pag. 1 */
  getHeader(doc);
  pageCompanyNotificationEC(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 1, 2);

  doc.addPage();

  getHeader(doc);
  pageWorkerNotificationEC(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 2, 2);

  var dataPDF = doc.output("bloburl");
  return dataPDF;
}

