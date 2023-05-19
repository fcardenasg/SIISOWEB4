import { ViewFormat } from "components/helpers/Format";
import jsPDF from "jspdf";
import LogoReport from 'assets/img/LogoReport.png';
import { GetEdad } from "components/helpers/Format";

function getHeader(doc = new jsPDF()) {
    var marXR = doc.internal.pageSize.width - 5;
    /* ENCABEZADO REPORTE */
    doc.addImage(LogoReport, "PNG", 5, 5, 60, 15);
    doc.setFontSize(10);

    doc.text("DIVISIÓN MÉDICA", 110, 12, { align: 'center' });
    doc.text("SISTEMA DE VIGILANCIA EPIDEMIOLÓGICA PARA RUIDO", 110, 16, { align: 'center' });
    doc.text("FORMATO DE HISTORIA CLÍNICA AUDIOLÓGICA", 110, 30, { align: 'center' });

    doc.setFontSize(12);
    doc.text("SIG-311", 170, 12);
    doc.setFontSize(10);
    doc.text("Versión 04", 170, 16);

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

function generateReporteAudiometry(doc = new jsPDF(), lsDataReport = [], lsDataUser) {
    var marXR = doc.internal.pageSize.width - 5;

    doc.text(`${lsDataReport.nameMotivo}`, 110, 20, { align: 'center' });


    doc.text('1.Registro de Ingreso', 7, 37);
    doc.text('2.Antecedentes Médicos:', 7, 85);
    doc.text('3.Antecedentes Ocupacionales:', 7, 177);
    doc.text('4.Otoscopia:', 7, 197);
    doc.text('5.Observaciones:', 7, 220);

    doc.text(`Fecha:`, 120, 37);
    doc.text(`${ViewFormat(lsDataReport.fecha)}`, 150, 37);

    doc.setFontSize(8);
    doc.setLineWidth(0.2);
    doc.setDrawColor(128, 128, 128);

    /* CUADRO DATOS */
    doc.line(5, 32, 5, 230); /* IZQUIERDA */
    doc.line(5, 32, marXR, 32); /* HORI ONE */
    doc.line(5, 39, marXR, 39); /* HORI TWO  */

    doc.line(5, 80, marXR, 80); /* HORI THREE */
    doc.line(5, 88, marXR, 88); /* HORI FOUR */

    doc.line(5, 300, marXR, 300); /* HORI FIVE */



    doc.line(5, 230, marXR, 230); /* HORI OCHO */


    doc.line(40, 39, 40, 80); /* LINEA VERTI ONE */
    doc.line(marXR, 32, marXR, 230); /* DERECHA */

    /* TITULOS DE CONTENIDO */
    doc.setFontSize(8);

    doc.text('Nro. Documento:', 42, 45);
    doc.text('Cargo:', 42, 50);
    doc.text('Género:', 42, 55);
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
    doc.text(`${lsDataReport.nameEmpresa}`, 150, 75);


    // /*    doc.text(`Nro. Furat:`, 60, 95); */
    // /* Antecedentes Medicos */

    doc.setFontSize(8);
    doc.text('Otalgia:', 7, 93);
    doc.text(`${lsDataReport.nameOtalgiaAOP}`, 36, 93);
    doc.text('Otorrea:', 47, 93);
    doc.text(`${lsDataReport.nameOtorreaAOP}`, 65, 93);
    doc.text('Vértigo:', 80, 93);
    doc.text(`${lsDataReport.nameVertigoAOP}`, 121, 93);
    doc.text('Hipoacusia:', 137, 93);
    doc.text(`${lsDataReport.nameTipoAcusiaAOP}`, 161, 93);
    doc.text('Familiares:', 173, 93);
    doc.text(`${lsDataReport.nameFamiliaresAOP}`, 198, 93);



    doc.text('Prurito:', 7, 100);
    doc.text(`${lsDataReport.nameLuritoAOP}`, 36, 100);
    doc.text('Acufenos:', 47, 100);
    doc.text(`${lsDataReport.nameAcufenosAOP}`, 65, 100);
    doc.text('Antecedentes Traumáticos:', 80, 100);
    doc.text(`${lsDataReport.nameAnteceTraumaticosAOP}`, 121, 100);
    doc.text('Diabetes:', 137, 100);
    doc.text(`${lsDataReport.nameDiabetesAOP}`, 161, 100);
    doc.text('Otitis:', 173, 100);
    doc.text(`${lsDataReport.nameOtitisAOP}`, 198, 100);


    doc.text('Cirugía de Oídos:', 7, 107);
    doc.text(`${lsDataReport.nameCirugiaAOP}`, 36, 107);
    doc.text('H.T.A.:', 47, 107);
    doc.text(`${lsDataReport.nameHTAAOP}`, 65, 107);
    doc.text('Expo. a Ruidos no Indicados:', 80, 107);
    doc.text(`${lsDataReport.nameExpoRuidoAOP}`, 121, 107);
    doc.text('Farmacológicos:', 137, 107);
    doc.text(`${lsDataReport.nameFarmacologicosAOP}`, 161, 107);
    doc.text('Parálisis Facial:', 173, 107);
    doc.text(`${lsDataReport.nameParalisisAOP}`, 198, 107);

    doc.line(5, 110, marXR, 110);


    /*    "nameIdReposoAUDIO": "string", */



    doc.text('Observaciones:', 7, 115);
    doc.line(5, 120, marXR, 120);

    doc.text(`${lsDataReport.observacionAOP}`, 7, 125);

    doc.line(5, 135, marXR, 135);

    doc.text('Conducta:', 7, 140);
    doc.text(`${lsDataReport.nameConducta}`, 25, 140);


    doc.text('Cambio EPP:', 90, 140);
    doc.text(`${lsDataReport.nameIdCambioEPP}`, 115, 140);

    doc.line(5, 142, marXR, 142);


    doc.text('Observaciones:', 7, 147);
    doc.line(5, 149, marXR, 149);

    doc.text(`${lsDataReport.observacionAUDIO}`, 7, 155);

    doc.line(5, 170, marXR, 170); /* HORI SIX */

    doc.line(5, 180, marXR, 180); /* HORI SIX */


    doc.text('Empresa:', 7, 185);
    doc.text(`${lsDataReport.nameEmpresaAO}`, 35, 185);

    doc.text('Cargo:', 70, 185);
    doc.text(`${lsDataReport.nameCargoAO}`, 95, 185);

    doc.text('Tiempo Exp.:', 170, 185);
    doc.text(`${lsDataReport.tiempoExpoAO}`, 185, 185);



    doc.text('Protección Auditiva:', 7, 190);
    doc.text(`${lsDataReport.nameProteccionAudi}`, 35, 190);

    doc.text('Suminstrada Por:', 70, 190);
    doc.text(`${lsDataReport.nameSuministradoPor}`, 95, 190);

    doc.text('Uso:', 170, 190);
    doc.text(`${lsDataReport.nameUso}`, 185, 190);

    doc.line(5, 193, marXR, 193); /* HORI 7 */
    doc.line(5, 200, marXR, 200); /* HORI 7 */

    doc.text('OID CAE:', 7, 205);
    doc.text(`${lsDataReport.nameOdCae}`, 30, 205);

    doc.text('OID MT:', 70, 205);
    doc.text(`${lsDataReport.nameOdMt}`, 90, 205);


    doc.text('OI CAE:', 7, 209);
    doc.text(`${lsDataReport.nameOiCae}`, 30, 209);

    doc.text('OI MT:', 70, 209);
    doc.text(`${lsDataReport.nameOiMt}`, 90, 209);


    doc.text('Reposo Auditivo:', 7, 214);
    doc.text(`${lsDataReport.nameIdReposoAUDIO}`, 30, 214);


    doc.line(5, 216, marXR, 216); /* HORI 7 */
    doc.line(5, 223, marXR, 223); /* HORI 7 */

    doc.text(`${lsDataReport.observacionAUDIO}`, 7, 226);


    getFirma(doc, lsDataUser, 24)
}

export function generateReport(lsDataReport = [], lsDataUser) {
    const doc = new jsPDF('p', 'mm', 'letter');

    doc.setFont("helvetica", "bold");
    getHeader(doc);
    generateReporteAudiometry(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 1, 1);

    var dataPDF = doc.output("bloburl");
    return dataPDF;
}