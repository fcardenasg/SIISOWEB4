import { DefaultValue } from "components/helpers/Enums";
import jsPDF from "jspdf";
import { generateReportCitacion, generateReportConcentimiento, generateReportParaclinico } from "./ReportesParaclinicos";

import config from "config";

function getHeader(doc = new jsPDF(), lsDataReport, version = "SIG-0408") {
    /* ENCABEZADO REPORTE */
    doc.addImage(config.logotipo, "PNG", 5, 5, config.typeDashboard === 'DLTD' ? 60 : 50, 15);
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

function obtenerNombres(usuarioActivo, nombre) {
    // Dividir los nombres en arreglos
    const nombresUsuarioActivo = usuarioActivo.split(' ');
    const nombresRegistro = nombre.split(' ');

    // Obtener los primeros tres nombres o menos
    const usuarioImpresion = nombresUsuarioActivo.slice(0, 3).join(' ');
    const usuarioRegistro = nombresRegistro.slice(0, 3).join(' ');

    return {
        usuarioImpresion,
        usuarioRegistro
    };
}

function getPiePage(doc, lsDataUser) {
    const resultName = obtenerNombres(lsDataUser.usuarioActivo, lsDataUser.nombre);

    doc.setFontSize(8);
    doc.setLineWidth(1);
    doc.setDrawColor(255, 0, 0);
    doc.line(5, doc.internal.pageSize.height - 10, 210, doc.internal.pageSize.height - 10);

    doc.text(`F. DE SISTEMA: ${new Date().toLocaleString()}`, 5, doc.internal.pageSize.height - 4);
    doc.text(`U. DE IMPRESIÓN: ${resultName.usuarioImpresion}`, 70, doc.internal.pageSize.height - 4);
    doc.text(`U. DE REGISTRO: ${resultName.usuarioRegistro}`, 140, doc.internal.pageSize.height - 4);
}

export function generateReporteIndex(lsDataReport = [], lsDataUser = [], lsDataReportParaclinico) {
    var doc = new jsPDF("p", "mm", "letter");
    /* Concentimiento Informado - Ordenes */

    if (lsDataReport.consentimientoInformado) {
        getHeader(doc, lsDataReport);
        generateReportConcentimiento(doc, lsDataReport, lsDataUser);
        getPiePage(doc, lsDataUser);
        doc.addPage();
    }

    if (lsDataReport.citacion) {
        getHeader(doc, lsDataReport);
        generateReportCitacion(doc, lsDataReport, lsDataUser, lsDataReportParaclinico);
        getPiePage(doc, lsDataUser);
        doc.addPage();
    }

    for (let index = 0; index < lsDataReportParaclinico.length; index++) {
        const element = lsDataReportParaclinico[index];

        if (lsDataReportParaclinico.length !== 0) {
            if (element.idParaclinico !== DefaultValue.ORDENES_FECHA_EXAM_FISICO) {
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
    var bytePDF = doc.output('datauristring');
    var file64 = bytePDF.split('pdf;base64,')[1];

    return { dataPDF, file64 };
}