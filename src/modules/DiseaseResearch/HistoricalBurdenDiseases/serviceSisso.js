import axios from 'axios';
// import { url } from 'src/api/instances/AuthRoute';
// import { extractTextFromPage } from 'src/module/ChemicalProducts/Inventory/AuthorizationIncome/service';

// import * as pdfjsLib from 'pdfjs-dist';
// import { GlobalWorkerOptions } from 'pdfjs-dist';
import { Url } from 'api/instances/AuthRoute';
import toast from 'react-hot-toast';


// GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url
// ).toString();

// GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

export const promptDatosGeneralesnew = `
Analiza el siguiente texto y devuelve exclusivamente un objeto JSON válido con la información extraída.
Los datos aparecen en formato de tabla pero extraídos como texto plano, por lo tanto los encabezados y los valores estarán juntos o en secuencia.
Usa el contexto y la posición de los campos para asignarlos correctamente.

🔒 Reglas estrictas:
- Devuelve **únicamente** un JSON válido (sin texto explicativo, sin comentarios y sin los caracteres ).
- El resultado debe poder ser parseado directamente con JSON.parse sin necesidad de limpiar texto.
- No incluyas comas al final de los arreglos ni objetos.
- **CONSERVA EXACTAMENTE el texto original tal como aparece en el documento.**
  - No lo resumas, no lo acortes, no lo modifiques, no lo normalices ni elimines signos de puntuación.
  - Si el texto dice “EPS Salud Total.”, el valor en el JSON debe ser "EPS Salud Total." (no "EPS").
  - Esto aplica a todos los campos, incluyendo “entidad”, “razon_social”, “eps”, “arl”, etc.
- Si un valor no aparece en el texto, deja la propiedad vacía ("").
- Si hay varios valores del mismo tipo (por ejemplo, varios "otros cargos" o varias "empresas"), devuélvelos como arreglos.
- Si hay una sección con varias filas como “Primera oportunidad”, “Segunda oportunidad”, “Primera instancia” o “Segunda instancia”, devuélvela como un arreglo llamado "calificaciones", donde cada fila sea un objeto con los campos tipo, entidad, fecha, origen, dictamen y dictamen_numero.
- El resultado debe comenzar con { y terminar con }.
- No incluyas texto antes o después del JSON.
- No resumas ni modifiques los nombres de instituciones, ni elimines tildes o mayúsculas.


⚙️ Regla especial para campos FUREL y estructuración:
- Los campos **"fecha_furel"** y **"fecha_estructuracion_origen"** son distintos y deben reconocerse según el texto anterior inmediato:
  - Si la etiqueta o encabezado contiene el texto **"Fecha del FUREL"**, el valor asociado (una fecha o texto próximo) debe asignarse a "fecha_furel".
  - Si la etiqueta contiene el texto **"Fecha de estructuración de origen"**, el valor asociado debe asignarse a "fecha_estructuracion_origen".
- Nunca mezcles o intercambies estos valores, incluso si aparecen juntos en la misma línea o celda de tabla.
- Si sólo aparece una de las dos fechas, deja el otro campo vacío ("").
- Conserva exactamente el formato y texto original de cada fecha (por ejemplo: "3/07/2014" o "03/03/2015").

Ejemplo interno de comportamiento (no incluir en salida):
“FUREL # 40937   Fecha del FUREL: [vacío]   Fecha de estructuración de origen: 3/07/2014”
→ "furel_numero": "40937", "fecha_furel": "", "fecha_estructuracion_origen": "3/20/2015"


⚙️ Regla especial para los campos "genero_incapacidad" y "dias_incapacidad":
- Estos dos campos aparecen frecuentemente juntos, pero **no deben mezclarse**.
- El campo "genero_incapacidad" solo puede tomar los valores literales “Sí”, “No”, o quedar vacío ("").
- El campo "dias_incapacidad" debe contener únicamente un número (por ejemplo "720") o quedar vacío ("").
- Si el texto contiene “Sí No” o “Sí” sin un número posterior, asigna:
  {
    "genero_incapacidad": "Sí",
    "dias_incapacidad": ""
  }
- Si el texto contiene “No” sin “Sí” y sin número posterior, asigna:
  {
    "genero_incapacidad": "No",
    "dias_incapacidad": ""
  }
- Si aparece “Sí” o “No” seguido de un número y luego la palabra “días”, asigna:
  {
    "genero_incapacidad": "Sí" o "No",
    "dias_incapacidad": "720"  // sin la palabra "días"
  }
- En ningún caso "dias_incapacidad" puede tomar los valores “Sí” o “No”.

  
Estructura esperada:
{
  "fecha_investigacion": "",
  "razon_social": "",
  "nit": "",
  "actividad_economica": "",
  "sede": "",
  "departamento": "",
  "area": "",
  "primer_apellido": "",
  "segundo_apellido": "",
  "primer_nombre": "",
  "segundo_nombre": "",
  "identificacion": "",
  "sexo": "",
  "estado_civil": "",
  "fecha_nacimiento": "",
  "lugar_nacimiento": "",
  "departamento_nacimiento": "",
  "escolaridad": "",
  "profesion": "",
  "residencia": "",
  "departamento_residencia": "",
  "eps": "",
  "afp": "",
  "arl": "",
  "diagnosticos": [
    {
      "descripcion": "",
      "codigo_cie10": "",
      "fecha_inicio_sintomas": "",
      "fecha_diagnostico": ""
    }
  ],
  "genero_incapacidad": "",
  "dias_incapacidad": "",
  "observaciones_incapacidad": "",
  "furel_numero": "",
  "fecha_furel": "",
  "fecha_estructuracion_origen": "",
  "calificaciones": [
    {
      "tipo": "",
      "entidad": "",
      "fecha": "",
      "origen": "",
      "dictamen_numero": ""
    }
  ],
  "calificacion_pcl": "",
  "porcentaje_pcl": "",
  "instancia": "",
  "dictamen_numero": "",
  "calificacion_integral": "",
  "otras_patologias": "",
  "fecha_ingreso": "",
  "cargo_inicial": "",
  "turno_jornada": "",
  "tiempo_en_el_cargo": "",
  "edad_ingreso": "",
  "otros_cargos": [
    {
      "fecha_inicio": "",
      "cargo": "",
      "turno_jornada": "",
      "tiempo_en_el_cargo": ""
    }
  ],
  "experiencia_anteriores": [
    {
      "empresa": "",
      "actividad_economica": "",
      "cargo_u_oficio": "",
      "tiempo_en_el_cargo": ""
    }
  ],
  "exposiciones": [
    {
      "cargo": "",
      "resultado_analisis_puesto": "",
      "circunstancias_exposicion": "",
      "tiempo_acumulado_exposicion": ""
    }
  ]
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
⚙️ Regla especial para la Sección 6 (Exposición) - Extracción de Columnas Múltiples:

- La Sección 6 (Datos sobre Exposición) documenta uno o más cargos con sus respectivas exposiciones, originalmente distribuidos en varias columnas que se linealizan en el texto plano.
- **Identificación del Bloque:** El texto se segmentará lógicamente por cada **Peligro Relacionado / Cargo** (ej: texto en mayúsculas como **MARINERO**, **OPERADOR DE BULDÓCER**).
- **Extracción y Etiquetado (Concatenación por Cargo):**
    - **'resultado_analisis_puesto' (Columna 1):** Extraer la descripción detallada del cargo y tareas (análisis de puesto) desde el nombre del cargo hasta el inicio de las "Circunstancias de Exposición" (Columna 2).
    - **'circunstancias_exposicion' (Columna 2):** Extraer el resumen de las circunstancias de exposición, riesgos biomecánicos o mediciones (ej: texto que contiene **OWAS**, **Carga física global**, o la descripción de la exposición) que sigue a la Columna 1.
    - **'tiempo_acumulado_exposicion' (Columna 3):** Extraer el valor del tiempo acumulado asociado al primer cargo, si está presente. Si existen más valores asociados a otros cargos, se deben concatenar y etiquetar con el nombre del cargo correspondiente.
- **Formato de Concatenación:** Para los campos 'resultado_analisis_puesto' y 'circunstancias_exposicion', **concatena** la información de cada cargo y columna, utilizando el **nombre del cargo** como etiqueta y separador para mantener la claridad y la fidelidad a la estructura original de la tabla.

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

export const promptDatosGenerales = `
Analiza el siguiente texto y devuelve exclusivamente un objeto JSON válido con la información extraída.
Los datos aparecen en formato de tabla pero extraídos como texto plano, por lo tanto los encabezados y los valores estarán juntos o en secuencia.
Usa el contexto y la posición de los campos para asignarlos correctamente.

