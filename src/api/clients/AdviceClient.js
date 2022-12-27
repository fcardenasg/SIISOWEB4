import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllAdvice = async (page, pageSize) => await getData(Url.Asesorias, { page, pageSize });
export const GetAllByTipoAtencion = async (page, pageSize, idTipoAtencion) => await getData(Url.AsesoriasGetAllByTipoAtencion, { page, pageSize, idTipoAtencion });
export const GetAllByTipoAtencion2 = async (page, pageSize, idTipoAtencionM, idTipoAtencionP) => await getData(Url.AsesoriasGetAllByTipoAtencion2, { page, pageSize, idTipoAtencionM, idTipoAtencionP });
export const GetByIdAdvice = async (id) => await getData(Url.AsesoriasId, { id });
export const InsertAdvice = async (asesorias) => await postData(Url.Asesorias, asesorias);
export const UpdateAdvices = async (asesorias) => await putData(Url.Asesorias, asesorias);
export const DeleteAdvice = async (idAsesorias) => await deleteData(Url.Asesorias, { idAsesorias });