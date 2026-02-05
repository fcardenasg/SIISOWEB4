import { ViewFormat } from "components/helpers/Format";
import jsPDF from "jspdf";
import { GetEdad } from "components/helpers/Format";
import config from "config";

const clean = (val) => (val === null || val === undefined || val === 'null' ? "" : String(val));

function getHeader(doc = new jsPDF()) {
    var marXR = doc.internal.pageSize.width - 5;
    doc.addImage(config.logotipo, "PNG", 5, 5, config.typeDashboard === 'DLTD' ? 60 : 50, 15);
    doc.setFontSize(10);
    doc.text("DIVISIÓN MÉDICA", 110, 10, { align: 'center' });
    doc.text("REGISTRO DE ACCIDENTALIDAD", 110, 14, { align: 'center' });
    doc.setFontSize(12);
    doc.text("SIG-1242", 170, 12);
    doc.setFontSize(10);
    doc.text("Versión 01", 170, 16);
    doc.setLineWidth(1);
    doc.setDrawColor(255, 0, 0);
    doc.line(5, 25, marXR, 25);
}

function getPiePage(doc, lsDataUser, page, pageSize) {
    const nombreUsuario = clean(lsDataUser?.nombre);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setLineWidth(1);
    doc.setDrawColor(255, 0, 0);
    doc.line(5, doc.internal.pageSize.height - 10, 210, doc.internal.pageSize.height - 10);
    doc.text(`FECHA DE SISTEMA: ${new Date().toLocaleString()}`, 10, doc.internal.pageSize.height - 4);
    doc.text(`USUARIO ACTIVO: ${nombreUsuario}`, 90, doc.internal.pageSize.height - 4);
    doc.text(`Pag. ${page} of ${pageSize}`, 190, doc.internal.pageSize.height - 4);
}

// Función de firma ajustada para ser relativa al final del contenido
function getFirmaRelativa(doc, lsDataUser, yPos) {
    if (lsDataUser?.firma) {
        doc.addImage(`${lsDataUser.firma}`, "PNG", 7, yPos, 45, 18);
    }
    doc.setLineWidth(0.5);
    doc.setDrawColor(128, 128, 128);
    doc.line(7, yPos + 20, 60, yPos + 20);
    doc.setFontSize(8);
    doc.text(clean(lsDataUser?.nombre), 7, yPos + 24);
    doc.text(clean(lsDataUser?.nameEspecialidad), 7, yPos + 28);
    doc.text(`${clean(lsDataUser?.licencia)} - ${clean(lsDataUser?.registroMedico)}`, 7, yPos + 32);
}