🔒 Reglas estrictas:
- Devuelve **únicamente** un JSON válido (sin texto explicativo, sin comentarios y sin los caracteres ).
- El resultado debe poder ser parseado directamente con JSON.parse sin necesidad de limpiar texto.
- No incluyas comas al final de los arreglos ni objetos.
- **CONSERVA EXACTAMENTE el texto original tal como aparece en el documento.**
  - No lo resumas, no lo acortes, no lo modifiques, no lo normalices ni elimines signos de puntuación.
  - Si el texto dice “EPS Salud Total.”, el valor en el JSON debe ser "EPS Salud Total." (no "EPS").
  - Esto aplica a todos los campos, incluyendo “entidad”, “razon_social”, “eps”, “arl”, etc.
- Si un valor no aparece en el texto, deja la propiedad vacía ("").
- Si hay varios valores del mismo tipo (por ejemplo, varios "otros cargos" o varias "empresas"), devuélvelos como arreglos.
- Si hay una sección con varias filas como “Primera oportunidad”, “Segunda oportunidad”, “Primera instancia” o “Segunda instancia”, devuélvela como un arreglo llamado "calificaciones", donde cada fila sea un objeto con los campos tipo, entidad, fecha, origen, dictamen y dictamen_numero.
- El resultado debe comenzar con { y terminar con }.
- No incluyas texto antes o después del JSON.
- No resumas ni modifiques los nombres de instituciones, ni elimines tildes o mayúsculas.


