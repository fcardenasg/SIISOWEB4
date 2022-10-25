import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import QuestionnaireRoutes from './QuestionnaireRoutes';
import Loadable from 'ui-component/Loadable';

const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));
const SIAE = Loadable(lazy(() => import('views/pages/siae/SIAE')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([{ path: '/', element: <PagesLanding /> },
    { path: '/siae', element: <SIAE /> },
        QuestionnaireRoutes,
        AuthenticationRoutes,
        LoginRoutes,
        MainRoutes
    ]);
}
