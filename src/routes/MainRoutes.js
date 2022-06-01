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

// application - user social & account profile routing
const AppUserSocialProfile = Loadable(lazy(() => import('views/application/users/social-profile')));
const AppUserAccountProfile1 = Loadable(lazy(() => import('views/application/users/account-profile/Profile1')));
const AppUserAccountProfile2 = Loadable(lazy(() => import('views/application/users/account-profile/Profile2')));
const AppUserAccountProfile3 = Loadable(lazy(() => import('views/application/users/account-profile/Profile3')));

// application - user cards & list variant routing
const AppProfileCardStyle1 = Loadable(lazy(() => import('views/application/users/card/CardStyle1')));
const AppProfileCardStyle2 = Loadable(lazy(() => import('views/application/users/card/CardStyle2')));
const AppProfileCardStyle3 = Loadable(lazy(() => import('views/application/users/card/CardStyle3')));
const AppProfileListStyle1 = Loadable(lazy(() => import('views/application/users/list/Style1')));
const AppProfileListStyle2 = Loadable(lazy(() => import('views/application/users/list/Style2')));

// application - customer routing
const AppCustomerList = Loadable(lazy(() => import('views/application/customer/CustomerList')));
const AppCustomerOrderList = Loadable(lazy(() => import('views/application/customer/OrderList')));
const AppCustomerOrderDetails = Loadable(lazy(() => import('views/application/customer/OrderDetails')));
const AppCustomerProduct = Loadable(lazy(() => import('views/application/customer/Product')));
const AppCustomerProductReview = Loadable(lazy(() => import('views/application/customer/ProductReview')));

// application routing
const AppChat = Loadable(lazy(() => import('views/application/chat')));
const AppKanban = Loadable(lazy(() => import('views/application/kanban')));
const AppMail = Loadable(lazy(() => import('views/application/mail')));
const AppCalendar = Loadable(lazy(() => import('views/application/calendar')));
const AppContactCard = Loadable(lazy(() => import('views/application/contact/Card')));
const AppContactList = Loadable(lazy(() => import('views/application/contact/List')));

// application e-commerce pages
const AppECommProducts = Loadable(lazy(() => import('views/application/e-commerce/Products')));
const AppECommProductDetails = Loadable(lazy(() => import('views/application/e-commerce/ProductDetails')));
const AppECommProductList = Loadable(lazy(() => import('views/application/e-commerce/ProductList')));
const AppECommCheckout = Loadable(lazy(() => import('views/application/e-commerce/Checkout')));

// forms component routing
const FrmComponentsTextfield = Loadable(lazy(() => import('views/forms/components/TextField')));
const FrmComponentsButton = Loadable(lazy(() => import('views/forms/components/Button')));
const FrmComponentsCheckbox = Loadable(lazy(() => import('views/forms/components/Checkbox')));
const FrmComponentsRadio = Loadable(lazy(() => import('views/forms/components/Radio')));
const FrmComponentsSwitch = Loadable(lazy(() => import('views/forms/components/Switch')));
const FrmComponentsAutoComplete = Loadable(lazy(() => import('views/forms/components/AutoComplete')));
const FrmComponentsSlider = Loadable(lazy(() => import('views/forms/components/Slider')));
const FrmComponentsDateTime = Loadable(lazy(() => import('views/forms/components/DateTime')));

// forms plugins layout
const FrmLayoutLayout = Loadable(lazy(() => import('views/forms/layouts/Layouts')));
const FrmLayoutMultiColumnForms = Loadable(lazy(() => import('views/forms/layouts/MultiColumnForms')));
const FrmLayoutActionBar = Loadable(lazy(() => import('views/forms/layouts/ActionBar')));
const FrmLayoutStickyActionBar = Loadable(lazy(() => import('views/forms/layouts/StickyActionBar')));

