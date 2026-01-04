import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllResearchAssignment = async () => await getData(Url.AsignacionInvestigacion);
export const GetByIdResearchAssignment = async (id) => await getData(`${Url.AsignacionInvestigacion}/id`, { id });
export const ValidateResearchAssignment = async (idUsuario) => await getData(`${Url.AsignacionInvestigacion}/validate-research-user`, { idUsuario });
export const InsertResearchAssignment = async (asignacion) => await postData(Url.AsignacionInvestigacion, asignacion);
export const GetAllByDataResearcher = async (idInvestigador, filter) => await getData(`${Url.AsignacionInvestigacion}/investigation`, { idInvestigador, filter });
export const UpdateResearchAssignments = async (asignacion) => await putData(Url.AsignacionInvestigacion, asignacion);
export const DeleteResearchAssignment = async (id) => await deleteData(Url.AsignacionInvestigacion, { id });

/* Detalle de la asignacion */
export const GetAllDetailResearchAssignment = async (idDetalle, isInvestigacion) => await getData(`${Url.AsignacionInvestigacion}/detalle`, { idDetalle, isInvestigacion });
export const InsertDetailResearchAssignment = async (detalle) => await postData(`${Url.AsignacionInvestigacion}/detalle`, detalle);
export const DeleteDetailResearchAssignment = async (id) => await deleteData(`${Url.AsignacionInvestigacion}/detalle`, { id });