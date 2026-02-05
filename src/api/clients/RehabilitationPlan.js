import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllRehabilitationPlan = async () => await getData(Url.PlanRehabilitacion);
export const GetByIdRehabilitationPlan = async (id) => await getData(Url.PlanRehabilitacionId, { id });
export const InsertRehabilitationPlan = async (PlanRehabilitacion) => await postData(Url.PlanRehabilitacion, PlanRehabilitacion);
export const GetExcelRehabilitationPlan = async (parametroExcel) => await postData(Url.PlanRehabilitacionExcel, parametroExcel);
export const UpdateRehabilitationPlan = async (PlanRehabilitacion) => await putData(Url.PlanRehabilitacion, PlanRehabilitacion);
export const DeleteRehabilitationPlan = async (idPlanRehabilitacion) => await deleteData(Url.PlanRehabilitacion, { idPlanRehabilitacion });


