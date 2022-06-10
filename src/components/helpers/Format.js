const FormatDate = (date = new Date()) => {
    try {
        const fechaFormat = new Date(date).toISOString().split('T')[0];
        return fechaFormat;
    } catch (error) {
        console.log(error);
    }
}

const ViewFormat = (fecha = new Date()) => {
    try {
        const fechaFormat = new Date(fecha).toISOString().split('T')[0];
        return fechaFormat;
    } catch (error) { }
}

function GetEdad(dateString) {
    let hoy = new Date()
    let fechaNacimiento = new Date(dateString)
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    if (
        diferenciaMeses < 0 ||
        (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
    ) {
        edad--
    }
    return edad
}

export {
    FormatDate,
    ViewFormat,
    GetEdad
}