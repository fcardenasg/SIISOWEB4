import jsPDF from "jspdf";
import config from "config";
import LogoReportLtd from 'assets/img/LogoReportLTD.png';
import LogoReportEnergy from 'assets/img/LogoReportEnergy.png';
import { GetEdad, ViewFormat } from "components/helpers/Format";

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
    "PRUEBAS DE ALCOHOL Y DROGA",
    120,
    15,
    null,
    null,
    "center"
  );
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("SIG-0410  ", 200, 10, null, null, "center");
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
function pageAlcoholtesting(doc, lsDataReport = [], lsDataUser = []) {
  /* CUADRO DATOS */

  /* LISTA DE DATOS PACIENTE */
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);
  doc.text("DATOS BÁSICOS DE LA ATENCIÓN", 7, 37);
  doc.line(5, 32, 210, 32);
  doc.text("CONCEPTO DE APTITUD PRUEBAS DE ALCOHOL Y DROGA", 7, 30);
  /* CUADRO DATOS */
  doc.line(5, 40, 210, 40);
  doc.line(5, 25, 5, 148);
  doc.line(40, 40, 40, 74); /* LINEA ONE */

  doc.line(115, 40, 115, 74); /* LINEA TWO */

  doc.line(115, 91, 115, 99); /* LINEA TRES */

  doc.line(210, 25, 210, 148);
  doc.line(5, 74, 210, 74);
  doc.line(5, 82, 210, 82);
  doc.line(5, 91, 210, 91);
  doc.line(5, 99, 210, 99);
  doc.line(5, 108, 210, 108);

  //RESULTADO
  doc.line(5, 118, 210, 118);
  doc.line(5, 128, 210, 128);
  doc.line(5, 138, 210, 138);
  doc.line(5, 148, 210, 148);
  //LINEA FINAL
  doc.line(50, 108, 50, 148);

  /* TITULOS DE CONTENIDO */
  doc.text("CONSECUTIVO:", 45, 46);
  doc.text("FECHA:", 120, 46);
  doc.text("DOCUMENTO:", 45, 52);
  doc.text("NOMBRES:", 120, 52);
  doc.text("GENERO:", 45, 58);
  doc.text("EDAD:", 120, 58);
  doc.text("AÑOS", 153, 58);
  doc.text("ANTIGUEDAD:", 45, 64);
  doc.text("CARGO:", 120, 64);
  doc.text("ÁREA:", 45, 70);
  doc.text("EMPRESA:", 120, 70);

  doc.text("RESULTADO PRUEBA DE ALCOHOL Y DROGA SIG - 400", 6, 79);
  doc.text("DE:        DEPARTAMENTO DE SALUD OCUPACIONAL", 6, 88);
  doc.text("PARA:", 6, 97);
  doc.text("ÁREA:", 120, 97);
  doc.text("RESULTADO", 6, 105);

  doc.text("FECHA PRUEBA:", 6, 114);
  doc.text("MOTIVO PRUEBA:", 6, 124);
  doc.text("CONCEPTO APTITUD:", 6, 134);
  doc.text("REALIZADA POR: ", 6, 144);

  /* RENDERIZADO DE CONTENIDO */
  doc.setFont("helvetica", "normal");
  doc.addImage(`${lsDataReport.empleadoFoto}`, "JPEG", 7.5, 42, 30, 30);

  doc.text(`${lsDataReport.idPruebasAlcoholDroga}`, 75, 46);
  doc.text(`${ViewFormat(lsDataReport.fecha)}`, 147, 46);
  doc.text(`${lsDataReport.documento}`, 75, 52);
  doc.text(`${lsDataReport.nameEmpleado}`, 147, 52);

  doc.text(`${GetEdad(lsDataReport.fechaNacimi)}`, 147, 58);
  doc.text(`${lsDataReport.nameGenero}`, 75, 58);
  doc.text(`${GetEdad(lsDataReport.fechaContrato)}`, 75, 64);
  doc.setFontSize(9);
  doc.text(`${lsDataReport.nameArea}`, 57, 70);
  doc.setFontSize(10);
  doc.text(`${lsDataReport.nameEmpresa}`, 147, 70);
  doc.text(`${lsDataReport.nameCargo}`, 147, 64);

  doc.text(`${lsDataReport.nameDepartamento}`, 20, 97);
  doc.text(`${lsDataReport.nameArea}`, 133, 97);
  doc.text(`${ViewFormat(lsDataReport.fecha)}`, 53, 114);
  doc.text(`${lsDataReport.nameMotivo}`, 53, 124);
  doc.text(`${lsDataReport.nameConcepto}`, 53, 134);
  doc.text(`${lsDataUser.nombre}`, 53, 144);

  /* FIRMA */
  getFirma(doc, lsDataUser);
}

