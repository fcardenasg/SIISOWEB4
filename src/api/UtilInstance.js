import { Url } from "./instances/AuthRoute";
import axios from "axios";

export async function postData(url = '', datos = {}, headersVali = false) {
    try {
        const config = {
            method: 'post',
            url: `${Url.Base}${url}`,
            data: datos
        };

        if (!headersVali) {
            config.headers = { 'Content-Type': 'application/json' };
        }

        const respuesta = await axios(config);

        if (respuesta.status !== 200) {
            throw new Error(respuesta.status);
        }

        return respuesta;
    } catch (error) {
        
    }
}

export async function getData(url = '', parametros = {}) {
    try {
        const urlGet = new URL(`${Url.Base}${url}`);

        Object.keys(parametros).forEach(key => {
            const valor = parametros[key];
            // Solo agregamos el parámetro si no es null ni undefined
            if (valor !== null && valor !== undefined) {
                urlGet.searchParams.append(key, valor);
            }
        });

        const respuesta = await axios.get(urlGet.toString());

        if (respuesta.status !== 200) throw Error(respuesta.status);
        return respuesta;

    } catch (error) {
    }
}

export async function putData(url = '', datos = {}) {
    try {
        return await axios({
            method: 'put',
            url: `${Url.Base}${url}`,
            data: datos
        }).then(respuesta => {
            if (respuesta.status !== 200) throw Error(respuesta.status);
            return respuesta;
        }).catch((error) => {
        })
    } catch (error) { }
}

export async function deleteData(url = '', parametros = {}) {
    try {
        const urlDelete = new URL(`${Url.Base}${url}`)
        Object.keys(parametros).forEach(key => urlDelete.searchParams.append(key, parametros[key]))

        return await axios.delete(urlDelete)
            .then(respuesta => {
                if (respuesta.status !== 200) throw Error(respuesta.status);

                return respuesta;
            }).catch((error) => {
            })
    }
    catch (error) { }
}