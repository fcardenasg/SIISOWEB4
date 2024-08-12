import { Button, Grid } from "@mui/material";
import { Fragment } from "react";
import SubCard from "ui-component/cards/SubCard";

const Indicators = () => {


    return (
        <Fragment>
            <SubCard title="Indicadores De Ausentismo Laboral" secondary={
                <Button component="a" href="https://app.powerbi.com/groups/dd48655e-0e38-48b3-b52f-b21c75cd2605/reports/f45e7f61-b008-4965-9e6f-6697c01f60f5/ReportSection21857dc12428be27ee30?ctid=5d3e5095-c2ab-436c-8eb6-a10cff17af55&experience=power-bi"
                    target="_blank" >
                    Ir a Exportar Indicadores
                </Button>}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <iframe
                            title="Reportincapacities"
                            width="1150"
                            height="450"
                            src="https://app.powerbi.com/view?r=eyJrIjoiYzNiNjM3ZmUtNjY1Yi00Y2I5LWE2YjctNjAzMmQ2NTJkYTg4IiwidCI6IjVkM2U1MDk1LWMyYWItNDM2Yy04ZWI2LWExMGNmZjE3YWY1NSIsImMiOjR9"
                            frameborder="0"
                            allowFullScreen="true">
                        </iframe>
                    </Grid>
                </Grid>
            </SubCard>
        </Fragment>
    )
}

export default Indicators;