// forms plugins routing
const FrmAutocomplete = Loadable(lazy(() => import('views/forms/plugins/AutoComplete')));
const FrmMask = Loadable(lazy(() => import('views/forms/plugins/Mask')));
const FrmClipboard = Loadable(lazy(() => import('views/forms/plugins/Clipboard')));
const FrmRecaptcha = Loadable(lazy(() => import('views/forms/plugins/Recaptcha')));
const FrmWysiwugEditor = Loadable(lazy(() => import('views/forms/plugins/WysiwugEditor')));
const FrmModal = Loadable(lazy(() => import('views/forms/plugins/Modal')));
const FrmTooltip = Loadable(lazy(() => import('views/forms/plugins/Tooltip')));

// table routing
const TableBasic = Loadable(lazy(() => import('views/forms/tables/TableBasic')));
const TableDense = Loadable(lazy(() => import('views/forms/tables/TableDense')));
const TableEnhanced = Loadable(lazy(() => import('views/forms/tables/TableEnhanced')));
const TableData = Loadable(lazy(() => import('views/forms/tables/TableData')));
const TableCustomized = Loadable(lazy(() => import('views/forms/tables/TablesCustomized')));
const TableStickyHead = Loadable(lazy(() => import('views/forms/tables/TableStickyHead')));
const TableCollapsible = Loadable(lazy(() => import('views/forms/tables/TableCollapsible')));

// forms validation
const FrmFormsValidation = Loadable(lazy(() => import('views/forms/forms-validation')));
const FrmFormsWizard = Loadable(lazy(() => import('views/forms/forms-wizard')));

// chart routing
const ChartApexchart = Loadable(lazy(() => import('views/forms/chart/Apexchart')));

// basic ui-elements routing
const BasicUIAccordion = Loadable(lazy(() => import('views/ui-elements/basic/UIAccordion')));
const BasicUIAvatar = Loadable(lazy(() => import('views/ui-elements/basic/UIAvatar')));
const BasicUIBadges = Loadable(lazy(() => import('views/ui-elements/basic/UIBadges')));
const BasicUIBreadcrumb = Loadable(lazy(() => import('views/ui-elements/basic/UIBreadcrumb')));
const BasicUICards = Loadable(lazy(() => import('views/ui-elements/basic/UICards')));
const BasicUIChip = Loadable(lazy(() => import('views/ui-elements/basic/UIChip')));
const BasicUIList = Loadable(lazy(() => import('views/ui-elements/basic/UIList')));
const BasicUITabs = Loadable(lazy(() => import('views/ui-elements/basic/UITabs')));

// advance ui-elements routing
const AdvanceUIAlert = Loadable(lazy(() => import('views/ui-elements/advance/UIAlert')));
const AdvanceUIDialog = Loadable(lazy(() => import('views/ui-elements/advance/UIDialog')));
const AdvanceUIPagination = Loadable(lazy(() => import('views/ui-elements/advance/UIPagination')));
const AdvanceUIProgress = Loadable(lazy(() => import('views/ui-elements/advance/UIProgress')));
const AdvanceUIRating = Loadable(lazy(() => import('views/ui-elements/advance/UIRating')));
const AdvanceUISnackbar = Loadable(lazy(() => import('views/ui-elements/advance/UISnackbar')));
const AdvanceUISkeleton = Loadable(lazy(() => import('views/ui-elements/advance/UISkeleton')));
const AdvanceUISpeeddial = Loadable(lazy(() => import('views/ui-elements/advance/UISpeeddial')));
const AdvanceUITimeline = Loadable(lazy(() => import('views/ui-elements/advance/UITimeline')));
const AdvanceUIToggleButton = Loadable(lazy(() => import('views/ui-elements/advance/UIToggleButton')));
const AdvanceUITreeview = Loadable(lazy(() => import('views/ui-elements/advance/UITreeview')));

