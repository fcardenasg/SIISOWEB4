import { ViewFormat } from "components/helpers/Format";
import jsPDF from "jspdf";
import config from "config";

function getHeader(doc = new jsPDF(), lsDataReport) {
    var marXR = doc.internal.pageSize.width - 5;
    /* ENCABEZADO REPORTE */
    doc.addImage(config.logotipo, "PNG", 5, 5, config.typeDashboard === 'DLTD' ? 60 : 50, 15);
    doc.setFontSize(10);

    doc.text('DIVISIÓN MÉDICA', 110, 12, { align: 'center' });
    doc.text(`${lsDataReport.nameTipoRemision}`, 110, 16, { align: 'center' });

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
    doc.text(`${lsDataUser.nameEspecialidad}`, 7, doc.internal.pageSize.height - (40 - my));
    doc.text(`${lsDataUser.licencia} - ${lsDataUser.registroMedico}`, 7, doc.internal.pageSize.height - (36 - my));
}

function generateReportMedicalAdvice(doc = new jsPDF(), lsDataReport = [], lsDataUser) {
    var marXR = doc.internal.pageSize.width - 5;

    doc.text(`CONTINGENCIA: ${lsDataReport.nameContingencia}`, 7, 30);
    doc.text(`FECHA: ${ViewFormat(lsDataReport.fecha)}`, marXR - 2, 30, { align: 'right' });

    doc.text('DATOS BÁSICOS DE LA ATENCIÓN', 7, 37);
    doc.text('DESCRIPCIÓN', 7, 85);
    doc.setFontSize(10);
    doc.setLineWidth(0.2);
    doc.setDrawColor(128, 128, 128);

    /* CUADRO DATOS */
    doc.line(5, 25, 5, 150); /* IZQUIERDA */
    doc.line(5, 32, marXR, 32); /* HORI ONE */
    doc.line(5, 39, marXR, 39); /* HORI TWO  */

    doc.line(5, 80, marXR, 80); /* HORI THREE */
    doc.line(5, 88, marXR, 88); /* HORI FOUR */

    doc.line(5, 150, marXR, 150); /* HORI FIVE */

    doc.line(40, 39, 40, 80); /* LINEA VERTI ONE */
    doc.line(marXR, 25, marXR, 150); /* DERECHA */

    /* TITULOS DE CONTENIDO */
    doc.setFontSize(8);
    doc.text('DOCUMENTO:', 42, 45);
    doc.text('ROSTER POSITION:', 42, 50);
    doc.text('AFP:', 42, 55);
    doc.text('SUBAREA:', 42, 60);
    doc.text('SEDE:', 42, 65);
    doc.text('TURNO:', 42, 70);
    doc.text('CELULAR:', 42, 75);

    doc.text('NOMBRES:', 130, 45);
    doc.text('FECHA DE CONTRATO:', 130, 50);
    doc.text('DEPARTAMENTO:', 130, 55);
    doc.text('GRUPO:', 130, 60);
    doc.text('EPS:', 130, 65);
    doc.text('CIUDAD DE RESIDENCIA:', 130, 70);
    doc.text('EMAIL:', 130, 75);

    /* DATOS DEL REGISTRO */
    doc.setFont("helvetica", "normal");
    doc.addImage(`${lsDataReport.urlImg}`, "JPEG", 7.5, 45, 30, 30);
    doc.text(`${lsDataReport.documento}`, 72, 45);
    doc.text(`${lsDataReport.nameCargo}`, 72, 50);
    doc.text(`${lsDataReport.nameAfp}`, 72, 55);
    doc.text(`${lsDataReport.nameSubarea}`, 72, 60);
    doc.text(`${lsDataReport.nameSede}`, 72, 65);
    doc.text(`${lsDataReport.nameTurnoEmpleado}`, 72, 70);
    doc.text(`${lsDataReport.nameTelefono}`, 72, 75);

    doc.text(`${lsDataReport.nameEmpleado}`, 165, 45);
    doc.text(`${ViewFormat(lsDataReport.fechaContrato)}`, 165, 50);
    doc.text(`${lsDataReport.nameDepartamento}`, 165, 55);
    doc.text(`${lsDataReport.nameGrupo}`, 165, 60);
    doc.text(`${lsDataReport.nameEps}`, 165, 65);
    doc.text(`${lsDataReport.nameDptoNacido}`, 170, 70);
    doc.text(`${lsDataReport.nameCorreo}`, 165, 75);

    /* DESCRIPCIONES DE TEXTO */
    doc.setFontSize(9);
    doc.text(`${lsDataReport.descripcion}`, 7, 95, { maxWidth: 200, lineHeightFactor: 1.5 });

    getFirma(doc, lsDataUser, -20)
}

export function generateReport(lsDataReport = [], lsDataUser, option = true) {
    const doc = new jsPDF('p', 'mm', 'letter');

    doc.setFont("helvetica", "bold");
    getHeader(doc, lsDataReport);
    generateReportMedicalAdvice(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 1, 1);

    if (option) {
        var dataPDF = doc.output("bloburl");
        return dataPDF;
    } else {
        var bytePDF = doc.output('datauristring');
        var file64 = bytePDF.split('pdf;base64,')[1];
        return file64;
    }
}