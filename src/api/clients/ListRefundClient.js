import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllReintegro = async (idReintegro) => await getData(Url.ListaReintegro, { idReintegro });
export const UpdateListRefunds = async (listaReintegro) => await putData(Url.ListaReintegro, listaReintegro);

export const GetAllByIdListaReintegroArchivo = async (idListaReintro) => await getData(Url.ListaReintegroArchivo, { idListaReintro });
export const InsertListaReintegroArchivo = async (listaReintegroArchivo) => await postData(Url.ListaReintegroArchivo, listaReintegroArchivo);
export const DeleteListaReintegroArchivo = async (idListaReintegroArchivo) => await deleteData(Url.ListaReintegroArchivo, { idListaReintegroArchivo });