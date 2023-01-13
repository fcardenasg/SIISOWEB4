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
  doc.text(
    `${lsDataReport.nameEmpleado}`,
    130,
    doc.internal.pageSize.height - (44 - my)
  );
  doc.text("FIRMA DEL EMPLEADO", 130, doc.internal.pageSize.height - (40 - my));
}

/* Encabezado */
function getHeader(doc) {
  /* ENCABEZADO REPORTE */
  doc.addImage(LogoReport, "PNG", 5, 5, 60, 15);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("DIVISIÓN MÉDICA", 120, 10, null, null, "center");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(
    "CUESTIONARIO DE SÍNTOMAS RESPIRATORIOS",
    120,
    15,
    null,
    null,
    "center"
  );
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("SIG-0409", 200, 10, null, null, "center");
  doc.text("Versión 06", 200, 15, null, null, "center");

  /* LINEA DE DIVISIÓN */
  doc.setLineWidth(1);
  doc.setDrawColor(255, 0, 0);
  doc.line(5, 25, 210, 25);
}

/* Pie de Pag. */
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

/* Pag. 1 */
function pageQuestionnaireRespiratorySymptomsOne(doc, lsDataReport = [], lsDataUser = []) {


  /* LISTA DE DATOS PACIENTE */
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);
  doc.text(`${lsDataReport.nameAtencion}`, 7, 30);
  doc.line(5, 32, 210, 32);

  doc.text("DATOS DEL EMPLEADO", 7, 37);

  /* CUADRO DATOS */
  doc.line(5, 40, 210, 40);
  doc.line(5, 25, 5, 270);
  doc.line(40, 40, 40, 74); /* LINEA ONE */
  doc.line(115, 40, 115, 74); /* LINEA TWO */
  doc.line(210, 25, 210, 270);
  doc.line(5, 74, 210, 74);

   /* LINEA DEL SI/NO */
  doc.line(197, 75, 197, 242);

  /* CUESTIONARIO */
  doc.line(5, 80, 210, 80);
  doc.line(5, 86, 210, 86);
  doc.line(5, 92, 210, 92);
  doc.line(5, 97, 210, 97);
 
  doc.line(5, 107, 210, 107);
  doc.line(5, 112, 210, 112);
  doc.line(5, 117, 210, 117);
  
  doc.line(5, 122, 210, 122);

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
  doc.line(5, 187, 210, 187);

  doc.line(5, 192, 210, 192);
  doc.line(5, 197, 210, 197);
  doc.line(5, 202, 210, 202);
  doc.line(5, 207, 210, 207);
  doc.line(5, 212, 210, 212);
  doc.line(5, 217, 210, 217);
  doc.line(5, 222, 210, 222);
  doc.line(5, 227, 210, 227);
  doc.line(5, 232, 210, 232);
  doc.line(5, 237, 210, 237);
  doc.line(5, 242, 210, 242);
  doc.line(5, 265, 210, 265);


  /* TITULOS DE CONTENIDO */
  doc.text("CONSECUTIVO:", 45, 48);
  doc.text("FECHA:", 120, 48);
  doc.text("DOCUMENTO:", 45, 55);
  doc.text("NOMBRES:", 120, 55);
  doc.text("GENERO:", 45, 62);
  doc.text("AREA:", 120, 62);
  doc.text("EDAD:", 45, 69);
  doc.text("ANTIGUEDAD:", 120, 69);


   /* CUESTIONARIO */
  doc.text("RESULTADOS DEL CUESTIONARIO", 7, 78);
  doc.text("1. TOS", 7, 84);
  doc.text("A. Tiene tos usualmente (Incluye con el primer cigarrillo o la primera salida a la calle, excluye carraspeo)?", 7, 91);
  doc.text("B. Tose 4 a 6 veces al día, durante cuatro o más días de la semana?", 7, 96);

  doc.text("C. Suele toser levantándose por la mañana a primera hora, durante el resto del día o la noche? Si contesto SI a algunas de las preguntas anteriores, tenga en cuenta estas 2 siguientes, en caso contrario no aplica.", 7, 102,
  {
    maxWidth: 190,
    align: "justify",
    lineHeightFactor: 1.0,
  }
);
  doc.text("D. Usted suele toser así casi todos los días por 3 meses consecutivos o por más de un año?", 7, 111);
  doc.text("E. Ha presentado TOS por cuantos años?", 7, 116);
  doc.text("2. ESPUTO", 7, 121);
  doc.text("A. Suele expectorar desde el pecho (Incluye flema con el 1er cigarrillo, 1era salida a la calle y la que se traga, excluye moco o flema de la nariz)", 7, 126,
  {
    maxWidth: 190,
    align: "justify",
    lineHeightFactor: 1.0,
  }
);
  doc.text("B. Expectora así dos veces al día, al menos cuatro días a la semana?", 7, 136);
  doc.text("C. Suele expectorar al levantarse o a primera hora de la mañana, durante el resto del día o de la noche?", 7, 141);
  doc.text("D. Expectora así la mayoría de los días por 3 meses consecutivos o más o durante un año?", 7, 146);
  doc.text("E. Relacione número de años que ha expectorado? ", 7, 151);
  
  doc.text("3. EPISODIOS DE TOS Y ESPUTO", 7, 156);
  doc.text("A. Ha tenido episodios de tos y flema (o aumento, si usualmente los presenta) que duren 3 o más de un año?", 7, 161);
  doc.text("B. Cuantos años ha tenido al menos un episodio al año?", 7, 166);

  doc.text("4. SIBILANCIAS", 7, 171);
  doc.text("A. Su pecho pita, silba o suena", 7, 176);
  doc.text("1. Cuando tiene gripa", 7, 181);
  doc.text("2. Ocasionalmente aparte de las gripas", 7, 186);
  doc.text("3. La mayoría de días y noches", 7, 191);
  doc.text("B. Por cuantos años ha presentado esta situación? ", 7, 196);


  doc.text("5. ATAQUES DE SILBILDOS", 7, 201);
  doc.text("A. Alguna vez ha tenido un ataque de silbidos que le haya hecho sentir ahogo?", 7, 206);
  doc.text("B. Qué edad tenía cuando le dio el primer ataque?", 7, 211);
  doc.text("C. Ha tenido dos o más episodios", 7, 216);
  doc.text("D. Ha necesitado drogas o tratamientos para estos ataques? ", 7, 221);

  doc.text("6. OTRAS ENFERMEDADES INHABILITANTES", 7, 226);
  doc.text("A. Presenta inhabilidad por una condición diferente a enfermedad de pulmón o corazón?", 7, 231);
  doc.text("B. Usted suele toser así casi todos los días por 3 meses consecutivos o por más de un año?", 7, 236);
  doc.text("Describa la naturaleza de esta condición", 7, 241);



  /* RENDERIZADO DE CONTENIDO */
  doc.setFont("helvetica", "normal");
  doc.addImage(`${lsDataReport.empleadoFoto}`, "JPEG", 7.5, 42, 30, 30);
  doc.text(`${lsDataReport.id}`, 75, 48);
  doc.text(`${ViewFormat(lsDataReport.fecha)}`, 147, 48);
  doc.text(`${lsDataReport.documento}`, 75, 55);
  doc.text(`${lsDataReport.nameEmpleado}`, 147, 55);
  doc.text(`${lsDataReport.nameGenero}`, 75, 62);
  doc.text(`${lsDataReport.nameArea}`, 147, 62);
  doc.text(`${GetEdad(lsDataReport.fechaNacimiento)}`, 75, 69);
  doc.text(`${GetEdad(lsDataReport.fechaContratoEmpleado)}`, 147, 69);

    /* RENDERIZADO DETALLE  */

    doc.text(`${lsDataReport.tosAUsualSin}`, 202, 91);
    doc.text(`${lsDataReport.tosEnLaSemanaSintR}`, 202, 96);
    doc.text(`${lsDataReport.tosMananaSintR}`, 202, 102);
    doc.text(`${lsDataReport.tosConsecutivaSintR}`, 202, 111);
    doc.text(`${lsDataReport.anosConTosSintR}`, 202, 116);

    doc.text(`${lsDataReport.esputoASintR}`, 202, 126);
    doc.text(`${lsDataReport.esputoBSintR}`, 202, 136);
    doc.text(`${lsDataReport.esputoCSintR}`, 202, 141);
    doc.text(`${lsDataReport.esputoDSintR}`, 202, 146);
    doc.text(`${lsDataReport.esputoESintR}`, 202, 151);

    doc.text(`${lsDataReport.episoTosEspuASintR}`, 202, 161);
    doc.text(`${lsDataReport.episoTosEsputoBSintR}`, 202, 166);

