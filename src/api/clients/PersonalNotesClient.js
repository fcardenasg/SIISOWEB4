import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllPersonalNotes = async (page, pageSize) => await getData(Url.ApuntesPersonales, { page, pageSize });
export const GetByIdPersonalNotes = async (id) => await getData(Url.ApuntesPersonalesId, { id });
export const InsertPersonalNotes = async (apuntesPersonales) => await postData(Url.ApuntesPersonales, apuntesPersonales);
export const UpdatePersonalNotess = async (apuntesPersonales) => await putData(Url.ApuntesPersonales, apuntesPersonales);
export const DeletePersonalNotes = async (idApuntesPersonales) => await deleteData(Url.ApuntesPersonales, { idApuntesPersonales });