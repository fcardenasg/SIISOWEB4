import { ArrayMeses } from "components/Arrays";

export const convertToBase64 = (archivos) => {
    Array.from(archivos).forEach(archivo => {
        var reader = new FileReader();
        reader.readAsDataURL(archivo);
        reader.onload = function () {
            return reader.result;
        }
    })
}

export const DownloadFile = (filename, bytesBase64) => {
    if (navigator.msSaveBlob) {
        //Download document in Edge browser
        var data = window.atob(bytesBase64);
        var bytes = new Uint8Array(data.length);
        for (var i = 0; i < data.length; i++) {
            bytes[i] = data.charCodeAt(i);
        }
        var blob = new Blob([bytes.buffer], { type: "application/octet-stream" });
        navigator.msSaveBlob(blob, filename);
    }
    else {
        var link = document.createElement('a');
        link.download = filename;
        link.href = "data:application/octet-stream;base64," + bytesBase64;
        document.body.appendChild(link); // Needed for Firefox
        link.click();
        document.body.removeChild(link);
    }
}

export const ConvertStringToInt = (arregloDeCadenas) => {
    var arregloDeEnteros = [];

    for (var i = 0; i < arregloDeCadenas.length; i++) {
        var entero = parseInt(arregloDeCadenas[i]);
        arregloDeEnteros.push(entero);
    }

    return arregloDeEnteros;
}

export const ConvertToArregloMeses = (arregloDeMeses) => {
    var arregloDeEnterosMeses = [];

    for (var i = 0; i < arregloDeMeses.length; i++) {
        var stringMes = arregloDeMeses[i];
        var numeroMes = ArrayMeses.filter(x => x.label === stringMes)[0].value;

        arregloDeEnterosMeses.push(numeroMes);
    }

    return arregloDeEnterosMeses;
}