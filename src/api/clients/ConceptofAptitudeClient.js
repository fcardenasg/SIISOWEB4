import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllConceptofAptitude = async (page, pageSize) => await getData(Url.ConceptosIND, { page, pageSize });
export const GetByIdConceptofAptitude = async (id) => await getData(Url.ConceptosINDId, { id });
export const InsertConceptofAptitude = async (conceptosIND) => await postData(Url.ConceptosIND, conceptosIND);
export const UpdateConceptofAptitudes = async (conceptosIND) => await putData(Url.ConceptosIND, conceptosIND);
export const DeleteConceptofAptitude = async (idTrabajoenAltura) => await deleteData(Url.ConceptosIND, { idTrabajoenAltura });