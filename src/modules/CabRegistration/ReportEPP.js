import { GetEdad, ViewFormat } from "components/helpers/Format";
import jsPDF from "jspdf";

import config from "config";

function getHeader(doc = new jsPDF()) {
    var marXR = doc.internal.pageSize.width - 5;
    /* ENCABEZADO REPORTE */
    doc.addImage(config.logotipo, "PNG", 5, 5, config.typeDashboard === 'DLTD' ? 60 : 50, 15);
    doc.setFontSize(10);

    doc.text("DIVISIÓN MÉDICA", 110, 10, { align: 'center' });
    doc.text("ÁREA DE SALUD OCUPACIONAL", 110, 14, { align: 'center' });

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
    doc.text('MEDICINA GENERAL', 7, doc.internal.pageSize.height - (40 - my));
    doc.text(`${lsDataUser.licencia} - ${lsDataUser.registroMedico}`, 7, doc.internal.pageSize.height - (36 - my));
}

function generateReportSuministroepp(doc = new jsPDF(), lsDataReport = [], lsDataUser) {
    var marXR = doc.internal.pageSize.width - 5;

    doc.text('DATOS DEL REGISTRO', 7, 37);
    doc.text('MOTIVO DE CONSULTA:', 7, 80);
    doc.text('ENFERMEDAD ACTUAL:', 7, 110);
    doc.text('ANTECEDENTES:', 7, 145);
    doc.text('REVISIÓN POR SISTEMA:', 7, 185);
    doc.text('EXAMEN FÍSICO:', 7, 225);

    doc.setFontSize(10);
    doc.setLineWidth(0.2);
    doc.setDrawColor(128, 128, 128);

    /* CUADRO DATOS */
    doc.line(5, 25, 5, doc.internal.pageSize.height - 20); /* IZQUIERDA */
    doc.line(5, 32, marXR, 32); /* HORI ONE */
    doc.line(5, 39, marXR, 39); /* HORI TWO  */

    doc.line(5, 75, marXR, 75); /* HORI THREE */
    doc.line(5, 83, marXR, 83); /* HORI FOUR */

    doc.line(5, 105, marXR, 105); /* HORI FIVE */
    doc.line(5, 113, marXR, 113); /* HORI SIX */

    doc.line(5, 140, marXR, 140); /* HORI SEVEN */
    doc.line(5, 148, marXR, 148); /* HORI OCHO */

    doc.line(5, 180, marXR, 180); /* HORI NINE */
    doc.line(5, 188, marXR, 188); /* HORI TEN */

    doc.line(5, 220, marXR, 220); /* HORI 11 */
    doc.line(5, 228, marXR, 228); /* HORI 12 */

    doc.line(5, doc.internal.pageSize.height - 20, marXR, doc.internal.pageSize.height - 20); /* HORI ULTIMA */
    doc.line(40, 39, 40, 75); /* LINEA VERTI ONE */
    doc.line(marXR, 25, marXR, doc.internal.pageSize.height - 20); /* DERECHA */

    /* TITULOS DE CONTENIDO */
    doc.text(`CONSECUTIVO NRO: ${lsDataReport.id}`, 7, 30);
    doc.text(`FECHA: ${ViewFormat(lsDataReport.fecha)}`, 90, 30);
    doc.text(`MOTIVO: ${lsDataReport.nameContingencia}`, marXR - 2, 30, { align: 'right' });

    doc.setFontSize(8);
    doc.text('DOCUMENTO:', 42, 45);
    doc.text('EDAD:', 42, 50);
    doc.text('ANTIGUEDAD:', 42, 55);
    doc.text('CARGO:', 42, 60);
    doc.text('SEDE:', 42, 65);
    doc.text('CELULAR:', 42, 70);

    doc.text('NOMBRES:', 120, 45);
    doc.text('DEPARTAMENTO:', 120, 50);
    doc.text('GRUPO:', 120, 55);
    doc.text('AREA:', 120, 60);
    doc.text('ESTADO CIVIL:', 120, 65);
    doc.text('EMAIL:', 120, 70);

    /* DATOS DEL REGISTRO */
    doc.setFont("helvetica", "normal");
    doc.addImage(`${lsDataReport.urlImg}`, "JPEG", 7.5, 42, 30, 30);
    doc.text(`${lsDataReport.documento}`, 70, 45);
    doc.text(`${GetEdad(lsDataReport.fechaNacimi)}`, 70, 50);
    doc.text(`${GetEdad(lsDataReport.fechaContrato)}`, 70, 55);
    doc.text(`${lsDataReport.nameCargo}`, 70, 60);
    doc.text(`${lsDataReport.nameSede}`, 70, 65);
    doc.text(`${lsDataReport.nameTelefono}`, 70, 70);

    doc.text(`${lsDataReport.nameEmpleado}`, 150, 45);
    doc.text(`${lsDataReport.nameDepartamento}`, 150, 50);
    doc.text(`${lsDataReport.nameGrupo}`, 150, 55);
    doc.text(`${lsDataReport.nameArea}`, 150, 60);
    doc.text(`${lsDataReport.nameEstadoCivil}`, 150, 65);
    doc.text(`${lsDataReport.nameCorreo}`, 150, 70);

    /* DESCRIPCIONES DE TEXTO */

    doc.text('IMPRESIÓN DIAGNOSTICA:', 7, 37);
    if (lsDataReport.dx1 !== "")
        doc.text(`Dx1:   ${lsDataReport.dx1}   ${lsDataReport.nameDx1.toUpperCase()}`, 7, 47, { maxWidth: 200, lineHeightFactor: 1.5 });

    getFirma(doc, lsDataUser);

}

