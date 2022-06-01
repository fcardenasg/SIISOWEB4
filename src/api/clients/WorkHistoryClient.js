import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllWorkHistory = async (page, pageSize) => await getData(Url.HistoriaLaboral, { page, pageSize });
export const GetByIdWorkHistory = async (id) => await getData(Url.HistoriaLaboralId, { id });
export const InsertWorkHistory = async (historiaLaboral) => await postData(Url.HistoriaLaboral, historiaLaboral);
export const UpdateWorkHistorys = async (historiaLaboral) => await putData(Url.HistoriaLaboral, historiaLaboral);
export const DeleteWorkHistory = async (idHistoriaLaboral) => await deleteData(Url.HistoriaLaboral, { idHistoriaLaboral });