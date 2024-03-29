import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
    Table,
    useMediaQuery,
    TableBody,
    Grid,
    TableCell,
    Typography,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Stack,
} from '@mui/material';

import swal from 'sweetalert';
import { MessageSuccess, MessageDelete, ParamDelete, MessageError } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import { PostWorkHistoryDLTD, PostWorkHistoryEmpresa } from 'formatdata/WorkHistoryForm';
import Transitions from 'ui-component/extended/Transitions';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo } from 'components/helpers/Enums';
import { FormProvider, useForm } from 'react-hook-form';
import SubCard from 'ui-component/cards/SubCard';
import { GetAllByDocumentWorkHistory, DeleteWorkHistory, InsertWorkHistory } from 'api/clients/WorkHistoryClient';
import {
    GetAllByDocumentWorkHistoryOtherCompany,
    DeleteWorkHistoryOtherCompany,
    InsertWorkHistoryOtherCompany
} from 'api/clients/WorkHistoryOtherCompany';
import { FormatDate } from 'components/helpers/Format';
import RowDLTD from './Row/RowDLTD';
import RowCompany from './Row/RowCompany';

import { GetDataExploracion } from 'api/clients/WorkHistoryRiskClient';
import DataExposition from './DataExposition';
import Accordion from 'components/accordion/Accordion';
import { IconAffiliate } from '@tabler/icons';
import WorkHistoryRiesgoEmpresa from './WorkHistoryRiesgoEmpresa';
import WorkHistoryRiesgoDLTD from './WorkHistoryRiesgoDLTD';
import config from 'config';

