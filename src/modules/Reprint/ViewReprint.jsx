import PrintIcon from '@mui/icons-material/PrintTwoTone';
import { Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import SubCard from "ui-component/cards/SubCard";
import { useTheme } from '@mui/material/styles';
import { GetByTipoCatalogoCombo } from "api/clients/CatalogClient";
import { CodCatalogo, DefaultValue } from "components/helpers/Enums";
import SelectOnChange from "components/input/SelectOnChange";
import TableAlcoholAndDrugTesting from "./Tables/TableAlcoholAndDrugTesting";
import TableConsulting from './Tables/TableConsulting';
import TableEmo from './Tables/TableEmo';
import TableHistoryDrunkenness from "./Tables/TableHistoryDrunkenness";
import TableInfirmary from './Tables/TableInfirmary';
import TableMedicalAttention from './Tables/TableMedicalAttention';
import TableMedicalAttentionControl from "./Tables/TableMedicalAttentionControl";

const Title = {
    asesoria: 'Asesorías',
    atencion: 'Atención Médica',
    emo: 'EMO',
    enfermeria: 'Enfermería',
};

// Componente para los botones de selección
const ReprintButton = ({ title, onClick, selected }) => (
    <Grid item xs={12} md={6} lg={3}>
        <Button
            onClick={onClick}
            size="large"
            variant={selected ? "contained" : "outlined"}
            color="error"
            fullWidth
            startIcon={<PrintIcon />}
        >
            {title}
        </Button>
    </Grid>
);

// Mapeo de estados y componentes
const reprintOptions = {
    1: {
        title: Title.asesoria,
        component: <TableConsulting />,
    },
    2: {
        title: Title.atencion,
        component: ({ estado, lsEstado, setEstado, matchesXS }) => (
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
                <Grid item xs={12}>
                    {estado === DefaultValue.TIPO_ATENCION_ATENCIONMEDICA_NUEVO ? (
                        <TableMedicalAttention />
                    ) : (
                        <TableMedicalAttentionControl />
                    )}
                </Grid>
            </Grid>
        ),
    },
    3: {
        title: Title.emo,
        component: <TableEmo />,
    },
    4: {
        title: Title.enfermeria,
        component: ({ enfermeria, lsEnfermeria, setEnfermeria, matchesXS }) => (
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

                <Grid item xs={12}>
                    {enfermeria === DefaultValue.ATENCION_ENFERMERIA ? (
                        <TableInfirmary />
                    ) : enfermeria === DefaultValue.ATENCION_HISTORIA_EMBRIAGUEZ ? (
                        <TableHistoryDrunkenness />
                    ) : (
                        <TableAlcoholAndDrugTesting />
                    )}
                </Grid>
            </Grid>
        ),
    },
};

const ViewReprint = () => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [statusReprint, setStatusReprint] = useState(1);
    const [estado, setEstado] = useState(DefaultValue.TIPO_ATENCION_ATENCIONMEDICA_NUEVO);
    const [enfermeria, setEnfermeria] = useState(DefaultValue.ATENCION_ENFERMERIA);
    const [lsEstado, setLsEstado] = useState([]);
    const [lsEnfermeria, setLsEnfermeria] = useState([]);

    useEffect(() => {
        const fetchCatalogs = async () => {
            try {
                const [lsServerEstado, lsServerEnfermeria] = await Promise.all([
                    GetByTipoCatalogoCombo(CodCatalogo.EstadoCaso),
                    GetByTipoCatalogoCombo(CodCatalogo.AHC_ATENCION_NOTA_ENFERMERIA),
                ]);

                setLsEstado(lsServerEstado.data);
                setLsEnfermeria(lsServerEnfermeria.data);
            } catch (error) {

            }
        };

        fetchCatalogs();
    }, []);

    const currentOption = reprintOptions[statusReprint];

    return (
        <Fragment>
            <Grid container spacing={2}>
                {/* Botones de selección */}
                <Grid item xs={12}>
                    <SubCard title={<Typography variant="h4">Módulos de reimpresión</Typography>}>
                        <Grid container spacing={2}>
                            {Object.keys(reprintOptions).map((key) => (
                                <ReprintButton
                                    key={key}
                                    title={reprintOptions[key].title}
                                    onClick={() => setStatusReprint(Number(key))}
                                    selected={statusReprint === Number(key)}
                                />
                            ))}
                        </Grid>
                    </SubCard>
                </Grid>

                {/* Contenido dinámico */}
                <Grid item xs={12}>
                    <SubCard
                        title={
                            <Typography variant="h4">
                                Reimprimir {currentOption.title}
                            </Typography>
                        }
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {typeof currentOption.component === "function"
                                    ? currentOption.component({
                                        estado,
                                        lsEstado,
                                        setEstado,
                                        enfermeria,
                                        lsEnfermeria,
                                        setEnfermeria,
                                        matchesXS,
                                    })
                                    : currentOption.component}
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default ViewReprint;