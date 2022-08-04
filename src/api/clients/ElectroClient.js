import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllElectro = async (page, pageSize) => await getData(Url.Electro, { page, pageSize });
export const GetByIdElectro = async (id) => await getData(Url.ElectroId, { id });
export const InsertElectro = async (electro) => await postData(Url.Electro, electro);
export const UpdateElectros = async (electro) => await putData(Url.Electro, electro);
export const DeleteElectro = async (idElectro) => await deleteData(Url.Electro, { idElectro });