⚙️ Regla especial para campos FUREL y estructuración:
- Los campos **"fecha_furel"** y **"fecha_estructuracion_origen"** son distintos y deben reconocerse según el texto anterior inmediato:
  - Si la etiqueta o encabezado contiene el texto **"Fecha del FUREL"**, el valor asociado (una fecha o texto próximo) debe asignarse a "fecha_furel".
  - Si la etiqueta contiene el texto **"Fecha de estructuración de origen"**, el valor asociado debe asignarse a "fecha_estructuracion_origen".
- Nunca mezcles o intercambies estos valores, incluso si aparecen juntos en la misma línea o celda de tabla.
- Si sólo aparece una de las dos fechas, deja el otro campo vacío ("").
- Conserva exactamente el formato y texto original de cada fecha (por ejemplo: "3/07/2014" o "03/03/2015").

Ejemplo interno de comportamiento (no incluir en salida):
“FUREL # 40937   Fecha del FUREL: [vacío]   Fecha de estructuración de origen: 3/07/2014”
→ "furel_numero": "40937", "fecha_furel": "", "fecha_estructuracion_origen": "3/20/2015"


⚙️ Regla especial para los campos "genero_incapacidad" y "dias_incapacidad":
- Estos dos campos aparecen frecuentemente juntos, pero **no deben mezclarse**.
- El campo "genero_incapacidad" solo puede tomar los valores literales “Sí”, “No”, o quedar vacío ("").
- El campo "dias_incapacidad" debe contener únicamente un número (por ejemplo "720") o quedar vacío ("").
- Si el texto contiene “Sí No” o “Sí” sin un número posterior, asigna:
  {
    "genero_incapacidad": "Sí",
    "dias_incapacidad": ""
  }
- Si el texto contiene “No” sin “Sí” y sin número posterior, asigna:
  {
    "genero_incapacidad": "No",
    "dias_incapacidad": ""
  }
- Si aparece “Sí” o “No” seguido de un número y luego la palabra “días”, asigna:
  {
    "genero_incapacidad": "Sí" o "No",
    "dias_incapacidad": "720"  // sin la palabra "días"
  }
