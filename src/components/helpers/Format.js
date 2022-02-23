const FormatDate = (date) => {
    date = new Date(date);
    const formato = new Intl.DateTimeFormat("en", {
        year: 'numeric',
        month: '2-digit',
        day: "2-digit"
    });

    const [
        { value: month },,
        { value: day },,
        { value: year }
    ] = formato.formatToParts(date);

    return `${year}-${month}-${day}`;
}

const DateFormat = (fecha) => {
    var result = fecha.toUTCString();
    return result;
}

export {
    FormatDate,
    DateFormat
}