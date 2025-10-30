import { Grid } from '@mui/material';
import HoverSocialCard from 'components/components/HoverSocialCard';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

const ArraySubmenuDiseaseResearch = [
    { title: "Cargue Historico de Enfermedades", url: "/HistoricalBurdenDiseases", icono: "tabler:upload", color: "#E31937" },
    { title: "Asignación de investigación", url: "/research-assignment/list", icono: "iwwa:assign", color: "#E31937" },
    { title: "Investigación de enfermedad laboral", url: "/investigation-occupational-disease/view", icono: "hugeicons:investigation", color: "#E31937" },
    { title: "Plan de rehabilitación", url: "", icono: "carbon:ibm-planning-analytics", color: "#E31937" },
    { title: "Análisis de Puesto de Trabajo", url: "", icono: "hugeicons:permanent-job", color: "#E31937" },
];

const SubmenuDiseaseResearch = () => {
    const navigate = useNavigate();

    return (
        <Fragment>
            <Grid container spacing={2} sx={{ mt: 2.5 }}>
                {ArraySubmenuDiseaseResearch.map((item) => (
                    <Grid item xs={12} md={6} lg={3}>
                        <HoverSocialCard
                            diferent={true}
                            secondary={item.title}
                            onClick={() => navigate(`${item.url}`)}
                            primary={item.subtitle}
                            iconPrimary={item.icono}
                            color={item.color}
                        />
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );
};

export default SubmenuDiseaseResearch;