function generateReportInstalacioneppPageTwo(doc = new jsPDF(), lsDataReport = [], lsDataUser) {
    var marXR = doc.internal.pageSize.width - 5;

    doc.text('IMPRESIÓN DIAGNOSTICA:', 7, 37);
    doc.text('PLAN DE MANEJO:', 7, 85);
    doc.text('EXAMEN PARACLÍNICO:', 7, 125);
    doc.text('CONDUCTA:', 7, 165);

    doc.setFontSize(10);
    doc.setLineWidth(0.2);
    doc.setDrawColor(128, 128, 128);

    /* CUADRO DATOS */
    doc.line(5, 32, 5, 180); /* IZQUIERDA */
    doc.line(5, 32, marXR, 32); /* HORI ONE */
    doc.line(5, 40, marXR, 40); /* HORI TWO  */

    doc.line(5, 80, marXR, 80); /* HORI THREE */
    doc.line(5, 88, marXR, 88); /* HORI FOUR */

    doc.line(5, 120, marXR, 120); /* HORI FIVE */
    doc.line(5, 128, marXR, 128); /* HORI SIX */

    doc.line(5, 160, marXR, 160); /* HORI SEVEN */
    doc.line(5, 168, marXR, 168); /* HORI OCHO */

    doc.line(5, 180, marXR, 180); /* HORI ULTIMA */
    doc.line(marXR, 32, marXR, 180); /* DERECHA */

    /* DESCRIPCIONES DE TEXTO */
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");

    if (lsDataReport.dx1 !== "")
        doc.text(`Dx1:   ${lsDataReport.dx1}   ${lsDataReport.nameDx1.toUpperCase()}`, 7, 47, { maxWidth: 200, lineHeightFactor: 1.5 });

    if (lsDataReport.dx2 !== "")
        doc.text(`Dx2:   ${lsDataReport.dx2}   ${lsDataReport.nameDx2.toUpperCase()}`, 7, 55, { maxWidth: 200, lineHeightFactor: 1.5 });

    if (lsDataReport.dx3 !== "")
        doc.text(`Dx3:   ${lsDataReport.dx3}   ${lsDataReport.nameDx3.toUpperCase()}`, 7, 63, { maxWidth: 200, lineHeightFactor: 1.5 });

    doc.setFontSize(7);
    doc.text(`${lsDataReport.planManejo}`, 7, 92, { maxWidth: 200, lineHeightFactor: 1.5 });
    doc.text(`${lsDataReport.examenParaclinico}`, 7, 132, { maxWidth: 200, lineHeightFactor: 1.5 });
    doc.setFontSize(11);
    doc.text(`${lsDataReport.nameConceptoActitud}`, 7, 175, { maxWidth: 200, lineHeightFactor: 1.5 });

    getFirma(doc, lsDataUser);
}

export function generateReportOrderEPP(lsDataReport = [], lsDataUser) {
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