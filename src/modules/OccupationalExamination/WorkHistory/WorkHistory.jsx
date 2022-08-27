import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
    Table,
    useMediaQuery,
    TableBody,
    Grid,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Stack,
    Typography,
} from '@mui/material';

import SideIconCard from 'ui-component/cards/SideIconCard';
import swal from 'sweetalert';
import { MessageSuccess, MessageDelete, ParamDelete } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import { PostWorkHistoryDLTD, PostWorkHistoryEmpresa } from 'formatdata/WorkHistoryForm';
import { useDispatch } from 'react-redux';
import { SNACKBAR_OPEN } from 'store/actions';
import Transitions from 'ui-component/extended/Transitions';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo, DefaultValue } from 'components/helpers/Enums';
import { FormProvider, useForm } from 'react-hook-form';
import SubCard from 'ui-component/cards/SubCard';
import { GetAllCompany } from 'api/clients/CompanyClient';
import { GetAllByDocumentWorkHistory, DeleteWorkHistory, InsertWorkHistory } from 'api/clients/WorkHistoryClient';
import {
    GetAllByDocumentWorkHistoryOtherCompany,
    DeleteWorkHistoryOtherCompany,
    InsertWorkHistoryOtherCompany
} from 'api/clients/WorkHistoryOtherCompany';
import { FormatDate } from 'components/helpers/Format';
import RowDLTD from './Row/RowDLTD';
import RowCompany from './Row/RowCompany';

import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { ColorDrummondltd } from 'themes/colors';
import { GetAllByHistorico, GetAllByHistoricoCompany } from 'api/clients/WorkHistoryRiskClient';

