import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllHistoricalBurdenDiseases = async () => await getData(Url.InvestigacionEnfermedadLaboralFile);
export const GetAllGroupedByEmpleado = async () => await getData(Url.GetAllGroupedByEmpleado);

// export const GetExcelEmployee = async (tipoContrato) => await getData(Url.EmpleadoExcel, { tipoContrato });

 export const GetByIdHistoricalBurdenDiseases = async (id) => 
  await getData(`${Url.InvestigacionEnfermedadLaboralFile}/${id}`);

 export const GetByIdPDF = async (id) => 
  await getData(`${Url.GetByIdPDF}/${id}`);

// export const InsertEmployee = async (empleado) => await postData(Url.Empleado, empleado);
// export const UpdateEmployees = async (empleado) => await putData(Url.Empleado, empleado);
export const DeleteHistoricalBurdenDiseases = async (ids) => {
    // Convierte [2015, 2010] en "2015,2010"
    const idsString = ids.join(','); 
    
    // Tu función deleteData generará: /api/InvestigacionEnfermedadLaboralFile?id=2015,2010
    return await deleteData(Url.InvestigacionEnfermedadLaboralFile, { id: idsString });
};

// export const GetAllEmployeeOrdenes = async (search) => await getData(Url.EmpleadoOrdenes, { search });