import jsPDF from 'jspdf';
import { ViewFormat } from 'components/helpers/Format';

function getFirma(doc = new jsPDF(), lsDataUser, my = 0) {
    doc.addImage(
        `${lsDataUser.firma}`,
        "PNG",
        5,
        doc.internal.pageSize.height - (70 - my),
        50,
        20
    );
    doc.setLineWidth(0.5);
    doc.setDrawColor(128, 128, 128);
    doc.line(
        5,
        doc.internal.pageSize.height - (48 - my),
        60,
        doc.internal.pageSize.height - (48 - my)
    );
    doc.setFontSize(8);
    doc.text("Firma funcionario(a) autorizado(a)", 5, doc.internal.pageSize.height - (44 - my));
    doc.text("Dpto. de Salud Ocupacional", 5, doc.internal.pageSize.height - (40 - my));
    doc.text(
        `${lsDataUser.licencia} - ${lsDataUser.registroMedico}`,
        5,
        doc.internal.pageSize.height - (36 - my)
    );
}

function getFirmaEmployee(doc, lsDataReport, my = 0) {

    doc.setLineWidth(0.5);
    doc.setDrawColor(128, 128, 128);
    doc.line(
        130,
        doc.internal.pageSize.height - (48 - my),
        195,
        doc.internal.pageSize.height - (48 - my)
    );
    doc.setFontSize(8);
    doc.text("FIRMA DEL EMPLEADO", 130, doc.internal.pageSize.height - (40 - my));
    doc.text(
        `${lsDataReport.nameEmpleado}`,
        130,
        doc.internal.pageSize.height - (44 - my)
    );
    doc.text(`Celular:      ${lsDataReport.numeroCelular}`, 130, doc.internal.pageSize.height - (36 - my));
}

const concentimientoParrafo1 = "Como aparece al pie de mi firma y en mi calidad de empleado de la empresa DRUMMOND LTD COLOMBIA, declaro haber sido informado sobre las valoraciones médicas complementarias realizadas en desarrollo de los programas de vigilancia epidemiológica ocupacional implementados por la empresa. Autorizo al Dpto. de Salud Ocupacional de DLTD a realizar los exámenes médicos y pruebas complementarias sugeridas. Certifico que he sido informado (a) acerca de la naturaleza y propósito de estos exámenes. Entiendo que la realización de estos exámenes es voluntaria y que tengo la oportunidad de retirar mi consentimiento en cualquier momento. Se me informó además que estos son manejados con confidencialidad y reserva profesional, no pueden comunicarse o darse a conocer, salvo a las personas o entidades previstas por la Ley y en la Legislación vigente."
const concentimientoParrafo2 = "Considerando lo anterior y atendiendo los requisitos legales respecto a la práctica de exámenes ocupacionales, acepto que me realicen las pruebas complementarias, que determine la empresa dentro del desarrollo de programas de control de riesgos y sistemas de vigilancia epidemiológica para establecer mi estado de salud, durante mi vinculación con la Compañía. En señal de aceptación firmo este consentimiento."

export function generateReportConcentimiento(doc, lsDataReport = [], lsDataUser = []) {

    doc.text("Consentimiento Informado", 5, 35);

    doc.setFontSize(12);
    doc.text(`Nro. Orden:       ${lsDataReport.id}`, 5, 48);
    doc.setFontSize(10);
    doc.text(`YO ${lsDataReport.nameEmpleado}     IDENTIFICADO CON CC NRO. ${lsDataReport.documento}`, 5, 60);


    doc.setFont("helvetica", "normal");
    doc.text(`${concentimientoParrafo1}`, 7, 80, { maxWidth: 190, align: 'justify', lineHeightFactor: 1.5 });
    doc.text(`${concentimientoParrafo2}`, 7, 130, { maxWidth: 190, align: 'justify', lineHeightFactor: 1.5 });

    getFirma(doc, lsDataUser);
    getFirmaEmployee(doc, lsDataReport);
}

