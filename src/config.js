const rutaLocal = 'https://localhost:44347/';
const rutaLtd = 'https://siiso.drummondltd.com:44347/';
const rutaEnergy = 'https://siiso.drummondenergy.com:44447/';

const config = {
    typeDashboard: 'ltd', //energy - ltd
    rutaApi: rutaLtd,

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
    firebase: {
        apiKey: "AIzaSyCH-K9RO9vKLLP5KaLexNpU3QAlR-eLHxc",
        authDomain: "siisoweb4.firebaseapp.com",
        projectId: "siisoweb4",
        storageBucket: "siisoweb4.appspot.com",
        messagingSenderId: "193558178134",
        appId: "1:193558178134:web:299e14502061ca65da8ef7",
        measurementId: "G-NDSFV9BPT3"
    },
    auth0: {
        client_id: '7T4IlWis4DKHSbG8JAye4Ipk0rvXkH9V',
        domain: 'dev-w0-vxep3.us.auth0.com'
    }
};

export default config;