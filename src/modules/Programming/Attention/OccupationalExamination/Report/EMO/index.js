import jsPDF from "jspdf";
import config from "config";

import { pageCompanyNotification, pageWorkerNotification } from "./TrabajoAl";
import { pageFramingham } from "./Framingham";
import {
  pageCompanyNotificationEC,
  pageWorkerNotificationEC,
} from "./ConfinedSpace";
import {
  pageQuestionnaireRespiratorySymptomsOne,
  pageQuestionnaireRespiratorySymptomsTwo,
  pageQuestionnaireRespiratorySymptomsThree,
  pageQuestionnaireRespiratorySymptomsFour,
} from "./QuestionnaireRespiratorySymptoms";

import {
  generateReportConceptAptitude,
  generateReportDiagnosis,
  generateClinicHistoryOtherCompany,
  generateClinicHistoryDLTD,
  generatePathologicalAntecedents,
  generateHabitsGineco,
  generateSystemReview,
  generateFunctionalExploration,
  generateDefinitiveDiagnosis,
} from "./PageReport";

function getHeader(doc = new jsPDF(), lsDataReport, version = "SIG-0410") {
  var marXR = doc.internal.pageSize.width - 5;
  /* ENCABEZADO REPORTE */
  doc.addImage(config.logotipo, "PNG", 5, 5, config.typeDashboard === 'DLTD' ? 60 : 50, 15);
  doc.setFontSize(10);

  doc.text("DIVISIÓN MÉDICA", 110, 10, { align: "center" });
  doc.text("HISTORIA CLÍNICA OCUPACIONAL", 110, 14, { align: "center" });
  doc.text(`${lsDataReport.nameAtencion}`, 110, 18, { align: "center" });

  doc.setFontSize(12);
  doc.text(version, 170, 12);
  doc.setFontSize(10);
  doc.text("Versión 06", 170, 16);

  /* LINEA DE DIVISIÓN */
  doc.setLineWidth(1);
  doc.setDrawColor(255, 0, 0);
  doc.line(5, 25, marXR, 25);
}

// trabajo en altura
export function getHeaderTA(doc) {
  /* ENCABEZADO REPORTE */
  doc.addImage(config.logotipo, "PNG", 5, 5, config.typeDashboard === 'DLTD' ? 60 : 50, 15);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("DIVISIÓN MÉDICA", 120, 10, null, null, "center");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(
    "ANEXO DE APTITUD PARA TRABAJO EN ALTURAS",
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

// FRaminhang
export function getHeaderFR(doc) {
  /* ENCABEZADO REPORTE */
  doc.addImage(config.logotipo, "PNG", 5, 5, config.typeDashboard === 'DLTD' ? 60 : 50, 15);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("DIVISIÓN MÉDICA", 120, 10, null, null, "center");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(
    "ESTIMACIÓN DE RIESGO ABSOLUTO Y RELATIVO",
    120,
    15,
    null,
    null,
    "center"
  );

  doc.text(
    "SEGÚN MÉTODO FRAMINGHAM",
    120,
    20,
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

//Espacio Confinado
/* Encabezado */
export function getHeaderEc(doc) {
  /* ENCABEZADO REPORTE */
  doc.addImage(config.logotipo, "PNG", 5, 5, config.typeDashboard === 'DLTD' ? 60 : 50, 15);
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

//Cuestionario de sintomas

export function getHeaderQS(doc) {
  /* ENCABEZADO REPORTE */
  doc.addImage(config.logotipo, "PNG", 5, 5, config.typeDashboard === 'DLTD' ? 60 : 50, 15);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("DIVISIÓN MÉDICA", 120, 10, null, null, "center");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(
    "CUESTIONARIO DE SÍNTOMAS RESPIRATORIOS",
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

function getPiePage(doc, lsDataUser, page, pageSize, lsDataReport) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setLineWidth(1);
  doc.setDrawColor(255, 0, 0);


  if (lsDataReport.nameAtencion === 'CONTROL PERIODICO') {
    doc.line(
      5,
      doc.internal.pageSize.height - 12,
      210,
      doc.internal.pageSize.height - 12
    );

    doc.setFontSize(6);
    doc.text(
      'Documento valido por 180 días desde la fecha de expedición',
      90,
      doc.internal.pageSize.height - 9
    );
  } else {
    doc.line(
      5,
      doc.internal.pageSize.height - 9,
      210,
      doc.internal.pageSize.height - 9
    );
  }

  doc.setFontSize(8);
  doc.text(
    `FECHA DE IMPRESIÓN:  ${new Date().toLocaleString()}`,
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

export function generateReportIndex(
  lsDataReport = [],
  lsDataUser = [],
  resultExpoDLTD,
  lsRiesgoHLD,
  lsRiesgoHLDO,
  lsWorkHistory,
  lsWorkHistoryOtherCompany
) {
  var doc = new jsPDF("p", "mm", "letter");

  doc.setFont("helvetica", "bold");
  getHeader(doc, lsDataReport);
  generateReportConceptAptitude(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 1, 18, lsDataReport);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeader(doc, lsDataReport);
  generateReportDiagnosis(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 2, 18, lsDataReport);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeader(doc, lsDataReport, "SIG-0407");
  generateClinicHistoryOtherCompany(doc, lsDataReport, lsRiesgoHLDO, lsWorkHistoryOtherCompany);
  getPiePage(doc, lsDataUser, 3, 18, lsDataReport);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeader(doc, lsDataReport);
  generateClinicHistoryDLTD(doc, resultExpoDLTD, lsRiesgoHLD, lsWorkHistory);
  getPiePage(doc, lsDataUser, 4, 18, lsDataReport);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeader(doc, lsDataReport);
  generatePathologicalAntecedents(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 5, 18, lsDataReport);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeader(doc, lsDataReport);
  generateHabitsGineco(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 6, 18, lsDataReport);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeader(doc, lsDataReport);
  generateSystemReview(doc, lsDataReport);
  getPiePage(doc, lsDataUser, 7, 18, lsDataReport);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeader(doc, lsDataReport);
  generateFunctionalExploration(doc, lsDataReport);
  getPiePage(doc, lsDataUser, 8, 18, lsDataReport);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeader(doc, lsDataReport);
  generateDefinitiveDiagnosis(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 9, 18, lsDataReport);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeaderTA(doc, lsDataReport);
  pageCompanyNotification(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 10, 18, lsDataReport);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeaderTA(doc, lsDataReport);
  pageWorkerNotification(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 11, 18, lsDataReport);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeaderFR(doc, lsDataReport);
  pageFramingham(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 12, 18, lsDataReport);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeaderEc(doc, lsDataReport);
  pageCompanyNotificationEC(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 13, 18, lsDataReport);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeaderEc(doc, lsDataReport);
  pageWorkerNotificationEC(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 14, 18, lsDataReport);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeaderQS(doc, lsDataReport);
  pageQuestionnaireRespiratorySymptomsOne(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 15, 18, lsDataReport);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeaderQS(doc, lsDataReport);
  pageQuestionnaireRespiratorySymptomsTwo(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 16, 18, lsDataReport);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeaderQS(doc, lsDataReport);
  pageQuestionnaireRespiratorySymptomsThree(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 17, 18, lsDataReport);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeaderQS(doc, lsDataReport);
  pageQuestionnaireRespiratorySymptomsFour(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 18, 18, lsDataReport);

  var dataPDF = doc.output("bloburl");
  return dataPDF;
}