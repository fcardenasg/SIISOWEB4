import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const DashboardAnalytics = Loadable(lazy(() => import('views/dashboard/Analytics')));

// widget routing
const WidgetStatistics = Loadable(lazy(() => import('views/widget/Statistics')));
const WidgetData = Loadable(lazy(() => import('views/widget/Data')));
const WidgetChart = Loadable(lazy(() => import('views/widget/Chart')));

// application routing
const AppChat = Loadable(lazy(() => import('views/application/chat')));
const AppKanban = Loadable(lazy(() => import('views/application/kanban')));
const AppMail = Loadable(lazy(() => import('views/application/mail')));
const AppCalendar = Loadable(lazy(() => import('views/application/calendar')));
const AppContactCard = Loadable(lazy(() => import('views/application/contact/Card')));
const AppContactList = Loadable(lazy(() => import('views/application/contact/List')));

//Nuestros import
const ListTypeCatalog = Loadable(lazy(() => import('modules/TypeCatalog/ListTypeCatalog')));
const ReportTypeCatolog = Loadable(lazy(() => import('components/report/ReportTypeCatolog')));
const TypeCatalog = Loadable(lazy(() => import('modules/TypeCatalog/TypeCatalog')));
const UpdateTypeCatalog = Loadable(lazy(() => import('modules/TypeCatalog/UpdateTypeCatalog')));

const ListProgramming = Loadable(lazy(() => import('modules/Programming/ListProgramming')));

const ListCatalog = Loadable(lazy(() => import('modules/Catalog/ListCatalog')));
const Catalog = Loadable(lazy(() => import('modules/Catalog/Catalog')));
const ReportCatalog = Loadable(lazy(() => import('components/report/ReportCatalog')));
const UpdateCatalog = Loadable(lazy(() => import('modules/Catalog/UpdateCatalog')));

const ListCompany = Loadable(lazy(() => import('modules/Company/ListCompany')));
const Company = Loadable(lazy(() => import('modules/Company/Company')));
const UpdateCompany = Loadable(lazy(() => import('modules/Company/UpdateCompany')));
const ReportCompany = Loadable(lazy(() => import('components/report/ReportCompany')));

const ListEmployee = Loadable(lazy(() => import('modules/Employee/ListEmployee')));
const Employee = Loadable(lazy(() => import('modules/Employee/Employee')));
const UpdateEmployee = Loadable(lazy(() => import('modules/Employee/UpdateEmployee')));
const ReportEmployee = Loadable(lazy(() => import('components/report/ReportEmployee')));

const ListSupplier = Loadable(lazy(() => import('modules/Supplier/ListSupplier')));
const Supplier = Loadable(lazy(() => import('modules/Supplier/Supplier')));
const ReportSupplier = Loadable(lazy(() => import('components/report/ReportSupplier')));
const UpdateSupplier = Loadable(lazy(() => import('modules/Supplier/UpdateSupplier')));

const ListAssistance = Loadable(lazy(() => import('modules/Assistance/ListAssistance')));
const Assistance = Loadable(lazy(() => import('modules/Assistance/Assistance')));
const UpdateAssistance = Loadable(lazy(() => import('modules/Assistance/UpdateAssistance')));
const ReportAssistance = Loadable(lazy(() => import('modules/Assistance/ReportAssistance')));

const ListEvolutionNote = Loadable(lazy(() => import('modules/EvolutionNote/ListEvolutionNote')));
const EvolutionNote = Loadable(lazy(() => import('modules/EvolutionNote/EvolutionNote')));
const UpdateEvolutionNote = Loadable(lazy(() => import('modules/EvolutionNote/UpdateEvolutionNote')));
const ReportEvolutionNote = Loadable(lazy(() => import('modules/EvolutionNote/ReportEvolutionNote')));

const ListMedicalAdvice = Loadable(lazy(() => import('modules/MedicalAdvice/ListMedicalAdvice')));
const MedicalAdvice = Loadable(lazy(() => import('modules/MedicalAdvice/MedicalAdvice')));
const UpdateMedicalAdvice = Loadable(lazy(() => import('modules/MedicalAdvice/UpdateMedicalAdvice')));
const ReportMedicalAdvice = Loadable(lazy(() => import('components/report/ReportMedicalAdvice')));

