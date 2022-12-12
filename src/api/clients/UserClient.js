import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllUser = async () => await getData(Url.Usuarios);
export const GetByIdUser = async (id) => await getData(Url.UsuariosId, { id });

export const GetByIdRol = async (idRol) => await getData(Url.UsuariosIdRol, { idRol });

export const GetByMail = async (email) => await getData(Url.UsuariosEmail, { email });
export const InsertUser = async (usuarios) => await postData(Url.Usuarios, usuarios);
export const UpdateUsers = async (usuarios) => await putData(Url.Usuarios, usuarios);
export const DeleteUser = async (idUsuarios) => await deleteData(Url.Usuarios, { idUsuarios });