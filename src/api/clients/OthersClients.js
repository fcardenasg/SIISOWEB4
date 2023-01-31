import { getData } from '../UtilInstance';
import { Url } from '../instances/AuthRoute';

export const GetById = async (url, id) => await getData(url, { id });

export const GetAllSegmentoAgrupado = async (page, pageSize) => await getData(Url.SegmentoAgrupado, { page, pageSize });
export const GetAllBySegAgrupado = async (idSegmentoAgrupado, page, pageSize) => await getData(Url.SegmentoAfectado, { idSegmentoAgrupado, page, pageSize });
export const GetAllBySegAfectado = async (idSegmentoAfectado, page, pageSize) => await getData(Url.Subsegmento, { idSegmentoAfectado, page, pageSize });
export const GetAllBySegmentoAfectado = async (page, pageSize) => await getData(Url.SegAfectado, { page, pageSize });
export const GetAllBySubsegment = async (page, pageSize) => await getData(Url.Subsegment, { page, pageSize });

export const GetAllBySubsegmento = async (idSubsegmento, page, pageSize) => await getData(Url.MetodoCie11, { idSubsegmento, page, pageSize });

export const GetAllTipoAtencion = async (page, pageSize) => await getData(Url.TipoAtencion, { page, pageSize });
export const GetAllAtencion = async (page, pageSize) => await getData(Url.Atencion, { page, pageSize });
export const GetAllByTipoAtencion = async (page, pageSize, idTipoAtencion) => await getData(Url.AtencionGetAllByTipoAtencion, { page, pageSize, idTipoAtencion });