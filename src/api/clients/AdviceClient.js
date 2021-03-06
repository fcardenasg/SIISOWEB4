import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllAdvice = async (page, pageSize) => await getData(Url.Asesorias, { page, pageSize });
export const GetByIdAdvice = async (id) => await getData(Url.AsesoriasId, { id });
export const InsertAdvice = async (asesorias) => await postData(Url.Asesorias, asesorias);
export const UpdateAdvices = async (asesorias) => await putData(Url.Asesorias, asesorias);
export const DeleteAdvice = async (idAsesorias) => await deleteData(Url.Asesorias, { idAsesorias });