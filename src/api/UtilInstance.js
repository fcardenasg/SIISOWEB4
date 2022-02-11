import { Url } from "./instances/AuthRoute";
import { getToken } from "./clients/AuthClient";
import axios from "axios";

export async function postData(url = '', datos = {}) {
    return await axios({
        method: 'post',
        url: `${Url.Base}${url}`,
        data: datos
    }).then(respuesta => {
        console.log(respuesta);
        if (respuesta.status !== 200) throw Error(respuesta.status);

        return respuesta;
    }).catch((error) => {
        console.log(error);
    })
}

export async function getData(url = '', parametros = {}) {
    const urlGet = new URL(`${Url.Base}${url}`)
    Object.keys(parametros).forEach(key => urlGet.searchParams.append(key, parametros[key]))

    console.log(urlGet);

    return await axios.get(urlGet)
        .then(respuesta => {
            console.log(respuesta);
            if (respuesta.status !== 200) throw Error(respuesta.status);

            return respuesta;
        }).catch((error) => {
            console.log(error);
        })
}

export async function putData(url = '', datos = {}) {

    return await axios({
        method: 'put',
        url: `${Url.Base}${url}`,
        data: datos
    }).then(respuesta => {
        console.log(respuesta);
        if (respuesta.status !== 200) throw Error(respuesta.status);

        return respuesta;
    }).catch((error) => {
        console.log(error);
    })
}

export async function deleteData(url = '', parametros = {}) {
    try {
        const urlDelete = new URL(`${Url.Base}${url}`)
        Object.keys(parametros).forEach(key => urlDelete.searchParams.append(key, parametros[key]))

        return await axios.delete(urlDelete)
            .then(respuesta => {
                console.log(respuesta);
                if (respuesta.status !== 200) throw Error(respuesta.status);

                return respuesta;
            }).catch((error) => {
                console.log(error);
            })
    }
    catch (error) {
        console.log("try=> ", error);
    }
}