//SILVILANCIA

doc.text(`${lsDataReport.sibilanciasASintR}`, 202, 176);
doc.text(`${lsDataReport.sibilanciasA1SintR}`, 202, 181);
doc.text(`${lsDataReport.sibilanciasA2SintR}`, 202, 186);
doc.text(`${lsDataReport.sibilanciasA3SintR}`, 202, 191);
doc.text(`${lsDataReport.sibilanciasBSintR}`, 202, 196);



    //ATAQUE SILVIDO//
    doc.text(`${lsDataReport.ataquesSilbiASintR}`, 202, 206);
    doc.text(`${lsDataReport.ataquesSilbiBSintR}`, 202, 211);
    doc.text(`${lsDataReport.ataquesSilbiCSintR}`, 202, 216);
    doc.text(`${lsDataReport.ataquesSilbiDSintR}`, 202, 221);


    //oTRAS//
    doc.text(`${lsDataReport.otrasEnfInhaASintR}`, 202, 231);
    doc.text(`${lsDataReport.otrasEnfInhaBSintR}`, 202, 236);
    doc.text(`${lsDataReport.otrasEnfInhaDescriSintR}`, 7, 246,
    {
      maxWidth: 190,
      align: "justify",
      lineHeightFactor: 1.0,
    }
    );


}
/* Pag. 2 */
function pageQuestionnaireRespiratorySymptomsTwo(doc, lsDataReport = [], lsDataUser = []) {
 
 /* LISTA DE DATOS PACIENTE */
 doc.setFontSize(10);
 doc.setLineWidth(0.2);
 doc.setDrawColor(128, 128, 128);
 doc.text(`${lsDataReport.nameAtencion}`, 7, 30);
 doc.line(5, 32, 210, 32);

 doc.text("DATOS DEL EMPLEADO", 7, 37);

 /* CUADRO DATOS */
 doc.line(5, 40, 210, 40);
 doc.line(5, 25, 5, 270);
 doc.line(40, 40, 40, 74); /* LINEA ONE */
 doc.line(115, 40, 115, 74); /* LINEA TWO */
 doc.line(210, 25, 210, 270);
 doc.line(5, 74, 210, 74);

  /* LINEA DEL SI/NO */
 doc.line(197, 75, 197, 241);

 /* CUESTIONARIO */
 doc.line(5, 80, 210, 80);
 doc.line(5, 86, 210, 86);
 doc.line(5, 92, 210, 92);
 doc.line(5, 97, 210, 97);

 doc.line(5, 102, 210, 102);
 doc.line(5, 107, 210, 107);
 doc.line(5, 112, 210, 112);
 doc.line(5, 117, 210, 117);
 doc.line(5, 122, 210, 122);
 doc.line(5, 127, 210, 127);

 doc.line(5, 132, 210, 132);

 doc.line(5, 142, 210, 142);
 doc.line(5, 147, 210, 147);
 doc.line(5, 152, 210, 152);
 doc.line(5, 157, 210, 157);
 doc.line(5, 162, 210, 162);
 doc.line(5, 167, 210, 167);
 doc.line(5, 172, 210, 172);
 doc.line(5, 177, 210, 177);
 doc.line(5, 182, 210, 182);
 doc.line(5, 187, 210, 187);

 doc.line(5, 192, 210, 192);
 doc.line(5, 197, 210, 197);
 doc.line(5, 202, 210, 202);
 doc.line(5, 207, 210, 207);
 doc.line(5, 212, 210, 212);
 doc.line(5, 217, 210, 217);
 doc.line(5, 222, 210, 222);
 doc.line(5, 227, 210, 227);
 doc.line(5, 232, 210, 232);
 doc.line(5, 237, 210, 237);
 doc.line(5, 242, 210, 242);
 doc.line(5, 248, 210, 248);
 doc.line(5, 265, 210, 265);



 /* TITULOS DE CONTENIDO */
 doc.text("CONSECUTIVO:", 45, 48);
 doc.text("FECHA:", 120, 48);
 doc.text("DOCUMENTO:", 45, 55);
 doc.text("NOMBRES:", 120, 55);
 doc.text("GENERO:", 45, 62);
 doc.text("AREA:", 120, 62);
 doc.text("EDAD:", 45, 69);
 doc.text("ANTIGUEDAD:", 120, 69);


  /* CUESTIONARIO */
 doc.text("RESULTADOS DEL CUESTIONARIO", 7, 78);
 doc.text("7. DISNEA (Dificultad para respirar)", 7, 84);
 doc.text("A. Se ahoga al subir de un nivel a otro al caminar por una cuesta suave?", 7, 90);
 doc.text("B. Por causa del ahogo tiene que caminar más despacio que la gente de su edad, en una cuesta suave?", 7, 96);
 doc.text("C. Tiene que parar a respirar luego de caminar 100 yardas (o luego de algunos minutos) por una cuesta suave?", 7, 101);
 doc.text("D. Tiene que detenerse a respirar cuando camina a su paso por una cuesta suave?", 7, 106);
 doc.text("E. El ahogo le dificulta dejar su casa, vestirse o desvestirte?", 7, 111);

 doc.text("8. GRIPAS Y ENFERMEDADES DEL TORAX", 7, 116);
 doc.text("A. Si se resfría se le afecta el pecho? ", 7, 121);
 doc.text("B. En los últimos 3 años ha presentado enfermedad que lo aleje de su trabajo, lo mantenga en casa o en cama?", 7, 126);
 doc.text("C. Expectoró con alguna de estas enfermedades?", 7, 131);
 doc.text("D. En los últimos años cuantas de estas enfermedades con esputo le han durado una semana o más? ¿Número de Enfermedades?", 7, 136,
 {
  maxWidth: 190,
  align: "justify",
  lineHeightFactor: 1.0,
}
);

 doc.text("9. ANTECEDENTES", 7, 146);
 doc.text("A. Tuvo alguna enfermedad pulmonar antes de los 16 años?", 7, 151);
 doc.text("B. ha tenido alguna de las siguientes enfermedades (confirmadas por el medico)?", 7, 156);
 doc.text("1. Ataques de bronquitis?", 7, 161);
 doc.text("A qué edad presentó el primer ataque? ", 7, 166);
 doc.text("2. Neumonía o bronconeumonía?", 7, 171);
 doc.text("A qué edad presentó el primer ataque? ", 7, 176);

 doc.text("3. Bronquitis Crónica? ", 7, 181);
 doc.text("A qué edad presentó el primer ataque? ", 7, 186);
 doc.text("B Aun Presenta esta enfermedad?", 7, 191);
 doc.text("C Edad de Inicio?", 7, 196);
 doc.text("4. Enfisema Pulmonar?", 7, 201);
 doc.text("A qué edad presentó el primer ataque? ", 7, 206);
 doc.text("B Aun Presenta esta enfermedad?", 7, 211);
 doc.text("C Edad de Inicio? ", 7, 216);
 doc.text("5. Asma", 7, 221);
 doc.text("A qué edad presentó el primer ataque? ", 7, 226);
 doc.text("B Aun Presenta esta enfermedad? ", 7, 231);
 doc.text("C Edad de Inicio?  ", 7, 236);
 doc.text("6. Otras enfermedades del tórax?", 7, 241);
 doc.text("Especifique", 7, 246);


 /* RENDERIZADO DE CONTENIDO */
 doc.setFont("helvetica", "normal");
 doc.addImage(`${lsDataReport.empleadoFoto}`, "JPEG", 7.5, 42, 30, 30);
 doc.text(`${lsDataReport.id}`, 75, 48);
 doc.text(`${ViewFormat(lsDataReport.fecha)}`, 147, 48);
 doc.text(`${lsDataReport.documento}`, 75, 55);
 doc.text(`${lsDataReport.nameEmpleado}`, 147, 55);
 doc.text(`${lsDataReport.nameGenero}`, 75, 62);
 doc.text(`${lsDataReport.nameArea}`, 147, 62);
 doc.text(`${GetEdad(lsDataReport.fechaNacimiento)}`, 75, 69);
 doc.text(`${GetEdad(lsDataReport.fechaContratoEmpleado)}`, 147, 69);

 /* RENDERIZADO DETALLE  DISNEA*/

 doc.text(`${lsDataReport.disneaASintR}`, 202, 90);
 doc.text(`${lsDataReport.disneaBSintR}`, 202, 96);
 doc.text(`${lsDataReport.disneaCSintR}`, 202, 101);
 doc.text(`${lsDataReport.disneaDSintR}`, 202, 106);
 doc.text(`${lsDataReport.disneaESintR}`, 202, 111);


 //GRIPA Y TORAX
 doc.text(`${lsDataReport.enferToraxASintR}`, 202, 121);
 doc.text(`${lsDataReport.enferToraxBSintR}`, 202, 126);
 doc.text(`${lsDataReport.enferToraxCSintR}`, 202, 131);
 doc.text(`${lsDataReport.enferToraxD}`, 202, 136);

//ANTECEDENTES
 doc.text(`${lsDataReport.antecedentesASintR}`, 202, 151);
 doc.text(`${lsDataReport.antecedentesB1SintR}`, 202, 156);
 doc.text(`${lsDataReport.antecedentesB1ASintR}`, 202, 166);
doc.text(`${lsDataReport.antecedentesB2Sintr}`, 202, 171);
doc.text(`${lsDataReport.antecedentesB2ASintR}`, 202, 176);
doc.text(`${lsDataReport.antecedentesB3SintR}`, 202, 181);
doc.text(`${lsDataReport.antecedentesB3ASintR}`, 202, 186);


doc.text(`${lsDataReport.antecedentesB3BSintR}`, 202, 191);
 doc.text(`${lsDataReport.antecedentesB3CSintR}`, 202, 196);
 doc.text(`${lsDataReport.antecdentesB4SintR}`, 202, 201);
 doc.text(`${lsDataReport.antecedenteB4ASintR}`, 202, 206);
 doc.text(`${lsDataReport.antecedentesB4BSintR}`, 202, 211);
 doc.text(`${lsDataReport.antecedentesB4CSintR}`, 202, 216);

 doc.text(`${lsDataReport.antecedentesB5SintR}`, 202, 221);
 doc.text(`${lsDataReport.antecedentesB5ASintR}`, 202, 226);
 doc.text(`${lsDataReport.antecedentesB5BSintR}`, 202, 231);
 doc.text(`${lsDataReport.antecedentesB5CSintR}`, 202, 236);
 doc.text(`${lsDataReport.otrasEnfToraxA}`, 202, 241);
 doc.text(`${lsDataReport.otrasEnfToraxB}`, 7, 252,
 {
  maxWidth: 190,
  align: "justify",
  lineHeightFactor: 1.0,
}
);
 
 

}
/* Pag. 3 */
function pageQuestionnaireRespiratorySymptomsThree(doc, lsDataReport = [], lsDataUser = []) {
 
   /* LISTA DE DATOS PACIENTE */
   doc.setFontSize(10);
   doc.setLineWidth(0.2);
   doc.setDrawColor(128, 128, 128);
   doc.text(`${lsDataReport.nameAtencion}`, 7, 30);
   doc.line(5, 32, 210, 32);
 
   doc.text("DATOS DEL EMPLEADO", 7, 37);
 
   /* CUADRO DATOS */
   doc.line(5, 40, 210, 40);
   doc.line(5, 25, 5, 247);
   doc.line(40, 40, 40, 74); /* LINEA ONE */
   doc.line(115, 40, 115, 74); /* LINEA TWO */
   doc.line(210, 25, 210, 247);
   doc.line(5, 74, 210, 74);
 
    /* LINEA DEL SI/NO */
   doc.line(197, 75, 197, 247);
 
   /* CUESTIONARIO */
   doc.line(5, 80, 210, 80);
   doc.line(5, 86, 210, 86);
   doc.line(5, 92, 210, 92);

  
   doc.line(5, 107, 210, 107);
   doc.line(5, 112, 210, 112);
   doc.line(5, 117, 210, 117);

   doc.line(5, 132, 210, 132);
   doc.line(5, 137, 210, 137);
   doc.line(5, 142, 210, 142);
 
   doc.line(5, 152, 210, 152);
   doc.line(5, 157, 210, 157);
   doc.line(5, 162, 210, 162);
   doc.line(5, 167, 210, 167);
   doc.line(5, 172, 210, 172);
   doc.line(5, 177, 210, 177);
   doc.line(5, 182, 210, 182);
   doc.line(5, 187, 210, 187);
 
   doc.line(5, 192, 210, 192);
   doc.line(5, 197, 210, 197);
   doc.line(5, 202, 210, 202);
   doc.line(5, 207, 210, 207);
   doc.line(5, 212, 210, 212);
   doc.line(5, 217, 210, 217);
   doc.line(5, 222, 210, 222);
   doc.line(5, 227, 210, 227);
   doc.line(5, 232, 210, 232);
   doc.line(5, 237, 210, 237);
   doc.line(5, 242, 210, 242);
   doc.line(5, 247, 210, 247);

 
 
 
   /* TITULOS DE CONTENIDO */
   doc.text("CONSECUTIVO:", 45, 48);
   doc.text("FECHA:", 120, 48);
   doc.text("DOCUMENTO:", 45, 55);
   doc.text("NOMBRES:", 120, 55);
   doc.text("GENERO:", 45, 62);
   doc.text("AREA:", 120, 62);
   doc.text("EDAD:", 45, 69);
   doc.text("ANTIGUEDAD:", 120, 69);
 
 
    /* CUESTIONARIO */
   doc.text("RESULTADOS DEL CUESTIONARIO", 7, 78);
   doc.text("7. Alguna Cirugía del tórax?", 7, 84);
   doc.text("Especifique", 7, 90);
   doc.text("8. Trauma (algún accidente) del tórax?", 7, 111);
   doc.text("Especifique", 7, 116);
   doc.text("9. Problemas del corazón?", 7, 136);
   doc.text("Especifique", 7, 141);
   doc.text("A. Ha recibido tratamiento por esta causa en los últimos diez años?", 7, 156);
   doc.text("10. Presión Alta (Recuerde que debe ser confirmada por el médico)", 7, 161);
   doc.text("A. Ha recibido tratamiento por esta causa en los últimos diez años?", 7, 166);

   doc.text("10. HISTORIA OCUPACIONAL", 7, 171);
   doc.text("A. Ha trabajado tiempo completo (8 horas a la semana o más) por 6 meses o más?", 7, 176);
   doc.text("B. Ha trabajado al menos durante 6 meses en un empleo donde tuvo exposición a polvos?", 7, 181);
   doc.text("C. Especifique empleo o Industria", 7, 186);
   doc.text("D. Total años trabajados?", 7, 191);
   doc.text("E. La exposición fue?", 7, 196);
   doc.text("F. Cuál ha sido su ocupación o trabajo usual en el que ha laborado por más tiempo ", 7, 201);
   doc.text("G. Empleo y Ocupación?", 7, 206);
   doc.text("H. Negocio, campo o industria?", 7, 211);

   doc.text("11. TABAQUISMO ", 7, 216);
   doc.text("A. Ha fumado cigarrillos, pipa o tabaco (al menos uno(a) al día por un año o 12 onzas de tabaco durante la vida)?", 7, 221);

   doc.text("B. Fuma ahora (incluye un mes atrás)?", 7, 226);
   doc.text("C. A qué edad comenzó a fumar en forma regular? ", 7, 231);
   doc.text("D. Si ya dejo de fumar totalmente a qué edad lo dejó? ", 7, 236);
   doc.text("E. Cuantos cigarrillos fuma al día o fumaba? ", 7, 241);
 
 
   /* RENDERIZADO DE CONTENIDO */
   doc.setFont("helvetica", "normal");
   doc.addImage(`${lsDataReport.empleadoFoto}`, "JPEG", 7.5, 42, 30, 30);
   doc.text(`${lsDataReport.id}`, 75, 48);
   doc.text(`${ViewFormat(lsDataReport.fecha)}`, 147, 48);
   doc.text(`${lsDataReport.documento}`, 75, 55);
   doc.text(`${lsDataReport.nameEmpleado}`, 147, 55);
   doc.text(`${lsDataReport.nameGenero}`, 75, 62);
   doc.text(`${lsDataReport.nameArea}`, 147, 62);
   doc.text(`${GetEdad(lsDataReport.fechaNacimiento)}`, 75, 69);
   doc.text(`${GetEdad(lsDataReport.fechaContratoEmpleado)}`, 147, 69);
 
   //RENDER DETALLE

   doc.text(`${lsDataReport.ciruToraxASintR}`, 202, 84);
   doc.text(`${lsDataReport.ciruToraxBSintR}`, 7, 96,
   {
    maxWidth: 190,
    align: "justify",
    lineHeightFactor: 1.0,
  }
  );

  doc.text(`${lsDataReport.traumaToraxASintR}`, 202, 111);
  doc.text(`${lsDataReport.traumaToraxBSintR}`, 7, 122,
  {
   maxWidth: 190,
   align: "justify",
   lineHeightFactor: 1.0,
 }
 );

 doc.text(`${lsDataReport.problemCoraASintR}`, 202, 136);
 doc.text(`${lsDataReport.problemCoraBSintR}`, 7, 146,
 {
  maxWidth: 190,
  align: "justify",
  lineHeightFactor: 1.0,
}
);
doc.text(`${lsDataReport.problemaCoraCSintR}`, 202, 156);

doc.text(`${lsDataReport.presionAltaASintR}`, 202, 161);
doc.text(`${lsDataReport.presionAltaBSintR}`, 202, 166);

//HISTORIA//
doc.text(`${lsDataReport.historiaOcupASintR}`, 202, 176);
doc.text(`${lsDataReport.historiaOcupBSintR}`, 202, 181);
doc.text(`${lsDataReport.historiaOcupB1SintR}`, 198, 186);
doc.text(`${lsDataReport.historiaOcupB2SintR}`, 202, 191);
doc.text(`${lsDataReport.nameHistoriaOcupB3SintR}`, 198, 196);
doc.text(`${lsDataReport.historiaOcupCSintR}`, 202, 201);
doc.text(`${lsDataReport.historiaOcupC1SintR}`, 202, 206);
doc.text(`${lsDataReport.historiaOcupC2SintR}`, 202, 211);



doc.text(`${lsDataReport.tabaquismoASintR}`, 202, 221);
doc.text(`${lsDataReport.tabaquismoBSintR}`, 202, 226);
doc.text(`${lsDataReport.tabaquismoCSintR}`, 202, 231);
doc.text(`${lsDataReport.tabaquismoDSintR}`, 202, 236);
doc.text(`${lsDataReport.tabaquismoESintR}`, 202, 241);



}

