import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllSupplier = async (page, pageSize) => await getData(Url.Proveedor, { page, pageSize });
export const GetByIdSupplier = async (id) => await getData(Url.ProveedorId, { id });
export const InsertSupplier = async (proveedor) => await postData(Url.Proveedor, proveedor);
export const UpdateSuppliers = async (proveedor) => await putData(Url.Proveedor, proveedor);
export const DeleteSupplier = async (idProveedor) => await deleteData(Url.Proveedor, { idProveedor });

export const GetExcelSupplier = async () => await postData(Url.ProveedorExcel);