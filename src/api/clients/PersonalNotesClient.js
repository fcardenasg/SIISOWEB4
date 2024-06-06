import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllPersonalNotes = async (page, pageSize, usuario) => await getData(Url.ApuntesPersonales, { page, pageSize, usuario });
export const GetByIdPersonalNotes = async (id) => await getData(Url.ApuntesPersonalesId, { id });
export const InsertPersonalNotes = async (apuntesPersonales) => await postData(Url.ApuntesPersonales, apuntesPersonales);
export const UpdatePersonalNotess = async (apuntesPersonales) => await putData(Url.ApuntesPersonales, apuntesPersonales);
export const DeletePersonalNotes = async (idApuntesPersonales) => await deleteData(Url.ApuntesPersonales, { idApuntesPersonales });

export const GetAllIndexNote = async (usuario) => await getData(Url.ApuntesIndexacion, { usuario });
export const GetByIdIndexNote = async (id) => await getData(Url.ApuntesIndexacionId, { id });
export const InsertIndexNote = async (apuntesIndexacion) => await postData(Url.ApuntesIndexacion, apuntesIndexacion);
export const UpdateIndexNotes = async (apuntesIndexacion) => await putData(Url.ApuntesIndexacion, apuntesIndexacion);
export const DeleteIndexNote = async (idApuntesIndexacion) => await deleteData(Url.ApuntesIndexacion, { idApuntesIndexacion });