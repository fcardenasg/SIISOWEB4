import { lazy } from 'react';

// project imports
import MainLayout from 'modules/Cuestionario/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const DashboardQuestionnaire = Loadable(lazy(() => import('modules/Cuestionario/DashboardQuestionnaire')));
const Vaccination = Loadable(lazy(() => import('modules/Cuestionario/Vaccination')));
const GenerateQR = Loadable(lazy(() => import('modules/Cuestionario/GenerateQR')));
const ViewfinderQR = Loadable(lazy(() => import('modules/Cuestionario/ViewfinderQR')));


// ==============================|| MAIN ROUTING ||============================== //

const QuestionnaireRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/dashboard/questionnaire',
            element: <DashboardQuestionnaire />
        },
        {
            path: '/dashboard/vaccination',
            element: <Vaccination />
        },
        {
            path: '/dashboard/generateqr',
            element: <GenerateQR />
        },
        {
            path: '/dashboard/viewfinderqr',
            element: <ViewfinderQR />
        }
    ]
};

export default QuestionnaireRoutes;