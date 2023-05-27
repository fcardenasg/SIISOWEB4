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

function generateReportCabRegistration(
  doc = new jsPDF(),
  lsDataReport = [],
  lsDataUser
) {
  var marXR = doc.internal.pageSize.width - 5;

  doc.text("REGISTRO DE TAXI", 7, 30);
  doc.text(
    `FECHA DEL REGISTRO:  ${ViewFormat(lsDataReport.fecha)}`,
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

  /* DESCRIPCIONES DE TEXTO */
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  /* TITULOS DE CONTENIDO */
  doc.text("DOCUMENTO:", 42, 45);
  doc.text("NOMBRES:", 125, 45);
  doc.text("CARGO:", 42, 50);
  doc.text("CONTINGENCIA:", 42, 55);
  doc.text("RUTA:", 42, 60);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("DESTINO:", 125, 60);
  doc.text("CARGADO A:", 42, 65);
  doc.text("Nro. TAXI:", 125, 65);
  doc.text("CUPO:", 42, 70);
  doc.text("ASIGNA:", 125, 70);
  doc.text("MOTIVO:", 7, 79);

  /* DESCRIPCIONES DE TEXTO */
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");

  doc.addImage(`${lsDataReport.urlImg}`, "JPEG", 7.5, 41, 30, 30);
  doc.text(`${lsDataReport.documento}`, 69, 45);
  doc.text(`${lsDataReport.nameEmpleado}`, 145, 45);
  doc.text(`${lsDataReport.nameCargo}`, 69, 50);
  doc.text(`${lsDataReport.nameContingencia}`, 69, 55);
  doc.text(`${lsDataReport.nameRuta}`, 69, 60);
  doc.text(`${lsDataReport.nameDestino}`, 145, 60);
  doc.text(`${lsDataReport.nameCargadoa}`, 69, 65);
  doc.text(`${lsDataReport.nameNrotaxi}`, 145, 65);
  doc.text(`${lsDataReport.nameCupo}`, 69, 70);
  doc.text(`${lsDataReport.nameMedico}`, 145, 70);
  doc.setFontSize(8);
  doc.text(`${lsDataReport.motivoTraslado}`, 7, 87, {
    maxWidth: 200,
    lineHeightFactor: 1.5,
  });

  getFirma(doc, lsDataUser);
}

export function generateReportRequests(lsDataReport = [], lsDataUser = []) {
  const doc = new jsPDF('p', 'mm', 'letter');

  doc.setFont("helvetica", "bold");
  getHeader(doc);
  generateReportCabRegistration(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 1, 1);

  var dataPDF = doc.output("bloburl");
  return dataPDF;
}