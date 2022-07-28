import { lazy } from "react";

// project imports
import MainLayout from "modules/Cuestionario/MainLayout";
import Loadable from "ui-component/Loadable";
import GuestGuard from "utils/route-guard/GuestGuard";

// dashboard routing
const DashboardQuestionnaire = Loadable(
  lazy(() => import("modules/Cuestionario/DashboardQuestionnaire"))
);
const Vaccination = Loadable(
  lazy(() => import("modules/Cuestionario/Vaccination"))
);
const GenerateQR = Loadable(
  lazy(() => import("modules/Cuestionario/GenerateQR"))
);
const ViewfinderQR = Loadable(
  lazy(() => import("modules/Cuestionario/ViewfinderQR"))
);

// ==============================|| MAIN ROUTING ||============================== //

const QuestionnaireRoutes = {
  path: "/",
  element: (
    <GuestGuard>
      <MainLayout />
    </GuestGuard>
  ),
  children: [
    {
      path: "/dashboard/questionnaire",
      element: <DashboardQuestionnaire />,
    },
    /* {
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
        } */
  ],
};

export default QuestionnaireRoutes;
