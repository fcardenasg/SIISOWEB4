import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllPanorama = async (page, pageSize) => await getData(Url.Panorama, { page, pageSize });
export const GetByIdPanorama = async (id) => await getData(Url.PanoramaId, { id });
export const InsertPanorama = async (panorama) => await postData(Url.Panorama, panorama);
export const UpdatePanoramas= async (panorama) => await putData(Url.Panorama, panorama);
export const DeletePanorama = async (idPanorama) => await deleteData(Url.Panorama, { idPanorama });