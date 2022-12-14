import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllRol = async (page, pageSize) => await getData(Url.Rol, { page, pageSize });
export const GetByIdRol = async (id) => await getData(Url.RolId, { id });
export const InsertRol = async (rol) => await postData(Url.Rol, rol);
export const UpdateRols = async (rol) => await putData(Url.Rol, rol);
export const DeleteRol = async (idRol) => await deleteData(Url.Rol, { idRol });