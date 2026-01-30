import { postData } from '../UtilInstance';

const urlServiceIA = "api/ServicioIA";
export const ImproveTextAndWriting = async (text) => await postData(`${urlServiceIA}/improve-text`, text);