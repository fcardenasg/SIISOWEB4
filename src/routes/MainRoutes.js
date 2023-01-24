import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// Dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const DashboardAnalytics = Loadable(lazy(() => import('views/dashboard/Analytics')));

//Nuestros import
const ListTypeCatalog = Loadable(lazy(() => import('modules/TypeCatalog/ListTypeCatalog')));
const TypeCatalog = Loadable(lazy(() => import('modules/TypeCatalog/TypeCatalog')));
const UpdateTypeCatalog = Loadable(lazy(() => import('modules/TypeCatalog/UpdateTypeCatalog')));

const ListProgramming = Loadable(lazy(() => import('modules/Programming/ListProgramming')));

const ListCatalog = Loadable(lazy(() => import('modules/Catalog/ListCatalog')));
const Catalog = Loadable(lazy(() => import('modules/Catalog/Catalog')));
const UpdateCatalog = Loadable(lazy(() => import('modules/Catalog/UpdateCatalog')));

const ListCompany = Loadable(lazy(() => import('modules/Company/ListCompany')));
const Company = Loadable(lazy(() => import('modules/Company/Company')));
const UpdateCompany = Loadable(lazy(() => import('modules/Company/UpdateCompany')));

const ListEmployee = Loadable(lazy(() => import('modules/Employee/ListEmployee')));
const Employee = Loadable(lazy(() => import('modules/Employee/Employee')));
const UpdateEmployee = Loadable(lazy(() => import('modules/Employee/UpdateEmployee')));

const ListSupplier = Loadable(lazy(() => import('modules/Supplier/ListSupplier')));
const Supplier = Loadable(lazy(() => import('modules/Supplier/Supplier')));
const UpdateSupplier = Loadable(lazy(() => import('modules/Supplier/UpdateSupplier')));

const ListAssistance = Loadable(lazy(() => import('modules/Assistance/ListAssistance')));
const Assistance = Loadable(lazy(() => import('modules/Assistance/Assistance')));
const UpdateAssistance = Loadable(lazy(() => import('modules/Assistance/UpdateAssistance')));

const ListEvolutionNote = Loadable(lazy(() => import('modules/EvolutionNote/ListEvolutionNote')));
const EvolutionNote = Loadable(lazy(() => import('modules/EvolutionNote/EvolutionNote')));
const UpdateEvolutionNote = Loadable(lazy(() => import('modules/EvolutionNote/UpdateEvolutionNote')));

const ListMedicalAdvice = Loadable(lazy(() => import('modules/MedicalAdvice/ListMedicalAdvice')));
const MedicalAdvice = Loadable(lazy(() => import('modules/MedicalAdvice/MedicalAdvice')));
const UpdateMedicalAdvice = Loadable(lazy(() => import('modules/MedicalAdvice/UpdateMedicalAdvice')));

const ListOrderEPP = Loadable(lazy(() => import('modules/OrderEPP/ListOrderEPP')));
const OrderEPP = Loadable(lazy(() => import('modules/OrderEPP/OrderEPP')));
const UpdateOrderEPP = Loadable(lazy(() => import('modules/OrderEPP/UpdateOrderEPP')));

const ListConceptofAptitude = Loadable(lazy(() => import('modules/ConceptofAptitude/ListConceptofAptitude')));
const ConceptofAptitude = Loadable(lazy(() => import('modules/ConceptofAptitude/ConceptofAptitude')));
const UpdateConceptofAptitude = Loadable(lazy(() => import('modules/ConceptofAptitude/UpdateConceptofAptitude')));

const ListCabRegistration = Loadable(lazy(() => import('modules/CabRegistration/ListCabRegistration')));
const CabRegistration = Loadable(lazy(() => import('modules/CabRegistration/CabRegistration')));
const UpdateCabRegistration = Loadable(lazy(() => import('modules/CabRegistration/UpdateCabRegistration')));

const ListPsychologicalCounseling = Loadable(lazy(() => import('modules/PsychologicalCounseling/ListPsychologicalCounseling')));
const PsychologicalCounseling = Loadable(lazy(() => import('modules/PsychologicalCounseling/PsychologicalCounseling')));
const UpdatePsychologicalCounseling = Loadable(lazy(() => import('modules/PsychologicalCounseling/UpdatePsychologicalCounseling')));

const ListNoteInfirmary = Loadable(lazy(() => import('modules/NoteInfirmary/ListNoteInfirmary')));
const NoteInfirmary = Loadable(lazy(() => import('modules/NoteInfirmary/NoteInfirmary')));
const UpdateNoteInfirmary = Loadable(lazy(() => import('modules/NoteInfirmary/UpdateNoteInfirmary')));

const ListMedicalFormula = Loadable(lazy(() => import('modules/MedicalFormula/ListMedicalFormula')));
const MedicalFormula = Loadable(lazy(() => import('modules/MedicalFormula/MedicalFormula')));
const UpdateMedicalFormula = Loadable(lazy(() => import('modules/MedicalFormula/UpdateMedicalFormula')));