/* Pag. 2 */
function pageAlcoholtestingR(doc, lsDataReport = [], lsDataUser = []) {
  /* LISTA DE DATOS PACIENTE */
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);
  doc.text("RESULTADO PRUEBAS DE ALCOHOL Y DROGA", 7, 30);
  doc.line(5, 32, 210, 32);
  doc.text("DATOS BÁSICOS DE LA ATENCIÓN", 7, 37);

  /* CUADRO DATOS */
  doc.line(5, 40, 210, 40);
  doc.line(5, 25, 5, 210);
  doc.line(40, 40, 40, 74); /* LINEA ONE */
  doc.line(115, 40, 115, 74); /* LINEA TWO */
  doc.line(115, 82, 115, 108); /* LINEA TRES */
  doc.line(115, 108, 115, 158); /* LINEA CUATRO */
  doc.line(50, 188, 50, 210); /* LINEA CINCO */
  doc.line(115, 188, 115, 210); /* LINEA SEIS */

  //LINEA FINAL
  doc.line(50, 82, 50, 178);


  doc.line(210, 25, 210, 210);
  doc.line(5, 74, 210, 74);
  doc.line(5, 82, 210, 82);
  doc.line(5, 91, 210, 91);
  doc.line(5, 99, 210, 99);
  doc.line(5, 108, 210, 108);

  //RESULTADO
  doc.line(5, 118, 210, 118);
  doc.line(5, 128, 210, 128);
  doc.line(5, 138, 210, 138);
  doc.line(5, 148, 210, 148);
  doc.line(5, 158, 210, 158);
  doc.line(5, 178, 210, 178);

  doc.line(5, 188, 210, 188);
  doc.line(5, 198, 210, 198);
  doc.line(5, 210, 210, 210);

  /* TITULOS DE CONTENIDO */
  doc.text("CONSECUTIVO:", 45, 46);
  doc.text("FECHA:", 120, 46);
  doc.text("DOCUMENTO:", 45, 52);
  doc.text("NOMBRES:", 120, 52);
  doc.text("GENERO:", 45, 58);
  doc.text("EDAD:", 120, 58);
  doc.text("AÑOS", 153, 58);
  doc.text("ANTIGUEDAD:", 45, 64);
  doc.text("CARGO:", 120, 64);
  doc.text("ÁREA:", 45, 70);
  doc.text("EMPRESA:", 120, 70);

  doc.text("RESULTADO", 6, 79);
  doc.text("FECHA PRUEBA:", 6, 88);
  doc.text("MOTIVO PRUEBA:", 120, 88);
  doc.text("CONCEPTO APTITUD:", 6, 97);
  doc.text("REALIZADA POR:", 120, 97);

  doc.text("COCAÍNA:", 6, 106);
  doc.text("MARIHUANA:", 6, 116);
  doc.text("MORFINA:", 6, 124);
  doc.text("BENZODIAZEPINA: ", 6, 134);
  doc.text("ANFETAMINAS: ", 6, 144);
  doc.text("ALCOHOL: ", 6, 154);
  doc.text("OBSERVACIONES: ", 6, 167);
  doc.text("DATOS DEL SOLICITANTE (SOLO EN CASO DE SOSPECHAS Y ACCIDENTES): ", 6, 184);

  doc.text("DOCUMENTO", 10, 194);
  doc.text("NOMBRES", 70, 194);
  doc.text("FIRMA", 160, 194);

  /* RENDERIZADO DE CONTENIDO */
  doc.setFont("helvetica", "normal");
  doc.addImage(`${lsDataReport.empleadoFoto}`, "JPEG", 7.5, 42, 30, 30);

  doc.text(`${lsDataReport.idPruebasAlcoholDroga}`, 75, 46);
  doc.text(`${ViewFormat(lsDataReport.fecha)}`, 147, 46);
  doc.text(`${lsDataReport.documento}`, 75, 52);
  doc.text(`${lsDataReport.nameEmpleado}`, 147, 52);

  doc.text(`${GetEdad(lsDataReport.fechaNacimi)}`, 147, 58);
  doc.text(`${lsDataReport.nameGenero}`, 75, 58);
  doc.text(`${GetEdad(lsDataReport.fechaContrato)}`, 75, 64);
  doc.setFontSize(9);
  doc.text(`${lsDataReport.nameArea}`, 57, 70);
  doc.setFontSize(10);
  doc.text(`${lsDataReport.nameEmpresa}`, 147, 70);
  doc.text(`${lsDataReport.nameCargo}`, 147, 64);

  doc.text(`${ViewFormat(lsDataReport.fecha)}`, 55, 88);
  doc.text(`${lsDataReport.nameMotivo}`, 152, 88);
  doc.text(`${lsDataReport.nameConcepto}`, 55, 97);
  doc.text(`${lsDataUser.nombre}`, 152, 97);

  doc.text(`${lsDataReport.nameMuestra1}`, 55, 106);
  doc.text(`${lsDataReport.nameResultado1}`, 120, 106);

  doc.text(`${lsDataReport.nameMuestra2}`, 55, 116);
  doc.text(`${lsDataReport.nameResultado2}`, 120, 116);

  doc.text(`${lsDataReport.nameMuestra3}`, 55, 124);
  doc.text(`${lsDataReport.nameResultado3}`, 120, 124);

  doc.text(`${lsDataReport.nameMuestra4}`, 55, 134);
  doc.text(`${lsDataReport.nameResultado4}`, 120, 134);

  doc.text(`${lsDataReport.nameMuestra5}`, 55, 144);
  doc.text(`${lsDataReport.nameResultado5}`, 120, 144);

  doc.text(`${lsDataReport.nameMuestra6}`, 55, 154);
  doc.text(`${lsDataReport.nameResultado6}`, 120, 154);

  doc.setFontSize(9);
  doc.text(`${lsDataReport.observaciones}`, 55, 164, { maxWidth: 200, lineHeightFactor: 1.5 });

  doc.text(`${lsDataReport.idDocumentoSolicitante}`, 10, 204);
  doc.text(`${lsDataReport.nameEmpleadoSolicita === null ? '' : lsDataReport.nameEmpleadoSolicita}`, 55, 204);
  /* FIRMA */
  getFirma(doc, lsDataUser, 10);
  getFirmaEmployee(doc, lsDataReport, 10);
}

/* Renderizado Principal INDEX  */
export function generateReportAlcoholtesting(lsDataReport = [], lsDataUser = []) {
  var doc = new jsPDF("p", "mm", "letter");
  /* Pag. 1 */
  getHeader(doc);
  pageAlcoholtesting(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 1, 2);

  doc.addPage();

  getHeader(doc);
  pageAlcoholtestingR(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 2, 2);

  var dataPDF = doc.output("bloburl");
  return dataPDF;
}