import jsPDF from "jspdf";
import { GetEdad, ViewFormat } from "components/helpers/Format";

import config from "config";
import LogoReportLtd from 'assets/img/LogoReportLTD.png';
import LogoReportEnergy from 'assets/img/LogoReportEnergy.png';

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
    "INFORMACIÓN DEL EMPLEADO",
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

function pageEmployee(doc, lsDataReport = [], lsDataUser = []) {
  /* CUADRO DATOS */

  /* LISTA DE DATOS PACIENTE */
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);
  doc.text("", 7, 30);
  doc.line(5, 32, 210, 32);
  doc.text("DATOS PERSONALES ", 7, 37);

  /* CUADRO DATOS */
  doc.line(5, 40, 210, 40);
  doc.line(5, 25, 5, 230);
  doc.line(40, 40, 40, 74); /* LINEA ONE */

  doc.line(110, 40, 110, 74); /* LINEA TWO */

  doc.line(110, 82, 110, 138); /* LINEA TRES */

  doc.line(110, 148, 110, 178); /* LINEA CUATRO aqi */


  doc.line(110, 188, 110, 210); /* LINEA SEIS */



  doc.line(110, 220, 110, 230); /* LINEA 8 */


  doc.line(210, 25, 210, 230);


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
  doc.line(5, 168, 210, 168);
  doc.line(5, 178, 210, 178);
  doc.line(5, 188, 210, 188);
  doc.line(5, 198, 210, 198);
  doc.line(5, 210, 210, 210);

  doc.line(5, 220, 210, 220);
  doc.line(5, 230, 210, 230);


  /* TITULOS DE CONTENIDO */
  doc.text("DOCUMENTO:", 41, 44);
  doc.text("NOMBRES:", 112, 44);
  doc.text("SEDE:", 41, 50);
  doc.text("EMPRESA:", 112, 50);
  doc.text("CELULAR:", 41, 56);
  doc.text("CORREO ELECTRÓNICO:", 112, 56);
  doc.text("FECHA DE NACIMIENTO:", 41, 62);
  doc.text("EDAD:", 112, 62);
  doc.text("AÑOS", 145, 62);
  doc.text("GENERO:", 41, 67);
  doc.text("ESTADO CIVIL:", 112, 67);
  doc.text("CONTACTO:", 41, 73);
  doc.text("TELEFONO CONTACTO:", 112, 73);

  doc.text("INFORMACIÓN CONTRACTUAL", 6, 79);
  doc.text("FECHA CONTRATO:", 6, 88);
  doc.text("TIPO DE CONTRATO:", 112, 88);
  doc.text("ROL:", 6, 97);
  doc.text("ROSTER:", 112, 97);
  doc.text("GENERAL:", 6, 105);
  doc.text("DEPARTAMENTO:", 112, 105);
  doc.text("ÁREA:", 6, 114);
  doc.text("SUBAREA: ", 112, 114);
  doc.text("GRUPO: ", 6, 124);
  doc.text("TURNO: ", 112, 124);
  doc.text("ROTACIÓN: ", 6, 134);
  doc.text("ESTADO: ", 112, 134);


  doc.text("INFORMACIÓN DEMOGRÁFICA", 6, 144);
  doc.text("DPTO. DE NACIMIENTO:", 6, 154);
  doc.text("MUNICIPIO DE NACIMIENTO:", 112, 154);
  doc.text("DPTO. DE RESIDENCIA:", 6, 164);
  doc.text("MUNICIPIO DE RESIDENCIA:", 112, 164);
  doc.text("DIRECCIÓN DE RESIDENCIA:", 6, 174);
  doc.text("MUNICIPIO DE RESIDENCIA LABORAL:", 112, 174);


  doc.text("SEGURIDAD SOCIAL", 6, 184);
  doc.text("EPS:", 6, 194);
  doc.text("AFP:", 112, 194);
  doc.text("ARL:", 6, 206);
  doc.text("CESANTIAS:", 112, 206);

  doc.text("DATOS ADICIONALES", 6, 216);
  doc.text("FECHA DE TERMINACIÓN;", 6, 226);
  doc.text("GES:", 112, 226);



  /* RENDERIZADO DE CONTENIDO */
  doc.setFont("helvetica", "normal");
  doc.addImage(`${lsDataReport.empleadoFoto}`, "JPEG", 7.5, 42, 30, 30);
  doc.text(`${lsDataReport.documento}`, 68, 44);
  doc.text(`${lsDataReport.nombres}`, 140, 44);
  doc.text(`${lsDataReport.nameSede}`, 68, 50);
  doc.text(`${lsDataReport.nameCompany}`, 140, 50);
  doc.text(`${lsDataReport.celular}`, 67, 56);
  doc.text(`${lsDataReport.email}`, 156, 56);
  doc.text(`${ViewFormat(lsDataReport.fechaNaci)}`, 87, 62);
  doc.text(`${GetEdad(lsDataReport.fechaNaci)}`, 140, 62);
  doc.text(`${lsDataReport.nameGenero}`, 68, 67);
  doc.text(`${lsDataReport.nameEstadoCivil}`, 140, 67);
  doc.text(`${lsDataReport.contacto}`, 68, 73);
  doc.text(`${lsDataReport.telefonoContacto}`, 156, 73);

  //INFORMACIÓN CONTRACTUAL

  doc.text(`${GetEdad(lsDataReport.fechaContrato)}`, 12, 88);
  doc.text(`${lsDataReport.nameTipoContrato}`, 151, 88);
  doc.text(`${lsDataReport.nameType}`, 30, 97);
  doc.text(`${lsDataReport.nameRosterPosition}`, 145, 97);
  doc.text(`${lsDataReport.nameGeneralPosition}`, 30, 105);
  doc.text(`${lsDataReport.nameDepartamento}`, 145, 105);
  doc.text(`${lsDataReport.nameArea}`, 30, 114);
  doc.text(`${lsDataReport.nameSubArea}`, 145, 114);
  doc.text(`${lsDataReport.nameGrupo}`, 30, 124);
  doc.text(`${lsDataReport.nameTurno}`, 145, 124);
  doc.text(`${lsDataReport.rotation}`, 30, 134);
  doc.text(`${lsDataReport.namePayStatus}`, 145, 134);


  //INFORMACIÓN DEMOGRÁFICA



  doc.text(`${lsDataReport.nameDptoNacido}`, 61, 154);
  doc.text(`${lsDataReport.nameMunicipioNacido}`, 163, 154);
  doc.text(`${lsDataReport.nameDptoResidencia}`, 61, 164);
  doc.text(`${lsDataReport.nameMunicipioResidencia}`, 163, 164);
  doc.text(`${lsDataReport.direccionResidenciaTrabaja}`, 61, 174);
  doc.text(`${lsDataReport.nameMunicipioResidenciaTrabaja}`, 178, 174);


  //SEGURIDAD SOCIAL

  doc.text(`${lsDataReport.nameEps}`, 61, 194);
  doc.text(`${lsDataReport.nameAfp}`, 160, 194);
  doc.text(`${lsDataReport.nameArl}`, 61, 206);
  doc.text(`${lsDataReport.nameCesantias}`, 160, 206);


  //"DATOS ADICIONALESL


  doc.text(`${ViewFormat(lsDataReport.termDate)}`, 61, 226);
  doc.text(`${lsDataReport.ges}`, 160, 226);

}

/* Renderizado Principal INDEX  */
export function generateReportEmployee(lsDataReport = [], lsDataUser = []) {
  var doc = new jsPDF("p", "mm", "letter");

  getHeader(doc);
  pageEmployee(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 1);


  var dataPDF = doc.output("bloburl");
  return dataPDF;
}