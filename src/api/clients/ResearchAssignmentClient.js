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
export const GetAllDxEmployeeResearchAssignment = async (documento) => await getData(`${Url.AsignacionInvestigacion}/dxby-documento`, { documento });
export const GetAllDetailResearchAssignment = async (idDetalle) => await getData(`${Url.AsignacionInvestigacion}/detalle`, { idDetalle });
export const InsertDetailResearchAssignment = async (detalle) => await postData(`${Url.AsignacionInvestigacion}/detalle`, detalle);
export const DeleteDetailResearchAssignment = async (id) => await deleteData(`${Url.AsignacionInvestigacion}/detalle`, { id });

export const GetDataMedicalOccupationalReseAssig = async (documento) => await getData(`${Url.AsignacionInvestigacion}/occupational-medicine`, { documento });