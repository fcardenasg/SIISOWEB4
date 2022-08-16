import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllAccidentRate = async (page, pageSize) => await getData(Url.Accidentalidad, { page, pageSize });
export const GetByIdAccidentRate = async (id) => await getData(Url.AccidentalidadId, { id });
export const InsertAccidentRate = async (accidentalidad) => await postData(Url.Accidentalidad, accidentalidad);
export const UpdateAccidentRates = async (accidentalidad) => await putData(Url.Accidentalidad, accidentalidad);
export const DeleteAccidentRate = async (idAccidentalidad) => await deleteData(Url.Accidentalidad, { idAccidentalidad });