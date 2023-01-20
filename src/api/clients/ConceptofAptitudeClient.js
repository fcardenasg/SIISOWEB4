import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllConceptofAptitude = async (page, pageSize) => await getData(Url.ConceptosIND, { page, pageSize });
export const GetByIdConceptofAptitude = async (id) => await getData(Url.ConceptosINDId, { id });
export const InsertConceptofAptitude = async (conceptofaptitude) => await postData(Url.ConceptosIND, conceptofaptitude);
export const UpdateConceptofAptitudes = async (conceptofaptitude) => await putData(Url.ConceptosIND, conceptofaptitude);
export const DeleteConceptofAptitude = async (idconceptofaptitude) => await deleteData(Url.ConceptosIND, { idconceptofaptitude });