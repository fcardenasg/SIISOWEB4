import jsPDF from "jspdf";
import LogoReport from 'assets/img/LogoReport.png';
import { generateReportConcentimiento, generateReportCitacion, generateReportParaclinico } from "./ReportesParaclinicos";

function getHeader(doc = new jsPDF(), lsDataReport, version = "SIG-0408") {
    /* ENCABEZADO REPORTE */
    doc.addImage(LogoReport, "PNG", 5, 5, 60, 15);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("SISTEMA INTEGRADO DE INFORMACIÓN DE SALUD OCUPACIONAL", 120, 8, null, null, "center");
    doc.text("EXAMENES MEDICOS OCUPACIONALES", 120, 12, null, null, "center");
    doc.setFontSize(8);
    doc.text("Solicitud de Servicio de Examen Médico", 120, 16, null, null, "center");
    doc.text(`${lsDataReport.nameTipoExamen}`, 120, 20, null, null, "center");

    doc.setFontSize(12);
    doc.text(version, 190, 8);
    doc.setFontSize(10);
    doc.text("Versión 1", 190, 14);

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

export function generateReporteIndex(lsDataReport = [], lsDataUser = [], lsDataReportParaclinico) {
    var doc = new jsPDF("p", "mm", "letter");
    /* Concentimiento Informado - Ordenes */
    /* getHeader(doc, lsDataReport);
    generateReportConcentimiento(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 1, 1); */

    /* doc.addPage(); */

    /* getHeader(doc, lsDataReport);
    generateReportCitacion(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 1, 1); */

    getHeader(doc, lsDataReport);
    generateReportParaclinico(doc, lsDataReport, lsDataUser, lsDataReportParaclinico);
    getPiePage(doc, lsDataUser, 1, 1);

    var dataPDF = doc.output("bloburl");
    return dataPDF;
}