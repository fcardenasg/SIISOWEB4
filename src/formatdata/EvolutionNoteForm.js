const cleanData = (data) => {
    const cleaned = {};
    Object.keys(data).forEach(key => {
        cleaned[key] = data[key] === "" ? null : data[key];
    });
    return cleaned;
};

export function MapEvolutionNote(datos, idExistente = null) {
    const payload = {
        documento: datos.documento,
        fecha: datos.fecha,
        idRegistroAtencion: datos.idRegistroAtencion,
        atencion: datos.atencion || null,
        idContingencia: datos.idContingencia || null,
        idTurno: datos.idTurno || null,
        idDiaTurno: datos.idDiaTurno || null,
        nota: datos.nota || null,
        dx1: datos.dx1 || null,
        dx2: datos.dx2 || null,
        dx3: datos.dx3 || null,
        planManejo: datos.planManejo || null,
        idConceptoActitud: datos.idConceptoActitud || null,
        idRemitido: datos.idRemitido || null
    };

    if (idExistente) {
        payload.id = idExistente;
    }

    return cleanData(payload);
}