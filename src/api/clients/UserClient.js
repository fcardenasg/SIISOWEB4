import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllUser = async (page, pageSize) => await getData(Url.Usuarios, { page, pageSize });
export const GetAllComboUser = async () => await getData(Url.UsuariosCombo);
export const GetByIdUser = async (id) => await getData(Url.UsuariosId, { id });
export const GetByMail = async (email) => await getData(Url.UsuariosEmail, { email });
export const InsertUser = async (usuarios) => await postData(Url.Usuarios, usuarios);
export const UpdateUsers = async (usuarios) => await putData(Url.Usuarios, usuarios);
export const UpdateSedeUser = async (updateSedeDTO) => await putData(Url.UsuariosUpdateSede, updateSedeDTO);
export const DeleteUser = async (idUsuarios) => await deleteData(Url.Usuarios, { idUsuarios });