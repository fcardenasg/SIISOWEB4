import CryptoJS from 'crypto-js';

export function linkAgoramedico(fecha,data,uniqueId) {
    const appId = '24620e849c55400aad51c1da9141ac46';    
    const channel = `rubikapp-${uniqueId}`;
    const SECRET_kEY = 'rubikapp';

    const encodedData = encodeURIComponent(JSON.stringify(data));

    console.log("fecha",channel)

    let url;

    if (appId && channel &&fecha) {
        const encryptedDate = CryptoJS.AES.encrypt(fecha, SECRET_kEY).toString();
        url = `/medicaladvice/add?appId=${appId}&channel=${channel}&data=${encodedData}&tokenend=${encodeURIComponent(encryptedDate)}`;
    }

    return url;
}

export function linkAgorapaciente(fecha,uniqueId) {
    const appId = '24620e849c55400aad51c1da9141ac46';    
    const channel = `rubikapp-${uniqueId}`;
    const SECRET_kEY = 'rubikapp';

    const fechaLocal = new Date();
   console.log(fechaLocal.toLocaleString());

    console.log("fecha paciente::",fecha)
  

    let url;

    if (appId && channel &&fecha) {
        const encryptedDate = CryptoJS.AES.encrypt(fecha, SECRET_kEY).toString();
        url = `/videocall-patient?appId=${appId}&channel=${channel}&tokenend=${encodeURIComponent(encryptedDate)}`;
    }

    return url;
}

export function ajustarFechaUTC(fecha) {
    const fechaSeleccionada = new Date(fecha);
    fechaSeleccionada.setHours(0, 0, 0, 0);
  
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
  
    console.log("fecha::", fechaSeleccionada, "==", fechaActual);
    return fechaSeleccionada >= fechaActual;
  }
  