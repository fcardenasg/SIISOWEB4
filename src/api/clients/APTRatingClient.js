import { Url } from '../instances/AuthRoute';
import {
    getData,
    deleteData,
    postData,
    putData
} from '../UtilInstance';

// =============================
// PRINCIPAL
// =============================

export const GetAllAPTCalificacion = async () =>
    await getData(Url.APTCalificacion);

export const GetByIdAPTCalificacion = async (id) =>
    await getData(`${Url.APTCalificacion}/id`, { id });

export const InsertAPTCalificacion = async (apt) =>
    await postData(Url.APTCalificacion, apt);

export const UpdateAPTCalificacion = async (apt) =>
    await putData(Url.APTCalificacion, apt);

export const DeleteAPTCalificacion = async (id) =>
    await deleteData(Url.APTCalificacion, { id });

// =============================
// DETALLE FUENTES
// =============================

export const GetAllFuentesAPT = async (idAPT) =>
    await getData(`${Url.APTCalificacion}/fuentes`, {
        idAPT
    });

export const InsertFuenteAPT = async (detalleFuente) =>
    await postData(
        `${Url.APTCalificacion}/fuentes`,
        detalleFuente
    );

export const DeleteFuenteAPT = async (id) =>
    await deleteData(
        `${Url.APTCalificacion}/fuentes`,
        { id }
    );

// =============================
// DETALLE AGENTES
// =============================

export const GetAllAgentesAPT = async (idAPT) =>
    await getData(`${Url.APTCalificacion}/agentes`, {
        idAPT
    });

export const InsertAgenteAPT = async (detalleAgente) =>
    await postData(
        `${Url.APTCalificacion}/agentes`,
        detalleAgente
    );

export const DeleteAgenteAPT = async (id) =>
    await deleteData(
        `${Url.APTCalificacion}/agentes`,
        { id }
    );

// =============================
// COMBO EMPRESA
// =============================


    export const ComboEmpresaAPT =
    async () =>
        await getData(
            `${Url.APTCalificacion}/combo-empresa`
        );