/* Pag. 4 */
function pageQuestionnaireRespiratorySymptomsFour(doc, lsDataReport = [], lsDataUser = []) {
  /* LISTA DE DATOS PACIENTE */
  doc.setFontSize(10);
  doc.setLineWidth(0.2);
  doc.setDrawColor(128, 128, 128);
  doc.text(`${lsDataReport.nameAtencion}`, 7, 30);
  doc.line(5, 32, 210, 32);

  doc.text("DATOS DEL EMPLEADO", 7, 37);

  /* CUADRO DATOS */
  doc.line(5, 40, 210, 40);
  doc.line(5, 25, 5, 192);
  doc.line(40, 40, 40, 74); /* LINEA ONE */
  doc.line(115, 40, 115, 74); /* LINEA TWO */
  doc.line(210, 25, 210, 192);
  doc.line(5, 74, 210, 74);

   /* LINEA DEL SI/NO */
  doc.line(197, 75, 197, 120);

  /* CUESTIONARIO */
  doc.line(5, 80, 210, 80);
  doc.line(5, 86, 210, 86);
  doc.line(5, 92, 210, 92);
  doc.line(5, 97, 210, 97);
 
  doc.line(5, 103, 210, 103);

  doc.line(5, 108, 210, 108);
  doc.line(5, 114, 210, 114);
  doc.line(5, 120, 210, 120);
  doc.line(5, 192, 210, 192);




  /* TITULOS DE CONTENIDO */
  doc.text("CONSECUTIVO:", 45, 48);
  doc.text("FECHA:", 120, 48);
  doc.text("DOCUMENTO:", 45, 55);
  doc.text("NOMBRES:", 120, 55);
  doc.text("GENERO:", 45, 62);
  doc.text("AREA:", 120, 62);
  doc.text("EDAD:", 45, 69);
  doc.text("ANTIGUEDAD:", 120, 69);


   /* CUESTIONARIO */
  doc.text("RESULTADOS DEL CUESTIONARIO", 7, 78);
  doc.text("12. ACTIVIDAD DEPORTIVA", 7, 84);
  doc.text("A. Realiza algún deporte?", 7, 90);
  doc.text("B. Cual deporte o actividad?", 7, 96);
  doc.text("C. Días a la semana que lo practica? ", 7, 101);
  doc.text("D. Horas al día que le dedica? ", 7, 107);
  doc.text("E. Promedio de horas a la semana? ", 7, 113);
  doc.text("12. RECOMENDACIONES", 7, 118);



  /* RENDERIZADO DE CONTENIDO */
  doc.setFont("helvetica", "normal");
  doc.addImage(`${lsDataReport.empleadoFoto}`, "JPEG", 7.5, 42, 30, 30);
  doc.text(`${lsDataReport.id}`, 75, 48);
  doc.text(`${ViewFormat(lsDataReport.fecha)}`, 147, 48);
  doc.text(`${lsDataReport.documento}`, 75, 55);
  doc.text(`${lsDataReport.nameEmpleado}`, 147, 55);
  doc.text(`${lsDataReport.nameGenero}`, 75, 62);
  doc.text(`${lsDataReport.nameArea}`, 147, 62);
  doc.text(`${GetEdad(lsDataReport.fechaNacimiento)}`, 75, 69);
  doc.text(`${GetEdad(lsDataReport.fechaContratoEmpleado)}`, 147, 69);

//RENDER DETALLE

doc.text(`${lsDataReport.actDeportASintR}`, 202, 90);
doc.text(`${lsDataReport.actDeporA1SintR}`, 198, 96);
doc.text(`${lsDataReport.actDeporA2SintR}`, 202, 101);
doc.text(`${lsDataReport.actDeporA3SintR}`, 202, 107);
doc.text(`${lsDataReport.actDeporA4SintR}`, 202, 113);


doc.text(`${lsDataReport.recoSintR}`, 7, 125,
{
 maxWidth: 190,
 align: "justify",
 lineHeightFactor: 1.0,
}
);




  /* FIRMA */
  getFirma(doc, lsDataUser, 2);
  getFirmaEmployee(doc, lsDataReport, 2);
}

/* Renderizado Principal INDEX  */
export function generateReportQuestionnaireRespiratorySymptoms(lsDataReport = [], lsDataUser = []) {
  var doc = new jsPDF("p", "mm", "letter");
  /* Pag. 1 */
  getHeader(doc);
  pageQuestionnaireRespiratorySymptomsOne(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 1, 4);

  doc.addPage();

  getHeader(doc);
  pageQuestionnaireRespiratorySymptomsTwo(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 2, 4);

  doc.addPage();

  getHeader(doc);
  pageQuestionnaireRespiratorySymptomsThree(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 3, 4);

  doc.addPage();

  getHeader(doc);
  pageQuestionnaireRespiratorySymptomsFour(doc, lsDataReport, lsDataUser);
  getPiePage(doc, lsDataUser, 4, 4);



  var dataPDF = doc.output("bloburl");
  return dataPDF;
}

