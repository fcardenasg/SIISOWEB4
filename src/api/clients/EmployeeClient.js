import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllEmployee = async () => await getData(Url.Empleado);

export const GetExcelEmployee = async (tipoContrato) => await getData(Url.EmpleadoExcel, { tipoContrato });

export const GetByIdEmployee = async (id) => await getData(Url.EmpleadoId, { id });
export const InsertEmployee = async (empleado) => await postData(Url.Empleado, empleado);
export const UpdateEmployees = async (empleado) => await putData(Url.Empleado, empleado);
export const DeleteEmployee = async (idEmpleado) => await deleteData(Url.Empleado, { idEmpleado });

export const GetAllEmployeeOrdenes = async (search) => await getData(Url.EmpleadoOrdenes, { search });