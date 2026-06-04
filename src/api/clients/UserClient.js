import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllUser = async () => await getData(Url.Usuarios);
export const GetAllComboUser = async () => await getData(Url.UsuariosCombo);
export const GetAllComboArea = async (idArea) => await getData(Url.UsuariosComboArea, { idArea });
export const GetByIdUser = async (id) => await getData(Url.UsuariosId, { id });
export const GetByMail = async (email) => await getData(Url.UsuariosEmail, { email });
export const InsertUser = async (usuarios) => await postData(Url.Usuarios, usuarios);
export const UpdateUsers = async (usuarios) => await putData(Url.Usuarios, usuarios);
export const UpdateSedeUser = async (updateSedeDTO) => await putData(Url.UsuariosUpdateSede, updateSedeDTO);
export const DeleteUser = async (idUsuarios) => await deleteData(Url.Usuarios, { idUsuarios });

export const GetAllComboAsesorInvestigacion = async (isInvestigation) => await getData(`${Url.Usuarios}/combo-asesor-investigacion`, { isInvestigation });
export const GetAllComboVentanilla = async () => await getData(Url.UsuariosVentanilla);
export const GetAllComboRegTaxi = async () => await getData(Url.UsuariosRegTaxi);
export const GetAllComboByIdRol = async (idRol) => await getData(Url.UsuariosRol, { idRol });
export const GetAllComboAsesorAptHigiene = async () => await getData(`${Url.Usuarios}/combo-asesor-apthigiene`);

/* Permisos */
export const InsertPermisosUser = async (idUsuario) => await getData(Url.UsuariosInsertPermiso, { idUsuario });
export const GetPermisosUser = async (idUsuario) => await getData(Url.UsuariosGetPermisos, { idUsuario });
export const UpdatePermiso = async (accion) => await putData(Url.UsuariosUpdatePermiso, accion);
export const InsertPermisoIndividual = async (accion) => await postData(Url.UsuariosInsertPermiso, accion);
export const GetPermiso = async () => await getData(Url.UsuariosListPermisos);
export const GetSharePermission = async (accion) => await postData(Url.UsuariosPermisos, accion);