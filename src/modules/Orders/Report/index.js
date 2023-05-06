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
    doc.text(`USUARIO ACTIVO:  ${lsDataUser.nombre}`, 150, doc.internal.pageSize.height - 4);
    /* doc.text(`Pag. ${page} of ${sizePage}`, 190, doc.internal.pageSize.height - 4); */
}

export function generateReporteIndex(lsDataReport = [], lsDataUser = [], lsDataReportParaclinico) {
    var doc = new jsPDF("p", "mm", "letter");
    /* Concentimiento Informado - Ordenes */
    getHeader(doc, lsDataReport);
    generateReportConcentimiento(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser);
    doc.addPage();

    getHeader(doc, lsDataReport);
    generateReportCitacion(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser);
    doc.addPage();

    for (let index = 0; index < lsDataReportParaclinico.length; index++) {
        const element = lsDataReportParaclinico[index];

        if (lsDataReportParaclinico.length !== 0) {
            if (element.idParaclinico !== 3541) {
                getHeader(doc, lsDataReport);
                generateReportParaclinico(doc, lsDataReport, lsDataUser, element);
                getPiePage(doc, lsDataUser);

                var numero = lsDataReportParaclinico.length - 1;

                if (index !== numero) {
                    doc.addPage();
                }
            }
        }
    }

    var dataPDF = doc.output("bloburl");

    return dataPDF;
}