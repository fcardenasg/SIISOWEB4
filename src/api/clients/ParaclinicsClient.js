import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllByDocumentoPara = async (page, pageSize, documento) =>
    await getData(Url.Paraclinicos_GetAllByDocumento, { page, pageSize, documento });

export const GetAllByDocumentoParacli = async (page, pageSize, idTipoParaclinico, documento) =>
    await getData(Url.Paraclinicos_GetAllByDocumentoParacli, { page, pageSize, idTipoParaclinico, documento });

export const GetAllByTypeParaclinics = async (idTipoParaclinico) => await getData(Url.Paraclinicos_Por, { idTipoParaclinico });
export const GetExcelParaclinics = async (paraclinicos) => await postData(Url.ParaclinicosExcel, paraclinicos);

export const GetByIdParaclinics = async (id) => await getData(Url.ParaclinicosId, { id });
export const InsertParaclinics = async (paraclinicos) => await postData(Url.Paraclinicos, paraclinicos);
export const UpdateParaclinicss = async (paraclinicos) => await putData(Url.Paraclinicos, paraclinicos);
export const DeleteParaclinics = async (idParaclinicos) => await deleteData(Url.Paraclinicos, { idParaclinicos });