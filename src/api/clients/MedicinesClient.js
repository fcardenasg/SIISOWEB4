import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllMedicines = async (idSede) => await getData(Url.Medicamentos, { idSede });
export const GetByIdMedicines = async (id) => await getData(Url.MedicamentosId, { id });
export const InsertMedicines = async (medicines) => await postData(Url.Medicamentos, medicines);
export const UpdateMediciness = async (medicines) => await putData(Url.Medicamentos, medicines);
export const DeleteMedicines = async (idMedicamentos) => await deleteData(Url.Medicamentos, { idMedicamentos });

export const GetByIdMedicinesDetalle = async (idMedicamento) => await getData(Url.MedicamentosDetalle, { idMedicamento });
export const InsertMedicinesDetalle = async (medicines) => await postData(Url.MedicamentosDetalle, medicines);
export const UpdateMedicinessDetalle = async (medicines) => await putData(Url.MedicamentosDetalle, medicines);
export const DeleteMedicinesDetalle = async (idMedicamentoDetalle) => await deleteData(Url.MedicamentosDetalle, { idMedicamentoDetalle });