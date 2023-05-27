import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllAccidentRate = async () => await getData(Url.Accidentalidad);
export const GetByIdAccidentRate = async (id) => await getData(Url.AccidentalidadId, { id });
export const InsertAccidentRate = async (accidentalidad) => await postData(Url.Accidentalidad, accidentalidad);
export const GetExcelAccidentRate = async (parametroExcel) => await postData(Url.AccidentalidadExcel, parametroExcel);
export const UpdateAccidentRates = async (accidentalidad) => await putData(Url.Accidentalidad, accidentalidad);
export const DeleteAccidentRate = async (idAccidentalidad) => await deleteData(Url.Accidentalidad, { idAccidentalidad });