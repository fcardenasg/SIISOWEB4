import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllCIE11 = async (page, pageSize) => await getData(Url.CIE11, { page, pageSize });
export const GetAllByCodeOrName = async (page, pageSize, search) => await getData(Url.CIE11Search, { page, pageSize, search });
export const GetByIdCIE11 = async (id) => await getData(Url.CIE11Id, { id });
export const InsertCIE11 = async (cie11) => await postData(Url.CIE11, cie11);
export const UpdateCIE11s = async (cie11) => await putData(Url.CIE11, cie11);
export const DeleteCIE11 = async (idCIE11) => await deleteData(Url.CIE11, { idCIE11 });