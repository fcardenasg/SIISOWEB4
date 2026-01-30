import { Grid } from '@mui/material';
import HoverSocialCard from 'components/components/HoverSocialCard';
import NavigationBar from 'modules/DiseaseResearch/InvestigationOccupationalDisease/components/NavigationBar';
import { useNavigate } from 'react-router-dom';

const ArraySubmenuDiseaseResearch = [
    { title: "APT Psicosocial", url: "/apt-psychosocial/view", icono: "mdi:psychology", color: "#E31937" },
    { title: "APT Higiene", url: "/apt-hygiene/view", icono: "mdi:hand-wash", color: "#E31937" }
];

const SubmenuAPT = () => {
    const navigate = useNavigate();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <NavigationBar title="Análisis de puesto de trabajo (APT)" urlBack="/disease-research/view" />
            </Grid>

            {ArraySubmenuDiseaseResearch.map((item) => (
                <Grid item xs={12} md={6} lg={3} key={item.title}>
                    <HoverSocialCard
                        diferent={true}
                        secondary={item.title}
                        onClick={() => navigate(`${item.url}`)}
                        iconPrimary={item.icono}
                        color={item.color}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default SubmenuAPT;