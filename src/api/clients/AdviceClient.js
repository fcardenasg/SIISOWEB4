import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllAdvice = async () => await getData(Url.AsesoriasAll);
export const GetAllByTipoAtencion = async (idTipoAtencion, otra) => await getData(Url.Asesorias, { idTipoAtencion, otra });
export const GetByIdAdvice = async (id) => await getData(Url.AsesoriasId, { id });
export const InsertAdvice = async (asesorias) => await postData(Url.Asesorias, asesorias);
export const UpdateAdvices = async (asesorias) => await putData(Url.Asesorias, asesorias);
export const DeleteAdvice = async (idAsesorias) => await deleteData(Url.Asesorias, { idAsesorias });

export const GetExcelAdvice = async (parametroExcel) => await postData(Url.AsesoriasExcel, parametroExcel);
export const SaveAdvice = async (asesorias) => await postData(Url.Asesorias, asesorias);

/* Reportes de PDF */
export const GetReportePdf = async () => await getData(Url.AsesoriasReportePdf);