const ListAlcoholAndDrugTesting = Loadable(lazy(() => import('modules/AlcoholAndDrugTesting/ListAlcoholAndDrugTesting')));
const AlcoholAndDrugTesting = Loadable(lazy(() => import('modules/AlcoholAndDrugTesting/AlcoholAndDrugTesting')));
const UpdateAlcoholAndDrugTesting = Loadable(lazy(() => import('modules/AlcoholAndDrugTesting/UpdateAlcoholAndDrugTesting')));

const ListTurner = Loadable(lazy(() => import('modules/Turner/ListTurner')));

const Attention = Loadable(lazy(() => import('modules/Attention/Attention')));
const UpdateAttention = Loadable(lazy(() => import('modules/Attention/UpdateAttention')));
const ListAttention = Loadable(lazy(() => import('modules/Attention/ListAttention')));

const ListOccupationalExamination = Loadable(lazy(() => import('modules/OccupationalExamination/ListOccupationalExamination')));
const OccupationalExamination = Loadable(lazy(() => import('modules/OccupationalExamination/OccupationalExamination')));

const ListOtherAdvice = Loadable(lazy(() => import('modules/OtherAdvice/ListOtherAdvice')));
const OtherAdvice = Loadable(lazy(() => import('modules/OtherAdvice/OtherAdvice')));
const UpdateOtherAdvice = Loadable(lazy(() => import('modules/OtherAdvice/UpdateOtherAdvice')));

const ListCIE11 = Loadable(lazy(() => import('modules/CIE11/ListCIE11')));
const CIE11 = Loadable(lazy(() => import('modules/CIE11/CIE11')));
const UpdateCIE11 = Loadable(lazy(() => import('modules/CIE11/UpdateCIE11')));

const ListAccidentRate = Loadable(lazy(() => import('modules/AccidentRate/ListAccidentRate')));
const AccidentRate = Loadable(lazy(() => import('modules/AccidentRate/AccidentRate')));
const UpdateAccidentRate = Loadable(lazy(() => import('modules/AccidentRate/UpdateAccidentRate')));

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

const ViewOrders = Loadable(lazy(() => import('modules/Orders/ViewOrders')));
const ListOrdersIndividual = Loadable(lazy(() => import('modules/Orders/ListOrdersIndividual')));
const OrdersIndividual = Loadable(lazy(() => import('modules/Orders/OrdersIndividual')));
const UpdateOrdersIndividual = Loadable(lazy(() => import('modules/Orders/UpdateOrdersIndividual')));

const OccupationalExaminationProgra = Loadable(lazy(() => import('modules/Programming/Attention/OccupationalExamination/OccupationalExamination')));
const UpdateClinicHistory = Loadable(lazy(() => import('modules/Programming/Attention/UpdateClinicHistory')));
const UpdateEvolutionNoteProgra = Loadable(lazy(() => import('modules/Programming/Attention/UpdateEvolutionNote')));
const UpdatePsychological = Loadable(lazy(() => import('modules/Programming/Attention/UpdatePsychological')));
const UpdateOthersAdvice = Loadable(lazy(() => import('modules/Programming/Attention/UpdateOtherAdvice')));
const UpdateMedicalAdviceProgra = Loadable(lazy(() => import('modules/Programming/Attention/UpdateMedicalAdvice')));
const UpdateNoteInfirmaryProgra = Loadable(lazy(() => import('modules/Programming/Attention/UpdateNoteInfirmary')));
const UpdateAlcoholAndDrugTestings = Loadable(lazy(() => import('modules/Programming/Attention/UpdateAlcoholAndDrugTesting')));

const ListMedicines = Loadable(lazy(() => import('modules/Medicines/ListMedicines')));
const UpdateMedicines = Loadable(lazy(() => import('modules/Medicines/UpdateMedicines')));
const Medicines = Loadable(lazy(() => import('modules/Medicines/Medicines')));

const ListRefund = Loadable(lazy(() => import('modules/Refund/ListRefund')));
const Refund = Loadable(lazy(() => import('modules/Refund/Refund')));
const UpdateRefund = Loadable(lazy(() => import('modules/Refund/UpdateRefund')));

const ListUser = Loadable(lazy(() => import('modules/User/ListUser')));
const UpdateUser = Loadable(lazy(() => import('modules/User/UpdateUser')));
const User = Loadable(lazy(() => import('modules/User/User')));

const ListFramingham = Loadable(lazy(() => import('modules/Framingham/ListFramingham')));
const UpdateFramingham = Loadable(lazy(() => import('modules/Framingham/UpdateFramingham')));
const AddFramingham = Loadable(lazy(() => import('modules/Framingham/AddFramingham')));

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

const ListAudiometry = Loadable(lazy(() => import('modules/Paraclinics/Audiometry/ListAudiometry')));
const Audiometry = Loadable(lazy(() => import('modules/Paraclinics/Audiometry/Audiometry')));
const UpdateAudiometry = Loadable(lazy(() => import('modules/Paraclinics/Audiometry/UpdateAudiometry')));