const ListPsychologicalCounseling = Loadable(lazy(() => import('modules/PsychologicalCounseling/ListPsychologicalCounseling')));
const PsychologicalCounseling = Loadable(lazy(() => import('modules/PsychologicalCounseling/PsychologicalCounseling')));
const UpdatePsychologicalCounseling = Loadable(lazy(() => import('modules/PsychologicalCounseling/UpdatePsychologicalCounseling')));
const ReportPsychological = Loadable(lazy(() => import('modules/PsychologicalCounseling/ReportPsychological')));

const ListNoteInfirmary = Loadable(lazy(() => import('modules/NoteInfirmary/ListNoteInfirmary')));
const NoteInfirmary = Loadable(lazy(() => import('modules/NoteInfirmary/NoteInfirmary')));
const UpdateNoteInfirmary = Loadable(lazy(() => import('modules/NoteInfirmary/UpdateNoteInfirmary')));
const ReportNoteInfirmary = Loadable(lazy(() => import('modules/NoteInfirmary/ReportNoteInfirmary')));

const ListMedicalFormula = Loadable(lazy(() => import('modules/MedicalFormula/ListMedicalFormula')));
const MedicalFormula = Loadable(lazy(() => import('modules/MedicalFormula/MedicalFormula')));
const UpdateMedicalFormula = Loadable(lazy(() => import('modules/MedicalFormula/UpdateMedicalFormula')));
const ReportMedicalFormula = Loadable(lazy(() => import('components/report/ReportMedicalFormula')));

const ListAlcoholAndDrugTesting = Loadable(lazy(() => import('modules/AlcoholAndDrugTesting/ListAlcoholAndDrugTesting')));
const AlcoholAndDrugTesting = Loadable(lazy(() => import('modules/AlcoholAndDrugTesting/AlcoholAndDrugTesting')));
const UpdateAlcoholAndDrugTesting = Loadable(lazy(() => import('modules/AlcoholAndDrugTesting/UpdateAlcoholAndDrugTesting')));
const ReportAlcoholAndDrugTesting = Loadable(lazy(() => import('modules/AlcoholAndDrugTesting/ReportAlcoholAndDrugTesting')));

const Turner = Loadable(lazy(() => import('modules/Turner/Turner')));

const Attention = Loadable(lazy(() => import('modules/Attention/Attention')));
const UpdateAttention = Loadable(lazy(() => import('modules/Attention/UpdateAttention')));
const ReportAttention = Loadable(lazy(() => import('modules/Attention/ReportAttention')));
const ListAttention = Loadable(lazy(() => import('modules/Attention/ListAttention')));

const ListOccupationalExamination = Loadable(lazy(() => import('modules/OccupationalExamination/ListOccupationalExamination')));
const OccupationalExamination = Loadable(lazy(() => import('modules/OccupationalExamination/OccupationalExamination')));
const ReportOccupationalExamination = Loadable(lazy(() => import('modules/OccupationalExamination/Report/ReportOccupationalExamination')));

const ListOtherAdvice = Loadable(lazy(() => import('modules/OtherAdvice/ListOtherAdvice')));
const OtherAdvice = Loadable(lazy(() => import('modules/OtherAdvice/OtherAdvice')));
const UpdateOtherAdvice = Loadable(lazy(() => import('modules/OtherAdvice/UpdateOtherAdvice')));
const ReportOtherAdvice = Loadable(lazy(() => import('components/report/ReportOtherAdvice')));

const ListCIE11 = Loadable(lazy(() => import('modules/CIE11/ListCIE11')));
const CIE11 = Loadable(lazy(() => import('modules/CIE11/CIE11')));
const UpdateCIE11 = Loadable(lazy(() => import('modules/CIE11/UpdateCIE11')));

const ListCharges = Loadable(lazy(() => import('modules/Charges/ListCharges')));
const Charges = Loadable(lazy(() => import('modules/Charges/Charges')));
const UpdateCharges = Loadable(lazy(() => import('modules/Charges/UpdateCharges')));

const ListPanorama = Loadable(lazy(() => import('modules/Charges/Panorama/ListPanorama')));
const Panorama = Loadable(lazy(() => import('modules/Charges/Panorama/Panorama')));
const UpdatePanorama = Loadable(lazy(() => import('modules/Charges/Panorama/UpdatePanorama')));

