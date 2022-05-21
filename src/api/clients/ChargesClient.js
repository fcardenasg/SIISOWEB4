import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllCharges = async (page, pageSize) => await getData(Url.Charges, { page, pageSize });
export const GetByIdCharges = async (id) => await getData(Url.ChargesId, { id });
export const InsertCharges = async (charges) => await postData(Url.Charges, charges);
export const UpdateChargess = async (charges) => await putData(Url.Charges, charges);
export const DeleteCharges = async (idCharges) => await deleteData(Url.Charges, { idCharges });