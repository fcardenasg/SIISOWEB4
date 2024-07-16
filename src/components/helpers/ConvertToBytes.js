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

export function Base64ToFile(base64, filename, mimeType) {
    if (base64.startsWith('data:')) {
        var arr = base64.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        var file = new File([u8arr], filename, { type: mime || mimeType });
        return Promise.resolve(file);
    }
    return fetch(base64)
        .then(res => res.arrayBuffer())
        .then(buf => new File([buf], filename, { type: mimeType }));
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

export function fData(inputValue) {
    if (!inputValue) return '';

    if (inputValue === 0) return '0 Bytes';

    const units = ['bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];

    const decimal = 2;

    const baseValue = 1024;

    const number = Number(inputValue);

    const index = Math.floor(Math.log(number) / Math.log(baseValue));

    const fm = `${parseFloat((number / baseValue ** index).toFixed(decimal))} ${units[index]}`;

    return fm;
}

export function fileTypeByUrl(fileUrl = '') {
    return (fileUrl && fileUrl.split('.').pop()) || '';
}

// ----------------------------------------------------------------------

export function fileNameByUrl(fileUrl) {
    return fileUrl.split('/').pop();
}

export function fileData(file) {
    // Url
    if (typeof file === 'string') {
        return {
            key: file,
            preview: file,
            name: fileNameByUrl(file),
            type: fileTypeByUrl(file),
        };
    }

    // File
    return {
        key: file.preview,
        name: file.name,
        size: file.size,
        path: file.path,
        type: file.type,
        preview: file.preview,
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
    };
}