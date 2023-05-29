import { Url } from '../instances/AuthRoute';
import { postData } from '../UtilInstance';

export const SendParaclinicalExams = async (enviarExamenesParaclinicos) => await postData(Url.EnviarExamenesPorCorreo, enviarExamenesParaclinicos);