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
    doc.text("REGISTRO DE ACCIDENTALIDAD", 110, 14, { align: 'center' });

    doc.setFontSize(12);
    doc.text("SIG-1242", 170, 12);
    doc.setFontSize(10);
    doc.text("Versión 01", 170, 16);

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

function generateReporteAccidentRate(doc = new jsPDF(), lsDataReport = [], lsDataUser) {
    var marXR = doc.internal.pageSize.width - 5;

    doc.text('DATOS  BÁSICOS', 7, 37);
    doc.text('DESCRIPCIÓN DEL REGISTRO DE ACCIDENTALIDAD:', 7, 85);
    doc.text('IMPRESIÓN DIAGNÓSTICA:', 7, 122);

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


    doc.line(5, 230, marXR, 230); /* HORI OCHO */


    doc.line(40, 39, 40, 80); /* LINEA VERTI ONE */
    doc.line(marXR, 32, marXR, 230); /* DERECHA */

    /* TITULOS DE CONTENIDO */
    doc.setFontSize(8);

    doc.text('Nro. Documento:', 42, 45);
    doc.text('Cargo:', 42, 50);
    doc.text('Genero:', 42, 55);
    doc.text('EPS:', 42, 60);
    doc.text('Sede:', 42, 65);
    doc.text('Celular:', 42, 70);
    doc.text('Tipo de Contrato:', 42, 75);

    doc.text('Nombres:', 120, 45);
    doc.text('Departamento:', 120, 50);
    doc.text('Edad:', 120, 55);
    doc.text('AFP:', 120, 60);
    doc.text('Área:', 120, 65);
    doc.text('Correo Electrónico:', 120, 70);
    doc.text('Empresa:', 120, 75);


    /* DATOS DEL REGISTRO */
    doc.setFont("helvetica", "normal");
    doc.addImage(`${lsDataReport.urlImg}`, "JPEG", 7.5, 45, 30, 30);
    doc.text(`${lsDataReport.documento}`, 70, 45);
    doc.text(`${lsDataReport.nameCargo}`, 70, 50);
    doc.text(`${lsDataReport.nameGenero}`, 70, 55);
    doc.text(`${lsDataReport.nameEps}`, 70, 60);
    doc.text(`${lsDataReport.nameSede}`, 70, 65);
    doc.text(`${lsDataReport.nameTelefono}`, 70, 70);
    doc.text(`${lsDataReport.nameTipoContrato}`, 70, 75);



    doc.text(`${lsDataReport.nameEmpleado}`, 150, 45);
    doc.text(`${lsDataReport.nameDepartamento}`, 150, 50);

    doc.text(`${GetEdad(lsDataReport.fechaNacimi)}`, 150, 55);
    doc.text(" AÑO", 154, 55);

    doc.text(`${lsDataReport.nameAfp}`, 150, 60);
    doc.text(`${lsDataReport.nameArea}`, 150, 65);
    doc.text(`${lsDataReport.nameCorreo}`, 150, 70);
    doc.text(`${lsDataReport.nameEmpresa}`, 145, 75);


    /* INFORMACIÓN DE ACCIDENTALIDAD */

    doc.setFontSize(8);
    doc.text('Consecutivo Nro.:', 120, 85);
    doc.text(`${lsDataReport.id}`, 150, 85);


    doc.text(`Fecha:`, 7, 95);
    doc.text(`${ViewFormat(lsDataReport.fecha)}`, 35, 95);
    /*    doc.text(`Nro. Furat:`, 60, 95); */

    doc.text('Nro. Historia:', 120, 95);
    // doc.text(`${lsDataReport.nameSubmotivo}`, 160, 95);

    /* DESCRIPCIONES DE TEXTO */
    doc.text('Clase A.T.:', 7, 105);
    doc.text(`${lsDataReport.nameClase}`, 35, 105);


    doc.text('Causa A.T.:', 120, 105);
    doc.text(`${lsDataReport.nameCausa}`, 150, 105);


    doc.text('Segmento Agrupado:', 7, 113);
    doc.setFontSize(6);
    doc.text(`${lsDataReport.segmentoAgrupado}`, 35, 113);
    doc.text(`${lsDataReport.nameRegion}`, 175, 113);

    doc.setFontSize(8);
    doc.text('Segmento Afectado:', 145, 113);

    doc.line(5, 116, marXR, 116); /* HORI 7 */

    if (lsDataReport.codDxInicial !== "")
        doc.text(`Diagnóstico Inicial:   ${lsDataReport.codDxInicial}   ${lsDataReport.dxInicial.toUpperCase()}`, 7, 130, { maxWidth: 200, lineHeightFactor: 1.5 });

    if (lsDataReport.codDxFinal !== "")
        doc.text(`Diagnóstico Final:   ${lsDataReport.codDxFinal}   ${lsDataReport.dxFinal.toUpperCase()}`, 7, 135, { maxWidth: 200, lineHeightFactor: 1.5 });

    doc.line(5, 124, marXR, 124); /* HORI 7 */
    doc.line(5, 137, marXR, 137); /* HORI 7 */


    doc.text('Conducta Inicial:', 7, 143);
    doc.text('Conducta Final:', 120, 143);

    doc.setFontSize(6);
    doc.text(`${lsDataReport.conductaInicial}`, 35, 143);
    doc.setFontSize(6);
    doc.text(`${lsDataReport.conductaFin}`, 142, 143);

    doc.line(5, 146, marXR, 146); /* HORI 7 */

    doc.setFontSize(8);
    doc.text('Días Trabajo Transitorio:', 7, 151);
    doc.text(`${lsDataReport.diasTw}`, 39, 151);



    doc.text('Días Incapacidad:', 120, 151);
    doc.text(`${lsDataReport.diasIncapacidad}`, 150, 151);

    doc.line(5, 155, marXR, 155); /* HORI 7 */


    doc.text('Paraclinicos:', 7, 160);
    doc.text(`${lsDataReport.px}`, 35, 160);



    doc.text('Estado:', 120, 160);
    doc.text(`${lsDataReport.nameStatus}`, 150, 160);

    doc.line(5, 163, marXR, 163); /* HORI 7 */


    doc.text('Remitido:', 7, 167);
    doc.text(`${lsDataReport.remitido}`, 35, 167);


    doc.line(5, 170, marXR, 170); /* HORI 7 */

    doc.text('SEGUIMIENTO:', 7, 174);



    doc.line(5, 177, marXR, 177); /* HORI 7 */

    doc.setFontSize(8);

    doc.text(`${lsDataReport.seguimiento}`, 7, 182, { maxWidth: 200, lineHeightFactor: 1.5 });


    getFirma(doc, lsDataUser, 24)
}

export function generateReport(lsDataReport = [], lsDataUser) {
    const doc = new jsPDF('p', 'mm', 'letter');

    doc.setFont("helvetica", "bold");
    getHeader(doc);
    generateReporteAccidentRate(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 1, 1);

    var dataPDF = doc.output("bloburl");
    return dataPDF;
}