import { Url } from '../instances/AuthRoute';
import { postData, getData } from '../UtilInstance';

export const SendParaclinicalExams = async (lsArchivos) => await postData(Url.EnviarExamenesPorCorreo, lsArchivos);
export const ConsultMail = async () => await getData(Url.ConsultarCorreo);