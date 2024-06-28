import jsPDF from "jspdf";
import config from "config";

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

function getHeader(doc = new jsPDF()) {
    var marXR = doc.internal.pageSize.width - 5;
    /* ENCABEZADO REPORTE */
    doc.addImage(config.logotipo, "PNG", 5, 5, config.typeDashboard === 'DLTD' ? 60 : 50, 15);
    doc.setFontSize(10);

    doc.text("DIVISIÓN MÉDICA", 110, 12, { align: 'center' });
    doc.text('ÁREA DE SALUD OCUPACIONAL', 110, 16, { align: 'center' });

    doc.setFontSize(12);
    doc.text("SIG-0410", 170, 12);
    doc.setFontSize(10);
    doc.text("Versión 06", 170, 16);

    /* LINEA DE DIVISIÓN */
    doc.setLineWidth(1);
    doc.setDrawColor(255, 0, 0);
    doc.line(5, 25, marXR, 25);
}

function getPiePage(doc, lsDataUser) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setLineWidth(1);
    doc.setDrawColor(255, 0, 0);
    doc.line(5, doc.internal.pageSize.height - 10, 210, doc.internal.pageSize.height - 10);

    doc.text(`FECHA DE SISTEMA:  ${new Date().toLocaleString()}`, 10, doc.internal.pageSize.height - 4);
    doc.text(`USUARIO ACTIVO:  ${lsDataUser.nombre}`, 90, doc.internal.pageSize.height - 4);
    doc.text(`Pag. 1 de 1`, 190, doc.internal.pageSize.height - 4);
}

export function generateReportGuiaEnvio(lsDataReport = []) {
    const doc = new jsPDF('p', 'mm', 'letter');
    doc.setFont("helvetica", "normal");

    doc.addImage(config.logotipo, "PNG", 140, 10, config.typeDashboard === 'DLTD' ? 75 : 50, 20);

    doc.setFontSize(20);
    doc.text('Remitente:', 15, 40);
    doc.text('Destinatario:', 15, 120);

    doc.setFontSize(18);
    doc.text(`${lsDataReport?.descripcionEnvio}`, 20, 50);

    doc.setFontSize(15);
    doc.text(`-  ${lsDataReport?.solicitadoPor?.toUpperCase()}`, 20, 130);
    doc.text(`-  ${lsDataReport?.direccionSolicitante?.toUpperCase()}`, 20, 140);
    doc.text(`-  ${lsDataReport?.ciudadEnvio?.toUpperCase()}`, 20, 150);
    doc.text(`-  ${lsDataReport?.telefonoNotificion?.toUpperCase()}`, 20, 160);
    doc.text(`-  ${lsDataReport?.correoSolicitante?.toUpperCase()}`, 20, 170);

    var dataPDF = doc.output("bloburl");
    return dataPDF;
}


export function generateReportActaCorreo(mensaje, lsDataUser) {

    const doc = new jsPDF('p', 'mm', 'letter');
    getHeader(doc, mensaje);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(mensaje ? mensaje : "", 7, 45, { maxWidth: 200, lineHeightFactor: 1.5 });

    getFirma(doc, lsDataUser, 6);
    getPiePage(doc, lsDataUser, 1, 1);

    var dataPDF = doc.output("bloburl");
    var bytePDF = doc.output('datauristring');
    var file64 = bytePDF.split('pdf;base64,')[1];

    return { dataPDF, file64 };
}