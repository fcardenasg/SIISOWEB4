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
        throw error;
    }
}

export async function getData(url = '', parametros = {}) {
    try {
        const urlGet = new URL(`${Url.Base}${url}`)
        Object.keys(parametros).forEach(key => urlGet.searchParams.append(key, parametros[key]));

        return await axios.get(urlGet)
            .then(respuesta => {
                if (respuesta.status !== 200) throw Error(respuesta.status);
                return respuesta;
            }).catch((error) => { })
    } catch (error) { }
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