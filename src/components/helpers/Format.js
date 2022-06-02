const FormatDate = (date = new Date()) => {
    try {
        const fechaFormat = new Date(date).toISOString().split('T')[0];
        return fechaFormat;
    } catch (error) {
        console.log(error);
    }
}

const ViewFormat = (fecha = new Date()) => {
    const fechaFormat = new Date(fecha).toISOString().split('T')[0];
    return fechaFormat;
}

export {
    FormatDate,
    ViewFormat
}