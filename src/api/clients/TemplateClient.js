import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllTemplate = async (page, pageSize, usuario) => await getData(Url.Plantilla, { page, pageSize, usuario });
export const GetByIdTemplate = async (id) => await getData(Url.PlantillaId, { id });
export const InsertTemplate = async (plantilla) => await postData(Url.Plantilla, plantilla);
export const UpdateTemplates = async (plantilla) => await putData(Url.Plantilla, plantilla);
export const DeleteTemplate = async (idPlantilla) => await deleteData(Url.Plantilla, { idPlantilla });