import { Grid } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";

const Indicators = () => {
    return (
        <MainCard title="Indicadores de soporte">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <iframe
                        title=""
                        width="1150"
                        height="450"
                        src=""
                        frameborder="0"
                        allowFullScreen="true"
                    />
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default Indicators;