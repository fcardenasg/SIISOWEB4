import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllHistoricalBurdenDiseases = async () => await getData(Url.InvestigacionEnfermedadLaboralFile);

// export const GetExcelEmployee = async (tipoContrato) => await getData(Url.EmpleadoExcel, { tipoContrato });

 export const GetByIdHistoricalBurdenDiseases = async (id) => 
  await getData(`${Url.InvestigacionEnfermedadLaboralFile}/${id}`);

// export const InsertEmployee = async (empleado) => await postData(Url.Empleado, empleado);
// export const UpdateEmployees = async (empleado) => await putData(Url.Empleado, empleado);
export const DeleteHistoricalBurdenDiseases = async (id) => await deleteData(Url.InvestigacionEnfermedadLaboralFile, { id });

// export const GetAllEmployeeOrdenes = async (search) => await getData(Url.EmpleadoOrdenes, { search });