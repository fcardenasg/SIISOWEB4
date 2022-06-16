import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllWorkHistoryRisk = async (page, pageSize) => await getData(Url.RiesgoHistoriaLaboral, { page, pageSize });
export const GetAllByHistorico = async (page, pageSize, documento) => await getData(Url.RiesgoHistoriaLaboralByHistorico, { page, pageSize, documento });
export const GetAllByChargeWHR = async (page, pageSize, cargo, riesgo) => await getData(Url.RiesgoHistoriaLaboralByCharge, { page, pageSize, cargo, riesgo });
export const GetAllByChargeWHRAdvance = async (page, pageSize, cargo, riesgo, idHistoriaLaboral) => await getData(Url.RiesgoHistoriaLaboralByChargeAdvance, { page, pageSize, cargo, riesgo, idHistoriaLaboral });
export const GetByIdWorkHistoryRisk = async (id) => await getData(Url.RiesgoHistoriaLaboralId, { id });
export const InsertWorkHistoryRisk = async (riesgoHistoriaLaboral) => await postData(Url.RiesgoHistoriaLaboral, riesgoHistoriaLaboral);
export const UpdateWorkHistoryRisks = async (riesgoHistoriaLaboral) => await putData(Url.RiesgoHistoriaLaboral, riesgoHistoriaLaboral);
export const DeleteWorkHistoryRisk = async (idRiesgoHistoriaLaboral) => await deleteData(Url.RiesgoHistoriaLaboral, { idRiesgoHistoriaLaboral });