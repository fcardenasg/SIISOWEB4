import jsPDF from 'jspdf';
import LogoReport from 'assets/img/LogoReport.png';
import { ViewFormat } from 'components/helpers/Format';

function getHeader(doc) {
    /* ENCABEZADO REPORTE */
    doc.addImage(LogoReport, "PNG", 5, 5, 60, 15);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("DIVISIÓN MÉDICA", 150, 10, null, null, "center");
    doc.text("DEPARTAMENTO DE SALUD OCUPACIONAL", 150, 17, null, null, "center");

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

export function generateReport(lsDataReport = [], lsDataUser = []) {
    var doc = new jsPDF('p', 'mm', 'letter');

    /* ENCABEZADO REPORTE */
    getHeader(doc);

    /* LISTA DE DATOS PACIENTE */
    doc.text("DATOS DE LA ORDEN", 5, 35);
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
    doc.text('FECHA:', 45, 48);
    doc.text('PARA:', 120, 48);
    doc.text('SUPERVISOR BODEGA:', 120, 48);
    doc.text('DE:', 45, 55);
    doc.text('REF:', 120, 55);
    doc.text('SUMINISTRO EPP:', 120, 55);
    doc.text('El señor(a) Hurtado Maestre,Rigoberto, cédula 77195193 requiere el suministro del siguiente elemento de protección personal(EPP):', 45, 62);

    doc.text('EPP:', 45, 55);
    doc.text('No. PEOPLESOFT:', 120, 55);

    doc.text('MARCO DE  SEGURIDAD:', 45, 55);
    doc.text('24435', 120, 55);


    /* RENDERIZADO DE CONTENIDO */
    doc.setFont("helvetica", "normal");
    doc.addImage(`${lsDataReport.empleadoFoto}`, "JPEG", 7.5, 42, 30, 30);
    doc.text(`${lsDataReport.id}`, 75, 48);
    doc.text(`${ViewFormat(lsDataReport.fecha)}`, 145, 48);
    doc.text(`${lsDataReport.documento}`, 75, 55);
    doc.text(`${lsDataReport.nameEmpleado}`, 145, 55);
    doc.text(`${lsDataReport.nameProveedor}`, 75, 62);
  


 

    /* PIE DE PÁGINA */
    getPiePage(doc, lsDataUser);

    var dataPDF = doc.output("bloburl");
    return dataPDF;
}