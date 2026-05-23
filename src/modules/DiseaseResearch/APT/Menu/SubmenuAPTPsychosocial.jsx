import { Grid } from '@mui/material';
import HoverSocialCard from 'components/components/HoverSocialCard';
import NavigationBar from 'modules/DiseaseResearch/InvestigationOccupationalDisease/components/NavigationBar';
import { useNavigate } from 'react-router-dom';

const ArraySubmenuDiseaseResearchPsychosocial = [
    { title: "Calificación", subtitle: "Análisis Intralaboral y Extralaboral", url: "/apt-psychosocial/template/list", icono: "fluent:calendar-template-20-regular", color: "#E31937" },
    { title: "Tipo", subtitle: "Análisis psicosocial del puesto de trabajo", url: "/apt-psychosocial/list", icono: "hugeicons:analysis-text-link", color: "#E31937" }
];

const SubmenuAPTPsychosocial = () => {
    const navigate = useNavigate();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <NavigationBar title="APT Psicosocial" urlBack="/apt/view" />
            </Grid>

            {ArraySubmenuDiseaseResearchPsychosocial.map((item) => (
                <Grid item xs={12} md={6} lg={3} key={item.title}>
                    <HoverSocialCard
                        diferent={true}
                        secondary={item.title}
                        onClick={() => navigate(`${item.url}`)}
                        iconPrimary={item.icono}
                        color={item.color}
                        primary={item.subtitle}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default SubmenuAPTPsychosocial;