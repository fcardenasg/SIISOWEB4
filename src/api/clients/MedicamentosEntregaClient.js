import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllMedicamentosEntrega = async (idSede) => await getData(Url.MedicamentosEntrega, { idSede });
export const GetByIdMedicamentosEntrega = async (id) => await getData(Url.MedicamentosEntregaId, { id });
export const InsertMedicamentosEntrega = async (data) => await postData(Url.MedicamentosEntrega, data);
export const UpdateMedicamentosEntrega = async (data) => await putData(Url.MedicamentosEntrega, data);
export const DeleteMedicamentosEntrega = async (idMedicamentosEntrega) => await deleteData(Url.MedicamentosEntrega, { idMedicamentosEntrega });

export const GetAllMedicinesPedidoDetalle = async (idPedido) => await getData(Url.MedicamentosEntregaDetalle, { idPedido });
export const GetByIdMedicinesPedidoDetalle = async (idPedidoDetalle) => await getData(Url.MedicamentosEntregaDetalleId, { idPedidoDetalle });
export const InsertMedicinesPedidoDetalle = async (medicines) => await postData(Url.MedicamentosPedidoDetalle, medicines);
export const UpdateMedicinessPedidoDetalle = async (medicines) => await putData(Url.MedicamentosPedidoDetalle, medicines);
export const UpdateMedicinesPedidoDetalleCantidades = async (medicines) => await putData(Url.MedicamentosPedidoDetalleCantidades, medicines);
export const DeleteMedicinesPedidoDetalle = async (id) => await deleteData(Url.MedicamentosPedidoDetalle, { id });