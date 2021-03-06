import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllTypeCatalog = async (page, pageSize) => await getData(Url.TipoCatalogo, { page, pageSize });
export const GetByIdTypeCatalog = async (id) => await getData(Url.TipoCatalogoId, { id });
export const InsertTypeCatalog = async (tipoCatalogo) => await postData(Url.TipoCatalogo, tipoCatalogo);
export const UpdateTypeCatalogs = async (tipoCatalogo) => await putData(Url.TipoCatalogo, tipoCatalogo);
export const DeleteTypeCatalog = async (idTipoCatalogo) => await deleteData(Url.TipoCatalogo, { idTipoCatalogo });