function generateReporteAccidentRate(doc = new jsPDF(), lsDataReport = [], lsDataUser) {
    var marXR = doc.internal.pageSize.width - 5;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text('DATOS BÁSICOS', 7, 37);
    doc.text('DESCRIPCIÓN DEL REGISTRO DE ACCIDENTALIDAD:', 7, 85);
    doc.text('IMPRESIÓN DIAGNÓSTICA:', 7, 122);

    doc.setFontSize(8);
    doc.setLineWidth(0.2);
    doc.setDrawColor(128, 128, 128);

    /* ESTRUCTURA ESTÁTICA SUPERIOR */
    doc.line(5, 32, marXR, 32);
    doc.line(5, 39, marXR, 39);
    doc.line(5, 80, marXR, 80);
    doc.line(5, 88, marXR, 88);
    doc.line(5, 100, marXR, 100);
    doc.line(5, 108, marXR, 108);
    doc.line(40, 39, 40, 80);

    /* DATOS PERSONALES */
    doc.setFont("helvetica", "normal");
    if (lsDataReport.urlImg) doc.addImage(`${lsDataReport.urlImg}`, "JPEG", 7.5, 45, 30, 30);

    // Títulos y valores alineados
    doc.text('Nro. Documento:', 42, 45); doc.text(clean(lsDataReport.documento), 70, 45);
    doc.text('Cargo:', 42, 50); doc.text(clean(lsDataReport.nameCargo), 70, 50);
    doc.text('Sexo:', 42, 55); doc.text(clean(lsDataReport.nameGenero), 70, 55);
    doc.text('EPS:', 42, 60); doc.text(clean(lsDataReport.nameEps), 70, 60);
    doc.text('Sede:', 42, 65); doc.text(clean(lsDataReport.nameSede), 70, 65);
    doc.text('Celular:', 42, 70); doc.text(clean(lsDataReport.nameTelefono), 70, 70);
    doc.text('Tipo Contrato:', 42, 75); doc.text(clean(lsDataReport.nameTipoContrato), 70, 75);

    doc.text('Nombres:', 120, 45); doc.text(clean(lsDataReport.nameEmpleado), 150, 45);
    doc.text('Departamento:', 120, 50); doc.text(clean(lsDataReport.nameDepartamento), 150, 50);
    doc.text('Edad:', 120, 55); doc.text(`${GetEdad(lsDataReport.fechaNacimi)} AÑOS`, 150, 55);
    doc.text('AFP:', 120, 60); doc.text(clean(lsDataReport.nameAfp), 150, 60);
    doc.text('Área:', 120, 65); doc.text(clean(lsDataReport.nameArea), 150, 65);
    doc.text('Email:', 120, 70); doc.text(clean(lsDataReport.nameCorreo), 150, 70);
    doc.text('Empresa:', 120, 75); doc.text(clean(lsDataReport.nameEmpresa), 145, 75);

    /* ACCIDENTALIDAD - AJUSTE DE ANCHOS */
    doc.text('Consecutivo Nro.:', 120, 85); doc.text(clean(lsDataReport.id), 150, 85);

    doc.setFont("helvetica", "bold"); doc.text(`Fecha:`, 7, 95); doc.setFont("helvetica", "normal");
    doc.text(lsDataReport.fecha ? ViewFormat(lsDataReport.fecha) : "", 20, 95); // Ancho optimizado

    doc.setFont("helvetica", "bold"); doc.text('Nro. Historia:', 120, 95); doc.setFont("helvetica", "normal");
    doc.text(clean(lsDataReport.nroHistoria), 145, 95); // Ancho optimizado

    doc.setFont("helvetica", "bold"); doc.text('Clase A.T.:', 7, 105); doc.setFont("helvetica", "normal");
    doc.text(clean(lsDataReport.nameClase), 25, 105); // Ancho optimizado

    doc.setFont("helvetica", "bold"); doc.text('Causa A.T.:', 120, 105); doc.setFont("helvetica", "normal");
    doc.text(clean(lsDataReport.nameCausa), 145, 105);

    doc.text('Segmento Agrupado:', 7, 113);
    doc.setFontSize(6);
    doc.text(clean(lsDataReport.segmentoAgrupado), 35, 113);
    doc.setFontSize(8);
    doc.text('Segmento Afectado:', 145, 113);
    doc.text(clean(lsDataReport.nameRegion), 175, 113);

    // --- SECCIÓN DINÁMICA DE DIAGNÓSTICOS ---
    doc.line(5, 116, marXR, 116);
    doc.line(5, 124, marXR, 124);

    let y = 130;
    const dxIniciales = [lsDataReport.listDxInicio?.[0], lsDataReport.listDxInicio2?.[0], lsDataReport.listDxInicio3?.[0]];
    const dxFinales = [lsDataReport.listDxFinal?.[0], lsDataReport.listDxFinal2?.[0], lsDataReport.listDxFinal3?.[0]];

    [...dxIniciales, ...dxFinales].forEach((item, index) => {
        if (item && (clean(item.label))) {
            const isInicial = index < 3;
            const subIndex = (index % 3) + 1;
            doc.setFont("helvetica", "bold");
            doc.text(`${isInicial ? 'Dx Inicial' : 'Dx Final'} ${subIndex}:`, 7, y);
            doc.setFont("helvetica", "normal");
            doc.text(clean(item.label).toUpperCase(), 30, y, { maxWidth: 170 });
            y += 5;
        }
    });

    y += 1; doc.line(5, y, marXR, y); // Línea cierre diagnósticos

    /* CONDUCTAS */
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text('Conducta Inicial:', 7, y); doc.text('Conducta Final:', 120, y);
    doc.setFont("helvetica", "normal"); doc.setFontSize(6);
    doc.text(clean(lsDataReport.conductaInicial), 35, y, { maxWidth: 80 });
    doc.text(clean(lsDataReport.conductaFin), 142, y, { maxWidth: 60 });

    y += 4; doc.line(5, y, marXR, y);

    /* DÍAS Y ESTADO */
    y += 5; doc.setFontSize(8); doc.setFont("helvetica", "bold");
    doc.text('Días Trabajo Transitorio:', 7, y); doc.setFont("helvetica", "normal");
    doc.text(clean(lsDataReport.diasTw), 45, y);
    doc.setFont("helvetica", "bold"); doc.text('Días Incapacidad:', 120, y); doc.setFont("helvetica", "normal");
    doc.text(clean(lsDataReport.diasIncapacidad), 150, y);

    y += 4; doc.line(5, y, marXR, y);

    y += 5; doc.text('Paraclinicos:', 7, y); doc.text(clean(lsDataReport.px), 35, y);
    doc.text('Estado:', 120, y); doc.text(clean(lsDataReport.nameStatus), 150, y);

    y += 3; doc.line(5, y, marXR, y);
    y += 4; doc.text('Remitido:', 7, y); doc.text(clean(lsDataReport.remitido), 35, y);
    y += 3; doc.line(5, y, marXR, y);

    /* SEGUIMIENTO AJUSTADO */
    y += 4; doc.setFont("helvetica", "bold"); doc.text('Seguimiento:', 7, y);
    y += 2; doc.line(5, y, marXR, y);
    y += 5; doc.setFont("helvetica", "normal");

    const splitSeg = doc.splitTextToSize(clean(lsDataReport.seguimiento), 195);
    doc.text(splitSeg, 7, y);

    // Calculamos el final real del contenido
    const segHeight = splitSeg.length * 4;
    const finalContenidoY = y + (segHeight > 5 ? segHeight : 5);
    const finalCuadroY = finalContenidoY + 5;

    /* CIERRE DE LÍNEAS VERTICALES DINÁMICAS */
    doc.line(5, 32, 5, finalCuadroY + 17); // Lateral izquierda
    doc.line(marXR, 32, marXR, finalCuadroY + 17); // Lateral derecha
    doc.line(5, finalCuadroY + 17, marXR, finalCuadroY + 17); // Fondo

    // Posicionamos la firma 15mm después de que termine el cuadro
    getFirmaRelativa(doc, lsDataUser, finalCuadroY + 18);
}

export function generateReport(lsDataReport = [], lsDataUser) {
    // Usamos formato 'p' (Portrait), 'mm', 'letter'
    const doc = new jsPDF('p', 'mm', 'letter');
    doc.setFont("helvetica", "bold");
    getHeader(doc);
    generateReporteAccidentRate(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 1, 1);

    return doc.output("bloburl");
}