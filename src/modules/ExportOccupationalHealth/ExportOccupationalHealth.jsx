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
import MedicionaLaboralExport from './Export/MedicionaLaboralExport';
import ReintegroExport from './Export/ReintegroExport';
import AusentismoExport from './Export/AusentismoExport';

const Title = {
    medicinaLaboral: 'MEDICINA LABORAL',
    reintegro: 'REINTEGRO',
    accidentalidadTrabajo: 'AT',
    ausentismoLaboral: 'AUSENTISMO LABORAL',
}

const ExportOccupationalHealth = () => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsSede, setLsSede] = useState([]);
    const [tipoReporte, setTipoReporte] = useState('EXCEL1');
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
        } catch (error) { }
    }

    useEffect(() => {
        GetAll();
    }, []);


    function getAllAgain(codigo = '') {
        try {
            setFechaInicio(null);
            setFechaFin(null);
            setTipoReporte(codigo);
        } catch (error) { }
    }

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SubCard title={<Typography variant="h4">EXPORTACIÓN</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={3}>
                                <Button onClick={() => getAllAgain('EXCEL1')} size="large" variant="outlined" color="error" fullWidth startIcon={<PrintIcon />}>
                                    {Title.medicinaLaboral}
                                </Button>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <Button onClick={() => getAllAgain('EXCEL2')} size="large" variant="outlined" color="error" fullWidth startIcon={<PrintIcon />}>
                                    {Title.reintegro}
                                </Button>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <Button onClick={() => getAllAgain('EXCEL3')} size="large" variant="outlined" color="error" fullWidth startIcon={<PrintIcon />}>
                                    {Title.accidentalidadTrabajo}
                                </Button>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <Button onClick={() => getAllAgain('EXCEL4')} size="large" variant="outlined" color="error" fullWidth startIcon={<PrintIcon />}>
                                    {Title.ausentismoLaboral}
                                </Button>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard title={<Typography variant="h4">EXPORTAR {tipoReporte === 'EXCEL1' ? Title.medicinaLaboral :
                        tipoReporte === 'EXCEL2' ? Title.reintegro :
                            tipoReporte === 'EXCEL3' ? Title.accidentalidadTrabajo :
                                tipoReporte === 'EXCEL4' ? Title.ausentismoLaboral : ''}</Typography>}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={3}>
                                <SelectOnChange
                                    name="sede"
                                    label="Sede de Atención"
                                    value={sede}
                                    options={lsSede}
                                    onChange={(e) => setSede(e.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <InputDatePick
                                    label="Fecha Inicio"
                                    onChange={(e) => setFechaInicio(e)}
                                    value={fechaInicio}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <InputDatePick
                                    label="Fecha Fin"
                                    onChange={(e) => setFechaFin(e)}
                                    value={fechaFin}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>


                            {tipoReporte === 'EXCEL1' ?
                                <MedicionaLaboralExport
                                    fechaFin={fechaFin}
                                    fechaInicio={fechaInicio}
                                    sede={sede}
                                /> :
                                tipoReporte === 'EXCEL2' ?
                                    <ReintegroExport
                                        fechaFin={fechaFin}
                                        fechaInicio={fechaInicio}
                                        sede={sede}
                                    /> : tipoReporte === 'EXCEL3' ?
                                        <AccidenteTrabajo
                                            fechaFin={fechaFin}
                                            fechaInicio={fechaInicio}
                                            sede={sede}
                                        /> : tipoReporte === 'EXCEL4' ?
                                            <AusentismoExport
                                                fechaFin={fechaFin}
                                                fechaInicio={fechaInicio}
                                                sede={sede}
                                            /> : null
                            }

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