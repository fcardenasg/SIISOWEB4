import { GetEdad, ViewFormat } from "components/helpers/Format";
import jsPDF from "jspdf";

import config from "config";

function getHeader(doc = new jsPDF()) {
    var marXR = doc.internal.pageSize.width - 5;
    /* ENCABEZADO REPORTE */
    doc.addImage(config.logotipo, "PNG", 5, 5, config.typeDashboard === 'DLTD' ? 60 : 50, 15);
    doc.setFontSize(10);

    doc.text("DIVISIÓN MÉDICA", 110, 10, { align: 'center' });
    doc.text("FICHA Y SEGUIMIENTO DE RESTRINGIDOS", 110, 14, { align: 'center' });

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

function generatePage1(doc = new jsPDF(), lsDataReport = [], lsDataUser) {
    var marXR = doc.internal.pageSize.width - 5;

    doc.text('DATOS DEL REGISTRO', 7, 37);

    doc.text('DESCRIPCIÓN PATOLOGICA:', 7, 85);
    doc.text('DX CAUSA DE LA RESTRICCIÓN:', 7, 93);
    doc.text('OBSERVACIÓN DIAGNOSTICO:', 7, 120);

    /* doc.text('PLAN DE MANEJO:', 7, 205); */
    doc.setFontSize(8);
    doc.setLineWidth(0.2);
    doc.setDrawColor(128, 128, 128);

    /* CUADRO DATOS */
    doc.line(5, 32, 5, 250); /* IZQUIERDA */
    doc.line(5, 32, marXR, 32); /* HORI ONE */
    doc.line(5, 39, marXR, 39); /* HORI TWO  */

    doc.line(5, 80, marXR, 80); /* HORI THREE */
    doc.line(5, 88, marXR, 88); /* HORI FOUR */
    doc.line(5, 96, marXR, 96); /* HORI THREE */

    doc.line(5, 115, marXR, 115); /* HORI FIVE */
    doc.line(5, 123, marXR, 123); /* HORI SIX */

    doc.line(5, 200, marXR, 200);
    /* doc.line(5, 208, marXR, 208); */

    doc.line(5, 250, marXR, 250); /* ULTIMA */
    doc.line(40, 39, 40, 80); /* LINEA VERTI ONE */
    doc.line(marXR, 32, marXR, 250); /* DERECHA */

    /* TITULOS DE CONTENIDO */
    doc.setFontSize(8);

    doc.text('Nro Id:', 42, 45);
    doc.text('NOMBRE:', 42, 50);
    doc.text('GENERO:', 42, 55);
    doc.text('EPS:', 42, 60);
    doc.text('SEDE:', 42, 65);
    doc.text('CELULAR:', 42, 70);
    doc.text('TIPO DE CONTRATO:', 42, 75);

    doc.text('DOCUMENTO:', 120, 45);
    doc.text('DEPARTAMENTO:', 120, 50);
    doc.text('EDAD:', 120, 55);
    doc.text('AFP:', 120, 60);
    doc.text('ÁREA:', 120, 65);
    doc.text('EMAIL:', 120, 70);
    /* doc.text('TIPO DE CONTRATO:', 120, 75); */

    /* INFORMACIÓN DE ABAJO */
    doc.text('ESTADO DEL EMPLEADO', 7, 205);
    doc.text('DÍAS RESTRINGIDO', 7, 210);
    doc.text('MICROPAUSAS', 7, 215);
    doc.text('TIPO DE RESTRICCIÓN', 7, 220);
    doc.text('ESTADO DE RESTRICCIÓN', 7, 225);
    doc.text('MATERIAL SUAVE', 7, 230);

    doc.text('INICIO DE RESTRICCIÓN', 110, 205);
    doc.text('FIN DE RESTRICCIÓN', 110, 210);
    doc.text('SOLO DIURNO', 110, 215);
    doc.text('ORDENADO POR', 110, 220);
    doc.text('MEDICO', 110, 225);
    doc.text('%PCL', 110, 230);

    ///////////////////////////////////////////////////////////

    /* DATOS DEL REGISTRO */
    doc.setFont("helvetica", "normal");
    doc.addImage(`${lsDataReport.urlImg}`, "JPEG", 7.5, 45, 30, 30);
    doc.text(`${lsDataReport.id}`, 70, 45);
    doc.text(`${lsDataReport.nameEmpleado}`, 70, 50);
    doc.text(`${lsDataReport.nameGenero}`, 70, 55);
    doc.text(`${lsDataReport.nameEps}`, 70, 60);
    doc.text(`${lsDataReport.nameSede}`, 70, 65);
    doc.text(`${lsDataReport.nameTelefono}`, 70, 70);
    doc.text(`${lsDataReport.nameTipoContrato}`, 75, 75);


    doc.text(`${lsDataReport.documento}`, 150, 45);
    doc.text(`${lsDataReport.nameDepartamento}`, 150, 50);

    doc.text(`${GetEdad(lsDataReport.fechaNacimi)}`, 150, 55);
    doc.text("AÑO", 154, 55);

    doc.text(`${lsDataReport.nameAfp}`, 150, 60);
    doc.text(`${lsDataReport.nameArea}`, 150, 65);
    doc.text(`${lsDataReport.nameCorreo}`, 150, 70);
    /* doc.text(`${lsDataReport.nameTipoContrato}`, 152, 75); */

    if (lsDataReport.dx1 !== "")
        doc.text(`DX1:   ${lsDataReport.dx1}  -  ${lsDataReport.diagnostico1}   -   ${lsDataReport.origen1}`, 7, 100, { maxWidth: 200, lineHeightFactor: 1.5 });

    if (lsDataReport.dx2 !== "")
        doc.text(`DX2:   ${lsDataReport.dx2}  -  ${lsDataReport.diagnostico2}   -   ${lsDataReport.origen2}`, 7, 105, { maxWidth: 200, lineHeightFactor: 1.5 });

    /* DESCRIPCIONES DE TEXTO */
    doc.setFontSize(7);
    doc.text(`${lsDataReport.resumen}`, 7, 127, { maxWidth: 200, lineHeightFactor: 1.5 });
    /* doc.setFontSize(7);
    doc.text(`${lsDataReport.recomendaciones}`, 7, 212, { maxWidth: 200, lineHeightFactor: 1.5 }); */

    doc.text(`${lsDataReport.estadoActual}`, 50, 205);
    doc.text(`${lsDataReport.numeroDia}`, 50, 210);
    doc.text(`N/A`, 50, 215);
    doc.text(`${lsDataReport.tipoRestriccion}`, 50, 220);
    doc.text(`${lsDataReport.estadoRestriccion}`, 50, 225);
    doc.text(`N/A`, 50, 230);

    doc.text(`${ViewFormat(lsDataReport.fechaInicio)}`, 150, 205);
    doc.text(`${ViewFormat(lsDataReport.fechaFin)}`, 150, 210);
    doc.text(`N/A`, 150, 215);
    doc.text(`${lsDataReport.ordenadoPor}`, 150, 220);
    doc.text(`${lsDataReport.medicoDLTD}`, 150, 225);
    doc.text(`${lsDataReport.porcentajePCL}`, 150, 230);
}

function generatePage2(doc = new jsPDF(), lsDataReport = [], lsDataUser) {
    var marXR = doc.internal.pageSize.width - 5;

    doc.text('RECOMENDACIONES:', 7, 37);
    doc.text('DATOS DE REUBICACIÓN:', 7, 95);
    doc.text('DESCRIPCIÓN DE FUNCIONES:', 7, 145);
    doc.text('SUPERVISOR DEL REUBICADO:', 7, 180);

    doc.setFontSize(8);
    /* INFORMACIÓN DE REUBICACIÓN */
    doc.text('INICIO DE REUBICACIÓN', 7, 105);
    doc.text('FIN DE REUBICACIÓN', 7, 110);
    doc.text('CONDICIÓN RI', 7, 115);
    doc.text('TIENE CARTA', 7, 120);
    doc.text('CONSULTOR', 7, 125);
    doc.text('ESTADO DE REUBICACIÓN', 7, 130);

    doc.text('CARGO ACTUAL', 110, 105);
    doc.text('DEPARTAMENTO ACTUAL', 110, 110);
    doc.text('ÁREA ACTUAL', 110, 115);
    doc.text('GRUPO ACTUAL', 110, 120);
    doc.text('JORDANA ACTUAL', 110, 125);

    doc.text('DOCUMENTO IDENTIDAD:', 7, 190);
    doc.text('NOMBRES:', 110, 190);

    doc.setLineWidth(0.2);
    doc.setDrawColor(128, 128, 128);

    /* CUADRO DATOS */
    doc.line(5, 32, 5, 200); /* IZQUIERDA */
    doc.line(5, 32, marXR, 32); /* HORI ONE */
    doc.line(5, 40, marXR, 40); /* HORI TWO  */

    doc.line(5, 90, marXR, 90); /* HORI THREE */
    doc.line(5, 98, marXR, 98); /* HORI FOUR */

    doc.line(5, 140, marXR, 140); /* HORI FIVE */
    doc.line(5, 148, marXR, 148); /* HORI SIX */

    doc.line(5, 175, marXR, 175); /* HORI SEVEN */
    doc.line(5, 183, marXR, 183); /* HORI OCHO */
    doc.line(5, 200, marXR, 200); /* HORI OCHO */
    doc.line(marXR, 32, marXR, 200); /* DERECHA */

    /* DESCRIPCIONES DE TEXTO */
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");

    doc.text(`${lsDataReport.recomendaciones}`, 7, 45, { maxWidth: 200, lineHeightFactor: 1.5 });

    /* INFORMACIÓN DE REUBICACIÓN */
    doc.text(`${ViewFormat(lsDataReport.inicioReubicacion)}`, 60, 105);
    doc.text(`${ViewFormat(lsDataReport.finReubicacion)}`, 60, 110);
    doc.text(`N/A`, 60, 115);
    doc.text(`N/A`, 60, 120);
    doc.text(`N/A`, 60, 125);
    doc.text(`${lsDataReport.tipoRestriccion}`, 60, 130);

    doc.text(`${lsDataReport.nameCargo}`, 160, 105);
    doc.text(`${lsDataReport.nameDepartamento}`, 160, 110);
    doc.text(`${lsDataReport.nameArea}`, 160, 115);
    doc.text(`${lsDataReport.nameGrupo}`, 160, 120);
    doc.text(`${lsDataReport.nameTurnoEmpleado}`, 160, 125);

    /* doc.text(`${lsDataReport.nameGrupo}`, 45, 190);
    doc.text(`${lsDataReport.nameTurnoEmpleado}`, 135, 190); */
}

function generatePage3(doc = new jsPDF(), lsDataReport = [], lsDataUser) {
    var marXR = doc.internal.pageSize.width - 5;

    doc.text('REDUCCIÓN LABORAL:', 7, 37);
    doc.text('LISTA DE CHEQUEO:', 7, 65);

    doc.setFontSize(8);
    doc.text('TIPO DE REDUCCIÓN', 7, 45);
    doc.text('REDUCCIÓN ORDENADA POR', 50, 45);
    doc.text('FECHA INICIO', 100, 45);
    doc.text('FECHA FIN', 140, 45);
    doc.text('ESTADO', 170, 45);

    doc.setFont("helvetica", "normal");
    doc.text(`${lsDataReport.tipoReduccion}`, 7, 52);
    doc.text(`${lsDataReport.ordenadaPorSinHorario}`, 50, 52);
    doc.text(`${ViewFormat(lsDataReport.fechaInicioHorario)}`, 100, 52);
    doc.text(`${ViewFormat(lsDataReport.fechaFinHorario)}`, 140, 52);
    doc.text(`${lsDataReport.estadoCaso}`, 170, 52);

    /* CAMPOS DE LA TABLA */
    doc.setFontSize(7);
    doc.text('DOCUMENTO', 7, 73);
    doc.text('CARGADO', 125, 73);
    doc.text('USUARIO CARGA', 155, 73);
    doc.text('FECHA DE CARGA', 185, 73);

    doc.setLineWidth(0.2);
    doc.setDrawColor(128, 128, 128);

    /* CUADRO DATOS */
    doc.line(5, 32, 5, 146); /* IZQUIERDA */
    doc.line(5, 32, marXR, 32); /* HORI ONE */
    doc.line(5, 40, marXR, 40); /* HORI TWO  */

    doc.line(5, 60, marXR, 60); /* HORI THREE */
    doc.line(5, 68, marXR, 68); /* HORI FOUR */

    /* TABLA DE LISTA DE CHEQUEO */
    doc.line(5, 76, marXR, 76); /* HORI FIVE */
    doc.line(5, 84, marXR, 84); /* HORI SIX */
    doc.line(5, 92, marXR, 92); /* HORI SIX */
    doc.line(5, 100, marXR, 100); /* HORI SIX */
    doc.line(5, 108, marXR, 108); /* HORI SIX */
    doc.line(5, 116, marXR, 116); /* HORI SIX */
    doc.line(5, 122, marXR, 122); /* HORI SIX */
    doc.line(5, 130, marXR, 130); /* HORI SIX */
    doc.line(5, 138, marXR, 138); /* HORI SIX */
    doc.line(5, 146, marXR, 146); /* HORI SIX */

    doc.line(120, 68, 120, 146); /* DERECHA */
    doc.line(150, 68, 150, 146); /* DERECHA */
    doc.line(182, 68, 182, 146); /* DERECHA */

    doc.line(marXR, 32, marXR, 146); /* DERECHA */

    /* DESCRIPCIONES DE TEXTO */
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
}

export function generateReportRefund(lsDataReport = [], lsDataUser) {
    const doc = new jsPDF('p', 'mm', 'letter');

    doc.setFont("helvetica", "bold");
    getHeader(doc);
    generatePage1(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 1, 2);

    doc.addPage();

    doc.setFont("helvetica", "bold");
    getHeader(doc);
    generatePage2(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 2, 2);

    /* doc.addPage();

    doc.setFont("helvetica", "bold");
    getHeader(doc);
    generatePage3(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 3, 3); */

    var dataPDF = doc.output("bloburl");
    return dataPDF;
}