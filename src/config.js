const config = {
    // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    typeDashboard: 'ltd', //energy - ltd
    basename: '',
    defaultPath: '/dashboard/ltd',
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
        /*  apiKey: 'AIzaSyBernKzdSojh_vWXBHt0aRhf5SC9VLChbM',
            authDomain: 'berry-material-react.firebaseapp.com',
            projectId: 'berry-material-react',
            storageBucket: 'berry-material-react.appspot.com',
            messagingSenderId: '901111229354',
            appId: '1:901111229354:web:a5ae5aa95486297d69d9d3',
            measurementId: 'G-MGJHSL8XW3' */

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