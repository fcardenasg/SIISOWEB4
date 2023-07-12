import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllAlcoholAndDrugTesting = async (page, pageSize) => await getData(Url.PruebasAlcoholDroga, { page, pageSize });
export const GetByIdAlcoholAndDrugTesting = async (id) => await getData(Url.PruebasAlcoholDrogaId, { id });
export const InsertAlcoholAndDrugTesting = async (pruebasAlcoholDroga) => await postData(Url.PruebasAlcoholDroga, pruebasAlcoholDroga);
export const UpdateAlcoholAndDrugTestings = async (pruebasAlcoholDroga) => await putData(Url.PruebasAlcoholDroga, pruebasAlcoholDroga);
export const DeleteAlcoholAndDrugTesting = async (idPruebasAlcoholDroga) => await deleteData(Url.PruebasAlcoholDroga, { idPruebasAlcoholDroga });

export const GetExcelAlcoholAndDrugTesting = async (parametroExcel) => await postData(Url.PruebasAlcoholDrogaExcel, parametroExcel);