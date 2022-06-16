import React, { Fragment, useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Collapse,
    IconButton,
    Table,
    useMediaQuery,
    TableBody,
    Grid,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Tooltip,
    Stack,
} from '@mui/material';

import FullScreenDialog from 'components/controllers/FullScreenDialog';
import swal from 'sweetalert';
import { MessageSuccess, MessageDelete, ParamDelete, ParamLoadingData } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import { GetAllByCharge } from 'api/clients/PanoramaClient';
import { GetAllByChargeWHR, GetAllByChargeWHRAdvance, GetAllByHistorico } from 'api/clients/WorkHistoryRiskClient';
import { PostWorkHistoryDLTD, PostWorkHistoryEmpresa } from 'formatdata/WorkHistoryForm';
import { PostWorkHistoryRiskDLTD } from 'formatdata/WorkHistoryRiskForm';
import { useDispatch } from 'react-redux';
import { Message } from 'components/helpers/Enums';
import { SNACKBAR_OPEN } from 'store/actions';
import Transitions from 'ui-component/extended/Transitions';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo, DefaultValue } from 'components/helpers/Enums';
import { FormProvider, useForm } from 'react-hook-form';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SubCard from 'ui-component/cards/SubCard';
import { GetAllCompany } from 'api/clients/CompanyClient';
import { InsertWorkHistoryRisk } from 'api/clients/WorkHistoryRiskClient';
import { GetAllByDocumentWorkHistory, DeleteWorkHistory, InsertWorkHistory } from 'api/clients/WorkHistoryClient';
import {
    GetAllByDocumentWorkHistoryOtherCompany,
    DeleteWorkHistoryOtherCompany,
    InsertWorkHistoryOtherCompany
} from 'api/clients/WorkHistoryOtherCompany';
import { FormatDate, ViewFormat } from 'components/helpers/Format';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LoadingLine from 'components/loading/LoadingLine';
import { SubRow } from './SubRow';
import { MenuItem } from './MenuItem';

