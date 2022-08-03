import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllUser = async (page, pageSize) => await getData(Url.Usuarios, { page, pageSize });
export const GetByIdUser = async (id) => await getData(Url.UsuariosId, { id });
export const InsertUser = async (usuarios) => await postData(Url.Usuarios, usuarios);
export const UpdateUsers = async (usuarios) => await putData(Url.Usuarios, usuarios);
export const DeleteUser = async (idUsuarios) => await deleteData(Url.Usuarios, { idUsuarios });