const WorkHistory = ({ documento, lsEmpleado, atencion }) => {
    const theme = useTheme();
    const { user } = useAuth();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [mpiAnioDTLD, setMpiAnioDTLD] = useState(0);
    const [mpiMesDTLD, setMpiMesDTLD] = useState(0);
    const [anioRuidoDTLD, setAnioRuidoDTLD] = useState(0);
    const [mesRuidoDTLD, setMesRuidoDTLD] = useState(0);

    const [mpiAnioOtrasEmpresas, setMpiAnioOtrasEmpresas] = useState(0);
    const [mpiMesOtrasEmpresas, setMpiMesOtrasEmpresas] = useState(0);
    const [anioRuidoOtrasEmpresas, setAnioRuidoOtrasEmpresas] = useState(0);
    const [mesRuidoOtrasEmpresas, setMesRuidoOtrasEmpresas] = useState(0);

    const [addItemClickedEmpresa, setAddItemClickedEmpresa] = useState(false);
    const [addItemClickedDLTD, setAddItemClickedDLTD] = useState(false);
    const [lsWorkHistory, setLsWorkHistory] = useState([]);
    const [lsWorkHistoryOtherCompany, setLsWorkHistoryOtherCompany] = useState([]);
    const [lsCargo, setLsCargo] = useState([]);

    const methods = useForm();

    const { handleSubmit, errors, reset } = methods;

    async function getSumaRiesgo() {
        try {
            const lsServerData = await GetDataExploracion(documento);
            if (lsServerData.status === 200) {
                setMpiAnioDTLD(lsServerData.data.aniosMpiDLTD);
                setMpiMesDTLD(lsServerData.data.mesMpiDLTD);
                setAnioRuidoDTLD(lsServerData.data.aniosRuidoDLTD);
                setMesRuidoDTLD(lsServerData.data.mesRuidoDLTD);

                setMpiAnioOtrasEmpresas(lsServerData.data.aniosMpiCompany);
                setMpiMesOtrasEmpresas(lsServerData.data.mesMpiCompany);
                setAnioRuidoOtrasEmpresas(lsServerData.data.aniosRuidoCompany);
                setMesRuidoOtrasEmpresas(lsServerData.data.mesRuidoCompany);
            }
        } catch { }
    }

    async function getAllWorkHistory() {
        try {
            const lsServerWorkHistory = await GetAllByDocumentWorkHistory(0, 0, documento);
            if (lsServerWorkHistory.status === 200)
                setLsWorkHistory(lsServerWorkHistory.data.entities);

            const lsServerWorkHistoryOtherCompany = await GetAllByDocumentWorkHistoryOtherCompany(0, 0, documento);
            if (lsServerWorkHistoryOtherCompany.status === 200)
                setLsWorkHistoryOtherCompany(lsServerWorkHistoryOtherCompany.data.entities);

            const lsServerCargo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.RosterPosition);
            var resultCargo = lsServerCargo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCargo(resultCargo);
        } catch (error) {
        }
    }

    useEffect(() => {
        getSumaRiesgo();
    }, [documento]);

    useEffect(() => {
        getAllWorkHistory();
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
                            getAllWorkHistory();
                        }
                    }
                });
            }
        } catch (error) {
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
                            getAllWorkHistory();
                        }
                    }
                });
            }
        } catch (error) { }
    };

    const handleClickEmpresa = async (datos) => {
        try {
            const DataToInsert = PostWorkHistoryEmpresa(FormatDate(new Date()), atencion, documento, datos.empresa, datos.cargoEmpresa,
                datos.anioEmpresa, datos.mesesEmpresa, user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

            if (atencion !== '') {
                if (Object.keys(datos.length !== 0)) {
                    const result = await InsertWorkHistoryOtherCompany(DataToInsert);
                    if (result.status === 200) {
                        reset();
                        getSumaRiesgo();
                        setAddItemClickedEmpresa(false);
                        getAllWorkHistory();
                        setOpenSuccess(true);
                    }
                }
            } else {
                setOpenError(true);
                setErrorMessage('Por favor, seleccione la Atención');
            }
        } catch (error) { }
    };

    const handleClickDLTD = async (datos) => {
        try {
            const DataToInsert = PostWorkHistoryDLTD(FormatDate(new Date()), atencion, documento, "",
                datos.idCargo, datos.anio, datos.meses, user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

            if (atencion !== '') {
                if (Object.keys(datos.length !== 0)) {
                    const result = await InsertWorkHistory(DataToInsert);

                    if (result.status === 200) {
                        getSumaRiesgo();
                        reset();
                        setAddItemClickedDLTD(false);
                        getAllWorkHistory();
                        setOpenSuccess(true);
                    }
                }
            } else {
                setOpenError(true);
                setErrorMessage('Por favor, seleccione la Atención');
            }
        } catch (error) { }
    };

    return (
        <Grid container spacing={3}>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageDelete open={openDelete} onClose={() => setOpenDelete(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid item xs={12}>
                <SubCard title={<Typography variant='h4'>Historia Laboral Otras Empresas</Typography>}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Empresa</TableCell>
                                            <TableCell>Cargo</TableCell>
                                            <TableCell>Años</TableCell>
                                            <TableCell>Meses</TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {lsWorkHistoryOtherCompany.map((row) => (
                                            <RowCompany
                                                key={row.id}
                                                row={row}
                                                getAllWorkHistory={getAllWorkHistory}
                                                getSumaRiesgo={getSumaRiesgo}
                                                documento={documento}
                                                handleDelete={handleDeleteEmpresa}
                                            />
                                        ))}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                        <Grid item xs={12}>
                            <Accordion title={<><IconAffiliate /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Exposición Ocupacional Otras Empresas</Typography></>}>
                                <WorkHistoryRiesgoEmpresa
                                    documento={documento}
                                    getAllWorkHistory={getAllWorkHistory}
                                    getSumaRiesgo={getSumaRiesgo}
                                    row={lsWorkHistoryOtherCompany}
                                    handleDelete={handleDeleteEmpresa}
                                />
                            </Accordion>
                        </Grid>

                        <Grid item xs={12}>
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
                                        + Agregar Empresa
                                    </Button>
                                </Grid> : null}
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <SubCard title={<Typography variant='h4'>Historia Laboral D. {config.typeDashboard}</Typography>}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Cargo</TableCell>
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
                                            <RowDLTD
                                                key={row.id}
                                                row={row}
                                                getAllWorkHistory={getAllWorkHistory}
                                                getSumaRiesgo={getSumaRiesgo}
                                                documento={documento}
                                                handleDelete={handleDeleteDLTD}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                        <Grid item xs={12}>
                            <Accordion title={<><IconAffiliate />
                                <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">
                                    Exposición Ocupacional Drummond {config.typeDashboard}
                                </Typography>
                            </>}>
                                <WorkHistoryRiesgoDLTD
                                    documento={documento}
                                    atencion={atencion}
                                    getAllWorkHistory={getAllWorkHistory}
                                    getSumaRiesgo={getSumaRiesgo}
                                    row={lsWorkHistoryOtherCompany}
                                    handleDelete={handleDeleteEmpresa}
                                />
                            </Accordion>
                        </Grid>

                        <Grid item xs={12}>
                            <Transitions type="collapse" in={addItemClickedDLTD} position="top-left" direction="up">
                                <Grid container sx={{ pt: 5 }} spacing={2}>
                                    <Grid item xs={3.5}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idCargo"
                                                label="Cargo"
                                                defaultValue={lsEmpleado.rosterPosition}
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
                                </Grid> : null}
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <DataExposition
                    title="Exposición Acumulada de Factores de Riesgo - Otras Empresas"
                    title1="Ruido en Otras Empresas"
                    anio1={`Años: ${anioRuidoOtrasEmpresas}`}
                    title2="Ruido en Otras Empresas"
                    mes1={`Meses: ${mesRuidoOtrasEmpresas}`}
                    title3="Exposición MPI Otras Empresas"
                    anio2={`Años: ${mpiAnioOtrasEmpresas}`}
                    title4="Exposición MPI Otras Empresas"
                    mes2={`Meses: ${mpiMesOtrasEmpresas}`}
                />
            </Grid>

            <Grid item xs={12}>
                <DataExposition
                    title={`Exposición Acumulada de Factores de Riesgo - ${config.typeDashboard}`}
                    title1={`Ruido en ${config.typeDashboard}`}
                    anio1={`Años: ${anioRuidoDTLD}`}
                    title2={`Ruido en ${config.typeDashboard}`}
                    mes1={`Meses: ${mesRuidoDTLD}`}
                    title3={`Exposición MPI ${config.typeDashboard}`}
                    anio2={`Años: ${mpiAnioDTLD}`}
                    title4={`Exposición MPI ${config.typeDashboard}`}
                    mes2={`Meses: ${mpiMesDTLD}`}
                />
            </Grid>
        </Grid>
    );
};

export default WorkHistory;

WorkHistory.propTypes = {
    documento: PropTypes.string,
    lsEmpleado: PropTypes.object,
    atencion: PropTypes.string
};