import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllWorkHistoryRisk = async (page, pageSize) => await getData(Url.RiesgoHistoriaLaboral, { page, pageSize });
export const GetAllByChargeWHR = async (page, pageSize, cargo, riesgo) => await getData(Url.RiesgoHistoriaLaboralByCharge, { page, pageSize, cargo, riesgo });
export const GetByIdWorkHistoryRisk = async (id) => await getData(Url.RiesgoHistoriaLaboralId, { id });
export const InsertWorkHistoryRisk = async (riesgoHistoriaLaboral) => await postData(Url.RiesgoHistoriaLaboral, riesgoHistoriaLaboral);
export const UpdateWorkHistoryRisks = async (riesgoHistoriaLaboral) => await putData(Url.RiesgoHistoriaLaboral, riesgoHistoriaLaboral);
export const DeleteWorkHistoryRisk = async (idRiesgoHistoriaLaboral) => await deleteData(Url.RiesgoHistoriaLaboral, { idRiesgoHistoriaLaboral });