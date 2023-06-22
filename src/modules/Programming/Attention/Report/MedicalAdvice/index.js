import { ViewFormat } from "components/helpers/Format";
import jsPDF from "jspdf";
import { GetEdad } from "components/helpers/Format";

import config from "config";
import LogoReportLtd from 'assets/img/LogoReportLTD.png';
import LogoReportEnergy from 'assets/img/LogoReportEnergy.png';

function getHeader(doc = new jsPDF()) {
    var marXR = doc.internal.pageSize.width - 5;
    /* ENCABEZADO REPORTE */
    doc.addImage(config.typeDashboard === 'ltd' ? LogoReportLtd : LogoReportEnergy, "PNG", 5, 5,
        config.typeDashboard === 'ltd' ? 60 : 50, 15);
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
    doc.text(`${lsDataUser.nameEspecialidad}`, 7, doc.internal.pageSize.height - (40 - my));
    doc.text(`${lsDataUser.licencia} - ${lsDataUser.registroMedico}`, 7, doc.internal.pageSize.height - (36 - my));
}

function generateReportMedicalAdvice(doc = new jsPDF(), lsDataReport = [], lsDataUser) {
    var marXR = doc.internal.pageSize.width - 5;

    doc.text('DATOS DEL REGISTRO', 7, 37);
    doc.text('INFORMACIÓN DE ASESORÍA:', 7, 85);
    doc.text('DESCRIPCIÓN DE LA ASESORÍA:', 7, 105);
    doc.text('PLAN DE MANEJO:', 7, 205);
    doc.setFontSize(8);
    doc.setLineWidth(0.2);
    doc.setDrawColor(128, 128, 128);

    /* CUADRO DATOS */
    doc.line(5, 32, 5, 230); /* IZQUIERDA */
    doc.line(5, 32, marXR, 32); /* HORI ONE */
    doc.line(5, 39, marXR, 39); /* HORI TWO  */

    doc.line(5, 80, marXR, 80); /* HORI THREE */
    doc.line(5, 88, marXR, 88); /* HORI FOUR */

    doc.line(5, 100, marXR, 100); /* HORI FIVE */
    doc.line(5, 108, marXR, 108); /* HORI SIX */

    doc.line(5, 200, marXR, 200); /* HORI SEVEN */
    doc.line(5, 230, marXR, 230); /* HORI OCHO */

    doc.line(5, 208, marXR, 208); /* HORI ULTIMA */
    doc.line(40, 39, 40, 80); /* LINEA VERTI ONE */
    doc.line(marXR, 32, marXR, 230); /* DERECHA */

    /* TITULOS DE CONTENIDO */
    doc.setFontSize(8);

    doc.text('DOCUMENTO:', 42, 45);
    doc.text('ROSTER POSITION:', 42, 50);
    doc.text('GENERO:', 42, 55);
    doc.text('EPS:', 42, 60);
    doc.text('SEDE:', 42, 65);
    doc.text('CELULAR:', 42, 70);
    doc.text('DEPARTAMENTO DE RESIDENCIA:', 42, 75);

    doc.text('NOMBRES:', 120, 45);
    doc.text('DEPARTAMENTO:', 120, 50);
    doc.text('EDAD:', 120, 55);
    doc.text('AFP:', 120, 60);
    doc.text('ÁREA:', 120, 65);
    doc.text('EMAIL:', 120, 70);
    doc.text('MUNICIPIO DE RESIDENCIA:', 120, 75);

    doc.text('TIPO DE ASESORIA:', 70, 85);
    ///////////////////////////////////////////////////////////


    /* DATOS DEL REGISTRO */
    doc.setFont("helvetica", "normal");
    doc.addImage(`${lsDataReport.urlImg}`, "JPEG", 7.5, 45, 30, 30);
    doc.text(`${lsDataReport.documento}`, 70, 45);
    doc.text(`${lsDataReport.nameCargo}`, 70, 50);
    doc.text(`${lsDataReport.nameGenero}`, 70, 55);
    doc.text(`${lsDataReport.nameEps}`, 70, 60);
    doc.text(`${lsDataReport.nameSede}`, 70, 65);
    doc.text(`${lsDataReport.nameTelefono}`, 70, 70);
    doc.text(`${lsDataReport.nameDptoResidencia}`, 91, 75);


    doc.text(`${lsDataReport.nameEmpleado}`, 150, 45);
    doc.text(`${lsDataReport.nameDepartamento}`, 150, 50);

    doc.text(`${GetEdad(lsDataReport.fechaNacimi)}`, 150, 55);
    doc.text("AÑO", 154, 55);

    doc.text(`${lsDataReport.nameAfp}`, 150, 60);
    doc.text(`${lsDataReport.nameArea}`, 150, 65);
    doc.text(`${lsDataReport.nameCorreo}`, 150, 70);
    doc.text(`${lsDataReport.nameCiudadResidencia}`, 160, 75);
    doc.text(`${lsDataReport.nameTipoAsesoria}`, 100, 85);

    /* INFORMACIÓN DE ASESORÍA */
    doc.setFontSize(8);
    doc.text(`CONSECUTIVO NRO: ${lsDataReport.id}`, 7, 95);
    doc.text(`FECHA: ${ViewFormat(lsDataReport.fecha)}`, 75, 95);

    doc.setFontSize(8);
    doc.text('MOTIVO:', 125, 85);
    doc.text(`${lsDataReport.nameMotivo}`, 138, 85);

    doc.text('SUBMOTIVO:', 125, 95);
    doc.text(`${lsDataReport.nameSubmotivo}`, 145, 95);


    /* DESCRIPCIONES DE TEXTO */
    doc.setFontSize(7);
    doc.text(`${lsDataReport.motivo}`, 7, 112, { maxWidth: 200, lineHeightFactor: 1.5 });
    doc.setFontSize(7);
    doc.text(`${lsDataReport.recomendaciones}`, 7, 212, { maxWidth: 200, lineHeightFactor: 1.5 });

    getFirma(doc, lsDataUser, 24)
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