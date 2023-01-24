import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllReintegro = async (page, pageSize, idReintegro) => await getData(Url.ListaReintegro_GetAllReintegro, { page, pageSize, idReintegro });
export const UpdateListRefunds = async (listaReintegro) => await putData(Url.ListaReintegro, listaReintegro);

export const GetAllByIdListaReintegroArchivo = async (page, pageSize, idListaReintro) => await getData(Url.ListaReintegroArchivo, { page, pageSize, idListaReintro });
export const InsertListaReintegroArchivo = async (listaReintegroArchivo) => await postData(Url.ListaReintegroArchivo, listaReintegroArchivo);
export const DeleteListaReintegroArchivo = async (idListaReintegroArchivo) => await deleteData(Url.ListaReintegroArchivo, idListaReintegroArchivo);