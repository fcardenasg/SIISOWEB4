import { Url } from '../instances/AuthRoute';
import { getData, postData } from '../UtilInstance';

export const GetAllHistoryDrunkenness = async () => await getData(Url.HistoriaEmbriaguez);
export const GetByIdHistoryDrunkenness = async (id) => await getData(`${Url.HistoriaEmbriaguez}/id`, { id });
export const GetCreateReportHistoryDrunkenness = async (id) => await getData(`${Url.HistoriaEmbriaguez}/report`, { id });
export const SaveHistoryDrunkenness = async (historiaClinica) => await postData(`${Url.HistoriaEmbriaguez}/save`, historiaClinica);
export const GetExcelHistoryDrunkenness = async (paraclinicos) => await postData(`${Url.HistoriaEmbriaguez}/excel`, paraclinicos);