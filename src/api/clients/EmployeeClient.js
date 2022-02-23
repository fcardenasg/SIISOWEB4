import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllEmployee = async (page, pageSize) => await getData(Url.Empleado, { page, pageSize });
export const GetByIdEmployee = async (id) => await getData(Url.EmpleadoId, { id });
export const InsertEmployee = async (empleado) => await postData(Url.Empleado, empleado);
export const UpdateEmployees = async (empleado) => await putData(Url.Empleado, empleado);
export const DeleteEmployee = async (idEmpleado) => await deleteData(Url.Empleado, { idEmpleado });