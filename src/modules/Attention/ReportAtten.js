import jsPDF from 'jspdf';
import LogoReport from 'assets/img/LogoReport.png';
import ImgWhite from 'assets/img/ImgWhite.png';
import { ViewFormat } from 'components/helpers/Format';

function getHeader(doc) {
    /* ENCABEZADO REPORTE */
    doc.addImage(LogoReport, "PNG", 5, 5, 60, 15);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("DIVISIÓN MÉDICA", 150, 10, null, null, "center");
    doc.text("REGISTRO ATENCIÓN", 150, 17, null, null, "center");

    /* LINEA DE DIVISIÓN */
    doc.setLineWidth(1);
    doc.setDrawColor(255, 0, 0);
    doc.line(5, 25, 210, 25);
}

function getPiePage(doc, lsDataUser) {
    doc.setFontSize(8);
    doc.setLineWidth(1);
    doc.setDrawColor(255, 0, 0);
    doc.line(5, doc.internal.pageSize.height - 10, 210, doc.internal.pageSize.height - 10);

    doc.text(`FECHA DE SISTEMA:  ${new Date().toLocaleString()}`, 10, doc.internal.pageSize.height - 4);
    doc.text(`USUARIO ACTIVO:  ${lsDataUser.nombre}`, 90, doc.internal.pageSize.height - 4);
    doc.text("Pag. 1 of 1", 190, doc.internal.pageSize.height - 4);
}

function getFirma(doc, lsDataUser) {
    doc.addImage(`${lsDataUser.firma}`, "PNG", 5, doc.internal.pageSize.height - 70, 50, 20);
    doc.setLineWidth(0.5);
    doc.setDrawColor(128, 128, 128);
    doc.line(5, doc.internal.pageSize.height - 48, 60, doc.internal.pageSize.height - 48);
    doc.setFontSize(8);
    doc.text(`${lsDataUser.nombre}`, 5, doc.internal.pageSize.height - 44);
    doc.text('MEDICINA GENERAL', 5, doc.internal.pageSize.height - 40);
    doc.text(`Lic: TP ${lsDataUser.licencia} - RM: ${lsDataUser.registroMedico}`, 5, doc.internal.pageSize.height - 36);
}

function getFirmaEmployee(doc, lsDataReport) {
    doc.addImage(ImgWhite, "PNG", 130, doc.internal.pageSize.height - 70, 50, 20);
    doc.setLineWidth(0.5);
    doc.setDrawColor(128, 128, 128);
    doc.line(130, doc.internal.pageSize.height - 48, 195, doc.internal.pageSize.height - 48);
    doc.setFontSize(8);
    doc.text(`${lsDataReport.nameEmpleado}`, 130, doc.internal.pageSize.height - 44);
    doc.text('FIRMA DEL EMPLEADO', 130, doc.internal.pageSize.height - 40);
}

export function generateReport(lsDataReport = [], lsDataUser = []) {
    var doc = new jsPDF('p', 'mm', 'letter');

    /* ENCABEZADO REPORTE */
    getHeader(doc);

    /* LISTA DE DATOS PACIENTE */
    doc.text("DATOS DEL REGISTRO", 5, 35);
    doc.setFontSize(10);
    doc.setLineWidth(0.2);
    doc.setDrawColor(128, 128, 128);

    /* CUADRO DATOS */
    doc.line(5, 40, 210, 40);
    doc.line(5, 40, 5, 160);
    doc.line(40, 40, 40, 74); /* LINEA ONE */
    doc.line(115, 40, 115, 74); /* LINEA TWO */
    doc.line(210, 40, 210, 160);
    doc.line(5, 74, 210, 74);
    /* CUADRO OBSERVACIÓN */
    doc.line(5, 84, 210, 84);
    doc.line(5, 160, 210, 160);

    /* TITULOS DE CONTENIDO */
    doc.text('N° REGISTRO:', 45, 48);
    doc.text('FECHA:', 120, 48);
    doc.text('TIPO ATENCIÓN:', 45, 55);
    doc.text('ATENCIÓN:', 120, 55);
    doc.text('DOCUMENTO:', 45, 62);
    doc.text('NOMBRES:', 120, 62);
    doc.text('ESTADO CASO:', 45, 69);
    doc.text('SEDE:', 120, 69);
    doc.text('OBSERVACIÓN:', 10, 80);

    /* RENDERIZADO DE CONTENIDO */
    doc.setFont("helvetica", "normal");
    doc.addImage(`${lsDataReport.empleadoFoto}`, "JPEG", 7.5, 42, 30, 30);
    doc.text(`${lsDataReport.id}`, 75, 48);
    doc.text(`${ViewFormat(lsDataReport.fecha)}`, 145, 48);
    doc.text(`${lsDataReport.nameTipoAtencion}`, 75, 55);
    doc.text(`${lsDataReport.nameAtencion}`, 145, 55);
    doc.text(`${lsDataReport.documento}`, 75, 62);
    doc.text(`${lsDataReport.nameEmpleado}`, 145, 62);
    doc.text(`${lsDataReport.nameEstadoCaso}`, 75, 69);
    doc.text(`${lsDataReport.nameSedeAtencion}`, 145, 69);

    doc.text(`${lsDataReport.observaciones}`, 10, 90, { maxWidth: 190, align: 'justify', lineHeightFactor: 1.5 });

    /* PIE DE PÁGINA */
    getPiePage(doc, lsDataUser);

    var dataPDF = doc.output("bloburl");
    return dataPDF;
}