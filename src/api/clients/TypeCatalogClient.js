import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllTypeCatalog = async () => await getData(Url.TipoCatalogo);
export const GetAllTypeCatalogCombo = async () => await getData(Url.TipoCatalogoCombo);
export const GetByIdTypeCatalog = async (id) => await getData(Url.TipoCatalogoId, { id });
export const InsertTypeCatalog = async (tipoCatalogo) => await postData(Url.TipoCatalogo, tipoCatalogo);
export const UpdateTypeCatalogs = async (tipoCatalogo) => await putData(Url.TipoCatalogo, tipoCatalogo);
export const DeleteTypeCatalog = async (id) => await deleteData(Url.TipoCatalogo, { id });