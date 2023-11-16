import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetByIdRol = async (id) => await getData(Url.RolId, { id });
export const GetByIdPermiso = async (id) => await getData(Url.RolIdPermiso, { id });
export const GetByListMenuRol = async (id) => await getData(Url.RolList, { id });
export const GetAllRol = async () => await getData(Url.Rol);

export const InsertRol = async (rol) => await postData(Url.Rol, rol);
export const UpdateRols = async (rol) => await putData(Url.Rol, rol);
export const DeleteRol = async (idRol, isPermiso) => await deleteData(Url.Rol, { idRol, isPermiso });

export const GetComboRol = async () => await getData(Url.RolComboRol);
export const GetComboComponente = async () => await getData(Url.RolComboCompo);
export const GetComboItemMenu = async (lsIdComponente) => await postData(Url.RolComboItem, lsIdComponente);
export const GetComboCardItem = async (lsIdItemMenu) => await postData(Url.RolComboCard, lsIdItemMenu);