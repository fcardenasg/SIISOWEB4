import axios from 'axios';

const getColor = (estado) => {
    switch (estado) {
        case 'alta':
            return '#FF0000'; 
        case 'media':
            return '#0269ca'; 
        case 'baja':
            return '#219707'; 
        default:
            return '#bdbdbd'; 
    }
};

export async function getEvents(filtercitas) {  
    
    try {
        const response = await axios.post(`https://localhost:44347/api/CalendarioCitas/get-idmedico`,filtercitas,{
            headers: {
                "Content-Type": "application/json"
            }
        });

        const { datos } = response.data;   

        const eventos = Array.isArray(datos) ? datos.map((item) => ({
            id: item?.id,
            title: item?.nombreempleado,
            start: item?.fecha,
            color: getColor(item?.prioridad),
            allDay: false,
            extendedProps: {
                empleado:item?.idempleado,
                nombreempleado:item?.nombreempleado,
                prioridad: item?.prioridad,
                descripcion:item?.descripcion,
                message:item?.message,
                whatsapp:item?.whatsapp,
                email:item?.email,
                idtipoatencion:item?.idtipoatencion,
                idmotivo:item?.idmotivo,
                idsubmotivo:item?.idsubmotivo,
                url:item?.url,
                idasesoria:item?.idasesoria 
            }
        })):[];

        return eventos;
    } catch (error) {
        throw error;
    }
}

export async function addEvent(event) {
    console.log(event);
    try {
        const response = await axios.post('https://localhost:44347/api/CalendarioCitas', event);      
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateEvent(event) {
    console.log("datos para actualizar",event)
    try {
        const response = await axios.put('https://localhost:44347/api/CalendarioCitas', event);
        return response.data;
    } catch (error) {       
        console.log(error)
        throw error;
    }
}

export async function removeEvent(eventId) {
    try {
        const response = await axios.delete(`https://localhost:44347/api/CalendarioCitas/${eventId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
