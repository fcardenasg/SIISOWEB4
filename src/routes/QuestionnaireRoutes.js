import { lazy } from "react";

// project imports
import MainLayout from "modules/Cuestionario/MainLayout";
import Loadable from "ui-component/Loadable";
import GuestGuard from "utils/route-guard/GuestGuard";

// dashboard routing
const DashboardQuestionnaire = Loadable(
  lazy(() => import("modules/Cuestionario/DashboardQuestionnaire"))
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
  ],
};

export default QuestionnaireRoutes;