const ViewReprint = Loadable(lazy(() => import('modules/Reprint/ViewReprint')));
const ViewExport = Loadable(lazy(() => import('modules/Export/ViewExport')));
const Indicators = Loadable(lazy(() => import('modules/Indicators/Indicators')));

const ListPersonalNotes = Loadable(lazy(() => import('modules/PersonalNotes/ListPersonalNotes')));
const PersonalNotes = Loadable(lazy(() => import('modules/PersonalNotes/PersonalNotes')));
const UpdatePersonalNotes = Loadable(lazy(() => import('modules/PersonalNotes/UpdatePersonalNotes')));

const ForgotPassword = Loadable(lazy(() => import('modules/ForgotPassword/ForgotPassword')));

const MenuOccupationalHealth = Loadable(lazy(() => import('modules/Menu/MenuOccupationalHealth')));
const MenuAdministration = Loadable(lazy(() => import('modules/Menu/MenuAdministration')));
const MenuConsultancies = Loadable(lazy(() => import('modules/Menu/MenuConsultancies')));
const MenuParaclinics = Loadable(lazy(() => import('modules/Menu/MenuParaclinics')));
const MenuParameterization = Loadable(lazy(() => import('modules/Menu/MenuParameterization')));

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
            path: '/catalog/update/:id',
            element: <UpdateCatalog />
        },
        /* Render de Reintegro laboral */
        {
            path: '/refund/list',
            element: <ListRefund />
        },
        {
            path: '/refund/add',
            element: <Refund />
        },
        {
            path: '/refund/update/:id',
            element: <UpdateRefund />
        },
        /* Render de Apuntes personales */
        {
            path: '/personal-notes/list',
            element: <ListPersonalNotes />
        },
        {
            path: '/personal-notes/add',
            element: <PersonalNotes />
        },
        {
            path: '/personal-notes/update/:id',
            element: <UpdatePersonalNotes />
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
        /* Render de Ordenes EPP */
        {
            path: '/orderepp/list',
            element: <ListOrderEPP />
        },
        {
            path: '/orderepp/add',
            element: <OrderEPP />
        },
        {
            path: '/orderepp/update/:id',
            element: <UpdateOrderEPP />
        },

        /* Render de conceptos */
        {
            path: '/conceptofaptitude/list',
            element: <ListConceptofAptitude />
        },
        {
            path: '/conceptofaptitude/add',
            element: <ConceptofAptitude />
        },
        {
            path: '/conceptofaptitude/update/:id',
            element: <UpdateConceptofAptitude />
        },


        /* Render de conceptos */
        {
            path: '/cabregistration/list',
            element: <ListCabRegistration />
        },
        {
            path: '/cabregistration/add',
            element: <CabRegistration />
        },
        {
            path: '/cabregistration/update/:id',
            element: <UpdateCabRegistration />
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
        /* Render de Turner */
        {
            path: '/turner/list',
            element: <ListTurner />
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
        /* Render de Accidente de Trabajo */
        {
            path: '/accident-rate/list',
            element: <ListAccidentRate />
        },
        {
            path: '/accident-rate/add',
            element: <AccidentRate />
        },
        {
            path: '/accident-rate/update/:id',
            element: <UpdateAccidentRate />
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
            element: <UpdatePsychological />
        },
        {
            path: '/programming/attention-new/:id',
            element: <UpdateClinicHistory />
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
            element: <UpdateOthersAdvice />
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
        {
            path: '/paraclinics/audiometry/list',
            element: <ListAudiometry />
        },
        {
            path: '/paraclinics/audiometry/add',
            element: <Audiometry />
        },
        {
            path: '/paraclinics/audiometry/update/:id',
            element: <UpdateAudiometry />
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

        /* INDICADORES */
        {
            path: '/indicators/view',
            element: <Indicators />
        },

        /* Render de Recuperar Contraseña */
        {
            path: '/forgot-password/view',
            element: <ForgotPassword />
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
            path: '/indicators/view',
            element: <DashboardAnalytics />
        },

        /* SUBMENUS */
        {
            path: '/occupational-health/menu',
            element: <MenuOccupationalHealth />
        },
        {
            path: '/consultancies/menu',
            element: <MenuConsultancies />
        },
        {
            path: '/administration/menu',
            element: <MenuAdministration />
        },
        {
            path: '/paraclinics/menu',
            element: <MenuParaclinics />
        },
        {
            path: '/parameterization/menu',
            element: <MenuParameterization />
        },

        /* Framingham */
        {
            path: '/framingham/add',
            element: <AddFramingham />
        },
        {
            path: '/framingham/list',
            element: <ListFramingham />
        },
        {
            path: '/framingham/update/:id',
            element: <UpdateFramingham />
        },
    ]
};

export default MainRoutes;