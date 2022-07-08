import { lazy } from 'react';

// project imports
import MainLayout from 'modules/Cuestionario/MainLayout';
import Loadable from 'ui-component/Loadable';
import NavMotion from 'layout/NavMotion';
import GuestGuard from 'utils/route-guard/GuestGuard';
// dashboard routing
const SelectionView = Loadable(lazy(() => import('views/dashboard/SelectionView/SelectionView')));


// ==============================|| MAIN ROUTING ||============================== //

const QuestionnaireRoutes = {
    path: '/dashboard/select',
    element: (
        <NavMotion>
            <GuestGuard>
                <SelectionView />
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            path: '/dashboard/select',
            element: <SelectionView />
        },
    ]
};

export default QuestionnaireRoutes;