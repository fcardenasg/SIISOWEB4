import { ViewFormat } from "components/helpers/Format";
import jsPDF from "jspdf";
import LogoReport from 'assets/img/LogoReport.png';

function getHeader(doc = new jsPDF(), lsDataReport) {
    var marXR = doc.internal.pageSize.width - 5;
    /* ENCABEZADO REPORTE */
    doc.addImage(LogoReport, "PNG", 5, 5, 60, 15);
    doc.setFontSize(10);

    doc.text("DIVISIÓN MÉDICA", 110, 12, { align: 'center' });
    doc.text(`${lsDataReport.nameTiAtencion}`, 110, 16, { align: 'center' });

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
    doc.text(`${lsDataUser.licencia} - ${lsDataUser.registroMedico}`, 7, doc.internal.pageSize.height - (36 - my));
}

function generateReportMedicalAdvice(doc = new jsPDF(), lsDataReport = [], lsDataUser) {
    var marXR = doc.internal.pageSize.width - 5;

    doc.text('DATOS DEL REGISTRO', 7, 37);
    doc.text('INFORMACIÓN DE ASESORÍA', 7, 85);
    doc.text('DESCRIPCIÓN DE LA ASESORÍA', 7, 105);
    doc.text('RECOMENDACIONES', 7, 155);
    doc.setFontSize(10);
    doc.setLineWidth(0.2);
    doc.setDrawColor(128, 128, 128);

    /* CUADRO DATOS */
    doc.line(5, 32, 5, 200); /* IZQUIERDA */
    doc.line(5, 32, marXR, 32); /* HORI ONE */
    doc.line(5, 39, marXR, 39); /* HORI TWO  */

    doc.line(5, 80, marXR, 80); /* HORI THREE */
    doc.line(5, 88, marXR, 88); /* HORI FOUR */

    doc.line(5, 100, marXR, 100); /* HORI FIVE */
    doc.line(5, 108, marXR, 108); /* HORI SIX */

    doc.line(5, 150, marXR, 150); /* HORI SEVEN */
    doc.line(5, 158, marXR, 158); /* HORI OCHO */

    doc.line(5, 200, marXR, 200); /* HORI ULTIMA */
    doc.line(40, 39, 40, 80); /* LINEA VERTI ONE */
    doc.line(marXR, 32, marXR, 200); /* DERECHA */

    /* TITULOS DE CONTENIDO */
    doc.setFontSize(8);
    doc.text('DOCUMENTO:', 42, 45);
    doc.text('ROSTER POSITION:', 42, 50);
    doc.text('AFP:', 42, 55);
    doc.text('SUBAREA:', 42, 60);
    doc.text('SEDE:', 42, 65);
    doc.text('TURNO:', 42, 70);
    doc.text('CELULAR:', 42, 75);

    doc.text('NOMBRES:', 120, 45);
    doc.text('FECHA DE CONTRATO:', 120, 50);
    doc.text('DEPARTAMENTO:', 120, 55);
    doc.text('GRUPO:', 120, 60);
    doc.text('EPS:', 120, 65);
    doc.text('CIUDAD DE RESIDENCIA:', 120, 70);
    doc.text('EMAIL:', 120, 75);

    /* DATOS DEL REGISTRO */
    doc.setFont("helvetica", "normal");
    doc.addImage(`${lsDataReport.urlImg}`, "JPEG", 7.5, 45, 30, 30);
    doc.text(`${lsDataReport.documento}`, 75, 45);
    doc.text(`${lsDataReport.nameCargo}`, 75, 50);
    doc.text(`${lsDataReport.nameAfp}`, 75, 55);
    doc.text(`${lsDataReport.nameSubarea}`, 75, 60);
    doc.text(`${lsDataReport.nameSede}`, 75, 65);
    doc.text(`${lsDataReport.nameTurno}`, 75, 70);
    doc.text(`${lsDataReport.nameTelefono}`, 75, 75);

    doc.text(`${lsDataReport.nameEmpleado}`, 155, 45);
    doc.text(`${ViewFormat(lsDataReport.fechaContrato)}`, 155, 50);
    doc.text(`${lsDataReport.nameDepartamento}`, 155, 55);
    doc.text(`${lsDataReport.nameGrupo}`, 155, 60);
    doc.text(`${lsDataReport.nameEps}`, 155, 65);
    doc.text(`${lsDataReport.nameDptoNacido}`, 155, 70);
    doc.text(`${lsDataReport.nameCorreo}`, 155, 75);

    /* INFORMACIÓN DE ASESORÍA */
    doc.text(`CONSECUTIVO NRO: ${lsDataReport.id}`, 7, 95);
    doc.text(`FECHA: ${ViewFormat(lsDataReport.fecha)}`, 90, 95);
    doc.text(`MOTIVO: ${lsDataReport.nameMotivo}`, marXR - 2, 95, { align: 'right', maxWidth: 80, lineHeightFactor: 1.5 });

    /* DESCRIPCIONES DE TEXTO */
    doc.setFontSize(9);
    doc.text(`${lsDataReport.motivo}`, 7, 112, { maxWidth: 200, lineHeightFactor: 1.5 });
    doc.text(`${lsDataReport.recomendaciones}`, 7, 162, { maxWidth: 200, lineHeightFactor: 1.5 });

    getFirma(doc, lsDataUser)
}

export function generateReportOtherAdvice(lsDataReport = [], lsDataUser) {
    const doc = new jsPDF('p', 'mm', 'letter');

    doc.setFont("helvetica", "bold");
    getHeader(doc, lsDataReport);
    generateReportMedicalAdvice(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 1, 1);

    var dataPDF = doc.output("bloburl");
    return dataPDF;
}