import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllCompany = async () => await getData(Url.Empresa);
export const GetAllCompanyCombo = async () => await getData(Url.EmpresaCombo);
export const GetByIdCompany = async (id) => await getData(Url.EmpresaId, { id });
export const InsertCompany = async (empresa) => await postData(Url.Empresa, empresa);
export const UpdateCompanys = async (empresa) => await putData(Url.Empresa, empresa);
export const DeleteCompany = async (id) => await deleteData(Url.Empresa, { id });