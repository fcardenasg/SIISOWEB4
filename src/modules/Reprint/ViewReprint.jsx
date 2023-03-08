import { Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { Fragment, useState } from "react";
import SubCard from "ui-component/cards/SubCard";
import PrintIcon from '@mui/icons-material/PrintTwoTone';

import TableConsulting from './Tables/TableConsulting';
import TableMedicalAttention from './Tables/TableMedicalAttention';
import TableEmo from './Tables/TableEmo';
import TableInfirmary from './Tables/TableInfirmary';
import { CodCatalogo, DefaultValue } from "components/helpers/Enums";
import { GetAllByTipoCatalogo } from "api/clients/CatalogClient";
import { useEffect } from "react";
import SelectOnChange from "components/input/SelectOnChange";
import { useTheme } from '@mui/material/styles';
import TableMedicalAttentionControl from "./Tables/TableMedicalAttentionControl";
import TableAlcoholAndDrugTesting from "./Tables/TableAlcoholAndDrugTesting";

const Title = {
    asesoria: 'ASESORÍAS',
    atencion: 'ATENCIÓN MÉDICA',
    emo: 'EMO',
    enfermeria: 'ENFERMERÍA',
}

const ViewReprint = () => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [statusReprint, setStatusReprint] = useState(1);
    const [estado, setEstado] = useState(DefaultValue.TIPO_ATENCION_ATENCIONMEDICA_NUEVO);
    const [enfermeria, setEnfermeria] = useState(DefaultValue.ATENCION_ENFERMERIA);
    const [lsEstado, setLsEstado] = useState([]);
    const [lsEnfermeria, setLsEnfermeria] = useState([]);

    useEffect(() => {
        async function getAll() {
            try {

                const lsServerEstado = await GetAllByTipoCatalogo(0, 0, CodCatalogo.EstadoCaso);
                var resultEstado = lsServerEstado.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsEstado(resultEstado);

                const lsServerEnfemeria = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AHC_ATENCION_NOTA_ENFERMERIA);
                var resultEnfermeria = lsServerEnfemeria.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsEnfermeria(resultEnfermeria);

            } catch (error) { }
        }

        getAll();
    }, []);

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SubCard title={<Typography variant="h4">REIMPRESIÓN</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={3}>
                                <Button onClick={() => setStatusReprint(1)} size="large" variant="outlined" color="error" fullWidth startIcon={<PrintIcon />}>
                                    {Title.asesoria}
                                </Button>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <Button onClick={() => setStatusReprint(2)} size="large" variant="outlined" color="error" fullWidth startIcon={<PrintIcon />}>
                                    {Title.atencion}
                                </Button>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <Button onClick={() => setStatusReprint(3)} size="large" variant="outlined" color="error" fullWidth startIcon={<PrintIcon />}>
                                    {Title.emo}
                                </Button>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <Button onClick={() => setStatusReprint(4)} size="large" variant="outlined" color="error" fullWidth startIcon={<PrintIcon />}>
                                    {Title.enfermeria}
                                </Button>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard title={
                        <Typography variant="h4">
                            REIMPRIMIR {statusReprint === 1 ? Title.asesoria :
                                statusReprint === 2 ? Title.atencion :
                                    statusReprint === 3 ? Title.emo :
                                        statusReprint === 4 ? Title.enfermeria : ''}
                        </Typography>}>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {statusReprint === 1 ?
                                    <TableConsulting /> :
                                    statusReprint === 2 ?
                                        <Fragment>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={6} lg={4}>
                                                    <SelectOnChange
                                                        name="sede"
                                                        label="Estado Caso"
                                                        value={estado}
                                                        options={lsEstado}
                                                        onChange={(e) => setEstado(e.target.value)}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>
                                                {estado === DefaultValue.TIPO_ATENCION_ATENCIONMEDICA_NUEVO ?
                                                    <Grid item xs={12}>
                                                        <TableMedicalAttention />
                                                    </Grid> :
                                                    <Grid item xs={12}>
                                                        <TableMedicalAttentionControl />
                                                    </Grid>
                                                }
                                            </Grid>
                                        </Fragment>
                                        :
                                        statusReprint === 3 ? <TableEmo /> :
                                            statusReprint === 4 ?
                                                <Fragment>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <SelectOnChange
                                                                name="sede"
                                                                label="Atención"
                                                                value={enfermeria}
                                                                options={lsEnfermeria}
                                                                onChange={(e) => setEnfermeria(e.target.value)}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>
                                                        {enfermeria === DefaultValue.ATENCION_ENFERMERIA ?
                                                            <Grid item xs={12}>
                                                                <TableInfirmary />
                                                            </Grid> :
                                                            <Grid item xs={12}>
                                                                <TableAlcoholAndDrugTesting />
                                                            </Grid>
                                                        }
                                                    </Grid>
                                                </Fragment> : null
                                }
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default ViewReprint;