const FormatDate = (date = new Date()) => {
    try {
        const fecha = new Date(date).toISOString().split('.')[0];
        return fecha;
    } catch (error) {
        console.log(error);
    }
}

const DateFormat = (fecha) => {
    var result = fecha.toUTCString();
    return result;
}

export {
    FormatDate,
}