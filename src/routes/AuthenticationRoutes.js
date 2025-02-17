import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthForgotPassword3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/ForgotPassword3')));
const AuthCheckMail3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/CheckMail3')));
const AuthResetPassword3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/ResetPassword3')));
const AuthCodeVerification3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/CodeVerification3')));

// landing & contact-us routing
const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/pages/login/login3',
            element: <AuthLogin3 />
        },
        {
            path: '/pages/forgot-password/forgot-password3',
            element: <AuthForgotPassword3 />
        },
        {
            path: '/pages/check-mail/check-mail3',
            element: <AuthCheckMail3 />
        },
        {
            path: '/pages/reset-password/reset-password3',
            element: <AuthResetPassword3 />
        },
        {
            path: '/pages/code-verification/code-verification3',
            element: <AuthCodeVerification3 />
        },
        {
            path: '/pages/landing',
            element: <PagesLanding />
        }
    ]
};

export default AuthenticationRoutes;