function RowCompany({ row = [], handleDelete }) {
    const [open, setOpen] = useState(false);
    const [lsQuimico, setLsQuimico] = useState([]);
    const [lsFisico, setLsFisico] = useState([]);
    const [lsBiologico, setLsBiologico] = useState([]);
    const [lsPsicosocial, setLsPsicosocial] = useState([]);
    const [lsErFuerza, setLsErFuerza] = useState([]);
    const [lsErMovi, setLsErMovi] = useState([]);
    const [lsErPost, setLsErPost] = useState([]);

    async function GetAll() {
        try {
            const lsServerQuimico = await GetAllByCharge(0, 0, 4067, DefaultValue.RiesgoQuimico);
            if (lsServerQuimico.status === 200)
                setLsQuimico(lsServerQuimico.data.entities);

            const lsServerFisico = await GetAllByCharge(0, 0, 4067, DefaultValue.RiesgoFisico);
            if (lsServerFisico.status === 200)
                setLsFisico(lsServerFisico.data.entities);

            const lsServerPsicosocial = await GetAllByCharge(0, 0, 4067, DefaultValue.RiesgoPsicosocial);
            if (lsServerPsicosocial.status === 200)
                setLsPsicosocial(lsServerPsicosocial.data.entities);

            const lsServerBiologico = await GetAllByCharge(0, 0, 4067, DefaultValue.RiesgoBiologico);
            if (lsServerBiologico.status === 200)
                setLsBiologico(lsServerBiologico.data.entities);

            const lsServerErFuerza = await GetAllByCharge(0, 0, 4067, DefaultValue.RiesgoErgonomicoCargaFisica_Fuerza);
            if (lsServerErFuerza.status === 200)
                setLsErFuerza(lsServerErFuerza.data.entities);

            const lsServerErMovi = await GetAllByCharge(0, 0, 4067, DefaultValue.RiesgoErgonomicoCargaFisica_Movimiento);
            if (lsServerErMovi.status === 200)
                setLsErMovi(lsServerErMovi.data.entities);

            const lsServerErPost = await GetAllByCharge(0, 0, 4067, DefaultValue.RiesgoErgonomicoCargaFisica_Postura);
            if (lsServerErPost.status === 200)
                setLsErPost(lsServerErPost.data.entities);


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, [row.id]);

    return (
        <Fragment>
            {row.length != 0 ? <>
                <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell sx={{ pl: 3 }}>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>

                    <TableCell component="th" scope="row">
                        {row.empresa}
                    </TableCell>
                    <TableCell>{row.cargo}</TableCell>
                    <TableCell>{ViewFormat(row.fecha)}</TableCell>
                    <TableCell>{row.anio}</TableCell>
                    <TableCell>{row.meses}</TableCell>
                    <TableCell>
                        <Tooltip title="Eliminar" onClick={() => handleDelete(row.id)}>
                            <IconButton color="error" size="small">
                                <HighlightOffIcon sx={{ fontSize: '2rem' }} />
                            </IconButton>
                        </Tooltip>
                    </TableCell>
                </TableRow>
            </> : <LoadingLine />}

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>

                            <MenuItem />

                            <SubRow key={row.id} row={lsQuimico} title="Riesgo Químico" />
                            <SubRow key={row.id} row={lsFisico} title="Riesgo Físico" />
                            <SubRow key={row.id} row={lsPsicosocial} title="Riesgo Psicosocial" />
                            <SubRow key={row.id} row={lsBiologico} title="Riesgo Biológico" />
                            <SubRow key={row.id} row={lsErPost} title="Riesgo Ergonómico Carga Física - Postura" />
                            <SubRow key={row.id} row={lsErFuerza} title="Riesgo Ergonómico Carga Física - Fuerza" />
                            <SubRow key={row.id} row={lsErMovi} title="Riesgo Ergonómico Carga Física - Movimiento" />

                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

RowCompany.propTypes = {
    row: PropTypes.array,
    handleDelete: PropTypes.object,
};

function RowDLTD({ row = [], handleDelete, documento }) {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const [numId, setNumId] = useState(1);

    const [waitNew, setWaitNew] = useState(false);
    const [open, setOpen] = useState(false);
    const [openHistorico, setOpenHistorico] = useState(false);
    const [lsHistorico, setLsHistorico] = useState([]);
    const [lsNewQuimico, setLsNewQuimico] = useState([]);
    const [lsQuimico, setLsQuimico] = useState([]);
    const [lsFisico, setLsFisico] = useState([]);
    const [lsBiologico, setLsBiologico] = useState([]);
    const [lsPsicosocial, setLsPsicosocial] = useState([]);
    const [lsErFuerza, setLsErFuerza] = useState([]);
    const [lsErMovi, setLsErMovi] = useState([]);
    const [lsErPost, setLsErPost] = useState([]);

    async function GetAll() {
        try {
            const lsServerQuimico = await GetAllByChargeWHR(0, 0, row.idCargo, DefaultValue.RiesgoQuimico);
            if (lsServerQuimico.status === 200)
                setLsQuimico(lsServerQuimico.data.entities);

            const lsServerRiesgoQuimico = await GetAllByChargeWHRAdvance(0, 0, row.idCargo, DefaultValue.RiesgoQuimico, row.id);
            if (lsServerRiesgoQuimico.status === 200)
                setLsNewQuimico(lsServerRiesgoQuimico.data.entities);



        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, [row.id]);

    const handleClick = async (id) => {
        try {
            if (id == 1) {
                const lsServerQuimico = await GetAllByCharge(0, 0, row.idCargo, DefaultValue.RiesgoQuimico);

                if (lsServerQuimico.status === 200) {
                    var arrayQuimico = lsServerQuimico.data.entities;

                    for (let index = 0; index < arrayQuimico.length; index++) {
                        const riesgoQui = arrayQuimico[index];

                        const DataToInsert = PostWorkHistoryRiskDLTD(row.id, row.fecha, row.documento, DefaultValue.RiesgoQuimico,
                            row.idCargo, riesgoQui.clase, riesgoQui.exposicion, riesgoQui.gradosinEPP, riesgoQui.gradoconEPP,
                            riesgoQui.medidascontrol, 0, 0, user.email, FormatDate(new Date()), '', FormatDate(new Date()));



                        if (DataToInsert) {
                            const result = await InsertWorkHistoryRisk(DataToInsert);
                            if (result.status === 200) {
                                if (index < arrayQuimico.length) {
                                    dispatch({
                                        type: SNACKBAR_OPEN,
                                        open: true,
                                        message: `${Message.RiesgoGuardado}`,
                                        variant: 'alert',
                                        alertSeverity: 'success',
                                        close: false,
                                        transition: 'SlideUp'
                                    });
                                }
                            }
                        }
                    }
                }

                const lsServerRiesgoHL = await GetAllByChargeWHR(0, 0, row.idCargo, DefaultValue.RiesgoQuimico);
                if (lsServerRiesgoHL.status === 200) {
                    setLsQuimico(lsServerRiesgoHL.data.entities);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickMenu = (id) => {
        try {
            swal(ParamLoadingData).then(async (willDelete) => {
                if (willDelete) {
                    if (id == 1) {
                        const lsServerQuimico = await GetAllByCharge(0, 0, row.idCargo, DefaultValue.RiesgoQuimico);

                        if (lsServerQuimico.status === 200) {
                            var arrayQuimico = lsServerQuimico.data.entities;

                            for (let index = 0; index < arrayQuimico.length; index++) {
                                const riesgoQui = arrayQuimico[index];

                                const DataToInsert = PostWorkHistoryRiskDLTD(row.id, row.fecha, row.documento, DefaultValue.RiesgoQuimico,
                                    row.idCargo, riesgoQui.clase, riesgoQui.exposicion, riesgoQui.gradosinEPP, riesgoQui.gradoconEPP,
                                    riesgoQui.medidascontrol, 0, 0, user.email, FormatDate(new Date()), '', FormatDate(new Date()));

                                if (DataToInsert) {
                                    const result = await InsertWorkHistoryRisk(DataToInsert);
                                    if (result.status === 200) {
                                        if (index < arrayQuimico.length) {
                                            dispatch({
                                                type: SNACKBAR_OPEN,
                                                open: true,
                                                message: `${Message.RiesgoGuardado}`,
                                                variant: 'alert',
                                                alertSeverity: 'success',
                                                close: false,
                                                transition: 'SlideUp'
                                            });
                                        }
                                    }
                                }
                            }
                        }

                        const lsServerRiesgoHL = await GetAllByChargeWHRAdvance(0, 0, row.idCargo, DefaultValue.RiesgoQuimico, row.id);
                        if (lsServerRiesgoHL.status === 200) {
                            setLsNewQuimico(lsServerRiesgoHL.data.entities);

                        }
                    }
                }
            });


        } catch (error) {
            console.log(error);
        }
    }

    const handleClickHistorico = () => {

    }

    const handleClickButton = async (id) => {
        try {
            if (id == 8) {
                const lsServerRiesgoHistorico = await GetAllByHistorico(0, 0, row.documento);
                if (lsServerRiesgoHistorico.status === 200) {
                    setLsHistorico(lsServerRiesgoHistorico.data.entities);
                    setOpenHistorico(true);
                }
            }

            setNumId(id);

        } catch (error) {
            console.log(error);
        }
    }

    if (lsNewQuimico.length != 0) {
        setTimeout(() => {
            setWaitNew(true);
        }, 1500)
    }

    return (
        <Fragment>
            <FullScreenDialog
                open={openHistorico}
                title="REGISTRO HISTÓRICO DE EXPOSICIÓN OCUPACIONAL"
                handleClose={() => setOpenHistorico(false)}
            >
                <Grid container spacing={2}>
                    <Grid item>
                        <SubRow key={row.id} row={lsNewQuimico} title="EXPOSICIONES OCUPACIONALES" />
                    </Grid>
                </Grid>
            </FullScreenDialog>


            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell sx={{ pl: 3 }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell component="th" scope="row">
                    {row.nameEmpresa}
                </TableCell>
                <TableCell>{row.nameCargo}</TableCell>
                <TableCell>{ViewFormat(row.fecha)}</TableCell>
                <TableCell>{row.anio}</TableCell>
                <TableCell>{row.meses}</TableCell>
                <TableCell>
                    <Tooltip title="Eliminar" onClick={() => handleDelete(row.id)}>
                        <IconButton color="error" size="small">
                            <HighlightOffIcon sx={{ fontSize: '2rem' }} />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>

                            <MenuItem
                                key={row.id}
                                numId={numId}
                                onClickButton={handleClickButton}
                                onClickNuevo={handleClickMenu}
                                onClickHistorico={handleClickHistorico}
                            />

                            {waitNew ? <SubRow key={row.id} getAll={GetAll} row={lsNewQuimico} title="Riesgo Químico" /> : <></>}


                            {/* <SubRow key={row.id} row={lsFisico} title="Riesgo Físico" />
                            <SubRow key={row.id} row={lsPsicosocial} title="Riesgo Psicosocial" />
                            <SubRow key={row.id} row={lsBiologico} title="Riesgo Biológico" />
                            <SubRow key={row.id} row={lsErPost} title="Riesgo Ergonómico Carga Física - Postura" />
                            <SubRow key={row.id} row={lsErFuerza} title="Riesgo Ergonómico Carga Física - Fuerza" />
                            <SubRow key={row.id} row={lsErMovi} title="Riesgo Ergonómico Carga Física - Movimiento" /> */}

                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

RowDLTD.propTypes = {
    row: PropTypes.array,
    handleDelete: PropTypes.object,
};


const WorkHistory = ({ documento, lsEmpleado, atencion }) => {
    const theme = useTheme();
    const { user } = useAuth();
    const dispatch = useDispatch();
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [addItemClickedEmpresa, setAddItemClickedEmpresa] = useState(false);
    const [addItemClickedDLTD, setAddItemClickedDLTD] = useState(false);
    const [lsWorkHistory, setLsWorkHistory] = useState([]);
    const [lsWorkHistoryOtherCompany, setLsWorkHistoryOtherCompany] = useState([]);
    const [lsCargo, setLsCargo] = useState([]);
    const [lsEmpresa, setLsEmpresa] = useState([]);
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors, reset } = methods;


    async function GetAll() {
        try {
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
                const result = await DeleteWorkHistory(idWorkHistory);
                if (result.status === 200) {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: `${Message.Eliminar}`,
                        variant: 'alert',
                        alertSeverity: 'error',
                        close: false,
                        transition: 'SlideUp',
                    })
                    setAddItemClickedDLTD(false);
                    GetAll();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickEmpresa = async (datos) => {
        try {
            const DataToInsert = PostWorkHistoryEmpresa(FormatDate(new Date()), atencion, documento, datos.empresa,
                datos.cargoEmpresa, datos.anioEmpresa, datos.mesesEmpresa,
                user.email, FormatDate(new Date()), '', FormatDate(new Date()));

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
                        dispatch({
                            type: SNACKBAR_OPEN,
                            open: true,
                            message: `${Message.Guardar}`,
                            variant: 'alert',
                            alertSeverity: 'success',
                            close: false,
                            transition: 'SlideUp'
                        })
                        reset();
                        setAddItemClickedDLTD(false);
                        GetAll();
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
                                    <TableCell>Fecha</TableCell>
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
                                    <RowCompany key={row.id} row={row} handleDelete={handleDeleteEmpresa} />
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
                                    <TableCell>Fecha</TableCell>
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
                                    <RowDLTD key={row.id} row={row} handleDelete={handleDeleteDLTD} />
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
        </Grid>
    );
};

export default WorkHistory;

WorkHistory.propTypes = {
    documento: PropTypes.string,
    lsEmpleado: PropTypes.array,
    atencion: PropTypes.number
};