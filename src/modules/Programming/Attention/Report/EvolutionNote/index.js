import { GetEdad, ViewFormat } from "components/helpers/Format";
import jsPDF from "jspdf";
import LogoReport from 'assets/img/LogoReport.png';

function getHeader(doc = new jsPDF()) {
    var marXR = doc.internal.pageSize.width - 5;
    /* ENCABEZADO REPORTE */
    doc.addImage(LogoReport, "PNG", 5, 5, 60, 15);
    doc.setFontSize(10);

    doc.text("DIVISIÓN MÉDICA", 110, 12, { align: 'center' });
    doc.text("NOTAS DE EVOLUCIÓN", 110, 16, { align: 'center' });

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
    doc.text('NOTAS DE EVOLUCIÓN', 7, 80);
    doc.text('IMPRESIÓN DIAGNOSTICA', 7, 128);
    doc.text('PLAN DE MANEJO', 7, 156);
    doc.text('CONCEPTO DE APTITUD', 7, 210);

    doc.setFontSize(10);
    doc.setLineWidth(0.2);
    doc.setDrawColor(128, 128, 128);

    /* CUADRO DATOS */
    doc.line(5, 25, 5, doc.internal.pageSize.height - 55); /* IZQUIERDA */
    doc.line(5, 32, marXR, 32); /* HORI ONE */
    doc.line(5, 39, marXR, 39); /* HORI TWO  */

    doc.line(5, 75, marXR, 75); /* HORI THREE */
    doc.line(5, 83, marXR, 83); /* HORI FOUR */

    doc.line(5, 123, marXR, 123); /* HORI FIVE */
    doc.line(5, 131, marXR, 131); /* HORI SIX */

    doc.line(5, 151, marXR, 151); /* HORI SEVEN */
    doc.line(5, 159, marXR, 159); /* HORI OCHO */

    doc.line(5, 205, marXR, 205); /* HORI NINE */
    doc.line(5, 213, marXR, 213); /* HORI TEN */

    doc.line(5, doc.internal.pageSize.height - 55, marXR, doc.internal.pageSize.height - 55); /* HORI ULTIMA */
    doc.line(40, 39, 40, 75); /* LINEA VERTI ONE */
    doc.line(marXR, 25, marXR, doc.internal.pageSize.height - 55); /* DERECHA */

    /* TITULOS DE CONTENIDO */
    doc.text(`CONSECUTIVO NRO: ${lsDataReport.id}`, 7, 30);
    doc.text(`FECHA: ${ViewFormat(lsDataReport.fecha)}`, 80, 30);
    doc.text(`MOTIVO: ${lsDataReport.nameContingencia}`, marXR - 2, 30, { align: 'right' });

    doc.setFontSize(8);
    doc.text('DOCUMENTO:', 42, 45);
    doc.text('EDAD:', 42, 50);

    doc.text(`ANTIGUEDAD:  ${GetEdad(lsDataReport.fechaContrato)}`, 80, 50);
    doc.text('TIPO CONTRATO:', 42, 55);

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

    doc.text(`${lsDataReport.nameTipoContrato}`, 70, 55);

    doc.text(`${lsDataReport.nameCargo}`, 70, 60);
    doc.text(`${lsDataReport.nameSede}`, 70, 65);
    doc.text(`${lsDataReport.nameTelefono}`, 70, 70);

    doc.text(`${lsDataReport.nameEmpleado}`, 155, 45);
    doc.text(`${lsDataReport.nameDepartamento}`, 155, 50);
    doc.text(`${lsDataReport.nameGrupo}`, 155, 55);
    doc.text(`${lsDataReport.nameArea}`, 155, 60);
    doc.text(`${lsDataReport.nameEstadoCivil}`, 155, 65);
    doc.text(`${lsDataReport.nameCorreo}`, 155, 70);

    /* DESCRIPCIONES DE TEXTO */
    doc.text(`${lsDataReport.nameConceptoActitud}`, 7, 220, { maxWidth: 200, lineHeightFactor: 1.5 });
    doc.setFontSize(8);
    doc.text(`${lsDataReport.nota}`, 7, 87, { maxWidth: 200, lineHeightFactor: 1.5 });

    doc.setFontSize(10);

    if (lsDataReport.dx1 !== "")
        doc.text(`Dx1:   ${lsDataReport.dx1}   ${lsDataReport.nameDx1.toUpperCase()}`, 7, 135, { maxWidth: 200, lineHeightFactor: 1.5 });

    if (lsDataReport.dx2 !== "")
        doc.text(`Dx2:   ${lsDataReport.dx2}   ${lsDataReport.nameDx2.toUpperCase()}`, 7, 140, { maxWidth: 200, lineHeightFactor: 1.5 });

    if (lsDataReport.dx3 !== "")
        doc.text(`Dx3:   ${lsDataReport.dx3}   ${lsDataReport.nameDx3.toUpperCase()}`, 7, 145, { maxWidth: 200, lineHeightFactor: 1.5 });

    doc.text(`${lsDataReport.planManejo}`, 7, 163, { maxWidth: 200, lineHeightFactor: 1.5 });

    getFirma(doc, lsDataUser, 20);
}

export function generateReportEvolutionNote(lsDataReport = [], lsDataUser) {
    const doc = new jsPDF('p', 'mm', 'letter');

    doc.setFont("helvetica", "bold");
    getHeader(doc);
    generateReportMedicalAdvice(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 1, 1);

    var dataPDF = doc.output("bloburl");
    return dataPDF;
}