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
    Stack,
} from '@mui/material';

import { PostWorkHistory } from 'formatdata/WorkHistoryForm';
import { useDispatch } from 'react-redux';
import { Message } from 'components/helpers/Enums';
import { SNACKBAR_OPEN } from 'store/actions';
import Transitions from 'ui-component/extended/Transitions';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import InputDatePicker from 'components/input/InputDatePicker';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo } from 'components/helpers/Enums';
import { FormProvider, useForm } from 'react-hook-form';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SubCard from 'ui-component/cards/SubCard';
import { GetAllCompany } from 'api/clients/CompanyClient';
import { GetAllWorkHistory, InsertWorkHistory } from 'api/clients/WorkHistoryClient';
import { FormatDate, ViewFormat } from 'components/helpers/Format';

function Row({ row }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

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
                <TableCell >{ViewFormat(row.fecha)}</TableCell>
                <TableCell >{row.anio}</TableCell>
                <TableCell >{row.meses}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <TableContainer>
                                <SubCard
                                    sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                    title="Exposición Ocupacional > Tipo de Riesgo > Químico"
                                    content={false}
                                >
                                    <Table size="small" aria-label="purchases">

                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Consecutivo</TableCell>
                                                <TableCell>Clase</TableCell>
                                                <TableCell>Exposición</TableCell>
                                                <TableCell >Año</TableCell>
                                                <TableCell >Mes</TableCell>
                                                <TableCell >GR sin EPP</TableCell>
                                                <TableCell >GPR con EPP</TableCell>
                                                <TableCell >Medidas de Control</TableCell>

                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {row.history?.map((historyRow) => (
                                                <TableRow hover key={historyRow.date}>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >  {historyRow.amount} </TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>

                                    </Table>
                                </SubCard>
                            </TableContainer>

                            <TableContainer>
                                <SubCard
                                    sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                    title="Exposición Ocupacional > Tipo de Riesgo > Físico"
                                    content={false}
                                >
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Consecutivo</TableCell>
                                                <TableCell>Clase</TableCell>
                                                <TableCell>Exposición</TableCell>
                                                <TableCell >Año</TableCell>
                                                <TableCell >Mes</TableCell>
                                                <TableCell >GR sin EPP</TableCell>
                                                <TableCell >GPR con EPP</TableCell>
                                                <TableCell >Medidas de Control</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.history?.map((historyRow) => (


                                                <TableRow hover key={historyRow.date}>

                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >  {historyRow.amount} </TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>


                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </SubCard>
                            </TableContainer>



                            <TableContainer>
                                <SubCard
                                    sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                    title="Exposición Ocupacional > Tipo de Riesgo > Psicosocial"
                                    content={false}
                                >
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Consecutivo</TableCell>
                                                <TableCell>Clase</TableCell>
                                                <TableCell>Exposición</TableCell>
                                                <TableCell >Año</TableCell>
                                                <TableCell >Mes</TableCell>
                                                <TableCell >GR sin EPP</TableCell>
                                                <TableCell >GPR con EPP</TableCell>
                                                <TableCell >Medidas de Control</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.history?.map((historyRow) => (
                                                <TableRow hover key={historyRow.date}>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >  {historyRow.amount} </TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>


                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </SubCard>
                            </TableContainer>

                            <TableContainer>
                                <SubCard
                                    sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                    title="Exposición Ocupacional > Tipo de Riesgo > Biológico"
                                    content={false}
                                >
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Consecutivo</TableCell>
                                                <TableCell>Clase</TableCell>
                                                <TableCell>Exposición</TableCell>
                                                <TableCell >Año</TableCell>
                                                <TableCell >Mes</TableCell>
                                                <TableCell >GR sin EPP</TableCell>
                                                <TableCell >GPR con EPP</TableCell>
                                                <TableCell >Medidas de Control</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.history?.map((historyRow) => (
                                                <TableRow hover key={historyRow.date}>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >  {historyRow.amount} </TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </SubCard>
                            </TableContainer>


                            <TableContainer>
                                <SubCard
                                    sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                    title="Exposición Ocupacional > Tipo de Riesgo > Ergonómico carga física"
                                    content={false}
                                >
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Consecutivo</TableCell>
                                                <TableCell>Clase</TableCell>
                                                <TableCell>Exposición</TableCell>
                                                <TableCell >Año</TableCell>
                                                <TableCell >Mes</TableCell>
                                                <TableCell >GR sin EPP</TableCell>
                                                <TableCell >GPR con EPP</TableCell>
                                                <TableCell >Medidas de Control</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.history?.map((historyRow) => (
                                                <TableRow hover key={historyRow.date}>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >  {historyRow.amount} </TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>


                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </SubCard>
                            </TableContainer>

                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.object
};


const WorkHistory = ({ documento, atencion }) => {
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
            const lsServerWorkHistory = await GetAllWorkHistory(0, 0);
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
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostWorkHistory(FormatDate(datos.fecha), atencion, documento, datos.idEmpresa,
                datos.idCargo, datos.anio, datos.meses);

            console.log("Datos = ", DataToInsert);

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
                            <TableCell sx={{ pr: 3 }}>
                                Meses
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lsWorkHistory.map((row) => (
                            <Row key={row.id} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Transitions type="collapse" in={addItemClicked} position="top-left" direction="up">
                <Grid container sx={{ pt: 5 }} spacing={2}>
                    <Grid item xs={3}>
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

                    <Grid item xs={2.5}>
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

                    {/* <Grid item xs={2.5}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="ges"
                                label="GES"
                                defaultValue=""
                                options={lsGes}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid> */}

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputDatePicker
                                label="Fecha"
                                name="fecha"
                                defaultValue={null}
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
                    <Button variant="text" onClick={() => setAddItemClicked(true)}>
                        + Agregar Cargo
                    </Button>
                </Grid> : <></>}
        </SubCard>
    );
};

export default WorkHistory;

WorkHistory.propTypes = {
    documento: PropTypes.string,
    atencion: PropTypes.string
};