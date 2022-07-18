import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import NavMotion from 'layout/NavMotion';
import GuestGuard from 'utils/route-guard/GuestGuard';

const SelectionView = Loadable(lazy(() => import('views/dashboard/SelectionView/SelectionView')));
const DashboardEnergy = Loadable(lazy(() => import('views/dashboard/SelectionView/DashboardEnergy')));


const QuestionnaireRoutes = {
    path: '/dashboard/select',
    element: (
        <NavMotion>
            <GuestGuard>
                <SelectionView />
            </GuestGuard>
        </NavMotion>
    ),
    /* children: [
        {
            path: '/dashboard/energy',
            element: <DashboardEnergy />
        },
    ] */
};

export default QuestionnaireRoutes;