import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllSupplier = async () => await getData(Url.Proveedor);
export const GetByIdSupplier = async (id) => await getData(Url.ProveedorId, { id });
export const InsertSupplier = async (proveedor) => await postData(Url.Proveedor, proveedor);
export const UpdateSuppliers = async (proveedor) => await putData(Url.Proveedor, proveedor);
export const DeleteSupplier = async (id) => await deleteData(Url.Proveedor, { id });