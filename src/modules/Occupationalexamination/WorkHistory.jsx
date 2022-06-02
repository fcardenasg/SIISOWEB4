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

import { GetAllByCharge } from 'api/clients/PanoramaClient';
import { PostWorkHistory } from 'formatdata/WorkHistoryForm';
import { useDispatch } from 'react-redux';
import { Message } from 'components/helpers/Enums';
import { SNACKBAR_OPEN } from 'store/actions';
import Transitions from 'ui-component/extended/Transitions';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import InputDatePicker from 'components/input/InputDatePicker';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo, DefaultValue } from 'components/helpers/Enums';
import { FormProvider, useForm } from 'react-hook-form';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SubCard from 'ui-component/cards/SubCard';
import { GetAllCompany } from 'api/clients/CompanyClient';
import { GetAllByDocumentWorkHistory, DeleteWorkHistory, InsertWorkHistory } from 'api/clients/WorkHistoryClient';
import { FormatDate, ViewFormat } from 'components/helpers/Format';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const SubRow = ({ title, row }) => {
    const theme = useTheme();

    const handleClick = (event, id) => {
        alert(id);
    };

    return (
        <TableContainer>
            <SubCard
                sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                title={title}
                content={false}
            >
                <Table size="small" aria-label="purchases">
                    <TableHead>
                        <TableRow>
                            <TableCell>Consecutivo</TableCell>
                            <TableCell>Clase</TableCell>
                            <TableCell>Exposición</TableCell>
                            <TableCell >Grado sin EPP</TableCell>
                            <TableCell >Grado con EPP</TableCell>
                            <TableCell >Medidas de Control</TableCell>
                            <TableCell >Año</TableCell>
                            <TableCell >Mes</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {row.map((historyRow) => (
                            <TableRow hover onClick={(event) => handleClick(event, historyRow.idpanorama)} key={historyRow.idpanorama}>

                                <TableCell>{historyRow.idpanorama}</TableCell>
                                <TableCell>{historyRow.nameClase}</TableCell>
                                <TableCell >{historyRow.nameExposicion}</TableCell>
                                <TableCell > {historyRow.nameGradosinEPP} </TableCell>
                                <TableCell>{historyRow.nameGradoconEPP}</TableCell>
                                <TableCell >{historyRow.nameMedidascontrol}</TableCell>
                                <TableCell >{historyRow.idpanorama}</TableCell>
                                <TableCell >{historyRow.idpanorama}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </SubCard>
        </TableContainer>
    );
}

SubRow.propTypes = {
    title: PropTypes.string,
    row: PropTypes.object,
};


function Row({ row, handleDelete }) {
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
            const lsServerQuimico = await GetAllByCharge(0, 0, row.idCargo, DefaultValue.RiesgoQuimico);
            if (lsServerQuimico.status === 200)
                setLsQuimico(lsServerQuimico.data.entities);

            const lsServerFisico = await GetAllByCharge(0, 0, row.idCargo, DefaultValue.RiesgoFisico);
            if (lsServerFisico.status === 200)
                setLsFisico(lsServerFisico.data.entities);

            const lsServerPsicosocial = await GetAllByCharge(0, 0, row.idCargo, DefaultValue.RiesgoPsicosocial);
            if (lsServerPsicosocial.status === 200)
                setLsPsicosocial(lsServerPsicosocial.data.entities);

            const lsServerBiologico = await GetAllByCharge(0, 0, row.idCargo, DefaultValue.RiesgoBiologico);
            if (lsServerBiologico.status === 200)
                setLsBiologico(lsServerBiologico.data.entities);

            const lsServerErFuerza = await GetAllByCharge(0, 0, row.idCargo, DefaultValue.RiesgoErgonomicoCargaFisica_Fuerza);
            if (lsServerErFuerza.status === 200)
                setLsErFuerza(lsServerErFuerza.data.entities);

            const lsServerErMovi = await GetAllByCharge(0, 0, row.idCargo, DefaultValue.RiesgoErgonomicoCargaFisica_Movimiento);
            if (lsServerErMovi.status === 200)
                setLsErMovi(lsServerErMovi.data.entities);

            const lsServerErPost = await GetAllByCharge(0, 0, row.idCargo, DefaultValue.RiesgoErgonomicoCargaFisica_Postura);
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

Row.propTypes = {
    row: PropTypes.object,
    handleDelete: PropTypes.object,
};


const WorkHistory = ({ documento, lsEmpleado, atencion }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [addItemClicked, setAddItemClicked] = useState(false);
    const [lsWorkHistory, setLsWorkHistory] = useState([]);
    const [lsGes, setLsGes] = useState([]);
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

            const lsServerGes = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Ges);
            var resultGes = lsServerGes.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsGes(resultGes);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, [documento]);

    const handleDelete = async (idWorkHistory) => {
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
                        transition: 'SlideUp'
                    })
                    setAddItemClicked(false);
                    GetAll();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostWorkHistory(FormatDate(new Date()), atencion, documento, datos.idEmpresa,
                datos.idCargo, datos.anio, datos.meses);

            console.log("Datos = ", DataToInsert);

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
                        setAddItemClicked(false);
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
        <SubCard>
            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 3 }} />
                            <TableCell>Empresa</TableCell>
                            <TableCell>Cargo</TableCell>
                            {/* <TableCell>GES</TableCell> */}
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
                            <Row key={row.id} row={row} handleDelete={handleDelete} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Transitions type="collapse" in={addItemClicked} position="top-left" direction="up">
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
                        <Button color="error" onClick={() => setAddItemClicked(false)}>
                            Cancelar
                        </Button>
                        <Button variant="contained" size="small" onClick={handleSubmit(handleClick)}>
                            Adicionar
                        </Button>
                    </Stack>
                </Grid>
            </Transitions>

            {!addItemClicked ?
                <Grid item sx={{ pl: 2, pt: 3 }}>
                    <Button disabled={lsEmpleado.length === 0 ? true : false} variant="text" onClick={() => setAddItemClicked(true)}>
                        + Agregar Cargo
                    </Button>
                </Grid> : <></>}
        </SubCard>
    );
};

export default WorkHistory;

WorkHistory.propTypes = {
    documento: PropTypes.string,
    lsEmpleado: PropTypes.array,
    atencion: PropTypes.number
};