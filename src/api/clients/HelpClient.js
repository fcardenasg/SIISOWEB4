import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetByIdSoporte = async (id) => await getData(Url.SoporteId, { id });
export const GetAllSoporte = async (idEstado) => await getData(Url.Soporte, { idEstado });
export const InsertSoporte = async (soporte) => await postData(Url.Soporte, soporte);
export const DeleteAdvice = async (id) => await deleteData(Url.Soporte, { id });
export const UpdateStateSoporte = async (soporte) => await putData(Url.SoporteUpdateState, soporte);