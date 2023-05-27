import { ViewFormat } from "components/helpers/Format";
import jsPDF from "jspdf";

import config from "config";
import LogoReportLtd from 'assets/img/LogoReportLTD.png';
import LogoReportEnergy from 'assets/img/LogoReportEnergy.png';

function getHeader(doc = new jsPDF()) {
  var marXR = doc.internal.pageSize.width - 5;
  /* ENCABEZADO REPORTE */
  doc.addImage(config.typeDashboard === 'ltd' ? LogoReportLtd : LogoReportEnergy, "PNG", 5, 5,
    config.typeDashboard === 'ltd' ? 60 : 50, 15);
  doc.setFontSize(10);

  doc.text("DIVISIÓN MÉDICA", 110, 10, { align: 'center' });
  doc.text("DEPARTAMENTO DE SALUD OCUPACIONAL", 110, 14, { align: 'center' });

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
  doc.line(5, doc.internal.pageSize.height - 10, 210, doc.internal.pageSize.height - 10);

  doc.text(`FECHA DE SISTEMA:  ${new Date().toLocaleString()}`, 10, doc.internal.pageSize.height - 4);
  doc.text(`USUARIO ACTIVO:  ${lsDataUser.nombre}`, 90, doc.internal.pageSize.height - 4);
  doc.text(`Pag. ${page} of ${pageSize}`, 190, doc.internal.pageSize.height - 4);
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

function getFirma(doc, lsDataUser, my = 0) {
  doc.addImage(`${lsDataUser.firma}`, "PNG", 7, doc.internal.pageSize.height - (70 - my), 50, 20);
  doc.setLineWidth(0.5);
  doc.setDrawColor(128, 128, 128);
  doc.line(7, doc.internal.pageSize.height - (48 - my), 60, doc.internal.pageSize.height - (48 - my));
  doc.setFontSize(8);
  doc.text(`${lsDataUser.nombre}`, 7, doc.internal.pageSize.height - (44 - my));
  doc.text(`${lsDataUser.nameEspecialidad}`, 7, doc.internal.pageSize.height - (40 - my));
  doc.text(`${lsDataUser.licencia} - ${lsDataUser.registroMedico}`, 7, doc.internal.pageSize.height - (36 - my));
}

function generateReportSuministroepp(doc = new jsPDF(), lsDataReport = [], lsDataUser = []) {

  var marXR = doc.internal.pageSize.width - 5;
  doc.setFontSize(11);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);
  doc.line(5, doc.internal.pageSize.height - 20, marXR, doc.internal.pageSize.height - 20); /* HORI ULTIMA */

  /* TITULOS DE CONTENIDO */
  doc.text(`No. ORDEN EPP:`, 7, 37);
  doc.text(`${lsDataReport.idOrdenesEpp}`, 50, 37);
  doc.text(`FECHA: `, 7, 42);
  doc.text(`${ViewFormat(lsDataReport.fecha)}`, 50, 42);
  doc.text(`PARA: `, 7, 47);
  doc.text(`SUPERVISOR BODEGA`, 50, 47);
  doc.text(`DE:`, 7, 52);
  doc.text(`${lsDataUser.nombre}`, 50, 52);
  doc.text('REF:', 7, 57);
  doc.text('SUMINISTRO EPP', 50, 57);

  doc.text('ENTREGA DE SUMINISTRO DEL SIGUIENTE ELEMENTO DE PROTECCION PERSONAL EPP.', 7, 71);

  doc.line(5, 65, marXR, 65); /* HORI ONE */
  doc.line(5, 75, marXR, 75); /* HORI TWO  */

  doc.text('No. DOCUMENTO', 7, 81);
  doc.text('NOMBRE DEL EMPLEADO', 56, 81);
  doc.text('EPP', 133, 81);
  doc.text('No. PEOPLESOFT', 170, 81);


  doc.line(5, 85, marXR, 85); /* HORI THREE */

  doc.line(5, 65, 5, 95); /* LINEA VERTI ONE */
  doc.line(41, 75, 41, 95); /* LINEA VERTI ONE */
  doc.line(114, 75, 114, 95); /* LINEA VERTI ONE */
  doc.line(162, 75, 162, 95); /* LINEA VERTI ONE */
  doc.line(211, 65, marXR, 95); /* HORI ONE */

  doc.text(`${lsDataReport.documento}`, 10, 91);
  doc.text(`${lsDataReport.nameEmpleado}`, 42, 91);

  doc.text('Marco de seguridad', 118, 91);
  doc.text('24435', 184, 91);

  doc.line(5, 95, marXR, 95); /* HORI THREE */

  /* FIRMA */
  getFirma(doc, lsDataUser);
  getFirmaEmployee(doc, lsDataReport);

}

function generateReportInstalacioneppPageTwo(doc = new jsPDF(), lsDataReport = [], lsDataUser = []) {
  var marXR = doc.internal.pageSize.width - 5;
  doc.setFontSize(11);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);
  doc.line(5, doc.internal.pageSize.height - 20, marXR, doc.internal.pageSize.height - 20); /* HORI ULTIMA */

  /* TITULOS DE CONTENIDO */
  doc.text(`No. ORDEN EPP:`, 7, 37);
  doc.text(`${lsDataReport.idOrdenesEpp}`, 50, 37);
  doc.text(`FECHA: `, 7, 42);
  doc.text(`${ViewFormat(lsDataReport.fecha)}`, 50, 42);
  doc.text(`PARA: `, 7, 47);
  doc.text(`${lsDataReport.nameProveedor}`, 50, 47);
  doc.text(`DE:`, 7, 52);
  doc.text(`${lsDataUser.nombre}`, 50, 52);
  doc.text('REF:', 7, 57);
  doc.text('INSTALACION DE LENTES', 50, 57);


  doc.text('SÍRVASE REALIZAR POR NUESTRA CUENTA AL SEÑOR(A)', 7, 71);

  doc.line(5, 65, marXR, 65); /* HORI ONE */
  doc.line(5, 75, marXR, 75); /* HORI TWO  */

  doc.text('No. DOCUMENTO', 7, 81);
  doc.text('NOMBRE DEL EMPLEADO', 50, 81);
  doc.text('INSTALACION DE LENTES CORRECTIVOS EN', 107, 81);
  doc.text('MARCOS DE SEGURIDAD SEGUN FORMULA ADJUNTA.', 107, 91);


  doc.line(5, 85, marXR, 85); /* HORI THREE */

  doc.line(5, 65, 5, 95); /* LINEA VERTI ONE */
  doc.line(41, 75, 41, 95); /* LINEA VERTI ONE */
  doc.line(105, 75, 105, 95); /* LINEA VERTI ONE */

  doc.line(211, 65, marXR, 95); /* HORI ONE */

  doc.text(`${lsDataReport.documento}`, 10, 91);
  doc.text(`${lsDataReport.nameEmpleado}`, 42, 91);



  doc.line(5, 95, marXR, 95); /* HORI THREE */

  /* FIRMA */
  getFirma(doc, lsDataUser);
  getFirmaEmployee(doc, lsDataReport);



}

export function generateReportOrderEPP(lsDataReport = [], lsDataUser = []) {
  const doc = new jsPDF('p', 'mm', 'letter');

  doc.setFont("helvetica", "bold");
  getHeader(doc);
  generateReportSuministroepp(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 1, 2);

  doc.addPage();

  doc.setFont("helvetica", "bold");
  getHeader(doc);
  generateReportInstalacioneppPageTwo(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 2, 2);

  var dataPDF = doc.output("bloburl");
  return dataPDF;
}