const ListTemplate = Loadable(lazy(() => import('modules/Template/ListTemplate')));
const Template = Loadable(lazy(() => import('modules/Template/Template')));
const UpdateTemplate = Loadable(lazy(() => import('modules/Template/UpdateTemplate')));

const ListOccupationalHealth = Loadable(lazy(() => import('modules/OccupationalHealth/ListOccupationalHealth')));
const OccupationalHealth = Loadable(lazy(() => import('modules/OccupationalHealth/OccupationalHealth')));
const UpdateOccupationalHealth = Loadable(lazy(() => import('modules/OccupationalHealth/UpdateOccupationalHealth')));

const ListOccupationalMedicine = Loadable(lazy(() => import('modules/OccupationalMedicine/ListOccupationalMedicine')));
const OccupationalMedicine = Loadable(lazy(() => import('modules/OccupationalMedicine/OccupationalMedicine')));
const UpdateOccupationalMedicine = Loadable(lazy(() => import('modules/OccupationalMedicine/UpdateOccupationalMedicine')));

const ListWorkAbsenteeism = Loadable(lazy(() => import('modules/WorkAbsenteeism/ListWorkAbsenteeism')));
const WorkAbsenteeism = Loadable(lazy(() => import('modules/WorkAbsenteeism/WorkAbsenteeism')));
const UpdateWorkAbsenteeism = Loadable(lazy(() => import('modules/WorkAbsenteeism/UpdateWorkAbsenteeism')));

const ListItems = Loadable(lazy(() => import('modules/Items/ListItems')));
const Items = Loadable(lazy(() => import('modules/Items/Items')));
const UpdateItems = Loadable(lazy(() => import('modules/Items/UpdateItems')));

const ViewOrders = Loadable(lazy(() => import('modules/Orders/ViewOrders')));
const ListOrdersIndividual = Loadable(lazy(() => import('modules/Orders/ListOrdersIndividual')));
const OrdersIndividual = Loadable(lazy(() => import('modules/Orders/OrdersIndividual')));
const UpdateOrdersIndividual = Loadable(lazy(() => import('modules/Orders/UpdateOrdersIndividual')));

const OccupationalExaminationProgra = Loadable(lazy(() => import('modules/Programming/Attention/OccupationalExamination/OccupationalExamination')));
const UpdateAssistanceProgra = Loadable(lazy(() => import('modules/Programming/Attention/UpdateAssistance')));
const UpdateEvolutionNoteProgra = Loadable(lazy(() => import('modules/Programming/Attention/UpdateEvolutionNote')));
const UpdateCounselingProgra = Loadable(lazy(() => import('modules/Programming/Attention/UpdateCounseling')));
const UpdateMedicalAdviceProgra = Loadable(lazy(() => import('modules/Programming/Attention/UpdateMedicalAdvice')));
const UpdateNoteInfirmaryProgra = Loadable(lazy(() => import('modules/Programming/Attention/UpdateNoteInfirmary')));
const UpdateAlcoholAndDrugTestings = Loadable(lazy(() => import('modules/Programming/Attention/UpdateAlcoholAndDrugTesting')));

const ListMedicines = Loadable(lazy(() => import('modules/Medicines/ListMedicines')));
const UpdateMedicines = Loadable(lazy(() => import('modules/Medicines/UpdateMedicines')));
const Medicines = Loadable(lazy(() => import('modules/Medicines/Medicines')));

const ListUser = Loadable(lazy(() => import('modules/User/ListUser')));
const UpdateUser = Loadable(lazy(() => import('modules/User/UpdateUser')));
const User = Loadable(lazy(() => import('modules/User/User')));

const ListUserFirebase = Loadable(lazy(() => import('modules/UserFirebase/ListUserFirebase')));
const UpdateUserFirebase = Loadable(lazy(() => import('modules/UserFirebase/UpdateUserFirebase')));
const UserFirebase = Loadable(lazy(() => import('modules/UserFirebase/UserFirebase')));

const ListSGSST = Loadable(lazy(() => import('modules/SGSST/ListSGSST')));
const UpdateSGSST = Loadable(lazy(() => import('modules/SGSST/UpdateSGSST')));
const SGSST = Loadable(lazy(() => import('modules/SGSST/SGSST')));

const ListElectro = Loadable(lazy(() => import('modules/Paraclinics/Electro/ListElectro')));
const Electro = Loadable(lazy(() => import('modules/Paraclinics/Electro/Electro')));
const UpdateElectro = Loadable(lazy(() => import('modules/Paraclinics/Electro/UpdateElectro')));

