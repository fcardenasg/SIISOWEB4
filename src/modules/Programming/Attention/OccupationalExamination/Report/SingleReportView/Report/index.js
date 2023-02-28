import jsPDF from "jspdf";
import LogoReport from "assets/img/LogoReport.png";
import { pageCompanyNotificationEC, pageWorkerNotificationEC } from "../../EMO/ConfinedSpace";
import { pageFramingham } from "../../EMO/Framingham";
import { generateClinicHistoryDLTD, generateClinicHistoryOtherCompany, generateDefinitiveDiagnosis, generateFunctionalExploration, generateHabitsGineco, generatePathologicalAntecedents, generateReportConceptAptitude, generateReportDiagnosis, generateSystemReview } from "../../EMO/PageReport";
import { pageQuestionnaireRespiratorySymptomsFour, pageQuestionnaireRespiratorySymptomsOne, pageQuestionnaireRespiratorySymptomsThree, pageQuestionnaireRespiratorySymptomsTwo } from "../../EMO/QuestionnaireRespiratorySymptoms";
import { pageCompanyNotification, pageWorkerNotification } from "../../EMO/TrabajoAl";
import { getHeaderEc, getHeaderFR, getHeaderQS, getHeaderTA } from "../../EMO";

function getHeader(doc = new jsPDF(), lsDataReport) {
    var marXR = doc.internal.pageSize.width - 5;
    /* ENCABEZADO REPORTE */
    doc.addImage(LogoReport, "PNG", 5, 5, 60, 15);
    doc.setFontSize(10);

    doc.text("DIVISIÓN MÉDICA", 110, 10, { align: "center" });
    doc.text("HISTORIA CLÍNICA OCUPACIONAL", 110, 14, { align: "center" });
    doc.text(`${lsDataReport.nameAtencion}`, 110, 18, { align: "center" });

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
    doc.line(
        5,
        doc.internal.pageSize.height - 10,
        210,
        doc.internal.pageSize.height - 10
    );

    doc.text(
        `FECHA DE SISTEMA:  ${new Date().toLocaleString()}`,
        10,
        doc.internal.pageSize.height - 4
    );
    doc.text(
        `USUARIO ACTIVO:  ${lsDataUser.nombre}`,
        90,
        doc.internal.pageSize.height - 4
    );
    doc.text(
        `Pag. ${page} of ${pageSize}`,
        190,
        doc.internal.pageSize.height - 4
    );
}

export function generateConceptoExamenOcupacional(lsDataReport = [], lsDataUser = []) {
    var doc = new jsPDF("p", "mm", "letter");

    doc.setFont("helvetica", "bold");
    getHeader(doc, lsDataReport);
    generateReportConceptAptitude(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 1, 2);

    doc.addPage();

    doc.setFont("helvetica", "bold");
    getHeader(doc, lsDataReport);
    generateReportDiagnosis(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 2, 2);

    var dataPDF = doc.output("bloburl");
    return dataPDF;
}

export function generateHistoriaClinicaOcupacional(lsDataReport = [], lsDataUser = [], resultExpoDLTD, lsRiesgoHLD,
    lsRiesgoHLDO, lsWorkHistory, lsWorkHistoryOtherCompany) {

    var doc = new jsPDF("p", "mm", "letter");

    doc.setFont("helvetica", "bold");
    getHeader(doc, lsDataReport);
    generateClinicHistoryOtherCompany(doc, lsDataReport, lsRiesgoHLDO, lsWorkHistoryOtherCompany);
    getPiePage(doc, lsDataUser, 1, 7);

    doc.addPage();

    doc.setFont("helvetica", "bold");
    getHeader(doc, lsDataReport);
    generateClinicHistoryDLTD(doc, resultExpoDLTD, lsRiesgoHLD, lsWorkHistory);
    getPiePage(doc, lsDataUser, 2, 7);

    doc.addPage();

    doc.setFont("helvetica", "bold");
    getHeader(doc, lsDataReport);
    generatePathologicalAntecedents(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 3, 7);

    doc.addPage();

    doc.setFont("helvetica", "bold");
    getHeader(doc, lsDataReport);
    generateHabitsGineco(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 4, 7);

    doc.addPage();

    doc.setFont("helvetica", "bold");
    getHeader(doc, lsDataReport);
    generateSystemReview(doc, lsDataReport);
    getPiePage(doc, lsDataUser, 5, 7);

    doc.addPage();

    doc.setFont("helvetica", "bold");
    getHeader(doc, lsDataReport);
    generateFunctionalExploration(doc, lsDataReport);
    getPiePage(doc, lsDataUser, 6, 7);

    doc.addPage();

    doc.setFont("helvetica", "bold");
    getHeader(doc, lsDataReport);
    generateDefinitiveDiagnosis(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 7, 7);

    var dataPDF = doc.output("bloburl");
    return dataPDF;
}

export function generateTrabajoAltura(lsDataReport = [], lsDataUser = []) {

    var doc = new jsPDF("p", "mm", "letter");

    doc.setFont("helvetica", "bold");
    getHeaderTA(doc, lsDataReport);
    pageCompanyNotification(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 1, 2);

    doc.addPage();

    doc.setFont("helvetica", "bold");
    getHeaderTA(doc, lsDataReport);
    pageWorkerNotification(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 2, 2);

    var dataPDF = doc.output("bloburl");
    return dataPDF;
}

export function generateEspacioConfinado(lsDataReport = [], lsDataUser = []) {

    var doc = new jsPDF("p", "mm", "letter");

    doc.setFont("helvetica", "bold");
    getHeaderEc(doc, lsDataReport);
    pageCompanyNotificationEC(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 1, 2);

    doc.addPage();

    doc.setFont("helvetica", "bold");
    getHeaderEc(doc, lsDataReport);
    pageWorkerNotificationEC(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 2, 2);

    var dataPDF = doc.output("bloburl");
    return dataPDF;
}

export function generateCuestionarioSintomasRespiratorio(lsDataReport = [], lsDataUser = []) {

    var doc = new jsPDF("p", "mm", "letter");

    doc.setFont("helvetica", "bold");
    getHeaderQS(doc, lsDataReport);
    pageQuestionnaireRespiratorySymptomsOne(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 1, 4);

    doc.addPage();

    doc.setFont("helvetica", "bold");
    getHeaderQS(doc, lsDataReport);
    pageQuestionnaireRespiratorySymptomsTwo(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 2, 4);

    doc.addPage();

    doc.setFont("helvetica", "bold");
    getHeaderQS(doc, lsDataReport);
    pageQuestionnaireRespiratorySymptomsThree(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 3, 4);

    doc.addPage();

    doc.setFont("helvetica", "bold");
    getHeaderQS(doc, lsDataReport);
    pageQuestionnaireRespiratorySymptomsFour(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 4, 4);

    var dataPDF = doc.output("bloburl");
    return dataPDF;
}

export function generateFramingham(lsDataReport = [], lsDataUser = []) {
    var doc = new jsPDF("p", "mm", "letter");

    doc.setFont("helvetica", "bold");
    getHeaderFR(doc, lsDataReport);
    pageFramingham(doc, lsDataReport, lsDataUser);
    getPiePage(doc, lsDataUser, 1, 1);

    var dataPDF = doc.output("bloburl");
    return dataPDF;
}