- En ningún caso "dias_incapacidad" puede tomar los valores “Sí” o “No”.

  
Estructura esperada:
{
  "fecha_investigacion": "",
  "razon_social": "",
  "nit": "",
  "actividad_economica": "",
  "sede": "",
  "departamento": "",
  "area": "",
  "primer_apellido": "",
  "segundo_apellido": "",
  "primer_nombre": "",
  "segundo_nombre": "",
  "identificacion": "",
  "sexo": "",
  "estado_civil": "",
  "fecha_nacimiento": "",
  "lugar_nacimiento": "",
  "departamento_nacimiento": "",
  "escolaridad": "",
  "profesion": "",
  "residencia": "",
  "departamento_residencia": "",
  "eps": "",
  "afp": "",
  "arl": "",
  "diagnosticos": [
    {
      "descripcion": "",
      "codigo_cie10": "",
      "fecha_diagnostico": ""
    }
  ],
  "genero_incapacidad": "",
  "dias_incapacidad": "",
  "observaciones_incapacidad": "",
  "furel_numero": "",
  "fecha_furel": "",
  "fecha_estructuracion_origen": "",
  "calificaciones": [
    {
      "tipo": "",
      "entidad": "",
      "fecha": "",
      "origen": "",
      "dictamen_numero": ""
    }
  ],
  "calificacion_pcl": "",
  "porcentaje_pcl": "",
  "instancia": "",
  "dictamen_numero": "",
  "calificacion_integral": "",
  "otras_patologias": "",
  "fecha_ingreso": "",
  "cargo_inicial": "",
  "turno_jornada": "",
  "tiempo_en_el_cargo": "",
  "edad_ingreso": "",
  "otros_cargos": [
    {
      "fecha_inicio": "",
      "cargo": "",
      "turno_jornada": "",
      "tiempo_en_el_cargo": ""
    }
  ],
  "experiencia_anteriores": [
    {
      "empresa": "",
      "actividad_economica": "",
      "cargo_u_oficio": "",
      "tiempo_en_el_cargo": ""
    }
  ],
  "exposiciones": [
    {
      "cargo": "",
      "resultado_analisis_puesto": "",
      "circunstancias_exposicion": "",
      "tiempo_acumulado_exposicion": ""
    }
  ]
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


Aplica estas reglas de forma genérica para cualquier texto que reciba; la información concreta puede cambiar entre documentos.

---
⚙️ Regla especial para la Sección 6 (Exposición) - Extracción de Columnas Múltiples:

- La Sección 6 (Datos sobre Exposición) documenta uno o más cargos con sus respectivas exposiciones, originalmente distribuidos en varias columnas que se linealizan en el texto plano.
- **Identificación del Bloque:** El texto se segmentará lógicamente por cada **Peligro Relacionado / Cargo** (ej: texto en mayúsculas como **MARINERO**, **OPERADOR DE BULDÓCER**).
- **Extracción y Etiquetado (Concatenación por Cargo):**
    - **'resultado_analisis_puesto' (Columna 1):** Extraer la descripción detallada del cargo y tareas (análisis de puesto) desde el nombre del cargo hasta el inicio de las "Circunstancias de Exposición" (Columna 2).
    - **'circunstancias_exposicion' (Columna 2):** Extraer el resumen de las circunstancias de exposición, riesgos biomecánicos o mediciones (ej: texto que contiene **OWAS**, **Carga física global**, o la descripción de la exposición) que sigue a la Columna 1.
    - **'tiempo_acumulado_exposicion' (Columna 3):** Extraer el valor del tiempo acumulado asociado al primer cargo, si está presente. Si existen más valores asociados a otros cargos, se deben concatenar y etiquetar con el nombre del cargo correspondiente.
- **Formato de Concatenación:** Para los campos 'resultado_analisis_puesto' y 'circunstancias_exposicion', **concatena** la información de cada cargo y columna, utilizando el **nombre del cargo** como etiqueta y separador para mantener la claridad y la fidelidad a la estructura original de la tabla.

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






export const MapeoPromptSisso = (data, index) => {
  const prompts = [
    promptDatosGenerales,
    // promptDatosGeneralesnew,
    // promptHistoriaLaboral,
    // promptDiagnosticos,
    // promptExposicion,
    // promptClinicos,
    // promptAusentismo,
    // promptBibliografia
  ];

  if (!prompts[index]) {
    throw new Error(`No existe un prompt definido para el índice ${index}`);
  }

  // Construimos el prompt final
  const promptFinal = `
  Información proporcionada:
  ${data}
  
  Instrucción de extracción FDS:
  ${prompts[index]}
  `;

  return promptFinal;
};

// export async function extractDataSisso(file) {
//   try {
//     // Extraemos texto de TODAS las páginas (1 a 16)
//     const texto = await extractTextFromPage(
//       file,
//       [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
//     );

//     // Convertimos cada página en string
//     const paginas = texto.map((item) => item.text);

//     // Creamos bloques según las secciones que definiste
//     const bloques = [
//       paginas.slice(0, 2).join(' '), // Datos generales y personales (págs. 1-2)
//       //   paginas.slice(2, 4).join(' '), // Historia laboral (págs. 2-4)
//       //   paginas.slice(4, 6).join(' '), // Diagnósticos y calificaciones médicas (págs. 4-6)
//       //   paginas.slice(6, 8).join(' '), // Exposición en la empresa y métodos de control (págs. 6-8)
//       //   paginas.slice(8, 11).join(' '), // Datos clínicos y antecedentes relevantes (págs. 8-11)
//       //   paginas.slice(11, 12).join(' '), // Ausentismo laboral (págs. 11-12)
//       //   paginas.slice(12, 16).join(' '), // Revisión bibliográfica y conclusiones (págs. 13-16)
//     ];

//     return bloques; // 👉 Devuelve un array con 7 bloques
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }

