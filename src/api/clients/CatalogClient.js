import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllCatalog = async (page, pageSize) => await getData(Url.Catalogo, { page, pageSize });
export const GetByIdCatalog = async (id) => await getData(Url.CatalogoId, { id });
export const InsertCatalog = async (catalogo) => await postData(Url.Catalogo, catalogo);
export const UpdateCatalogs = async (catalogo) => await putData(Url.Catalogo, catalogo);
export const DeleteCatalog = async (idCatalogo) => await deleteData(Url.Catalogo, { idCatalogo });
export const GetAllByTipoCatalogo = async (page, pageSize, idTipoCatalogo) => await getData(Url.GetAllByTipoCatalogo, { page, pageSize, idTipoCatalogo });
export const GetAllBySubTipoCatalogo = async (page, pageSize, codigo, substring) => await getData(Url.GetAllBySubTipoCatalogo, { page, pageSize, codigo, substring });