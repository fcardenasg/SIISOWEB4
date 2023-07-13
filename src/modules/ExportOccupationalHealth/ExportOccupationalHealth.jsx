import { useTheme } from '@mui/material/styles';
import { Button, useMediaQuery, Grid, Typography } from "@mui/material";
import PrintIcon from '@mui/icons-material/PrintTwoTone';

import { useState, useEffect, Fragment } from 'react';
import SelectOnChange from 'components/input/SelectOnChange';
import InputDatePick from 'components/input/InputDatePick';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CodCatalogo, TitleButton } from 'components/helpers/Enums';
import SubCard from 'ui-component/cards/SubCard';
import AccidenteTrabajo from './Export/AccidenteTrabajo';
import MedicionaLaboralExport from './Export/MedicionaLaboralExport';
import ReintegroExport from './Export/ReintegroExport';
import AusentismoExport from './Export/AusentismoExport';
import { useNavigate } from 'react-router-dom';
import { ArrayTodaSede } from 'components/Arrays';

const Title = {
    medicinaLaboral: 'Medicinal Laboral',
    reintegro: 'Reintegro',
    accidentalidadTrabajo: 'AT',
    ausentismoLaboral: 'Ausentismo Laboral',
}

const lsTipoExcelAusentismo = [
    { value: 0, label: 'DAYLI' },
    { value: 1, label: 'AUDITORIA' }
]

const ExportOccupationalHealth = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsSede, setLsSede] = useState([]);
    const [tipoReporte, setTipoReporte] = useState('EXCEL1');
    const [sede, setSede] = useState(0);
    const [tipoExcelAusentismo, setTipoExcelAusentismo] = useState(0);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);

    async function getAll() {
        try {
            const lsServerSede = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Sede);
            var resultSede = lsServerSede.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));

            const arraySede = resultSede.concat(ArrayTodaSede);

            setLsSede(arraySede);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
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
                    <SubCard title={<Typography variant="h4">Exportación</Typography>}>
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
                    <SubCard title={
                        <Typography variant="h4">Exportar {tipoReporte === 'EXCEL1' ? Title.medicinaLaboral :
                            tipoReporte === 'EXCEL2' ? Title.reintegro :
                                tipoReporte === 'EXCEL3' ? Title.accidentalidadTrabajo :
                                    tipoReporte === 'EXCEL4' ? Title.ausentismoLaboral : ''}
                        </Typography>
                    }

                        secondary={
                            <Button variant="contained" size="large" startIcon={<ArrowBackIcon />}
                                onClick={() => navigate("/occupational-health/menu")}>
                                {TitleButton.Cancelar}
                            </Button>
                        }
                    >
                        <Grid container spacing={2}>
                            {tipoReporte === 'EXCEL4' ?
                                <Grid item xs={12} md={6} lg={3}>
                                    <SelectOnChange
                                        name="tipoExcel"
                                        label="Excel a Generar"
                                        value={tipoExcelAusentismo}
                                        options={lsTipoExcelAusentismo}
                                        onChange={(e) => setTipoExcelAusentismo(e.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid> : null}

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
                                    onChange={(e) => setFechaInicio(e.target.value)}
                                    value={fechaInicio}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <InputDatePick
                                    label="Fecha Fin"
                                    onChange={(e) => setFechaFin(e.target.value)}
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
                                                tipoExcelAusentismo={tipoExcelAusentismo}
                                            /> : null
                            }
                        </Grid>
                    </SubCard>
                </Grid>

            </Grid>
        </Fragment>
    );
};

export default ExportOccupationalHealth;