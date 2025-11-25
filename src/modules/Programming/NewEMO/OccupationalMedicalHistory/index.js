import DiagnosticImpression from "./DiagnosticImpression";
import FamilyMedicalHistory from "./FamilyMedicalHistory";
import Framingham from "./Framingham";
import FunctionalExamination from "./FunctionalExamination";
import GynecologicalObstetric from "./GynecologicalObstetric";
import Habits from "./Habits";
import Immunizations from "./Immunizations";
import MedicalHistory from "./MedicalHistory";
import OccupationalIllness from "./OccupationalIllness";
import ParaclinicalTests from "./ParaclinicalTests";
import PhysicalExamination from "./PhysicalExamination";
import RespiratorySymptoms from "./RespiratorySymptoms";
import SystemReview from "./SystemReview";
import WorkingHeightConfinedSpaces from "./WorkingHeightConfinedSpaces";
import WorkplaceAccidents from "./WorkplaceAccidents";

const OccupationalMedicalHistory = () => {
    return (
        <>
            <MedicalHistory />
            <WorkplaceAccidents />
            <OccupationalIllness />
            <Immunizations />
            <FamilyMedicalHistory />
            <Habits />
            <GynecologicalObstetric />
            <SystemReview />
            <PhysicalExamination />
            <FunctionalExamination />
            <ParaclinicalTests />
            <Framingham />
            <DiagnosticImpression />
            <RespiratorySymptoms />
            <WorkingHeightConfinedSpaces />
        </>
    );
};

export default OccupationalMedicalHistory;