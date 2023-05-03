import PropTypes from 'prop-types';
import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import {
    Box, Tab, Tabs,
    Grid, Button,
    TextField,
    useMediaQuery,
    IconButton,
    Tooltip,
    Typography,
    Avatar,
    TableCell,
    TableRow,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    Stack
} from '@mui/material';
import PersonalData from './PersonalData';

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import { GetAllSupplier } from 'api/clients/SupplierClient';

import { GetByIdEmployee } from 'api/clients/EmployeeClient';

import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

import Chip from 'ui-component/extended/Chip';
import Transitions from 'ui-component/extended/Transitions';
import InputText from 'components/input/InputText';
import { Message, TitleButton } from 'components/helpers/Enums';
import { FormatDate, GetEdad } from 'components/helpers/Format';
import useAuth from 'hooks/useAuth';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import User from 'assets/img/user.png'
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import SelectOnChange from 'components/input/SelectOnChange';
import InputDatePicker from 'components/input/InputDatePicker';
import { CodCatalogo, DefaultValue } from 'components/helpers/Enums';
import InputSelect from 'components/input/InputSelect';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import InputCheckBox from 'components/input/InputCheckBox';
import { PostOrders } from 'formatdata/OrdersForm';
import { InsertOrders } from 'api/clients/OrdersClient';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ViewEmployee from 'components/views/ViewEmployee';

const OrdersIndividual = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [addItemClickedEmpresa, setAddItemClickedEmpresa] = useState(false);
    const [moreFive, setMoreFive] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    const [documento, setDocumento] = useState('');
    const [tipoExamen, setTipoExamen] = useState('');
    const [lsTipoExamen, setLsTipoExamen] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsProveedor, setLsProveedor] = useState([]);
    const [lsLaboratorio, setLsLaboratorio] = useState([]);
    const [lsTipoRNM, setLsTipoRNM] = useState([]);
    const [lsCiudad, setLsCiudad] = useState([]);
    const [lsEstudioParaclinico, setLsEstudioParaclinico] = useState([]);

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);

            if (event.target.value !== '') {
                if (event.key === 'Enter') {
                    if (event?.target.value != "") {
                        var lsServerEmployee = await GetByIdEmployee(event?.target.value);
                        console.log(lsServerEmployee);

                        if (lsServerEmployee.status === 200) {
                            setLsEmployee(lsServerEmployee.data);
                        }
                    } else {
                        setOpenError(true);
                        setErrorMessage(Message.ErrorDocumento);
                    }
                } else {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.status === 200) {
                        setLsEmployee(lsServerEmployee.data);
                    }
                }
            }
        } catch (error) {
            setLsEmployee([]);

        }
    }

    const methods = useForm();
    const { handleSubmit, errors, reset } = methods;

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServerLaboratorio = await GetAllByTipoCatalogo(0, 0, CodCatalogo.LABORATORIO_ORDENES_PARACLINICOS);
                var resultLaboratorio = lsServerLaboratorio.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsLaboratorio(resultLaboratorio);

                const lsServerTipoRNM = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TIPORNM_ORDENES_PARACLINICOS);
                var resultTipoRNM = lsServerTipoRNM.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsTipoRNM(resultTipoRNM);

                const lsServerCiudad = await GetAllByTipoCatalogo(0, 0, CodCatalogo.CIUDADES);
                if (lsServerCiudad.status === 200) {
                    var resultCiudad = lsServerCiudad.data.entities.map((item) => ({
                        value: item.idCatalogo,
                        label: item.nombre
                    }));
                    setLsCiudad(resultCiudad);
                }

                const lsServerProveedor = await GetAllSupplier(0, 0);
                if (lsServerProveedor.status === 200)
                    setLsProveedor(lsServerProveedor.data.entities);

                const lsServerTipoExamen = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TIPO_EXAMEN_PARACLINICOS);
                var resultTipoExamen = lsServerTipoExamen.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsTipoExamen(resultTipoExamen);

                const lsServerEstudioParaclinico2 = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ESTUDIO_EXAMEN_PARACLINICOS);
                var resultEstudioParaclinico = lsServerEstudioParaclinico2.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsEstudioParaclinico(resultEstudioParaclinico);
            } catch (error) {

            }
        }

        GetAll();
    }, [])

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ViewEmployee
                        title="Ordenes Individuales"
                        key={lsEmployee.documento}
                        documento={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        lsEmployee={lsEmployee}
                        handleDocumento={handleDocumento}
                    />
                </Grid>

                <Grid item xs={12}>
                    <SubCard>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha"
                                        name="fecha"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idTipoExamen"
                                        label="Tipo Examen"
                                        defaultValue=""
                                        options={lsTipoExamen}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>

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

                                                    {/* {lsWorkHistoryOtherCompany.map((row) => (
                                                        <RowCompany key={row.id} getAllWorkHistory={getAllWorkHistory} getSumaRiesgo={getSumaRiesgo} documento={documento} row={row} handleDelete={handleDeleteEmpresa} />
                                                    ))} */}

                                                </TableBody>
                                            </Table>
                                        </TableContainer>
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

                                                    <Button variant="contained" size="small" /* onClick={handleSubmit(handleClickEmpresa)} */>
                                                        Adicionar
                                                    </Button>
                                                </Stack>
                                            </Grid>
                                        </Transitions>

                                        {!addItemClickedEmpresa ?
                                            <Grid item sx={{ pl: 2, pt: 3 }}>
                                                <Button disabled={lsEmployee.length === 0 ? true : false} variant="text" onClick={() => setAddItemClickedEmpresa(true)}>
                                                    + Agregar Paraclinico
                                                </Button>
                                            </Grid> : null}
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>




                    </SubCard>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default OrdersIndividual;