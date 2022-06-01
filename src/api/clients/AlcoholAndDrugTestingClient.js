import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllAlcoholAndDrugTesting = async (page, pageSize) => await getData(Url.PruebasAlcoholDroga, { page, pageSize });
export const GetByIdAlcoholAndDrugTesting = async (id) => await getData(Url.PruebasAlcoholDrogaId, { id });
export const InsertAlcoholAndDrugTesting = async (pruebasalcoholdroga) => await postData(Url.PruebasAlcoholDroga, pruebasalcoholdroga);
export const UpdateAlcoholAndDrugTesting = async (pruebasalcoholdroga) => await putData(Url.PruebasAlcoholDroga, pruebasalcoholdroga);
export const DeleteAlcoholAndDrugTesting = async (idpruebasalcoholdroga) => await deleteData(Url.PruebasAlcoholDroga, { idpruebasalcoholdroga });