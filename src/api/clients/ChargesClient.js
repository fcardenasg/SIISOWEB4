import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllCharges = async (page, pageSize) => await getData(Url.Cargo, { page, pageSize });
export const GetByIdCharges = async (id) => await getData(Url.CargoId, { id });
export const InsertCharges = async (cargo) => await postData(Url.Cargo, cargo);
export const UpdateChargess = async (cargo) => await putData(Url.Cargo, cargo);
export const DeleteCharges = async (idCargo) => await deleteData(Url.Cargo, { idCargo });