import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetByIdExposicionOcupacional = async (id) => await getData(`${Url.ExposicionOcupacional}/id`, { id });
export const GetAllExposicionOcupacional = async () => await getData(Url.ExposicionOcupacional);
export const GetInformationFromExcel = async (files) => await postData(`${Url.ExposicionOcupacional}/extracted-list`, files, true);
export const ExtractInformationFromExcel = async (exposicionOcupacional) => await postData(`${Url.ExposicionOcupacional}/information-extracted`, exposicionOcupacional, true);

export const InsertExposicionOcupacional = async (exposicionOcupacional) => await postData(Url.ExposicionOcupacional, exposicionOcupacional);
export const UpdateExposicionOcupacional = async (exposicionOcupacional) => await putData(Url.ExposicionOcupacional, exposicionOcupacional);
export const DeleteExposicionOcupacional = async (id) => await deleteData(Url.ExposicionOcupacional, { id });