export const convertToBase64 = (archivos) => {
    Array.from(archivos).forEach(archivo => {
        var reader = new FileReader();
        reader.readAsDataURL(archivo);
        reader.onload = function () {
            return reader.result;
        }
    })
}