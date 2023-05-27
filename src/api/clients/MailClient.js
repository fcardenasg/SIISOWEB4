import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const EnviarExamenesCorreo = async (enviarExamenesParaclinicos) => await postData(Url.EnviarExamenesCorreo, enviarExamenesParaclinicos);