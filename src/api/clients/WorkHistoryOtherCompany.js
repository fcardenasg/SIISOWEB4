import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllWorkHistoryOtherCompany = async (page, pageSize) => await getData(Url.HistoriaLaboralOtrasEmpresas, { page, pageSize });
export const GetAllByDocumentWorkHistoryOtherCompany = async (page, pageSize, documento) => await getData(Url.HistoriaLaboralOtrasEmpresasGetAllByDocument, { page, pageSize, documento });
export const GetByIdWorkHistoryOtherCompany = async (id) => await getData(Url.HistoriaLaboralOtrasEmpresasId, { id });
export const InsertWorkHistoryOtherCompany = async (historiaLaboralOtrasEmpresas) => await postData(Url.HistoriaLaboralOtrasEmpresas, historiaLaboralOtrasEmpresas);
export const UpdateWorkHistoryOtherCompanys = async (historiaLaboralOtrasEmpresas) => await putData(Url.HistoriaLaboralOtrasEmpresas, historiaLaboralOtrasEmpresas);
export const DeleteWorkHistoryOtherCompany = async (idHistoriaLaboralOtrasEmpresas) => await deleteData(Url.HistoriaLaboralOtrasEmpresas, { idHistoriaLaboralOtrasEmpresas });