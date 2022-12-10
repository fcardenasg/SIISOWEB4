import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllCatalog = async (page, pageSize) => await getData(Url.Catalogo, { page, pageSize });
export const GetByIdCatalog = async (id) => await getData(Url.CatalogoId, { id });
export const InsertCatalog = async (catalogo) => await postData(Url.Catalogo, catalogo);
export const UpdateCatalogs = async (catalogo) => await putData(Url.Catalogo, catalogo);
export const DeleteCatalog = async (id) => await deleteData(Url.Catalogo, { id });
export const GetAllByTipoCatalogo = async (idTipoCatalogo) => await getData(Url.GetAllByTipoCatalogo, { idTipoCatalogo });
export const GetAllBySubTipoCatalogo = async (codigo, substring) => await getData(Url.GetAllBySubTipoCatalogo, { codigo, substring });