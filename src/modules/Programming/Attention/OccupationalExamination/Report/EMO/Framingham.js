import jsPDF from "jspdf";
import LogoReport from "assets/img/LogoReport.png";
import { GetEdad, ViewFormat } from "components/helpers/Format";

/* FIRMAS */
function getFirma(doc=new jsPDF(), lsDataUser, my = 0) {
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
  doc.text(`${lsDataUser.nombre}`, 5, doc.internal.pageSize.height - (44 - my));
  doc.text("MEDICINA GENERAL", 5, doc.internal.pageSize.height - (40 - my));
  doc.text(
    `Lic: TP ${lsDataUser.licencia} - RM: ${lsDataUser.registroMedico}`,
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
  doc.text(
    `${lsDataReport.nameEmpleado}`,
    130,
    doc.internal.pageSize.height - (44 - my)
  );
  doc.text("FIRMA DEL EMPLEADO", 130, doc.internal.pageSize.height - (40 - my));
}

/* Pag. 1 */
export function pageFramingham(doc, lsDataReport = [], lsDataUser = []) {
  /* LISTA DE DATOS PACIENTE */
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);
  doc.text("FRAMINGHAM", 7, 30);
  doc.line(5, 32, 210, 32);

  doc.text(
    "DATOS DEL EMPLEADO",7,37);

  /* CUADRO DATOS */
  doc.line(5, 43, 210, 43);
  doc.line(5, 25, 5, 220);
  doc.line(43, 43, 43, 73); /* LINEA ONE */
  doc.line(115, 43, 115, 75); /* LINEA TWO */
  doc.line(210, 25, 210, 220);

  doc.line(43, 49, 210, 49);
  doc.line(43, 54, 210, 54);
  doc.line(43, 59, 210, 59);
  doc.line(43, 65, 210, 65);

  doc.line(5, 74, 210, 74);
  doc.line(5, 82, 210, 82);

  /* LINEA FINAL */
  doc.line(115, 75, 115, 181);    /* LINEA DEL SI/NO */
  
  doc.line(5, 87, 210, 87);
  doc.line(5, 92, 210, 92);
  doc.line(5, 97, 210, 97);
  
  doc.line(5, 102, 210, 102);
  doc.line(5, 107, 210, 107);
  doc.line(5, 112, 210, 112);
  doc.line(5, 117, 210, 117);
  doc.line(5, 122, 210, 122);
  doc.line(5, 127, 210, 127);
  doc.line(5, 132, 210, 132);
  doc.line(5, 137, 210, 137);
  doc.line(5, 142, 210, 142);
  doc.line(5, 147, 210, 147);
  doc.line(5, 152, 210, 152);
  doc.line(5, 157, 210, 157);
  doc.line(5, 162, 210, 162);
  doc.line(5, 167, 210, 167);
  doc.line(5, 172, 210, 172);
  doc.line(5, 177, 210, 177);
  doc.line(5, 182, 210, 182);
  
  doc.line(5, 191, 210, 191);
  doc.line(5, 196, 210, 196);



  doc.line(5, 220, 210, 220);




  /* TITULOS DE CONTENIDO */
  doc.text("SEDE:", 45, 48);
  doc.text("FECHA:", 117, 48);
  doc.text("DOCUMENTO:", 45, 53);
  doc.text("NOMBRES:", 117, 53);

  doc.text("EDAD:", 45, 58);
  doc.text("GENERO:", 70, 58);

  doc.text("ROSTER:", 117, 58);
  doc.text("PESO (Kl):", 45, 63);
  doc.text("TALLA:", 70, 63);
  doc.text("IMC:", 94, 63);
  doc.text("EPS:", 117, 63);
  doc.text("RIESGO CARDIOVASCULAR:", 45, 70); 
  doc.text("CLASIFICACIÓN:", 117, 70);
  doc.text("DATOS CARDIOVASCULARES", 6, 79);

   
  
  doc.text("1. Fuma.", 6, 86);
  doc.text("2. Tensión arterial.", 6, 91);
  doc.text("3. Fecha de laboratorio", 6, 96);
  doc.text("4. Colesterol total", 6, 101);

  doc.text("5. HDL.",6,106);
  doc.text("6. Triglicéridos.",6,111);
  doc.text("7. Glicemia.",6,116);
  doc.text("RESULTADOS ", 6, 121);

  doc.text("1. LDL.", 6, 126);
  doc.text("2. Relación.",6,131);
  doc.text("3. FR Edad.",6,136);
  doc.text("4. FR Colesterol.",6,141);
  doc.text("5. Fr HDL.",6,146);
  doc.text("6. Fr Glicemia.", 6, 151);
  doc.text("7. Fr Tensión Arterial.",6,156);
  doc.text("8. Fr Tabaquismo.", 6, 161);
  doc.text("9. Puntaje.",6,166);
  doc.text("10. Riegos Absoluto.",6,171);
  doc.text("11. Riesgo Relativo.",6,176);
  doc.text("12. Interpretación.",6,181);
  doc.text("13. Observación.",6,195);


  /* RENDERIZADO DE CONTENIDO */


  doc.setFont("helvetica", "normal");
  doc.addImage(`${lsDataReport.empleadoFoto}`, "JPEG", 7, 44, 34, 29);
  doc.text(`${lsDataReport.nameSede}`, 71, 48);
  doc.text(`${ViewFormat(lsDataReport.fecha)}`, 138, 48);
  doc.text(`${lsDataReport.documento}`, 71, 53);
  doc.text(`${lsDataReport.nameEmpleado}`, 138, 53);
  doc.text(`${lsDataReport.nameRiesgoCardiovascularNEMTA}`, 95, 70);
  doc.text(`${lsDataReport.nameClasificacionNEMTA}`, 148, 70);
  doc.text(`${lsDataReport.namePosicion}`, 138, 58);
  
  doc.text(`${GetEdad(lsDataReport.fechaNacimiento)}`, 57, 58);
  doc.text(`${lsDataReport.nameGenero}`, 88, 58);

  doc.text(`${lsDataReport.pesoEF}`, 64, 63);
  doc.text(`${lsDataReport.tallaEF}`, 84, 63);
  doc.text(`${lsDataReport.imcef}`, 103, 63);
  doc.text(`${lsDataReport.nameEps}`, 138, 63);


  
  /* RENDERIZADO DE CUESTIONARIO */

  doc.text(`${lsDataReport.nameFumaFRA}`, 116, 86);
  doc.text(`${lsDataReport.tencionFRA}`, 116, 91);
  doc.text(`${ViewFormat(lsDataReport.fechaLaboratorioFRA)}`, 116, 96);
  doc.text(`${lsDataReport.idEnfermedadNEMTA}`, 116, 101);
  doc.text(`${lsDataReport.colesterolTotalFRA}`, 116, 106);
  doc.text(`${lsDataReport.hdlfra}`, 116, 111);
  doc.text(`${lsDataReport.triglicericosFRA}`, 116, 116);
  doc.text(`${lsDataReport.glisemiaFRA}`, 116, 121);
//resultados
  doc.text(`${lsDataReport.ldlfra}`, 116, 126);
  doc.text(`${lsDataReport.relacionFRA}`, 116, 131);
  doc.text(`${lsDataReport.frlEdadFRA}`, 116, 136);
  doc.text(`${lsDataReport.frlColesterolFRA}`, 116, 141);
  doc.text(`${lsDataReport.frhdlfra}`, 116, 146);
  doc.text(`${lsDataReport.frGlisemiaFRA}`, 116, 151);
  doc.text(`${lsDataReport.frTencionFRA}`, 116, 156);
  doc.text(`${lsDataReport.frTabaquismoFRA}`, 116, 161);
  doc.text(`${lsDataReport.puntajeFRA}`, 116, 166);
  doc.text(`${lsDataReport.riesgoAbsolutoFRA}`, 116, 171);
  doc.text(`${lsDataReport.riesgoRelativoFRA}`, 116, 176);

  doc.text(`${lsDataReport.interpretacionFRA}`, 6, 188, {
    maxWidth: 190,
    lineHeightFactor: 1.0,
  });
  doc.text(`${lsDataReport.observacionFRA}`, 6, 200, {
    maxWidth: 190,
    lineHeightFactor: 1.0,
  });



  /* FIRMA */
  getFirma(doc, lsDataUser, 22);
  getFirmaEmployee(doc, lsDataReport, 22);
}