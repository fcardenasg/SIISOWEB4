import { Url } from '../instances/AuthRoute';
import { postData } from '../UtilInstance';

export const PostChangePasswords = async (changePassword) => await postData(Url.ChangePassword, changePassword);