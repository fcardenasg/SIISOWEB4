import axios from "axios";
import { Url } from "api/instances/AuthRoute";
import toast from "react-hot-toast";


export const promptDatosGenerales = `
Analiza las siguientes información y devuelve exclusivamente un objeto JSON válido con la información extraída.
Los datos aparecen en formato de tabla pero extraídos como texto plano, por lo tanto los encabezados y los valores estarán juntos o en secuencia.
Usa el contexto y la posición de los campos para asignarlos correctamente.

🔒 Reglas estrictas:
- Devuelve **únicamente** un JSON válido (sin texto explicativo, sin comentarios y sin los caracteres ).
- El resultado debe poder ser parseado directamente con JSON.parse sin necesidad de limpiar texto.
- No incluyas comas al final de los arreglos ni objetos.
- **CONSERVA EXACTAMENTE el texto original tal como aparece en el documento.**
  - No lo resumas, no lo acortes, no lo modifiques, no lo normalices ni elimines signos de puntuación.
  - Si el texto dice “EPS Salud Total.”, el valor en el JSON debe ser "EPS Salud Total." (no "EPS").
  - Esto aplica a todos los campos, incluyendo “entidad”, “razonSocial”, “eps”, “arl”, etc.
- Si un valor no aparece en el texto, deja la propiedad vacía ("").
- Si hay varios valores del mismo tipo (por ejemplo, varios "otros cargos" o varias "empresas"), devuélvelos como arreglos.
- Si hay una sección con varias filas como “Primera oportunidad”, “Segunda oportunidad”, “Primera instancia” o “Segunda instancia”, devuélvela como un arreglo llamado "calificaciones", donde cada fila sea un objeto con los campos tipo, entidad, fecha, origen, dictamen y dictamen_numero.
- El resultado debe comenzar con { y terminar con }.
- No incluyas texto antes o después del JSON.
- No resumas ni modifiques los nombres de instituciones, ni elimines tildes o mayúsculas.

📌 Regla estricta para el formato de fechas:
- Toda fecha detectada en el documento debe convertirse al formato **dd/mm/yyyy**, donde:
  - dd = día en dos dígitos (01–31),
  - mm = mes en dos dígitos (01–12),
  - yyyy = año en cuatro dígitos.
- Ejemplos:
  - "30/jul/2025", "30-07-2025", "30 julio 2025", "30/07/25" → "30/07/2025"
- Si la fecha está incompleta o no se puede interpretar claramente, deja el campo vacío ("").
- Aplica este formato para TODOS los campos de tipo fecha:
  "FechaInvestigacion", "FechaNacimiento", "FechaDiagnostico", "FechaFurel",
  "FechaEstructuracionOrigen", fechas dentro de "Diagnosticos", "Calificaciones",
  "FechaIngreso", "OtrosCargos", "ExperienciaAnteriores", etc.
- Mantén el texto restante sin modificar; solo normaliza el formato de la fecha.

⚙️ Regla especial para campos FUREL y estructuración:
- Los campos **"fechaFurel"** y **"fechaEstructuracionOrigen"** son distintos y deben reconocerse según el texto anterior inmediato:
  - Si la etiqueta o encabezado contiene el texto **"Fecha del FUREL"**, el valor asociado (una fecha o texto próximo) debe asignarse a "fechaFurel".
  - Si la etiqueta contiene el texto **"Fecha de estructuración de origen"**, el valor asociado debe asignarse a "fechaEstructuracionOrigen".
- Nunca mezcles o intercambies estos valores, incluso si aparecen juntos en la misma línea o celda de tabla.
- Si sólo aparece una de las dos fechas, deja el otro campo vacío ("").
- Conserva exactamente el formato y texto original de cada fecha (por ejemplo: "3/07/2014" o "03/03/2015").

Ejemplo interno de comportamiento (no incluir en salida):
“FUREL # 40937   Fecha del FUREL: [vacío]   Fecha de estructuración de origen: 3/07/2014”
→ "furelNumero": "40937", "fechaFurel": "", "fechaEstructuracionOrigen": "3/20/2015"


**Incapacidad**: 
   - Si el usuario tiene incapacidad, coloca "Si".
   - Si no tiene incapacidad, coloca "No".
**Días de incapacidad**:
  - Si aparece un número como "35 días", "35", "por 10 días", etc., extrae solo el número.
- Si aparece un guion "-" en lugar de días de incapacidad, responde "0".
- Si está vacío o no se menciona ningún número, responde "0".
- Si en "Incapacidad" la respuesta es "No", escribe "0".

**Sexo**:
- Si hay una marca clara de M/F, úsala: "M" = masculino, "F" = femenino.
- Si no hay marca, **infiera el sexo a partir del nombre o información visible en la imagen** (por ejemplo nombres típicamente masculinos o femeninos).
- Si no es posible inferirlo, deja vacío "".

⚙️ Regla especial para el campo "Identificacion":
- La identificación puede aparecer con o sin prefijos como "C.C.", "CC", "Cedula", "Documento", etc.
- Siempre debe extraerse **solo la parte numérica**, ignorando cualquier texto adicional, símbolos o abreviaturas.
- Si el valor contiene mezclas como "C.C 10595595", "cc. 8.059.550", "# 99010203", "C.C No. 77.555.991", etc., el resultado debe ser:
  "10595595", "8059550", "99010203", "77555991" respectivamente.
- Eliminar siempre puntos, comas, guiones y espacios.
- Si no hay un número visible, dejar el campo vacío ("").
  
Estructura esperada:
{
  "FechaInvestigacion": "",
  "RazonSocial": "",
  "Nit": "",
  "ActividadEconomica": "",
  "Sede": "",
  "Departamento": "",
  "Area": "",
  "PrimerApellido": "",
  "SegundoApellido": "",
  "PrimerNombre": "",
  "SegundoNombre": "",
  "Identificacion": "",
  "Sexo": "",
  "EstadoCivil": "",
  "FechaNacimiento": "",
  "LugarNacimiento": "",
  "DepartamentoNacimiento": "",
  "Escolaridad": "",
  "Profesion": "",
  "Residencia": "",
  "DepartamentoResidencia": "",
  "EPS": "",
  "AFP": "",
  "ARL": "",
  "Diagnosticos": [
    {
      "Descripcion": "",
      "Codigocie10": "",
      "FechaDiagnostico": ""
    }
  ],
  "GeneroIncapacidad": "",
  "DiasIncapacidad": "",
  "ObservacionesIncapacidad": "",
  "FurelNumero": "",
  "FechaFurel": "",
  "FechaEstructuracionOrigen": "",
  "Calificaciones": [
    {
      "Tipo": "",
      "Entidad": "",
      "Fecha": "",
      "Origen": "",
      "DictamenNumero": ""
    }
  ],
  "CalificacionPCL": "",
  "PorcentajePCL": "",
  "Instancia": "",
  "DictamenNumero": "",
  "CalificacionIntegral": "",
  "OtrasPatologias": "",
  "FechaIngreso": "",
  "CargoInicial": "",
  "TurnoJornada": "",
  "TiempoCargo": "",
  "EdadIngreso": "",
  "OtrosCargos": [
    {
      "FechaInicio": "",
      "Cargo": "",
      "TurnoJornada": "",
      "TiempoCargo": ""
    }
  ],
  "ExperienciaAnteriores": [
    {
      "Empresa": "",
      "ActividadEconomica": "",
      "CargoOficio": "",
      "TiempoCargo": ""
    }
  ],
 
}

⚙️ Regla especial para los diagnósticos:
Cada diagnóstico debe identificarse como un registro independiente dentro del arreglo 'diagnosticos'. 
Detecta el inicio de cada diagnóstico por un número entre paréntesis '(1)', '(2)', '(3)', etc. Incluso si todo el bloque está en la misma línea, cada aparición de '(n)' marca un nuevo diagnóstico.

Reglas concretas de extracción (aplicar en ese orden):
1) Identificación de bloques:
   - El inicio de un diagnóstico es el patrón '(n)'.
   - El final de un diagnóstico es el inicio del siguiente '(n+1)' o el final del bloque de texto.

2) Campos y asignación:
   - 'descripcion': debe contener **solo** el texto descriptivo del diagnóstico entre el '(n)' y el **código CIE-10**. No incluir paréntesis que sean notas de fechas ni textos que correspondan a observaciones fechadas. Conservar exactamente el texto original (tildes, mayúsculas, etc.).
   - 'codigo_cie10': debe ser el token inmediatamente siguiente a la descripción que coincide con el patrón típico de códigos CIE-10 (combinación de letras y números). Si no se encuentra un código claro, dejar el campo vacío ('').
   - 'fecha_inicio_sintomas': debe ser la **primera fecha** que aparece después del código CIE-10. **Incluye** todo texto que esté inmediatamente unido a esa fecha si es una nota aclaratoria o contextual (por ejemplo: paréntesis, 'Nota médica...', u otras observaciones que siguen a esa fecha). Es decir, si la fecha aparece seguida por ' (Nota ...' o texto sin salto que claramente pertenece a esa fecha, ese texto se debe concatenar a 'fecha_inicio_sintomas' **tal cual**.
   - 'fecha_diagnostico': debe ser la **segunda fecha** que aparece después del código CIE-10 (si existe). Incluirá cualquier texto médico o comentario que siga a esa fecha hasta el inicio del siguiente diagnóstico o hasta el cierre del bloque. Conservar exactamente el texto original.
   
3) Reglas para evitar mezclas:
   - No copiar notas o paréntesis de fechas dentro de 'descripcion'. Si un paréntesis con una nota aparece entre la descripción y el código CIE-10, se considera parte de la descripción sólo si está claramente allí antes del código; pero si la nota aparece después del código y/o junto a una fecha, debe pertenecer a 'fecha_inicio_sintomas' o 'fecha_diagnostico'.
   - Si sólo aparece una fecha después del código, asignarla a 'fecha_inicio_sintomas' y dejar 'fecha_diagnostico' vacía ('').
   - Si la estructura de fechas o códigos no es clara, prioriza crear objetos separados por numeración y deja campos imprecisos vacíos ('') en lugar de mezclar texto entre diagnósticos.

4) Formato de salida:
   - Cada diagnóstico debe ser un objeto separado dentro del arreglo 'diagnosticos' con las propiedades EXACTAS: 'descripcion', 'codigo_cie10', 'fecha_inicio_sintomas', 'fecha_diagnostico'.
   - Conserva exactamente el texto original para cada campo; no normalices ni acortes nada.
   - Si alguna propiedad no existe en el bloque, devuélvela como cadena vacía ('').

5) Ejemplo de comportamiento esperado (solo para entender la regla — **no** incluyas ejemplos concretos en la ejecución):
   - Si tras el código aparece: '10-jul-2017 (Nota médica ...)' → toda esa cadena va a 'fecha_inicio_sintomas'.
   - Si tras esa nota aparece '14-jul-2017 RM de columna lumbosacra.' → esa cadena va a 'fecha_diagnostico'.

Aplica estas reglas de forma genérica para cualquier texto que reciba; la información concreta puede cambiar entre documentos.

---

⚙️ Regla especial para las calificaciones:
Cada fila de la sección 'calificaciones' se encuentra en texto plano en el orden aproximado:
tipo → entidad → fecha → (texto libre intermedio) → dictamen_numero (última columna).

1) Identifica la fecha (por ejemplo: 15-oct-2024, 21-nov-2024, etc.) y tómala como delimitador izquierdo.
2) Toma el **último valor** de la línea como 'dictamen_numero' solo si:
   - contiene al menos un dígito, o
   - es exactamente “No Registra” (ignorando mayúsculas/minúsculas).
3) Si el último valor no cumple lo anterior (por ejemplo “CONTROVERSIA”, “PENDIENTE DE REVISIÓN”), considera que **no hay número de dictamen** y en ese caso:
   - asigna “No Registra” a dictamen_numero (si la frase contiene esas palabras),
   - o deja el campo vacío (“”).
4) Asigna **TODO** lo que esté entre la fecha y el dictamen_numero al campo origen, **sin eliminar ni truncar palabras** (por ejemplo: debe conservar “ENFERMEDAD LABORAL”, “CONTROVERSIA”, etc.).
5) Nunca muevas texto de origen a dictamen # a menos que haya una separación inequívoca y explícita.
6) Ejemplos:
   - “Primera oportunidad Nueva EPS 15-oct-2024 (1),(2) ENFERMEDAD LABORAL 77104738 - 29734”
     ➜
     {
       "tipo": "Primera oportunidad",
       "entidad": "Nueva EPS",
       "fecha": "15-oct-2024",
       "origen": "(1),(2) ENFERMEDAD LABORAL",
       "dictamen_numero": "No Registra"
     }

   - “Segunda oportunidad ARL Seguros Bolívar 21-nov-2024 (1),(2) CONTROVERSIA No Registra”
     ➜
     {
       "tipo": "Segunda oportunidad",
       "entidad": "ARL Seguros Bolívar",
       "fecha": "21-nov-2024",
       "origen": "(1),(2) CONTROVERSIA",
       "dictamen_numero": "No Registra"
     }

⚙️ REGLA REFORZADA PARA LA SECCIÓN 6 – DATOS SOBRE EXPOSICIÓN EN LA EMPRESA

La Sección 6 describe uno o varios cargos o puestos de trabajo, cada uno con su análisis de puesto, circunstancias de exposición y tiempo acumulado.
Devuelve esta información como un arreglo llamado "exposiciones".

Cada elemento dentro de "exposiciones" debe contener:
"cargo"
"resultado_analisis_puesto"
"circunstancias_exposicion"
"tiempo_acumulado_exposicion"

IDENTIFICACIÓN DE CARGOS

Un nuevo cargo comienza cuando aparece texto en la columna 1 que está completamente en mayúsculas (por ejemplo: MARINERO, OPERADOR DE BULDÓCER ÁREA MARINA, WINCHERO).
Ese texto se asigna directamente al campo "cargo".

CONCATENACIÓN DE FILAS SIGUIENTES (REGLA TOTAL)

Si una fila siguiente no es un nuevo cargo (es decir, la celda de la columna 1 no está completamente en mayúsculas), todo el contenido de esa fila pertenece al mismo cargo anterior, sin importar si las columnas 2 o 3 tienen texto.

En este caso:

El texto de la columna 1 se concatena al campo "resultado_analisis_puesto" del mismo cargo.

El texto de la columna 2 se concatena al campo "circunstancias_exposicion" del mismo cargo.

El texto de la columna 3 se concatena al campo "tiempo_acumulado_exposicion" del mismo cargo.

Si alguna columna está vacía, simplemente se ignora sin cortar la concatenación.

Todos los textos concatenados deben separarse por un salto de línea "\n" y conservar el orden original en el documento.

DETECCIÓN DE NUEVO CARGO

Solo se crea un nuevo objeto dentro de "exposiciones" cuando la celda de la columna 1 está completamente en mayúsculas y representa claramente un nuevo título de cargo o puesto.
Mientras no se cumpla esta condición, la fila se considera parte del cargo anterior.

MANEJO DE TEXTO COMBINADO

Si una fila tiene texto en más de una columna, los textos se asignan y concatenan a sus campos correspondientes en el mismo objeto.
Si un campo como "tiempo_acumulado_exposicion" aparece en varias filas para el mismo cargo, concatena los valores separados por "; " (punto y coma y espacio).

FIDELIDAD DEL TEXTO

No resumas ni reformules el texto. Mantén las mayúsculas, tildes, saltos de línea y puntuación exactamente como aparecen.
Representa los saltos visuales del documento usando "\n".

`;

