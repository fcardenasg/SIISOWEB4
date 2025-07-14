import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllRiskAll = async () => await getData(Url.GrupoRiesgoTodo);
export const GetAllRisk = async (idGrupo) => await getData(Url.GrupoRiesgo, { idGrupo });
export const GetByIdRisk = async (id) => await getData(Url.GrupoRiesgoId, { id });
export const GetComboClase = async (idGrupo) => await getData(`${Url.GrupoRiesgo}/combo-clase`, { idGrupo });
export const InsertRisk = async (grupoRiesgo) => await postData(Url.GrupoRiesgo, grupoRiesgo);
export const UpdateRisks = async (grupoRiesgo) => await putData(Url.GrupoRiesgo, grupoRiesgo);
export const DeleteRisk = async (idGrupoRiesgo) => await deleteData(Url.GrupoRiesgo, { idGrupoRiesgo });