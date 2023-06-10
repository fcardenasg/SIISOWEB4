import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';


/* RIESGO HISTORIA LABORAL */
export const GetByIdWorkHistoryRisk = async (id) => await getData(Url.RiesgoHistoriaLaboralId, { id });
export const UpdateWorkHistoryRisks = async (riesgoHistoriaLaboral) => await putData(Url.RiesgoHistoriaLaboral, riesgoHistoriaLaboral);
export const DeleteWorkHistoryRisk = async (idRiesgoHistoriaLaboral) => await deleteData(Url.RiesgoHistoriaLaboral, { idRiesgoHistoriaLaboral });
export const GetAllByChargeWHRAdvanceDLTD = async (documento, riesgo) => await getData(Url.RHLByChargeAdvance, { documento, riesgo });
export const GetAllRHL = async (documento, atencion) => await getData(Url.ReportRHL, { documento, atencion });
export const RiskDLTDDeleteAndInsertRisk = async (riesgo, documento, atencion) => await getData(Url.RHLDeleteAndInsertRisk, { riesgo, documento, atencion });

/* RIESGO HISTORIA LABORAL OTRAS EMPRESAS */
export const UpdateWorkHistoryRisksCompany = async (riesgoHistoriaLaboralOtrasEmpresas) => await putData(Url.RiesgoHistoriaLaboralEmpresa, riesgoHistoriaLaboralOtrasEmpresas);
export const DeleteWorkHistoryRiskCompany = async (idRiesgoHistoriaLaboralOtrasEmpresas) => await deleteData(Url.RiesgoHistoriaLaboralEmpresa, { idRiesgoHistoriaLaboralOtrasEmpresas });
export const GetByIdWorkHistoryRiskCompany = async (id) => await getData(Url.RiesgoHistoriaLaboralIdEmpresa, { id });
export const GetAllByChargeWHRAdvanceCompany = async (documento, riesgo) => await getData(Url.RHLByChargeAdvanceEmpresa, { documento, riesgo });
export const RiskCompanyDeleteAndInsertRisk = async (riesgo, documento) => await getData(Url.RHLOEDeleteAndInsertRisk, { riesgo, documento });
export const GetAllRHLOE = async (documento) => await getData(Url.ReportRHLOE, { documento });
export const GetDataExploracion = async (documento) => await getData(Url.RiesgoHistoriaLaboralEmpresa_GetDataExploracion, { documento });