export const mergeJsons = (jsonArray) => {
  return jsonArray.reduce((acc, item) => {
    return { ...acc, ...item };
  }, {});
};

export function extractionDataBase(file) {
  const path = file.path;
  const parts = path.split(".");
  const lastPart = parts.pop();

  let codigofds = "";
  let nombre = "";

  if (parts.length > 1) {
    const posibleCodigo = parts[0].trim();
    const resto = parts.slice(1).join(".").trim();

    if (/^[a-zA-Z0-9]+$/.test(posibleCodigo)) {
      codigofds = posibleCodigo;
      nombre = resto;
    } else {
      nombre = [posibleCodigo, resto].join(".");
    }
  } else {
    nombre = parts[0].trim();
  }

  console.log(nombre, codigofds, path);

  return {
    nombre,
    codigofds,
    path,
  };
}

export function validationStateFile(acceptedFiles) {
  const existe = acceptedFiles.filter((objeto) => objeto.state !== true);
  return existe;
}

function parseJsonSafe(data) {
  try {
    const text = typeof data === "string" ? data : data?.data || "";
    const clean =
      typeof text === "string" ? text.replace(/```json|```/g, "").trim() : "";

    return JSON.parse(clean);
  } catch (error) {
    console.error("❌ Error al parsear JSON:", error.message);
    return null;
  }
}

