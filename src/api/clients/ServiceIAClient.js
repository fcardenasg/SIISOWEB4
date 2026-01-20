import { getData } from '../UtilInstance';

const urlServiceIA = "api/ServicioIA";
export const ImproveTextAndWriting = async (text) => await getData(`${urlServiceIA}/improve-text`, { text });