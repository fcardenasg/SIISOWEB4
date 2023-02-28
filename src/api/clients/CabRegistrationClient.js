import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllCabRegistration = async (page, pageSize) => await getData(Url.RegistroTaxi, { page, pageSize });

export const GetExcelCabRegistration = async (parametroExcel) => await postData(Url.RegistroTaxiExcel, parametroExcel);

export const GetByIdCabRegistration = async (id) => await getData(Url.RegistroTaxiId, { id });
export const InsertCabRegistration = async (cabregistration) => await postData(Url.RegistroTaxi, cabregistration);
export const UpdateCabRegistrations = async (cabregistration) => await putData(Url.RegistroTaxi, cabregistration);
export const DeleteCabRegistration = async (idRegistroTaxi) => await deleteData(Url.RegistroTaxi, { idRegistroTaxi });