const ListRNM = Loadable(lazy(() => import('modules/Paraclinics/RMN/ListRNM')));
const RNM = Loadable(lazy(() => import('modules/Paraclinics/RMN/RNM')));
const UpdateRNM = Loadable(lazy(() => import('modules/Paraclinics/RMN/UpdateRNM')));

const ListPSA = Loadable(lazy(() => import('modules/Paraclinics/PSA/ListPSA')));
const PSA = Loadable(lazy(() => import('modules/Paraclinics/PSA/PSA')));
const UpdatePSA = Loadable(lazy(() => import('modules/Paraclinics/PSA/UpdatePSA')));

const ListRXTORAX = Loadable(lazy(() => import('modules/Paraclinics/RXTorax/ListRXTORAX')));
const RXTORAX = Loadable(lazy(() => import('modules/Paraclinics/RXTorax/RXTORAX')));
const UpdateRXTORAX = Loadable(lazy(() => import('modules/Paraclinics/RXTorax/UpdateRXTORAX')));

const ListCytology = Loadable(lazy(() => import('modules/Paraclinics/Cytology/ListCytology')));
const Cytology = Loadable(lazy(() => import('modules/Paraclinics/Cytology/Cytology')));
const UpdateCytology = Loadable(lazy(() => import('modules/Paraclinics/Cytology/UpdateCytology')));

const ListVisiometrics = Loadable(lazy(() => import('modules/Paraclinics/Visiometrics/ListVisiometrics')));
const Visiometrics = Loadable(lazy(() => import('modules/Paraclinics/Visiometrics/Visiometrics')));
const UpdateVisiometrics = Loadable(lazy(() => import('modules/Paraclinics/Visiometrics/UpdateVisiometrics')));

const ListSpirometry = Loadable(lazy(() => import('modules/Paraclinics/Spirometry/ListSpirometry')));
const Spirometry = Loadable(lazy(() => import('modules/Paraclinics/Spirometry/Spirometry')));
const UpdateSpirometry = Loadable(lazy(() => import('modules/Paraclinics/Spirometry/UpdateSpirometry')));

const ListLaboratory = Loadable(lazy(() => import('modules/Paraclinics/Laboratory/ListLaboratory')));
const Laboratory = Loadable(lazy(() => import('modules/Paraclinics/Laboratory/Laboratory')));
const UpdateLaboratory = Loadable(lazy(() => import('modules/Paraclinics/Laboratory/UpdateLaboratory')));

const ViewReprint = Loadable(lazy(() => import('modules/Reprint/ViewReprint')));
const ViewExport = Loadable(lazy(() => import('modules/Export/ViewExport')));
const ViewHistory = Loadable(lazy(() => import('modules/History/ViewHistory')));

const ForgotPassword = Loadable(lazy(() => import('modules/ForgotPassword/ForgotPassword')));


