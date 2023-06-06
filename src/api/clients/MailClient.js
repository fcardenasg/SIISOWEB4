import { Url } from '../instances/AuthRoute';
import { postData } from '../UtilInstance';

export const SendParaclinicalExams = async (lsArchivos) => await postData(Url.EnviarExamenesPorCorreo, lsArchivos);