import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllFramingham = async () => await getData(Url.Framingham);
export const GetByIdFramingham = async (id) => await getData(Url.FraminghamId, { id });
export const InsertFramingham = async (framingham) => await postData(Url.Framingham, framingham);
export const UpdateFraminghams = async (framingham) => await putData(Url.Framingham, framingham);
export const DeleteFramingham = async (idFramingham) => await deleteData(Url.Framingham, { idFramingham });

export const GetExcelFramingham = async (parametroExcel) => await postData(Url.FraminghamExcel, parametroExcel);