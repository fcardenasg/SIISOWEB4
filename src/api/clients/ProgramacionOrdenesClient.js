import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const QueryProgramming = async (parametro) => await postData(Url.PrograOrdenesQueryProgramming, parametro);

export const GetAllProgramacionOrdenes = async () => await getData(Url.ProgramacionOrdenes);
export const GetByIdProgramacionOrdenes = async (id) => await getData(Url.ProgramacionOrdenesId, { id });
export const GetByProgramacionOrdenesProveedor = async (idCiudad) => await getData(Url.ProgramacionOrdenesProveedor, { idCiudad });
export const InsertProgramacionOrdenes = async (programacion) => await postData(Url.ProgramacionOrdenes, programacion);
export const UpdateProgramacionOrdenes = async (programacion) => await putData(Url.ProgramacionOrdenes, programacion);
export const DeleteProgramacionOrdenes = async (idProgramacionOrdenes) => await deleteData(Url.ProgramacionOrdenes, { idProgramacionOrdenes });
export const GetEmpleadoProgramacionOrdenes = async (documento) => await getData(Url.ProgramacionOrdenesEmpleado, { documento });

export const GetComboProgramacionOrdenes = async () => await getData(Url.ProgramacionOrdenesComboCiudad);
export const GetSupplierByCityIndividual = async (idCiudad, idProveedor) => await getData(Url.ProgramacionOrdenesProCiuIndi, { idCiudad, idProveedor });
