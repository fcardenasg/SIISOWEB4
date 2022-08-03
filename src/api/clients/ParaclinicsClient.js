import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllParaclinics = async (page, pageSize) => await getData(Url.Paraclinicos, { page, pageSize });
export const GetAllByTypeParaclinics = async (page, pageSize, idTipoParaclinico) =>
    await getData(Url.Paraclinicos_GetAllByTypeParaclinico, { page, pageSize, idTipoParaclinico });
export const GetByIdParaclinics = async (id) => await getData(Url.ParaclinicosId, { id });
export const InsertParaclinics = async (paraclinicos) => await postData(Url.Paraclinicos, paraclinicos);
export const UpdateParaclinicss = async (paraclinicos) => await putData(Url.Paraclinicos, paraclinicos);
export const DeleteParaclinics = async (idParaclinicos) => await deleteData(Url.Paraclinicos, { idParaclinicos });