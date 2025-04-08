import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllParametrizacionProveedor = async () => await getData(Url.ParametrizacionProveedor);
export const GetAllCiudadParametrizacionProveedor = async () => await getData(Url.ParametrizacionProveedorCiudad);
export const GetByIdParametrizacionProveedor = async (id) => await getData(Url.ParametrizacionProveedorId, { id });
export const InsertParametrizacionProveedor = async (plantilla) => await postData(Url.ParametrizacionProveedor, plantilla);
export const UpdateParametrizacionProveedor = async (plantilla) => await putData(Url.ParametrizacionProveedor, plantilla);
export const DeleteParametrizacionProveedor = async (idPlantilla) => await deleteData(Url.ParametrizacionProveedor, { idPlantilla });