const WorkHistory = ({ documento, lsEmpleado, atencion }) => {
    const theme = useTheme();
    const { user } = useAuth();
    const dispatch = useDispatch();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [mpiAnioDTLD, setMpiAnioDTLD] = useState(0);
    const [mpiMesDTLD, setMpiMesDTLD] = useState(0);
    const [anioRuidoDTLD, setAnioRuidoDTLD] = useState(0);
    const [mesRuidoDTLD, setMesRuidoDTLD] = useState(0);

    const [mpiAnioOtrasEmpresas, setMpiAnioOtrasEmpresas] = useState(0);
    const [mpiMesOtrasEmpresas, setMpiMesOtrasEmpresas] = useState(0);
    const [anioRuidoOtrasEmpresas, setAnioRuidoOtrasEmpresas] = useState(0);
    const [mesRuidoOtrasEmpresas, setMesRuidoOtrasEmpresas] = useState(0);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [addItemClickedEmpresa, setAddItemClickedEmpresa] = useState(false);
    const [addItemClickedDLTD, setAddItemClickedDLTD] = useState(false);
    const [lsWorkHistory, setLsWorkHistory] = useState([]);
    const [lsWorkHistoryOtherCompany, setLsWorkHistoryOtherCompany] = useState([]);
    const [lsCargo, setLsCargo] = useState([]);
    const [lsEmpresa, setLsEmpresa] = useState([]);

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors, reset } = methods;

    async function GetAll() {
        try {
            const lsServerDTLD = await GetAllByHistorico(0, 0, documento);
            if (lsServerDTLD.status === 200) {
                var arrayMPI = lsServerDTLD.data.entities;
                var arrayRUIDO = lsServerDTLD.data.entities;

                if (arrayMPI.length != 0 || arrayRUIDO.length != 0) {
                    var arrayReadyMPI = arrayMPI.filter(code => code.idRiesgo === DefaultValue.RiesgoQuimico && code.idClase === DefaultValue.RiesgoQuimico_MPI_DLTD)
                        .map((riesgo) => ({
                            anio: riesgo.anio,
                            mes: riesgo.mes
                        }));

                    var arrayReadyRUIDO = arrayRUIDO.filter(code => code.idRiesgo === DefaultValue.RiesgoFisico && code.idClase === DefaultValue.RiesgoQuimico_RUIDO_DLTD)
                        .map((riesgo) => ({
                            anio: riesgo.anio,
                            mes: riesgo.mes
                        }));

                    var aniosMpi = 0;
                    var mesMpi = 0;
                    var aniosRuido = 0;
                    var mesRuido = 0;

                    for (let index = 0; index < arrayReadyRUIDO.length; index++) {
                        const datos = arrayReadyRUIDO[index];
                        aniosRuido = aniosRuido + datos.anio;
                        setAnioRuidoDTLD(aniosRuido);
                    }

                    for (let index = 0; index < arrayReadyRUIDO.length; index++) {
                        const datos = arrayReadyRUIDO[index];
                        mesRuido = mesRuido + datos.mes;
                        setMesRuidoDTLD(mesRuido);
                    }

                    for (let index = 0; index < arrayReadyMPI.length; index++) {
                        const datos = arrayReadyMPI[index];
                        aniosMpi = aniosMpi + datos.anio;
                        setMpiAnioDTLD(aniosMpi);
                    }

                    for (let index = 0; index < arrayReadyMPI.length; index++) {
                        const datos = arrayReadyMPI[index];
                        mesMpi = mesMpi + datos.mes;
                        setMpiMesDTLD(mesMpi);
                    }
                }
            }

            const lsServerOtrasEmpresas = await GetAllByHistoricoCompany(0, 0, documento);
            if (lsServerOtrasEmpresas.status === 200) {
                var arrayMPI = lsServerOtrasEmpresas.data.entities;
                var arrayRUIDO = lsServerOtrasEmpresas.data.entities;

                if (arrayMPI.length != 0 || arrayRUIDO.length != 0) {
                    var arrayReadyMPI = arrayMPI.filter(code => code.idRiesgo === DefaultValue.RiesgoQuimico && code.idClase === DefaultValue.RiesgoQuimico_MPI_DLTD)
                        .map((riesgo) => ({
                            anio: riesgo.anio,
                            mes: riesgo.mes
                        }));

                    var arrayReadyRUIDO = arrayRUIDO.filter(code => code.idRiesgo === DefaultValue.RiesgoFisico && code.idClase === DefaultValue.RiesgoQuimico_RUIDO_DLTD)
                        .map((riesgo) => ({
                            anio: riesgo.anio,
                            mes: riesgo.mes
                        }));

                    var aniosMpi = 0;
                    var mesMpi = 0;
                    var aniosRuido = 0;
                    var mesRuido = 0;

                    for (let index = 0; index < arrayReadyRUIDO.length; index++) {
                        const datos = arrayReadyRUIDO[index];
                        aniosRuido = aniosRuido + datos.anio;
                        setAnioRuidoOtrasEmpresas(aniosRuido);
                    }

                    for (let index = 0; index < arrayReadyRUIDO.length; index++) {
                        const datos = arrayReadyRUIDO[index];
                        mesRuido = mesRuido + datos.mes;
                        setMesRuidoOtrasEmpresas(mesRuido);
                    }

                    for (let index = 0; index < arrayReadyMPI.length; index++) {
                        const datos = arrayReadyMPI[index];
                        aniosMpi = aniosMpi + datos.anio;
                        setMpiAnioOtrasEmpresas(aniosMpi);
                    }

                    for (let index = 0; index < arrayReadyMPI.length; index++) {
                        const datos = arrayReadyMPI[index];
                        mesMpi = mesMpi + datos.mes;
                        setMpiMesOtrasEmpresas(mesMpi);
                    }
                }
            }

            const lsServerWorkHistory = await GetAllByDocumentWorkHistory(0, 0, documento);
            if (lsServerWorkHistory.status === 200)
                setLsWorkHistory(lsServerWorkHistory.data.entities);

            const lsServerWorkHistoryOtherCompany = await GetAllByDocumentWorkHistoryOtherCompany(0, 0, documento);
            if (lsServerWorkHistoryOtherCompany.status === 200)
                setLsWorkHistoryOtherCompany(lsServerWorkHistoryOtherCompany.data.entities);

            const lsServerEmpresa = await GetAllCompany(0, 0);
            var resultEmpresa = lsServerEmpresa.data.entities.map((item) => ({
                value: item.codigo,
                label: item.descripcionSpa
            }));
            setLsEmpresa(resultEmpresa);

            const lsServerCargo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.RosterPosition);
            var resultCargo = lsServerCargo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCargo(resultCargo);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, [documento]);

    const handleDeleteEmpresa = async (idWorkHistory) => {
        try {
            if (idWorkHistory !== null) {
                swal(ParamDelete).then(async (willDelete) => {
                    if (willDelete) {
                        const result = await DeleteWorkHistoryOtherCompany(idWorkHistory);
                        if (result.status === 200) {
                            setOpenDelete(true);
                            setAddItemClickedEmpresa(false);
                            GetAll();
                        }
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteDLTD = async (idWorkHistory) => {
        try {
            if (idWorkHistory !== null) {
                swal(ParamDelete).then(async (willDelete) => {
                    if (willDelete) {
                        const result = await DeleteWorkHistory(idWorkHistory);
                        if (result.status === 200) {
                            setOpenDelete(true);
                            setAddItemClickedDLTD(false);
                            GetAll();
                        }
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickEmpresa = async (datos) => {
        try {
            const DataToInsert = PostWorkHistoryEmpresa(FormatDate(new Date()), atencion, documento, datos.empresa, datos.cargoEmpresa,
                datos.anioEmpresa, datos.mesesEmpresa, user.email, FormatDate(new Date()), '', FormatDate(new Date()));

            if (atencion !== '') {
                if (Object.keys(datos.length !== 0)) {
                    const result = await InsertWorkHistoryOtherCompany(DataToInsert);
                    if (result.status === 200) {
                        reset();
                        setAddItemClickedEmpresa(false);
                        GetAll();
                        setOpenSuccess(true);
                    }
                }
            } else {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Por favor, seleccione la Atención',
                    variant: 'alert',
                    alertSeverity: 'error',
                    close: false,
                    transition: 'SlideUp'
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickDLTD = async (datos) => {
        try {
            const DataToInsert = PostWorkHistoryDLTD(FormatDate(new Date()), atencion, documento, datos.idEmpresa,
                datos.idCargo, datos.anio, datos.meses, user.email, FormatDate(new Date()), '', FormatDate(new Date()));

            if (atencion !== '') {
                if (Object.keys(datos.length !== 0)) {
                    const result = await InsertWorkHistory(DataToInsert);
                    if (result.status === 200) {
                        reset();
                        setAddItemClickedDLTD(false);
                        GetAll();
                        setOpenSuccess(true);
                    }
                }
            } else {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Por favor, seleccione la Atención',
                    variant: 'alert',
                    alertSeverity: 'error',
                    close: false,
                    transition: 'SlideUp'
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Grid container spacing={2}>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageDelete open={openDelete} onClose={() => setOpenDelete(false)} />

            <Grid item xs={12}>
                <SubCard title="Historia Laboral otras empresas">
                    <TableContainer>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ pl: 3 }} />
                                    <TableCell>Empresa</TableCell>
                                    <TableCell>Cargo</TableCell>
                                    {/* <TableCell>Fecha</TableCell> */}
                                    <TableCell>Años</TableCell>
                                    <TableCell>
                                        Meses
                                    </TableCell>
                                    <TableCell>
                                        Acciones
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lsWorkHistoryOtherCompany.map((row) => (
                                    <RowCompany key={row.id} documento={documento} row={row} handleDelete={handleDeleteEmpresa} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Transitions type="collapse" in={addItemClickedEmpresa} position="top-left" direction="up">
                        <Grid container sx={{ pt: 5 }} spacing={2}>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="empresa"
                                        label="Empresa"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="cargoEmpresa"
                                        label="Cargo"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        defaultValue=""
                                        fullWidth
                                        name="anioEmpresa"
                                        label="Año"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        defaultValue=""
                                        fullWidth
                                        name="mesesEmpresa"
                                        label="Meses"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>

                        <Grid container sx={{ pr: 0.5, pt: 3 }} justifyContent="flex-end">
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Button color="error" onClick={() => setAddItemClickedEmpresa(false)}>
                                    Cancelar
                                </Button>
                                <Button variant="contained" size="small" onClick={handleSubmit(handleClickEmpresa)}>
                                    Adicionar
                                </Button>
                            </Stack>
                        </Grid>
                    </Transitions>

                    {!addItemClickedEmpresa ?
                        <Grid item sx={{ pl: 2, pt: 3 }}>
                            <Button disabled={lsEmpleado.length === 0 ? true : false} variant="text" onClick={() => setAddItemClickedEmpresa(true)}>
                                + Agregar Cargo
                            </Button>
                        </Grid> : <></>}
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <SubCard title="Historia Laboral DLTD">
                    <TableContainer>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ pl: 3 }} />
                                    <TableCell>Empresa</TableCell>
                                    <TableCell>Cargo</TableCell>
                                    {/* <TableCell>Fecha</TableCell> */}
                                    <TableCell>Años</TableCell>
                                    <TableCell>
                                        Meses
                                    </TableCell>
                                    <TableCell>
                                        Acciones
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lsWorkHistory.map((row) => (
                                    <RowDLTD key={row.id} documento={documento} row={row} handleDelete={handleDeleteDLTD} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Transitions type="collapse" in={addItemClickedDLTD} position="top-left" direction="up">
                        <Grid container sx={{ pt: 5 }} spacing={2}>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idEmpresa"
                                        label="Empresa"
                                        defaultValue=""
                                        options={lsEmpresa}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idCargo"
                                        label="Cargo"
                                        defaultValue=""
                                        options={lsCargo}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        defaultValue=""
                                        fullWidth
                                        name="anio"
                                        label="Año"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        defaultValue=""
                                        fullWidth
                                        name="meses"
                                        label="Meses"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>

                        <Grid container sx={{ pr: 0.5, pt: 3 }} justifyContent="flex-end">
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Button color="error" onClick={() => setAddItemClickedDLTD(false)}>
                                    Cancelar
                                </Button>
                                <Button variant="contained" size="small" onClick={handleSubmit(handleClickDLTD)}>
                                    Adicionar
                                </Button>
                            </Stack>
                        </Grid>
                    </Transitions>

                    {!addItemClickedDLTD ?
                        <Grid item sx={{ pl: 2, pt: 3 }}>
                            <Button disabled={lsEmpleado.length === 0 ? true : false} variant="text" onClick={() => setAddItemClickedDLTD(true)}>
                                + Agregar Cargo
                            </Button>
                        </Grid> : <></>}
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <SubCard title={<Typography variant="h4">Exposición Acumulada de Factores de Riesgo - DLTD</Typography>}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={3} sm={6}>
                            <SideIconCard
                                bgcolor={theme.palette.grey[200]}
                                iconPrimary={RecordVoiceOverIcon}
                                primary={`Años: ${anioRuidoDTLD}`}
                                secondary="Ruido en DLTD"
                                color={ColorDrummondltd.RedDrummond}
                            />
                        </Grid>

                        <Grid item xs={12} lg={3} sm={6}>
                            <SideIconCard
                                bgcolor={theme.palette.grey[200]}
                                iconPrimary={RecordVoiceOverIcon}
                                primary={`Meses: ${mesRuidoDTLD}`}
                                secondary="Ruido en DLTD"
                                color={ColorDrummondltd.RedDrummond}
                            />
                        </Grid>

                        <Grid item xs={12} lg={3} sm={6}>
                            <SideIconCard
                                bgcolor={theme.palette.grey[200]}
                                iconPrimary={ReportProblemIcon}
                                primary={`Años: ${mpiAnioDTLD}`}
                                secondary="Exposición MPI DLTD"
                                color={ColorDrummondltd.RedDrummond}
                            />
                        </Grid>

                        <Grid item xs={12} lg={3} sm={6}>
                            <SideIconCard
                                bgcolor={theme.palette.grey[200]}
                                iconPrimary={ReportProblemIcon}
                                primary={`Meses: ${mpiMesDTLD}`}
                                secondary="Exposición MPI DLTD"
                                color={ColorDrummondltd.RedDrummond}
                            />
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <SubCard title={<Typography variant="h4">Exposición Acumulada de Factores de Riesgo - Otras Empresas</Typography>}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={3} sm={6}>
                            <SideIconCard
                                bgcolor={theme.palette.grey[200]}
                                iconPrimary={RecordVoiceOverIcon}
                                primary={`Años: ${anioRuidoOtrasEmpresas}`}
                                secondary="Ruido en Otras Empresas"
                                color={ColorDrummondltd.BlueDrummond}
                            />
                        </Grid>

                        <Grid item xs={12} lg={3} sm={6}>
                            <SideIconCard
                                bgcolor={theme.palette.grey[200]}
                                iconPrimary={RecordVoiceOverIcon}
                                primary={`Meses: ${mesRuidoOtrasEmpresas}`}
                                secondary="Ruido en Otras Empresas"
                                color={ColorDrummondltd.BlueDrummond}
                            />
                        </Grid>

                        <Grid item xs={12} lg={3} sm={6}>
                            <SideIconCard
                                bgcolor={theme.palette.grey[200]}
                                iconPrimary={ReportProblemIcon}
                                primary={`Años: ${mpiAnioOtrasEmpresas}`}
                                secondary="Exposición MPI Otras Empresas"
                                color={ColorDrummondltd.BlueDrummond}
                            />
                        </Grid>

                        <Grid item xs={12} lg={3} sm={6}>
                            <SideIconCard
                                bgcolor={theme.palette.grey[200]}
                                iconPrimary={ReportProblemIcon}
                                primary={`Meses: ${mpiMesOtrasEmpresas}`}
                                secondary="Exposición MPI Otras Empresas"
                                color={ColorDrummondltd.BlueDrummond}
                            />
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default WorkHistory;

WorkHistory.propTypes = {
    documento: PropTypes.string,
    lsEmpleado: PropTypes.object,
    atencion: PropTypes.number
};