import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllResearchAssignment = async () => await getData(Url.AsignacionInvestigacion);
export const GetByIdResearchAssignment = async (id) => await getData(`${Url.AsignacionInvestigacion}/id`, { id });
export const UpdateCloseResearchAssignment = async (id) => await getData(`${Url.AsignacionInvestigacion}/update-close`, { id });
export const ValidateResearchAssignment = async () => await getData(`${Url.AsignacionInvestigacion}/validate-research-user`);
export const InsertResearchAssignment = async (asignacion) => await postData(Url.AsignacionInvestigacion, asignacion);
export const GetAllByDataResearcher = async (filter) => await getData(`${Url.AsignacionInvestigacion}/investigation`, { filter });
export const UpdateResearchAssignments = async (asignacion) => await putData(Url.AsignacionInvestigacion, asignacion);
export const DeleteResearchAssignment = async (id) => await deleteData(Url.AsignacionInvestigacion, { id });

export const RestoreResearchAssignment = async (asignacion) => await putData(`${Url.AsignacionInvestigacion}/action-restore`, asignacion);
export const ChangeStatusAssignment = async (estado, idAsignacion) => await getData(`${Url.AsignacionInvestigacion}/change-status`, { estado, idAsignacion });
export const SendAssignmentNotificationForward = async (idsUser, idAsignacion) => await postData(`${Url.AsignacionInvestigacion}/forward-assignment/${idAsignacion}`, idsUser);

/* Detalle de la asignacion */
export const GetAllDetailResearchAssignment = async (idDetalle, isInvestigacion) => await getData(`${Url.AsignacionInvestigacion}/detalle`, { idDetalle, isInvestigacion });
export const InsertDetailResearchAssignment = async (detalle) => await postData(`${Url.AsignacionInvestigacion}/detalle`, detalle);
export const DeleteDetailResearchAssignment = async (id) => await deleteData(`${Url.AsignacionInvestigacion}/detalle`, { id });

/* Asesor ARL */
export const GetByIdAssignDetailInvAse = async (idAsignacion) => await getData(`${Url.AsignacionInvestigacion}/inv-ase`, { idAsignacion });
export const InsertDetailInvAse = async (input) => await postData(`${Url.AsignacionInvestigacion}/inv-ase`, input);
export const UpdateDetailInvAse = async (input) => await putData(`${Url.AsignacionInvestigacion}/inv-ase`, input);
export const DeleteDetailInvAse = async (id) => await deleteData(`${Url.AsignacionInvestigacion}/inv-ase`, { id });