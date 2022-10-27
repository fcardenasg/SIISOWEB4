import { GetEdad, ViewFormat } from "components/helpers/Format";
import jsPDF from "jspdf";
import LogoReport from 'assets/img/LogoReport.png';

function getHeader(doc = new jsPDF()) {
    var marXR = doc.internal.pageSize.width - 5;
    /* ENCABEZADO REPORTE */
    doc.addImage(LogoReport, "PNG", 5, 5, 60, 15);
    doc.setFontSize(10);

    doc.text("DIVISIÓN MÉDICA", 110, 10, { align: 'center' });
    doc.text("ASESORÍAS MÉDICAS ESPECIALIZADAS", 110, 14, { align: 'center' });

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
    doc.text(`Lic: TP ${lsDataUser.licencia} - RM: ${lsDataUser.registroMedico}`, 7, doc.internal.pageSize.height - (36 - my));
}

function generateReportMedicalAdvice(doc = new jsPDF(), lsDataReport = [], lsDataUser) {
    var marXR = doc.internal.pageSize.width - 5;

    doc.text('DATOS DEL REGISTRO', 7, 37);
    doc.text('INFORMACIÓN DE ASESORÍA:', 7, 80);
    doc.text('MOTIVO DE CONSULTA:', 7, 110);
    doc.text('CONCEPTO:', 7, 145);
    doc.text('PAUTAS A SEGUIR:', 7, 185);
    doc.setFontSize(10);
    doc.setLineWidth(0.2);
    doc.setDrawColor(128, 128, 128);

    /* CUADRO DATOS */
    doc.line(5, 32, 5, 225); /* IZQUIERDA */
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

    doc.line(5, 225, marXR, 225); /* HORI ULTIMA */
    doc.line(40, 39, 40, 75); /* LINEA VERTI ONE */
    doc.line(marXR, 32, marXR, 225); /* DERECHA */

    /* TITULOS DE CONTENIDO */
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
    doc.text('ÁREA:', 120, 60);
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

    doc.text(`${lsDataReport.nameEmpleado}`, 152, 45);
    doc.text(`${lsDataReport.nameDepartamento}`, 152, 50);
    doc.text(`${lsDataReport.nameGrupo}`, 152, 55);
    doc.text(`${lsDataReport.nameArea}`, 152, 60);
    doc.text(`${lsDataReport.nameEstadoCivil}`, 152, 65);
    doc.text(`${lsDataReport.nameCorreo}`, 152, 70);

    /* INFORMACIÓN DE ASESORÍA */
    doc.text(`CONSECUTIVO NRO: ${lsDataReport.id}`, 7, 90);
    doc.text(`FECHA: ${ViewFormat(lsDataReport.fecha)}`, 90, 90);
    doc.text(`MOTIVO: ${lsDataReport.nameMotivo}`, marXR - 2, 90, { maxWidth: 70, align: 'right', lineHeightFactor: 1.5 });

    doc.text(`CAUSA: ${lsDataReport.nameCausa}`, 7, 100);
    doc.text(`ESTADO: ${lsDataReport.nameEstadoAsesoria}`, 90, 100);

    /* DESCRIPCIONES DE TEXTO */
    doc.setFontSize(8);
    doc.text(`${lsDataReport.motivo}`, 7, 118, { maxWidth: 200, lineHeightFactor: 1.5 });
    doc.text(`${lsDataReport.recomendaciones}`, 7, 153, { maxWidth: 200, lineHeightFactor: 1.5 });
    doc.text(`${lsDataReport.pautas}`, 7, 193, { maxWidth: 200, lineHeightFactor: 1.5 });

    getFirma(doc, lsDataUser, 20);
}

export function generateReport(lsDataReport = [], lsDataUser) {
    const doc = new jsPDF('p', 'mm', 'letter');

    doc.setFont("helvetica", "bold");
    getHeader(doc);
    generateReportMedicalAdvice(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 1, 1);

    var dataPDF = doc.output("bloburl");
    return dataPDF;
}