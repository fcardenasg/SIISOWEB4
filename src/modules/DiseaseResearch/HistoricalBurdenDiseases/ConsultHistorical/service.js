/**
 * Convierte una cadena Base64 en una URL de objeto Blob lista para usar.
 * @param {string} base64String - El string en base64 (con o sin prefijo data:)
 * @param {string} mimeType - El tipo de archivo (por defecto 'application/pdf')
 * @returns {string | null} La URL del objeto para asignar al estado, o null si falla.
 */
export  const convertBase64ToBlobUrl = (base64String, mimeType = 'application/pdf') => {
  if (!base64String) return null;

  try {
    // 1. Limpiar el prefijo si viene incluido (ej: "data:application/pdf;base64,")
    const regex = new RegExp(`^data:${mimeType.replace('/', '\\/')};base64,`);
    const base64Clean = base64String.replace(regex, '');

    // 2. Decodificar Base64 a string binario
    const binaryString = atob(base64Clean);
    const length = binaryString.length;

    // 3. Crear la matriz de bytes
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // 4. Crear el Blob y su URL
    const blob = new Blob([bytes], { type: mimeType });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error al convertir Base64 a Blob URL:", error);
    return null;
  }
};