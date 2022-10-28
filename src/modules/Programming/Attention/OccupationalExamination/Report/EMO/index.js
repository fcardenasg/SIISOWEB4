import jsPDF from "jspdf";
import LogoReport from "assets/img/LogoReport.png";
import { pageCompanyNotification, pageWorkerNotification } from "./TrabajoAl";
import { pageFramingham } from "./Framingham";

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

function getHeader(doc = new jsPDF(), lsDataReport) {
  var marXR = doc.internal.pageSize.width - 5;
  /* ENCABEZADO REPORTE */
  doc.addImage(LogoReport, "PNG", 5, 5, 60, 15);
  doc.setFontSize(10);

  doc.text("DIVISIÓN MÉDICA", 110, 10, { align: "center" });
  doc.text("HISTORIA CLÍNICA OCUPACIONAL", 110, 14, { align: "center" });
  doc.text(`${lsDataReport.nameAtencion}`, 110, 18, { align: "center" });

  doc.setFontSize(12);
  doc.text("SIG-0410", 170, 12);
  doc.setFontSize(10);
  doc.text("Versión 06", 170, 16);

  /* LINEA DE DIVISIÓN */
  doc.setLineWidth(1);
  doc.setDrawColor(255, 0, 0);
  doc.line(5, 25, marXR, 25);
}

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

export function generateReportIndex(
  lsDataReport = [],
  lsDataUser = [],
  resultExpoDLTD
) {
  var doc = new jsPDF("p", "mm", "letter");

  doc.setFont("helvetica", "bold");
  getHeader(doc, lsDataReport);
  generateReportConceptAptitude(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 1, 10);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeader(doc, lsDataReport);
  generateReportDiagnosis(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 2, 10);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeader(doc, lsDataReport);
  generateClinicHistoryOtherCompany(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 3, 10);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeader(doc, lsDataReport);
  generateClinicHistoryDLTD(doc, resultExpoDLTD);
  getPiePage(doc, lsDataUser, 4, 10);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeader(doc, lsDataReport);
  generatePathologicalAntecedents(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 5, 10);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeader(doc, lsDataReport);
  generateHabitsGineco(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 6, 10);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeader(doc, lsDataReport);
  generateSystemReview(doc, lsDataReport);
  getPiePage(doc, lsDataUser, 7, 10);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeader(doc, lsDataReport);
  generateFunctionalExploration(doc, lsDataReport);
  getPiePage(doc, lsDataUser, 8, 10);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeader(doc, lsDataReport);
  generateDefinitiveDiagnosis(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 9, 10);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeader(doc, lsDataReport);
  pageCompanyNotification(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 10, 10);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeader(doc, lsDataReport);
  pageWorkerNotification(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 11, 10);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeader(doc, lsDataReport);
  pageFramingham(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 12, 10);

  var dataPDF = doc.output("bloburl");
  return dataPDF;
}
