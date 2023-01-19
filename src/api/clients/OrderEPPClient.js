import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllOrderEPP = async (page, pageSize) => await getData(Url.OrdenesEPP, { page, pageSize });
export const GetByIdOrderEPP = async (id) => await getData(Url.OrdenesEPPId, { id });
export const InsertOrderEPP = async (ordenesepp) => await postData(Url.OrdenesEPP, ordenesepp);
export const UpdateOrderEPPs = async (ordenesepp) => await putData(Url.OrdenesEPP, ordenesepp);
export const DeleteOrderEPP = async (idOrdenesEpp) => await deleteData(Url.OrdenesEPP, { idOrdenesEpp });