export function updateStateFile(file, acceptedFiles, setAcceptedFiles) {
  const updatedFiles = acceptedFiles?.map((item) => {
    if (item.path === file.path) {
      item.state = true;
    }
    return item;
  });
  setAcceptedFiles(updatedFiles);
}

export async function extractImagesFromPdf(file, prompt) {
  console.log("archivo:", file);
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("prompt", prompt);

    const response = await axios.post(
      `${Url.Base}${Url.GetOpenIAFile}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const { data } = response.data;
    console.log("jean", data);
    const mappingData = parseJsonSafe(data);

    return mappingData;
  } catch (error) {
    console.error("❌ Error al enviar el archivo:", error);
    throw error;
  }
}
export async function wordOpenIa(file, prompt) {
  console.log("archivo:", file);
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("prompt", prompt);

    const response = await axios.post(
      `${Url.Base}${Url.wordopenia}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const { data } = response.data;
    console.log("jean", data);
    const mappingData = parseJsonSafe(data);

    return mappingData;
  } catch (error) {
    console.error("❌ Error al enviar el archivo:", error);
    throw error;
  }
}

export async function extractWordFromText(file) {
  console.log("archivo:", file);
  try {
    const formData = new FormData();
    formData.append("file", file);  

    const response = await axios.post(
      `${Url.Base}${Url.wordtexto}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const { data } = response.data;
    console.log("texto jean", data);
    const mappingData = parseJsonSafe(data);

    return mappingData;
  } catch (error) {
    console.error("❌ Error al enviar el archivo:", error);
    throw error;
  }
}

export async function onSaveMaster(listMappingproduct, acceptedFiles) {
  // const data = listMappingproduct.map(({ path, ...resto }) => resto);

  const data={
    FechaInvestigacion:"24 diciembre",
    RazonSocial:"drummond",
    Estado:true,
    UsuarioRegistro:"admin"
  }

  try {
    const response = await axios.post(`${Url.Base}${Url.InvestigacionEnfermedadLaboralFile}`, listMappingproduct);
    console.log(response);
    if (response.data.exito) {
      toast.success(response.data.mensaje);
      // onSaveFile(response.data.datos, acceptedFiles, user);
    } else {
      toast.error('Error al guardar los datos');
    }
  } catch (error) {
    console.log(error);
    toast.error('Error al guardar los datos');
  }
}

//Api por si se necesita
export const convertPdfToHtml = async (pdfFile, confirmModal) => {
  try {
    const API_KEY =
      "milenamarqueznunez@gmail.com_0uH9VgXn51weunFnyASbkQhZp78T5yLDhDQse4Foo62wjbuYUXwj2jW3ojd579Hf";
    var uploadedFileUrl;
    //
    // 1️⃣ Subir el PDF a PDF.co
    //
    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      const uploadResponse = await fetch("https://api.pdf.co/v1/file/upload", {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
        },
        body: formData,
      });

      if (!uploadResponse) {
        confirmModal.onFalse();
        console.error("No se pudo conectar al servidor para subir el PDF.");
        return null;
      }

      const uploadResult = await uploadResponse.json();

      if (!uploadResult.url) {
        confirmModal.onFalse();
        console.error("El servidor no devolvió una URL válida.");
        return null;
      }

      uploadedFileUrl = uploadResult.url; // URL temporal del PDF subido
    } catch (err) {
      confirmModal.onFalse();
      console.log(err);
    }

    //
    // 2️⃣ Convertir a HTML usando la URL
    //
    const convertResponse = await fetch(
      "https://api.pdf.co/v1/pdf/convert/to/html",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({
          url: uploadedFileUrl, // 👈 ahora sí
          outputDataFormat: "base64",
          inline: false,
          lineGrouping: "3",
          images: false,
        }),
      }
    );

    const convertResult = await convertResponse.json();

    if (convertResult.error) {
      throw new Error(convertResult.message || "Error al convertir a HTML");
    }

    //
    // 3️⃣ Obtener el HTML final
    //
    const htmlResponse = await fetch(convertResult.url);
    const htmlText = await htmlResponse.text();

    return htmlText;
  } catch (error) {
    console.error("Error al convertir PDF:", error);
    return null;
  }
};

export const convertPdfToText = async (pdfFile, confirmModal) => {
  try {
    const API_KEY =
      "milenamarqueznunez@gmail.com_0uH9VgXn51weunFnyASbkQhZp78T5yLDhDQse4Foo62wjbuYUXwj2jW3ojd579Hf";
    let uploadedFileUrl = null;

    //
    // 1️⃣ Subir PDF a PDF.co
    //
    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      const uploadResponse = await fetch("https://api.pdf.co/v1/file/upload", {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
        },
        body: formData,
      });

      if (!uploadResponse) {
        confirmModal?.onFalse?.();
        console.error("No se pudo conectar al servidor para subir el PDF.");
        return null;
      }

      const uploadResult = await uploadResponse.json();

      if (!uploadResult.url) {
        confirmModal?.onFalse?.();
        console.error("El servidor no devolvió una URL válida.");
        return null;
      }

      uploadedFileUrl = uploadResult.url;
    } catch (err) {
      confirmModal?.onFalse?.();
      console.error(err);
      return null;
    }

    //
    // 2️⃣ Convertir PDF a TEXTO usando la URL subida
    //
    const convertResponse = await fetch(
      "https://api.pdf.co/v1/pdf/convert/to/text",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({
          url: uploadedFileUrl,
          async: false,
        }),
      }
    );

    const convertResult = await convertResponse.json();

    // Si hay un error de conversión
    if (convertResult.error) {
      throw new Error(
        convertResult.message || "Error al convertir PDF a texto"
      );
    }

    //
    // 3️⃣ Descargar el resultado de texto
    //
    const textResponse = await fetch(convertResult.url);
    const plainText = await textResponse.text();

    return plainText;
  } catch (error) {
    console.error("Error al convertir PDF a texto:", error);
    return null;
  }
};
//////

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result); 
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}


export function base64ToWord(base64String, fileName = "archivo.docx") {
  console.log("base64String",base64String)
  // 1. separar cabecera y contenido
  const [header, base64Data] = base64String.split(",");

  // 2. validar MIME desde la cabecera
  let mime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  const match = header.match(/data:(.*?);base64/);
  if (match) {
    mime = match[1];
  }

  // 3. decodificar base64
  const binary = atob(base64Data);
  const len = binary.length;
  const u8arr = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    u8arr[i] = binary.charCodeAt(i);
  }

  // 4. crear File
  return new File([u8arr], fileName, { type: mime });
}


export async function ConvertirDocxASfdt(file, prompt) {
  console.log("archivo:", file);
  try {
    const formData = new FormData();
    formData.append("file", file);
 

    const response = await axios.post(
      `${Url.Base}${Url.ConvertirDocxASfdt}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const { data } = response.data;
    console.log("jean", data);
    const mappingData = parseJsonSafe(data);

    return mappingData;
  } catch (error) {
    console.error("❌ Error al enviar el archivo:", error);
    throw error;
  }
}

