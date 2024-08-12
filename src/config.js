import LogoReportLtd from 'assets/img/LogoReportLTD.png';
import LogoReportEnergy from 'assets/img/LogoReportEnergy.png';

const rutaLocal = 'https://localhost:44347/';
const rutaLtd = 'https://siiso.drummondltd.com:44347/';
const rutaEnergy = 'https://siiso.drummondenergy.com:44447/';

const config = {
    typeDashboard: 'DLTD', //ENERGY - DLTD
    rutaApi: rutaLtd,
    logotipo: LogoReportLtd,

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
    }
};

export const JWT_API = {
    secret: 'SECRET-KEY',
    timeout: '1 days'
};

export default config;