export const mergeJsons = (jsonArray) => {
  return jsonArray.reduce((acc, item) => {
    return { ...acc, ...item };
  }, {});
};


// export const fetchToPdf = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file);

//   const response = await axios.post(
//     `${Url.Base}${Url.file.ConvertToPdf}`,
//     formData,
//     {
//       headers: { "Content-Type": "multipart/form-data" },
//       responseType: "blob", // ✅ Muy importante
//     }
//   );

//   console.log(response)

//   // Crear URL del blob
//   const blob = new Blob([response.data], { type: "application/pdf" });
//   const pdfUrl = URL.createObjectURL(blob);

//   // Abrir o descargar el PDF
//   window.open(pdfUrl, "_blank");
// };

export function extractionDataBase(file) {
  const path = file.path;
  const parts = path.split('.'); // separa por puntos
  const lastPart = parts.pop(); // elimina la extensión (pdf u otra)

  let codigofds = '';
  let nombre = '';

  if (parts.length > 1) {
    // Si hay más de un punto → posible código + nombre
    const posibleCodigo = parts[0].trim();
    const resto = parts.slice(1).join('.').trim();

    // Validamos si el primer segmento parece un código (letras/números, sin guiones)
    if (/^[a-zA-Z0-9]+$/.test(posibleCodigo)) {
      codigofds = posibleCodigo;
      nombre = resto;
    } else {
      // No parece código, entonces todo es el nombre
      nombre = [posibleCodigo, resto].join('.');
    }
  } else {
    // Solo un punto → nombre sin código
    nombre = parts[0].trim();
  }

  console.log(nombre,codigofds,path)

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

export async function fetchIAData(prompt, confirm, file, acceptedFiles, setAcceptedFiles) {
  try {
    const response = await axios.post(`${Url.Base}${Url.GetOpenIA}`, prompt, {
      headers: { 'Content-Type': 'application/json' },
    });

    const { data } = response.data;
    console.log('jean', data);
    const mappingData = parseJsonSafe(data);
    console.log(mappingData);
    updateStateFile(file, acceptedFiles, setAcceptedFiles);
    return mappingData;
  } catch (error) {
    toast.error("No se pudo extraer la información. Intente nuevamente.")
    // enqueueSnackbar('No se pudo extraer la información. Intente nuevamente.', {
    //   variant: 'warning',
    // });
    confirm.onFalse();
    console.error(error);
    return error;
  }
}

export const extractTextFromPage = async (pdfInput, pageNumbers) => {
  // try {
  //   let arrayBuffer;

  //   if (typeof pdfInput === 'string') {
  //     // Si es una URL
  //     const response = await fetch(pdfInput);
  //     arrayBuffer = await response.arrayBuffer();
  //   } else if (pdfInput instanceof File || pdfInput instanceof Blob) {
  //     // Si es un archivo local (File o Blob)
  //     arrayBuffer = await pdfInput.arrayBuffer();
  //   } else {
  //     throw new Error('Entrada inválida. Debe ser una URL o un archivo File.');
  //   }

  //   const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  //   const pdf = await loadingTask.promise;

  //   const texts = [];

  //   for (const pageNumber of pageNumbers) {
  //     if (pageNumber < 1 || pageNumber > pdf.numPages) {
  //       console.warn(`Número de página inválido: ${pageNumber}`);
  //       continue;
  //     }

  //     const page = await pdf.getPage(pageNumber);
  //     const textContent = await page.getTextContent();
  //     const pageText = textContent.items.map(item => item.str).join(' ');
  //     texts.push({ page: pageNumber, text: pageText });
  //   }

  //   return texts;
  // } catch (error) {
  //   console.error('Error al extraer texto del PDF:', error);
  //   return null;
  // }
};

function parseJsonSafe(data) {
  try {
    // si es un objeto tipo { data: '...' }, usa su contenido
    const text = typeof data === 'string' ? data : data?.data || '';

    // solo aplica replace si realmente es un string
    const clean = typeof text === 'string' ? text.replace(/```json|```/g, '').trim() : '';

    // parsea el JSON final
    return JSON.parse(clean);
  } catch (error) {
    console.error('❌ Error al parsear JSON:', error.message);
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
  console.log("archivo:",file)
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
    console.log('jean', data);
     const mappingData = parseJsonSafe(data);

    return mappingData;
  } catch (error) {
    console.error("❌ Error al enviar el archivo:", error);
    throw error;
  }
}