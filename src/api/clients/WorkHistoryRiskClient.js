import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllWorkHistoryRisk = async (page, pageSize) => await getData(Url.RiesgoHistoriaLaboral, { page, pageSize });
export const GetAllByChargeHistorico = async (page, pageSize, cargo, riesgo, documento) => await getData(Url.RHLByChargeHistorico, { page, pageSize, cargo, riesgo, documento });
export const GetAllByHistorico = async (page, pageSize, documento) => await getData(Url.RHLByHistorico, { page, pageSize, documento });

export const GetByIdWorkHistoryRisk = async (id) => await getData(Url.RiesgoHistoriaLaboralId, { id });
export const InsertWorkHistoryRisk = async (riesgoHistoriaLaboral) => await postData(Url.RiesgoHistoriaLaboral, riesgoHistoriaLaboral);
export const UpdateWorkHistoryRisks = async (riesgoHistoriaLaboral) => await putData(Url.RiesgoHistoriaLaboral, riesgoHistoriaLaboral);
export const DeleteWorkHistoryRisk = async (idRiesgoHistoriaLaboral) => await deleteData(Url.RiesgoHistoriaLaboral, { idRiesgoHistoriaLaboral });

export const GetAllWorkHistoryRiskCompany = async (page, pageSize) => await getData(Url.RiesgoHistoriaLaboralEmpresa, { page, pageSize });
export const GetAllByHistoricoCompany = async (page, pageSize, documento) => await getData(Url.RHLByHistoricoEmpresa, { page, pageSize, documento });
export const GetByIdWorkHistoryRiskCompany = async (id) => await getData(Url.RiesgoHistoriaLaboralIdEmpresa, { id });
export const InsertWorkHistoryRiskCompany = async (riesgoHistoriaLaboralOtrasEmpresas) => await postData(Url.RiesgoHistoriaLaboralEmpresa, riesgoHistoriaLaboralOtrasEmpresas);
export const UpdateWorkHistoryRisksCompany = async (riesgoHistoriaLaboralOtrasEmpresas) => await putData(Url.RiesgoHistoriaLaboralEmpresa, riesgoHistoriaLaboralOtrasEmpresas);
export const DeleteWorkHistoryRiskCompany = async (idRiesgoHistoriaLaboralOtrasEmpresas) => await deleteData(Url.RiesgoHistoriaLaboralEmpresa, { idRiesgoHistoriaLaboralOtrasEmpresas });
export const GetAllByChargeHistoricoCompany = async (page, pageSize, riesgo, documento) => await getData(Url.RHLByChargeHistoricoEmpresa, { page, pageSize, riesgo, documento });

/* Servicio elimina e inserta nuevamente los riesgos */
export const RiskCompanyDeleteAndInsertRisk = async (riesgo, documento) => await getData(Url.RHLOEDeleteAndInsertRisk, { riesgo, documento });
export const RiskDLTDDeleteAndInsertRisk = async (riesgo, documento) => await getData(Url.RHLDeleteAndInsertRisk, { riesgo, documento });

/* Consulta los riesgos por riesgo y documento */
export const GetAllByChargeWHRAdvanceCompany = async (page, pageSize, documento, riesgo) => await getData(Url.RHLByChargeAdvanceEmpresa, { page, pageSize, documento, riesgo });
export const GetAllByChargeWHRAdvanceDLTD = async (page, pageSize, documento, riesgo) => await getData(Url.RHLByChargeAdvance, { page, pageSize, documento, riesgo });


export const GetAllRHL = async (documento) => await getData(Url.ReportRHL, { documento });
export const GetAllRHLOE = async (documento) => await getData(Url.ReportRHLOE, { documento });