export function generateReportCitacion(doc, lsDataReport = [], lsDataUser = []) {

    var cantidadParaclinico = lsDataReport.lsParaclinicos.length * 6;

    doc.text(`CITACIÓN A EXAMEN FÍSICO PARA:            ${lsDataReport.nameTipoExamen}`, 5, 35);
    doc.setFontSize(10);
    doc.setLineWidth(0.2);
    doc.setDrawColor(128, 128, 128);

    /* TITULOS DE CONTENIDO */
    doc.text('Nro Orden:', 5, 48);
    doc.text('Estimado Empleado(a):', 5, 55);
    doc.text('Fecha Expedición:', 120, 48);
    doc.text('CC No.', 120, 55);

    doc.text('Cargo:', 5, 70);
    doc.text('Departamento:', 5, 77);
    doc.text('Grupo:', 5, 84);

    doc.text('Area:', 120, 77);
    doc.text('Sede:', 120, 84);
    doc.setFontSize(12);
    doc.text(`${ViewFormat(lsDataReport.fecha)}`, 100, 120, null, null, "center");

    /* RENDERIZADO DE CONTENIDO */
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`${lsDataReport.id}`, 50, 48);
    doc.text(`${lsDataReport.nameEmpleado}`, 50, 55);
    doc.text(`${ViewFormat(lsDataReport.fecha)}`, 160, 48);
    doc.text(`${lsDataReport.documento}`, 160, 55);

    doc.text(`${lsDataReport.nameCargo}`, 50, 70);
    doc.text(`${lsDataReport.nameDepartamento}`, 50, 77);
    doc.text(`${lsDataReport.nameGrupo}`, 50, 84);
    doc.text(`${lsDataReport.nameArea}`, 160, 77);
    doc.text(`${lsDataReport.nameSede}`, 160, 84);

    doc.text(`Con el propósito de dar cumplimiento al programa de vigilancia epidemiológica de evaluaciones médicas ocupacionales programadas y con ello a la resolución 2346 de 2007, tal como lo establece la legislación Colombiana vigente, me permito informarle que el Departamento Médico de la Compañía ha programado su examen médico en la Unidad de Salud de ${lsDataReport.nameSede}, en la siguiente fecha:`, 5, 100, { maxWidth: 190, align: 'justify', lineHeightFactor: 1.5 });
    doc.text('Adjunto además órdenes de Paraclínicos, cuyos resultados debe traer el día del examen.', 5, 128);
    doc.text(lsDataReport.lsParaclinicos.map((paracli, index) => { return String(`- ${paracli}`); }), 5, 135, { maxWidth: 200, lineHeightFactor: 2 });
    doc.text("Agradecemos coordinar lo necesario para que los exámenes asignados sean realizados en las fechas programados y no sobrepasen el tiempo acordado con los proveedores.", 5, (145 + cantidadParaclinico), { maxWidth: 190, align: 'justify', lineHeightFactor: 1.5 });


    getFirma(doc, lsDataUser, 20);
    getFirmaEmployee(doc, lsDataReport, 20);
}

export function generateReportParaclinico(doc, lsDataReport = [], lsDataUser = [], lsDataReportParaclinico = []) {
    var restaPosicion = lsDataReportParaclinico.idParaclinico === 3533 ? 0 : 20;

    doc.text(`Nro Orden:        ${lsDataReport.id}`, 5, 35);
    doc.text(`Fecha Expedición:         ${ViewFormat(lsDataReport.fecha)}`, 120, 35);
    doc.setFontSize(10);
    doc.setLineWidth(0.2);
    doc.setDrawColor(128, 128, 128);

    /* TITULOS DE CONTENIDO */
    doc.text('CITACION A EXAMEN DE:', 5, 48);
    if (lsDataReportParaclinico.idParaclinico === 3533)
        doc.text('Tipo de Examen:', 5, 60);

    doc.text('Estimado Proveedor:', 5, 80 - restaPosicion);

    doc.text('Dirección:', 5, 95 - restaPosicion);
    doc.text('Telefono:', 5, 102 - restaPosicion);
    doc.text('Ciudad:', 5, 109 - restaPosicion);

    doc.text(`${lsDataReportParaclinico.nameProveedor}`, 5, 87 - restaPosicion);
    doc.text(`${lsDataReport.nameEmpleado}`, 5, 134 - restaPosicion);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`${lsDataReportParaclinico.nameParaclinico}`, 120, 48);
    if (lsDataReportParaclinico.idParaclinico === 3533)
        doc.text(`${lsDataReportParaclinico.nameExamenLaboratorio}`, 5, 67, { maxWidth: 190, align: 'justify', lineHeightFactor: 1.5 });


    doc.text(`${lsDataReportParaclinico.direccionProveedor}`, 40, 95 - restaPosicion);
    doc.text(`${lsDataReportParaclinico.celularProveedor}`, 40, 102 - restaPosicion);
    doc.text(`${lsDataReportParaclinico.ciudadProveedor}`, 40, 109 - restaPosicion);


    doc.text("Sirvase realizar por nuestra cuenta a el(la) Empleado(a) en mención, el(los) examen(es) señalado(s).", 5, 120 - restaPosicion);

    doc.text(`Identificado con CC No: ${lsDataReport.documento}`, 5, 140 - restaPosicion);
    doc.text(`Celular: ${lsDataReport.numeroCelular}`, 5, 146 - restaPosicion);

    getFirma(doc, lsDataUser);
    getFirmaEmployee(doc, lsDataReport);
}