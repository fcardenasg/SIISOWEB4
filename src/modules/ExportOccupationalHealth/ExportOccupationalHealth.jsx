import { useTheme } from '@mui/material/styles';
import { Button, useMediaQuery, Grid, Typography } from "@mui/material";
import PrintIcon from '@mui/icons-material/PrintTwoTone';

import { useState, useEffect, Fragment } from 'react';
import SelectOnChange from 'components/input/SelectOnChange';
import InputDatePick from 'components/input/InputDatePick';
import { GetAllBySubTipoCatalogo, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo } from 'components/helpers/Enums';
import SubCard from 'ui-component/cards/SubCard';
import AccidenteTrabajo from './Export/AccidenteTrabajo';

/* import ExportConsulting from './Export/ExportConsulting';
import ExportMedicalAttention from './Export/ExportMedicalAttention';
import ExportEmo from './Export/ExportEmo';
import ExportInfirmary from './Export/ExportInfirmary'; */

const Title = {
    medicinaLaboral: 'MEDICINA LABORAL',
    reintegro: 'REINTEGRO',
    accidentalidadTrabajo: 'AT',
    ausentismoLaboral: 'AUSENTISMO LABORAL',
}

const ExportOccupationalHealth = () => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [statusReprint, setStatusReprint] = useState('SER03');

    const [lsSede, setLsSede] = useState([]);
    const [lsAtencion, setLsAtencion] = useState([]);

    const [atencion, setAtencion] = useState('');
    const [sede, setSede] = useState('');
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);

    async function GetAll() {
        try {
            const lsServerSede = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Sede);
            var resultSede = lsServerSede.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsSede(resultSede);

            var lsGetTipo = await GetAllBySubTipoCatalogo(0, 0, 'SER03', 5);
            if (lsGetTipo.status === 200) {
                var resultMapsTipo = lsGetTipo.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));

                setLsAtencion(resultMapsTipo);
            }
        } catch (error) { }
    }

    async function getAllAgain(codigo = '') {
        try {
            setAtencion(''); setSede(''); setFechaInicio(null); setFechaFin(null);
            setStatusReprint(codigo);
            var lsGetTipo = await GetAllBySubTipoCatalogo(0, 0, codigo, 5);
            if (lsGetTipo.status === 200) {
                var resultMapsTipo = lsGetTipo.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));

                setLsAtencion(resultMapsTipo);
            }
        } catch (error) { }
    }

    useEffect(() => {
        GetAll();
    }, [])

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SubCard title={<Typography variant="h4">EXPORTACIÓN</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={3}>
                                <Button onClick={() => getAllAgain('SER03')} size="large" variant="outlined" color="error" fullWidth startIcon={<PrintIcon />}>
                                    {Title.medicinaLaboral}
                                </Button>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <Button onClick={() => getAllAgain('SER01')} size="large" variant="outlined" color="error" fullWidth startIcon={<PrintIcon />}>
                                    {Title.reintegro}
                                </Button>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <Button onClick={() => getAllAgain('SER04')} size="large" variant="outlined" color="error" fullWidth startIcon={<PrintIcon />}>
                                    {Title.accidentalidadTrabajo}
                                </Button>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <Button onClick={() => getAllAgain('SER02')} size="large" variant="outlined" color="error" fullWidth startIcon={<PrintIcon />}>
                                    {Title.ausentismoLaboral}
                                </Button>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard title={<Typography variant="h4">EXPORTAR {statusReprint === 'SER03' ? Title.medicinaLaboral :
                        statusReprint === 'SER01' ? Title.reintegro :
                            statusReprint === 'SER04' ? Title.accidentalidadTrabajo :
                                statusReprint === 'SER02' ? Title.ausentismoLaboral : ''}</Typography>}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <SelectOnChange
                                    name="sede"
                                    label="Sede de Atención"
                                    value={sede}
                                    options={lsSede}
                                    onChange={(e) => setSede(e.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <InputDatePick
                                    label="Fecha Inicio"
                                    onChange={(e) => setFechaInicio(e)}
                                    value={fechaInicio}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <InputDatePick
                                    label="Fecha Fin"
                                    onChange={(e) => setFechaFin(e)}
                                    value={fechaFin}
                                />
                            </Grid>

                            <AccidenteTrabajo
                                fechaFin={fechaFin}
                                fechaInicio={fechaInicio}
                                sede={sede}
                            />

                            {/* {statusReprint === 'SER03' ?
                                <ExportConsulting
                                    atencion={atencion}
                                    fechaFin={fechaFin}
                                    fechaInicio={fechaInicio}
                                    sede={sede}
                                /> :
                                statusReprint === 'SER01' ?
                                    <ExportMedicalAttention
                                        atencion={atencion}
                                        fechaFin={fechaFin}
                                        fechaInicio={fechaInicio}
                                        sede={sede}
                                    /> :
                                    statusReprint === 'SER04' ?
                                        <ExportEmo
                                            atencion={atencion}
                                            fechaFin={fechaFin}
                                            fechaInicio={fechaInicio}
                                            sede={sede}
                                        /> :
                                        statusReprint === 'SER02' ?
                                            <ExportInfirmary
                                                atencion={atencion}
                                                fechaFin={fechaFin}
                                                fechaInicio={fechaInicio}
                                                sede={sede}
                                            /> : ''
                            } */}

                        </Grid>
                    </SubCard>
                </Grid>

            </Grid>
        </Fragment>
    );
};

export default ExportOccupationalHealth;