import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllMedicamentosProductos = async () => await getData(Url.MedicamentosProductos);
export const GetByIdMedicamentosProductos = async (id) => await getData(Url.MedicamentosProductosId, { id });
export const InsertMedicamentosProductos = async (medicamento) => await postData(Url.MedicamentosProductos, medicamento);
export const UpdateMedicamentosProductos = async (medicamento) => await putData(Url.MedicamentosProductos, medicamento);
export const DeleteMedicamentosProductos = async (idMedicamentosProductos) => await deleteData(Url.MedicamentosProductos, { idMedicamentosProductos });

export const GetComboMedicamentosProductos = async () => await getData(Url.MedicamentosProductosCombo);