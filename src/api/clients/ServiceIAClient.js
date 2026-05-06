import { postData } from '../UtilInstance';

const urlServiceIA = "api/ServicioIA";
export const ImproveTextAndWriting = async (text) => await postData(`${urlServiceIA}/improve-text`, text);
export const ImageInterpretationAI = async (request) => await postData(`${urlServiceIA}/image`, request, true);