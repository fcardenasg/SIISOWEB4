import { lazy } from 'react';

// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import Loadable from 'ui-component/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const ChangePassword = Loadable(lazy(() => import('modules/ChangePassword/ChangePassword')));
const AuthForgotPassword = Loadable(lazy(() => import('views/pages/authentication/authentication3/ForgotPassword3')));
const VideoCallPatient = Loadable(lazy(() => import('modules/Medicalcalendar/calendar/AttentionMedicalAdvice/VideoCallPatient')));


const LoginRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <GuestGuard>
                <MinimalLayout />
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            path: '/login',
            element: <AuthLogin />
        },
        {
            path: '/change-password',
            element: <ChangePassword />
        },
        {
            path: '/ForgotPassword',
            element: <AuthForgotPassword />
        },
        {
            path: '/videocall-patient',
            element: <VideoCallPatient />
        },
    ]
};

export default LoginRoutes;
