import { Grid } from '@mui/material';
import { GetSubCardMenu } from 'api/clients/RolClient';
import HoverSocialCard from 'components/components/HoverSocialCard';
import useAuth from 'hooks/useAuth';
import NavigationBar from 'modules/DiseaseResearch/InvestigationOccupationalDisease/components/NavigationBar';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubmenuDiseaseResearch = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [lsSubCardMenu, setLsSubCardMenu] = useState([]);

    useLayoutEffect(() => {
        async function getSubCardMenu() {
            try {
                const lsServer = await GetSubCardMenu(user?.idrol, true);
                console.log(lsServer.data);
                if (lsServer.data.exito)
                    setLsSubCardMenu(lsServer.data.datos);
            } catch (error) { }
        }

        getSubCardMenu();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <NavigationBar title="Investigación de enfermedad laboral" urlBack="/occupational-health/menu" />
            </Grid>

            {lsSubCardMenu.map((item) => (
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

export default SubmenuDiseaseResearch;