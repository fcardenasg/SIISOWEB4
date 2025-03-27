import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllMedicamentosPedido = async (idSede) => await getData(Url.MedicamentosPedido, { idSede });
export const GetByIdMedicamentosPedido = async (id) => await getData(Url.MedicamentosPedidoId, { id });
export const InsertMedicamentosPedido = async (data) => await postData(Url.MedicamentosPedido, data);
export const UpdateMedicamentosPedidos = async (data) => await putData(Url.MedicamentosPedido, data);
export const DeleteMedicamentosPedido = async (idMedicamentosPedido) => await deleteData(Url.MedicamentosPedido, { idMedicamentosPedido });

export const GetAllMedicinesPedidoDetalle = async (idPedido) => await getData(Url.MedicamentosPedidoDetalle, { idPedido });
export const GetByIdMedicinesPedidoDetalle = async (idPedidoDetalle) => await getData(Url.MedicamentosPedidoDetalleId, { idPedidoDetalle });
export const InsertMedicinesPedidoDetalle = async (medicines) => await postData(Url.MedicamentosPedidoDetalle, medicines);
export const UpdateMedicinessPedidoDetalle = async (medicines) => await putData(Url.MedicamentosPedidoDetalle, medicines);
export const UpdateMedicinesPedidoDetalleCantidades = async (medicines) => await putData(Url.MedicamentosPedidoDetalleCantidades, medicines);
export const DeleteMedicinesPedidoDetalle = async (id) => await deleteData(Url.MedicamentosPedidoDetalle, { id });