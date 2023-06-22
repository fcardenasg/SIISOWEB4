import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllAttention = async () => await getData(Url.RegistroAtencion);
export const GetAllAtencion = async (page, pageSize, atencion, idSede) => await getData(Url.RegistroAtencio_GetAllAtencion, { page, pageSize, atencion, idSede });
export const GetByIdAttention = async (id) => await getData(Url.RegistroAtencionId, { id });
export const InsertAttention = async (registroAtencion) => await postData(Url.RegistroAtencion, registroAtencion);
export const DeleteAttention = async (idRegistroAtencion) => await deleteData(Url.RegistroAtencion, { idRegistroAtencion });
export const UpdateAttentions = async (registroAtencion) => await putData(Url.RegistroAtencion, registroAtencion);
export const UpdateEstadoRegistroAtencion = async (registroAtencionDTO) => await putData(Url.UpdateEstadoRegistroAtencion, registroAtencionDTO);

export const ValidateIdRegistroAtencion = async (idRegistroAtencion, option) => await getData(Url.RegistroAtencionValidateAtencion, { idRegistroAtencion, option });