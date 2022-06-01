import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllPanorama = async (page, pageSize) => await getData(Url.Panorama, { page, pageSize });
export const GetAllByCharge = async (page, pageSize, cargo, riesgo) => await getData(Url.PanoramaGetAllByCharge, { page, pageSize, cargo, riesgo });
export const GetByIdPanorama = async (id) => await getData(Url.PanoramaId, { id });
export const InsertPanorama = async (panorama) => await postData(Url.Panorama, panorama);
export const UpdatePanoramas = async (panorama) => await putData(Url.Panorama, panorama);
export const DeletePanorama = async (idPanorama) => await deleteData(Url.Panorama, { idPanorama });