const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        /* Render de Tipo Catalogo */
        {
            path: '/typecatalog/list',
            element: <ListTypeCatalog />
        },
        {
            path: '/typecatalog/add',
            element: <TypeCatalog />
        },
        {
            path: '/typecatalog/report',
            element: <ReportTypeCatolog />
        },
        {
            path: '/typecatalog/update/:id',
            element: <UpdateTypeCatalog />
        },
        /* Render de Catalogo */
        {
            path: '/catalog/list',
            element: <ListCatalog />
        },
        {
            path: '/catalog/add',
            element: <Catalog />
        },
        {
            path: '/catalog/report',
            element: <ReportCatalog />
        },
        {
            path: '/catalog/update/:id',
            element: <UpdateCatalog />
        },
        /* Render de Empresas */
        {
            path: '/company/list',
            element: <ListCompany />
        },
        {
            path: '/company/add',
            element: <Company />
        },
        {
            path: '/company/update/:id',
            element: <UpdateCompany />
        },
        {
            path: '/company/report',
            element: <ReportCompany />
        },
        /* Render de Empleados */
        {
            path: '/employee/list',
            element: <ListEmployee />
        },
        {
            path: '/employee/add',
            element: <Employee />
        },
        {
            path: '/employee/update/:id',
            element: <UpdateEmployee />
        },
        {
            path: '/employee/report/',
            element: <ReportEmployee />
        },
        /* Render de Proveedores */
        {
            path: '/supplier/list',
            element: <ListSupplier />
        },
        {
            path: '/supplier/add',
            element: <Supplier />
        },
        {
            path: '/supplier/report',
            element: <ReportSupplier />
        },
        {
            path: '/supplier/update/:id',
            element: <UpdateSupplier />
        },
        /* Render de HISTORIA CLÍNICA */
        {
            path: '/assistance/list',
            element: <ListAssistance />
        },
        {
            path: '/assistance/add',
            element: <Assistance />
        },
        {
            path: '/assistance/update/:id',
            element: <UpdateAssistance />
        },
        {
            path: '/assistance/report/:id',
            element: <ReportAssistance />
        },
        /* Render de NOTAS DE EVOLUCION */
        {
            path: '/evolution-note/list',
            element: <ListEvolutionNote />
        },
        {
            path: '/evolution-note/add',
            element: <EvolutionNote />
        },
        {
            path: '/evolution-note/update/:id',
            element: <UpdateEvolutionNote />
        },
        {
            path: '/evolution-note/report/:id',
            element: <ReportEvolutionNote />
        },
        /* Render de ASESORÍAS MÉDICA */
        {
            path: '/medicaladvice/report',
            element: <ReportMedicalAdvice />
        },
        {
            path: '/medicaladvice/list',
            element: <ListMedicalAdvice />
        },
        {
            path: '/medicaladvice/add',
            element: <MedicalAdvice />
        },
        {
            path: '/medicaladvice/update/:id',
            element: <UpdateMedicalAdvice />
        },
        /* Render de NOTAS DE ENFERMERIA */
        {
            path: '/note-infirmary/list',
            element: <ListNoteInfirmary />
        },
        {
            path: '/note-infirmary/add',
            element: <NoteInfirmary />
        },
        {
            path: '/note-infirmary/update/:id',
            element: <UpdateNoteInfirmary />
        },
        {
            path: '/note-infirmary/report/:id',
            element: <ReportNoteInfirmary />
        },
        /* Render de FORMULAS MEDICAS */
        {
            path: '/medicalformula/list',
            element: <ListMedicalFormula />
        },
        {
            path: '/medicalformula/add',
            element: <MedicalFormula />
        },
        {
            path: '/medicalformula/update/:id',
            element: <UpdateMedicalFormula />
        },
        {
            path: '/medicalformula/report',
            element: <ReportMedicalFormula />
        },
        /* Render de FORMULAS MEDICAS */
        {
            path: '/attention/list',
            element: <ListAttention />
        },
        {
            path: '/attention/add',
            element: <Attention />
        },
        {
            path: '/attention/update/:id',
            element: <UpdateAttention />
        },
        {
            path: '/attention/report/:id',
            element: <ReportAttention />
        },
        /* Render de Pruebas de Alcohol y Droga */
        {
            path: '/alcoholanddrugtesting/list',
            element: <ListAlcoholAndDrugTesting />
        },
        {
            path: '/alcoholanddrugtesting/add',
            element: <AlcoholAndDrugTesting />
        },
        {
            path: '/alcoholanddrugtesting/update/:id',
            element: <UpdateAlcoholAndDrugTesting />
        },
        {
            path: '/alcoholanddrugtesting/report/:id',
            element: <ReportAlcoholAndDrugTesting />
        },
        /* Render de Turner */
        {
            path: '/turner/add',
            element: <Turner />
        },
        /* Render de HCO */
        {
            path: '/occupational-examination/list',
            element: <ListOccupationalExamination />
        },
        {
            path: '/occupational-examination/add',
            element: <OccupationalExamination />
        },
        {
            path: '/occupational-examination/report',
            element: <ReportOccupationalExamination />
        },
        /* Render de Otras Asesorias */
        {
            path: '/otheradvice/list',
            element: <ListOtherAdvice />
        },
        {
            path: '/otheradvice/add',
            element: <OtherAdvice />
        },
        {
            path: '/otheradvice/update/:id',
            element: <UpdateOtherAdvice />
        },
        {
            path: '/otheradvice/report',
            element: <ReportOtherAdvice />
        },

        /* Render de Medicamentos */
        {
            path: '/medicines/list',
            element: <ListMedicines />
        },
        {
            path: '/medicines/add',
            element: <Medicines />
        },
        {
            path: '/medicines/update/:id',
            element: <UpdateMedicines />
        },
        /* Render de ASESORÍAS PSICOLÓGICA */
        {
            path: '/psychologicalcounseling/list',
            element: <ListPsychologicalCounseling />
        },
        {
            path: '/psychologicalcounseling/add',
            element: <PsychologicalCounseling />
        },
        {
            path: '/psychologicalcounseling/update/:id',
            element: <UpdatePsychologicalCounseling />
        },
        {
            path: '/psychologicalcounseling/report/:id',
            element: <ReportPsychological />
        },
        /* Render de CIE11 */
        {
            path: '/cie11/list',
            element: <ListCIE11 />
        },
        {
            path: '/cie11/add',
            element: <CIE11 />
        },
        {
            path: '/cie11/update/:id',
            element: <UpdateCIE11 />
        },

        /* Render de Charges */
        {
            path: '/charges/list',
            element: <ListCharges />
        },
        {
            path: '/charges/add',
            element: <Charges />
        },
        {
            path: '/charges/update/:id',
            element: <UpdateCharges />
        },

        /* Render de Charges */
        {
            path: '/panorama/list',
            element: <ListPanorama />
        },
        {
            path: '/panorama/add/:id',
            element: <Panorama />
        },
        {
            path: '/panorama/update/:id',
            element: <UpdatePanorama />
        },
        /* Render de TEMPLATE */
        {
            path: '/template/list',
            element: <ListTemplate />
        },
        {
            path: '/template/add',
            element: <Template />
        },
        {
            path: '/template/update/:id',
            element: <UpdateTemplate />
        },
        /* Render de OCCUPATIONAL HEALTH */
        {
            path: '/occupational-health/list',
            element: <ListOccupationalHealth />
        },
        {
            path: '/occupational-health/add',
            element: <OccupationalHealth />
        },
        {
            path: '/occupational-health/update/:id',
            element: <UpdateOccupationalHealth />
        },
        {
            path: '/programming/list',
            element: <ListProgramming />
        },
        /* Render de Occupational Medicine */
        {
            path: '/occupationalmedicine/list',
            element: <ListOccupationalMedicine />
        },
        {
            path: '/occupationalmedicine/add',
            element: <OccupationalMedicine />
        },
        {
            path: '/occupationalmedicine/update/:id',
            element: <UpdateOccupationalMedicine />
        },
        /* Render de Work Absenteeism */
        {
            path: '/work-absenteeism/list',
            element: <ListWorkAbsenteeism />
        },
        {
            path: '/work-absenteeism/add',
            element: <WorkAbsenteeism />
        },
        {
            path: '/work-absenteeism/update/:id',
            element: <UpdateWorkAbsenteeism />
        },
        /* Render de Items */
        {
            path: '/item/list',
            element: <ListItems />
        },
        {
            path: '/item/add',
            element: <Items />
        },
        {
            path: '/item/update/:id',
            element: <UpdateItems />
        },
        {
            path: '/orders/view',
            element: <ViewOrders />
        },
        {
            path: '/orders-individual/list',
            element: <ListOrdersIndividual />
        },
        {
            path: '/orders-individual/add',
            element: <OrdersIndividual />
        },
        {
            path: '/orders-individual/update/:id',
            element: <UpdateOrdersIndividual />
        },
        /* ATENCIONES DE PROGRAMACIÓN */
        {
            path: '/programming/psychological/:id',
            element: <UpdateCounselingProgra />
        },
        {
            path: '/programming/attention-new/:id',
            element: <UpdateAssistanceProgra />
        },
        {
            path: '/programming/attention-control/:id',
            element: <UpdateEvolutionNoteProgra />
        },
        {
            path: '/programming/medica/:id',
            element: <UpdateMedicalAdviceProgra />
        },
        {
            path: '/programming/other/:id',
            element: <UpdateCounselingProgra />
        },
        {
            path: '/programming/medical-attention/:id',
            element: <UpdateMedicalAdviceProgra />
        },
        {
            path: '/programming/infirmary/:id',
            element: <UpdateNoteInfirmaryProgra />
        },
        {
            path: '/programming/emo/:id',
            element: <OccupationalExaminationProgra />
        },
        {
            path: '/programming/alcoholanddrugtesting/:id',
            element: <UpdateAlcoholAndDrugTestings />
        },
        {
            path: '/user/list',
            element: <ListUser />
        },
        {
            path: '/user/add',
            element: <User />
        },
        {
            path: '/user/update/:id',
            element: <UpdateUser />
        },
        {
            path: '/userfire/list',
            element: <ListUserFirebase />
        },
        {
            path: '/userfire/add',
            element: <UserFirebase />
        },
        {
            path: '/userfire/update/:id',
            element: <UpdateUserFirebase />
        },
        {
            path: '/sg-sst/list',
            element: <ListSGSST />
        },
        {
            path: '/sg-sst/add',
            element: <SGSST />
        },
        {
            path: '/sg-sst/update/:id',
            element: <UpdateSGSST />
        },
        /* Render de  Paraclinicos */
        {
            path: '/paraclinics/electro/list',
            element: <ListElectro />
        },
        {
            path: '/paraclinics/electro/add',
            element: <Electro />
        },
        {
            path: '/paraclinics/electro/update/:id',
            element: <UpdateElectro />
        },
        {
            path: '/paraclinics/rnm/list',
            element: <ListRNM />
        },
        {
            path: '/paraclinics/rnm/add',
            element: <RNM />
        },
        {
            path: '/paraclinics/rnm/update/:id',
            element: <UpdateRNM />
        },
        {
            path: '/paraclinics/psa/list',
            element: <ListPSA />
        },
        {
            path: '/paraclinics/psa/add',
            element: <PSA />
        },
        {
            path: '/paraclinics/psa/update/:id',
            element: <UpdatePSA />
        },
        {
            path: '/paraclinics/rxtorax/list',
            element: <ListRXTORAX />
        },
        {
            path: '/paraclinics/rxtorax/add',
            element: <RXTORAX />
        },
        {
            path: '/paraclinics/rxtorax/update/:id',
            element: <UpdateRXTORAX />
        },
        {
            path: '/paraclinics/cytology/list',
            element: <ListCytology />
        },
        {
            path: '/paraclinics/cytology/add',
            element: <Cytology />
        },
        {
            path: '/paraclinics/cytology/update/:id',
            element: <UpdateCytology />
        },
        {
            path: '/paraclinics/visiometrics/list',
            element: <ListVisiometrics />
        },
        {
            path: '/paraclinics/visiometrics/add',
            element: <Visiometrics />
        },
        {
            path: '/paraclinics/visiometrics/update/:id',
            element: <UpdateVisiometrics />
        },

        {
            path: '/paraclinics/spirometry/list',
            element: <ListSpirometry />
        },
        {
            path: '/paraclinics/spirometry/add',
            element: <Spirometry />
        },
        {
            path: '/paraclinics/spirometry/update/:id',
            element: <UpdateSpirometry />
        },

        {
            path: '/paraclinics/laboratory/list',
            element: <ListLaboratory />
        },
        {
            path: '/paraclinics/laboratory/add',
            element: <Laboratory />
        },
        {
            path: '/paraclinics/laboratory/update/:id',
            element: <UpdateLaboratory />
        },

        /* Render de Reimprimir */
        {
            path: '/reprint/list',
            element: <ViewReprint />
        },
        {
            path: '/export/list',
            element: <ViewExport />
        },
        {
            path: '/history/list',
            element: <ViewHistory />
        },

        /* Render de Recuperar Contraseña */
        {
            path: '/forgot-password/view',
            element: <ForgotPassword />
        },








        {
            path: '/widget/statistics',
            element: <WidgetStatistics />
        },
        {
            path: '/widget/data',
            element: <WidgetData />
        },
        {
            path: '/widget/chart',
            element: <WidgetChart />
        },


        {
            path: '/app/chat',
            element: <AppChat />
        },
        {
            path: '/app/mail',
            element: <AppMail />
        },
        {
            path: '/app/kanban',
            element: <AppKanban />
        },
        {
            path: '/app/calendar',
            element: <AppCalendar />
        },
        {
            path: '/app/contact/c-card',
            element: <AppContactCard />
        },
        {
            path: '/app/contact/c-list',
            element: <AppContactList />
        },

        {
            path: '/charges/list',
            element: <ListCharges />
        },

        {
            path: '/dashboard/ltd',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard/analytics',
            element: <DashboardAnalytics />
        }
    ]
};

export default MainRoutes;