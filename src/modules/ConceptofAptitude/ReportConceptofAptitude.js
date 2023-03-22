import { ViewFormat } from "components/helpers/Format";
import jsPDF from "jspdf";
import LogoReport from 'assets/img/LogoReport.png';

function getHeader(doc = new jsPDF()) {
  var marXR = doc.internal.pageSize.width - 5;
  /* ENCABEZADO REPORTE */
  doc.addImage(LogoReport, "PNG", 5, 5, 60, 15);
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

//////////////////////////////////

function generateReportConceptAptitude(
  doc = new jsPDF(),
  lsDataReport = [],
  lsDataUser
) {
  var marXR = doc.internal.pageSize.width - 5;

  doc.text("CONCEPTO EXAMEN OCUPACIONAL", 7, 30);
  doc.text(
    `FECHA DE CONCEPTO:  ${ViewFormat(lsDataReport.fecha)}`,
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

  doc.line(5, 90, marXR, 90); /* HORI THREE */
  doc.line(5, 98, marXR, 98); /* HORI FOUR */

  doc.line(5, 140, marXR, 140); /* HORI FIVE */
  doc.line(40, 39, 40, 90); /* LINEA VERTI ONE */
  doc.line(marXR, 25, marXR, 140); /* DERECHA */

  /* TITULOS DE CONTENIDO */
  doc.text("DOCUMENTO:", 45, 45);
  doc.text("NOMBRES:", 120, 45);
  doc.text("CARGO:", 45, 50);
  doc.text("PROFESIÓN:", 45, 55);
  doc.text("AREA:", 45, 60);
  doc.text("DEPARTAMENTO:", 45, 65);
  doc.text("CONCEPTO DE APTITUD:", 45, 70);

  doc.text("RECOMENDACIONES:", 7, 95);

  doc.setFont("helvetica", "normal");

  doc.addImage(`${lsDataReport.urlImg}`, "JPEG", 7.5, 45, 30, 30);
  doc.text(`${lsDataReport.documento}`, 95, 45);
  doc.text(`${lsDataReport.nameEmpleado}`, 142, 45);
  doc.text(`${lsDataReport.nameCargo}`, 95, 50);
  doc.text(`${lsDataReport.nameOficio}`, 95, 55);
  doc.text(`${lsDataReport.nameArea}`, 95, 60);
  doc.text(`${lsDataReport.nameDepartamento}`, 95, 65);

  doc.text(`${lsDataReport.nameConceptoActitud}`, 95, 70, { maxWidth: 110, lineHeightFactor: 1.5, });

  doc.setFontSize(9);
  doc.text(`${lsDataReport.observacionesNEMTA}`, 7, 105, { maxWidth: 200, lineHeightFactor: 1.5, });

  getFirma(doc, lsDataUser);
}

export function generateReportConceptofAptitude(lsDataReport = [], lsDataUser = []) {
  const doc = new jsPDF('p', 'mm', 'letter');

  doc.setFont("helvetica", "bold");
  getHeader(doc);
  generateReportConceptAptitude(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 1, 1);


  var dataPDF = doc.output("bloburl");
  return dataPDF;
}