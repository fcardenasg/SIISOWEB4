import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllPanorama = async (page, pageSize) => await getData(Url.Panorama, { page, pageSize });
export const GetAllClasePanorama = async (idCargo, idRiesgo) => await getData(`${Url.Panorama}/clases`, { idCargo, idRiesgo });
export const GetGesClaseRiesgo = async (idCargo) => await getData(`${Url.Panorama}/ges-claseriesgo`, { idCargo });
export const GetAllByCharge = async (page, pageSize, cargo, riesgo) => await getData(Url.PanoramaGetAllByCharge, { page, pageSize, cargo, riesgo });
export const GetByIdPanorama = async (id) => await getData(Url.PanoramaId, { id });

export const InsertPanoramaIndividual = async (panorama) => await postData(`${Url.Panorama}/individual`, panorama);
export const InsertPanoramaMasivo = async (panorama) => await postData(`${Url.Panorama}/masivo`, panorama);

export const UpdatePanoramas = async (panorama) => await putData(Url.Panorama, panorama);
export const DeletePanorama = async (idPanorama) => await deleteData(Url.Panorama, { idPanorama });

export const ExtractInformationFromExcel = async (base64Strings) => await postData(Url.PanoramaExcel, base64Strings);