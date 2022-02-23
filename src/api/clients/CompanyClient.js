import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllCompany = async (page, pageSize) => await getData(Url.Empresa, { page, pageSize });
export const GetByIdCompany = async (id) => await getData(Url.EmpresaId, { id });
export const InsertCompany = async (empresa) => await postData(Url.Empresa, empresa);
export const UpdateCompany = async (empresa) => await putData(Url.Empresa, empresa);
export const DeleteCompany = async (idEmpresa) => await deleteData(Url.Empresa, { idEmpresa });