import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllEvolutionNote = async (page, pageSize) => await getData(Url.NotaEvolucion, { page, pageSize });
export const GetByIdEvolutionNote = async (id) => await getData(Url.NotaEvolucionId, { id });
export const InsertEvolutionNote = async (notaEvolucion) => await postData(Url.NotaEvolucion, notaEvolucion);
export const UpdateEvolutionNotes = async (notaEvolucion) => await putData(Url.NotaEvolucion, notaEvolucion);
export const DeleteEvolutionNote = async (idNotaEvolucion) => await deleteData(Url.NotaEvolucion, { idNotaEvolucion });