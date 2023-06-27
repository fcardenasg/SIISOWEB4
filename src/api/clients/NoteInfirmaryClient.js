import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllNoteInfirmary = async (page, pageSize) => await getData(Url.NotaEnfermeria, { page, pageSize });


export const GetByIdNoteInfirmary = async (id) => await getData(Url.NotaEnfermeriaId, { id });
export const InsertNoteInfirmary = async (notaEnfermeria) => await postData(Url.NotaEnfermeria, notaEnfermeria);
export const UpdateNoteInfirmarys = async (notaEnfermeria) => await putData(Url.NotaEnfermeria, notaEnfermeria);
export const DeleteNoteInfirmary = async (idNotaEnfermeria) => await deleteData(Url.NotaEnfermeria, { idNotaEnfermeria });