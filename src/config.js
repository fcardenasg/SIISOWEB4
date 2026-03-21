import LogoReportLtd from 'assets/img/LogoReportLTD.png';
import LogoReportEnergy from 'assets/img/LogoReportEnergy.png';
import LogoWhiteLtd from 'assets/img/LogoWhite.png';
import LogoWhiteEnergy from 'assets/img/LogoWhiteEnergy.png';

const rutaLocal = 'https://localhost:44347/';
const rutaLtd = 'https://siiso.drummondltd.com:44347/';

const config = {
    typeDashboard: 'DLTD', //ENERGY - DLTD
    rutaApi: rutaLtd,
    logotipo: LogoReportLtd,
    logotipoblanco: LogoWhiteLtd,

    basename: '',
    defaultPath: '/dashboard/drummond',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    outlinedFilled: true,
    theme: 'light', // light, dark
    presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
    i18n: 'es', // 'en' - English, 'fr' - French, 'es' - Español, 'zh' - Chinese
    rtlLayout: false,
    jwt: {
        secret: 'SECRET-KEY',
        timeout: '1 days'
    },
    auth0: {
        client_id: '7T4IlWis4DKHSbG8JAye4Ipk0rvXkH9V',
        domain: 'dev-w0-vxep3.us.auth0.com'
    },
    apiKey: {
        openia: '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'
    },
    apiKeySpeech: {
        elevenlabs: 'sk_253881ad52f4025c1c0ee93b49cff9dfbe0ebd8db2976487'
    }
};

export const JWT_API = {
    secret: 'SECRET-KEY',
    timeout: '1 days'
};

export default config;