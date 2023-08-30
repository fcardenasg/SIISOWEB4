import jsPDF from "jspdf";
import { GetEdad, ViewFormat } from "components/helpers/Format";

import config from "config";
import LogoReportLtd from 'assets/img/LogoReportLTD.png';
import LogoReportEnergy from 'assets/img/LogoReportEnergy.png';

/* FIRMAS */
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

/* Encabezado */
function getHeader(doc) {
  /* ENCABEZADO REPORTE */
  doc.addImage(config.typeDashboard === 'ltd' ? LogoReportLtd : LogoReportEnergy, "PNG", 5, 5,
    config.typeDashboard === 'ltd' ? 60 : 50, 15);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("DIVISIÓN MÉDICA", 120, 10, null, null, "center");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(
    "NOTAS DE ENFERMERIA",
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
function pageNursing(doc, lsDataReport = [], lsDataUser = []) {
  /* CUADRO DATOS */

  /* LISTA DE DATOS PACIENTE */
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);
  doc.text(`${lsDataReport.nameAtencion}`, 7, 30);
  doc.line(5, 32, 210, 32);

  doc.text("DATOS BÁSICOS DE LA ATENCIÓN", 7, 37);

  /* CUADRO DATOS */
  doc.line(5, 40, 210, 40);
  doc.line(5, 25, 5, 184);
  doc.line(40, 40, 40, 74); /* LINEA ONE */
  doc.line(115, 40, 115, 74); /* LINEA TWO */
  doc.line(210, 25, 210, 184);
  doc.line(5, 74, 210, 74);
  doc.line(5, 82, 210, 82);
  doc.line(5, 91, 210, 91);
  doc.line(5, 115, 210, 115);
  doc.line(5, 125, 210, 125);
  doc.line(5, 184, 210, 184);


  /* TITULOS DE CONTENIDO */
  doc.text("CONSECUTIVO:", 45, 46);
  doc.text("FECHA:", 120, 46);
  doc.text("DOCUMENTO:", 45, 52);
  doc.text("NOMBRES:", 120, 52);
  doc.text("GENERO:", 45, 58);

  doc.text("EDAD:", 120, 58);
  doc.text(`ANTIGUEDAD:  ${GetEdad(lsDataReport.fechaContrato)}`, 170, 58);
  doc.text("TIPO CONTRATO:", 45, 64);

  doc.text("AÑOS", 153, 58);
  doc.text("CARGO:", 120, 64);
  doc.text("AREA:", 45, 70);
  doc.text("DEPARTAMENTO:", 120, 70);

  doc.text("RESUMEN DE LA ATENCIÓN", 6, 79);
  doc.text("CONTINGENCIA:", 6, 88);
  doc.text("PROCEDIMIENTOS:", 6, 98);
  doc.text("DESCRIPCIÓN", 6, 122);


  /* RENDERIZADO DE CONTENIDO */
  doc.setFont("helvetica", "normal");
  doc.addImage(`${lsDataReport.empleadoFoto}`, "JPEG", 7.5, 42, 30, 30);

  doc.text(`${lsDataReport.id}`, 75, 46);
  doc.text(`${ViewFormat(lsDataReport.fecha)}`, 147, 46);
  doc.text(`${lsDataReport.documento}`, 75, 52);
  doc.text(`${lsDataReport.nameEmpleado}`, 147, 52);

  doc.text(`${GetEdad(lsDataReport.fechaNacimi)}`, 147, 58);
  doc.text(`${lsDataReport.nameGenero}`, 75, 58);

  doc.text(`${lsDataReport.nameTipoContrato}`, 75, 64);

  doc.text(`${lsDataReport.nameArea}`, 75, 70);
  doc.text(`${lsDataReport.nameDepartamento}`, 152, 70);
  doc.text(`${lsDataReport.nameCargo}`, 147, 64);

  doc.text(`${lsDataReport.nameContingencia}`, 40, 88);

  if (lsDataReport.procedimientos !== undefined && lsDataReport !== []) {
    doc.text(JSON.parse(lsDataReport.procedimientos).map((dx, index) => {
      return String(`${dx.label.toUpperCase()}`)
    }), 40, 98, { maxWidth: 200, lineHeightFactor: 1.5 });
  }

  doc.text(`${lsDataReport.notaEnfermedad}`, 6, 130, {
    maxWidth: 190,
    lineHeightFactor: 1.0,
  });

  /* FIRMA */
  getFirma(doc, lsDataUser);
  getFirmaEmployee(doc, lsDataReport);
}


/* Renderizado Principal INDEX  */
export function generateReportNursing(lsDataReport = [], lsDataUser = []) {
  var doc = new jsPDF("p", "mm", "letter");
  /* Pag. 1 */
  getHeader(doc);
  pageNursing(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 1, 1);


  var dataPDF = doc.output("bloburl");
  return dataPDF;
}