// pricing page routing
const PagesPrice1 = Loadable(lazy(() => import('views/pages/pricing/Price1')));
const PagesPrice2 = Loadable(lazy(() => import('views/pages/pricing/Price2')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const UtilsAnimation = Loadable(lazy(() => import('views/utilities/Animation')));
const UtilsGrid = Loadable(lazy(() => import('views/utilities/Grid')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

//Nuestros import
const ListTypeCatalog = Loadable(lazy(() => import('../modules/TypeCatalog/ListTypeCatalog')));
const ReportTypeCatolog = Loadable(lazy(() => import('components/report/ReportTypeCatolog')));
const TypeCatalog = Loadable(lazy(() => import('../modules/TypeCatalog/TypeCatalog')));
const UpdateTypeCatalog = Loadable(lazy(() => import('../modules/TypeCatalog/UpdateTypeCatalog')));

const ListCatalog = Loadable(lazy(() => import('../modules/Catalog/ListCatalog')));
const Catalog = Loadable(lazy(() => import('../modules/Catalog/Catalog')));
const ReportCatalog = Loadable(lazy(() => import('components/report/ReportCatalog')));
const UpdateCatalog = Loadable(lazy(() => import('../modules/Catalog/UpdateCatalog')));

const ListCompany = Loadable(lazy(() => import('../modules/Company/ListCompany')));
const Company = Loadable(lazy(() => import('../modules/Company/Company')));
const UpdateCompany = Loadable(lazy(() => import('../modules/Company/UpdateCompany')));
const ReportCompany = Loadable(lazy(() => import('components/report/ReportCompany')));

const ListEmployee = Loadable(lazy(() => import('../modules/Employee/ListEmployee')));
const Employee = Loadable(lazy(() => import('../modules/Employee/Employee')));
const UpdateEmployee = Loadable(lazy(() => import('../modules/Employee/UpdateEmployee')));
const ReportEmployee = Loadable(lazy(() => import('components/report/ReportEmployee')));

const ListSupplier = Loadable(lazy(() => import('../modules/Supplier/ListSupplier')));
const Supplier = Loadable(lazy(() => import('../modules/Supplier/Supplier')));
const ReportSupplier = Loadable(lazy(() => import('components/report/ReportSupplier')));
const UpdateSupplier = Loadable(lazy(() => import('../modules/Supplier/UpdateSupplier')));

const ListAssistance = Loadable(lazy(() => import('../modules/Assistance/ListAssistance')));
const Assistance = Loadable(lazy(() => import('../modules/Assistance/Assistance')));
const UpdateAssistance = Loadable(lazy(() => import('../modules/Assistance/UpdateAssistance')));
const ReportAssistance = Loadable(lazy(() => import('components/report/ReportAssistance')));

const ListEvolutionNote = Loadable(lazy(() => import('../modules/EvolutionNote/ListEvolutionNote')));
const EvolutionNote = Loadable(lazy(() => import('../modules/EvolutionNote/EvolutionNote')));
const UpdateEvolutionNote = Loadable(lazy(() => import('../modules/EvolutionNote/UpdateEvolutionNote')));
const ReportEvolutionNote = Loadable(lazy(() => import('components/report/ReportEvolutionNote')));

const ListMedicalAdvice = Loadable(lazy(() => import('modules/MedicalAdvice/ListMedicalAdvice')));
const MedicalAdvice = Loadable(lazy(() => import('modules/MedicalAdvice/MedicalAdvice')));
const UpdateMedicalAdvice = Loadable(lazy(() => import('modules/MedicalAdvice/UpdateMedicalAdvice')));
const ReportMedicalAdvice = Loadable(lazy(() => import('components/report/ReportMedicalAdvice')));

const ListPsychologicalCounseling = Loadable(lazy(() => import('modules/PsychologicalCounseling/ListPsychologicalCounseling')));
const PsychologicalCounseling = Loadable(lazy(() => import('modules/PsychologicalCounseling/PsychologicalCounseling')));
const UpdatePsychologicalCounseling = Loadable(lazy(() => import('modules/PsychologicalCounseling/UpdatePsychologicalCounseling')));
const ReportPsychologicalCounseling = Loadable(lazy(() => import('components/report/ReportPsychologicalCounseling')));


const ListNoteInfirmary = Loadable(lazy(() => import('../modules/NoteInfirmary/ListNoteInfirmary')));
const NoteInfirmary = Loadable(lazy(() => import('../modules/NoteInfirmary/NoteInfirmary')));
const UpdateNoteInfirmary = Loadable(lazy(() => import('../modules/NoteInfirmary/UpdateNoteInfirmary')));
const ReportInfirmary = Loadable(lazy(() => import('components/report/ReportInfirmary')));


const ListMedicalFormula = Loadable(lazy(() => import('modules/MedicalFormula/ListMedicalFormula')));
const MedicalFormula = Loadable(lazy(() => import('modules/MedicalFormula/MedicalFormula')));
const UpdateMedicalFormula = Loadable(lazy(() => import('modules/MedicalFormula/UpdateMedicalFormula')));
const ReportMedicalFormula = Loadable(lazy(() => import('components/report/ReportMedicalFormula')));


const ListAlcoholAndDrugTesting = Loadable(lazy(() => import('modules/AlcoholAndDrugTesting/ListAlcoholAndDrugTesting')));
const AlcoholAndDrugTesting = Loadable(lazy(() => import('modules/AlcoholAndDrugTesting/AlcoholAndDrugTesting')));
const UpdateAlcoholAndDrugTesting = Loadable(lazy(() => import('modules/AlcoholAndDrugTesting/UpdateAlcoholAndDrugTesting')));
const ReportAlcoholAndDrugTesting = Loadable(lazy(() => import('components/report/ReportAlcoholAndDrugTesting')));


const Turner = Loadable(lazy(() => import('modules/Turner/Turner')));

const ListOccupationalExamination = Loadable(lazy(() => import('modules/OccupationalExamination/ListOccupationalExamination')));
const OccupationalExamination = Loadable(lazy(() => import('modules/OccupationalExamination/OccupationalExamination')));

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

// ==============================|| MAIN ROUTING ||============================== //

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
            element: <ReportInfirmary />
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
            element: <UpdateAlcoholAndDrugTesting/>
        },
        {
            path: '/alcoholanddrugtesting/report',
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
            path: '/psychologicalcounseling/report',
            element: <ReportPsychologicalCounseling />
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



        {
            path: '/cie11/report',
            element: <ReportPsychologicalCounseling />
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
        {
            path: '/template/report',
            element: <ReportPsychologicalCounseling />
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
            path: '/user/social-profile/:tab',
            element: <AppUserSocialProfile />
        },
        {
            path: '/user/account-profile/profile1',
            element: <AppUserAccountProfile1 />
        },
        {
            path: '/user/account-profile/profile2',
            element: <AppUserAccountProfile2 />
        },
        {
            path: '/user/account-profile/profile3',
            element: <AppUserAccountProfile3 />
        },

        {
            path: '/user/card/card1',
            element: <AppProfileCardStyle1 />
        },
        {
            path: '/user/card/card2',
            element: <AppProfileCardStyle2 />
        },
        {
            path: '/user/card/card3',
            element: <AppProfileCardStyle3 />
        },
        {
            path: '/user/list/list1',
            element: <AppProfileListStyle1 />
        },
        {
            path: '/user/list/list2',
            element: <AppProfileListStyle2 />
        },

        {
            path: '/customer/listOccupational--examination',
            element: <AppCustomerList />
        },
        {
            path: '/customer/order-list',
            element: <AppCustomerOrderList />
        },
        {
            path: '/customer/order-details',
            element: <AppCustomerOrderDetails />
        },
        {
            path: '/customer/product',
            element: <AppCustomerProduct />
        },
        {
            path: '/customer/product-review',
            element: <AppCustomerProductReview />
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
            path: '/e-commerce/product-details/:id',
            element: <AppECommProductDetails />
        },
        {
            path: '/e-commerce/product-list',
            element: <AppECommProductList />
        },
        {
            path: '/e-commerce/checkout',
            element: <AppECommCheckout />
        },

        {
            path: '/components/text-field',
            element: <FrmComponentsTextfield />
        },
        {
            path: '/components/button',
            element: <FrmComponentsButton />
        },
        {
            path: '/components/checkbox',
            element: <FrmComponentsCheckbox />
        },
        {
            path: '/components/radio',
            element: <FrmComponentsRadio />
        },
        {
            path: '/components/autocomplete',
            element: <FrmComponentsAutoComplete />
        },
        {
            path: '/components/slider',
            element: <FrmComponentsSlider />
        },
        {
            path: '/components/switch',
            element: <FrmComponentsSwitch />
        },
        {
            path: '/components/date-time',
            element: <FrmComponentsDateTime />
        },

        {
            path: '/forms/layouts/layouts',
            element: <FrmLayoutLayout />
        },
        {
            path: '/forms/layouts/multi-column-forms',
            element: <FrmLayoutMultiColumnForms />
        },
        {
            path: '/forms/layouts/action-bar',
            element: <FrmLayoutActionBar />
        },
        {
            path: '/forms/layouts/sticky-action-bar',
            element: <FrmLayoutStickyActionBar />
        },

        {
            path: '/forms/frm-autocomplete',
            element: <FrmAutocomplete />
        },
        {
            path: '/forms/frm-mask',
            element: <FrmMask />
        },
        {
            path: '/forms/frm-clipboard',
            element: <FrmClipboard />
        },
        {
            path: '/forms/frm-recaptcha',
            element: <FrmRecaptcha />
        },
        {
            path: '/forms/frm-wysiwug',
            element: <FrmWysiwugEditor />
        },
        {
            path: '/forms/frm-modal',
            element: <FrmModal />
        },
        {
            path: '/forms/frm-tooltip',
            element: <FrmTooltip />
        },

        {
            path: '/tables/tbl-basic',
            element: <TableBasic />
        },
        {
            path: '/tables/tbl-dense',
            element: <TableDense />
        },
        {
            path: '/tables/tbl-enhanced',
            element: <TableEnhanced />
        },
        {
            path: '/tables/tbl-data',
            element: <TableData />
        },
        {
            path: '/tables/tbl-customized',
            element: <TableCustomized />
        },
        {
            path: '/tables/tbl-sticky-header',
            element: <TableStickyHead />
        },
        {
            path: '/tables/tbl-collapse',
            element: <TableCollapsible />
        },

        {
            path: '/chart/apexchart',
            element: <ChartApexchart />
        },
        {
            path: '/forms/forms-validation',
            element: <FrmFormsValidation />
        },
        {
            path: '/forms/forms-wizard',
            element: <FrmFormsWizard />
        },

        {
            path: '/basic/accordion',
            element: <BasicUIAccordion />
        },
        {
            path: '/basic/avatar',
            element: <BasicUIAvatar />
        },
        {
            path: '/basic/badges',
            element: <BasicUIBadges />
        },
        {
            path: '/basic/breadcrumb',
            element: <BasicUIBreadcrumb />
        },
        {
            path: '/basic/cards',
            element: <BasicUICards />
        },
        {
            path: '/basic/chip',
            element: <BasicUIChip />
        },
        {
            path: '/basic/list',
            element: <BasicUIList />
        },
        {
            path: '/basic/tabs',
            element: <BasicUITabs />
        },
        {
            path: '/advance/pagination',
            element: <AdvanceUIPagination />
        },
        {
            path: '/advance/progress',
            element: <AdvanceUIProgress />
        },
        {
            path: '/advance/rating',
            element: <AdvanceUIRating />
        },
        {
            path: '/advance/snackbar',
            element: <AdvanceUISnackbar />
        },
        {
            path: '/advance/skeleton',
            element: <AdvanceUISkeleton />
        },
        {
            path: '/advance/speeddial',
            element: <AdvanceUISpeeddial />
        },
        {
            path: '/advance/timeline',
            element: <AdvanceUITimeline />
        },
        {
            path: '/advance/toggle-button',
            element: <AdvanceUIToggleButton />
        },
        {
            path: '/advance/treeview',
            element: <AdvanceUITreeview />
        },

        {
            path: '/pages/price/price1',
            element: <PagesPrice1 />
        },
        {
            path: '/pages/price/price2',
            element: <PagesPrice2 />
        },

        {
            path: '/utils/util-typography',
            element: <UtilsTypography />
        },
        {
            path: '/utils/util-color',
            element: <UtilsColor />
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/icons/material-icons',
            element: <UtilsMaterialIcons />
        },
        {
            path: '/utils/util-animation',
            element: <UtilsAnimation />
        },
        {
            path: '/utils/util-grid',
            element: <UtilsGrid />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        },
        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard/analytics',
            element: <DashboardAnalytics />
        }
    ]
};

export default MainRoutes;
