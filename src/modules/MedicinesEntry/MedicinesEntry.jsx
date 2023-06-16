import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    useMediaQuery
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';

import useAuth from 'hooks/useAuth';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { TitleButton, ValidationMessage, CodCatalogo, Message } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import { PostMedicamentos } from 'formatdata/MedicinesForm';
import { GetAllMedicines, InsertMedicines } from 'api/clients/MedicinesClient';
import InputDatePicker from 'components/input/InputDatePicker';
import SubCard from 'ui-component/cards/SubCard';
import ControlModal from 'components/controllers/ControlModal';
import EditMedicinesEntry from './EditMedicinesEntry';
import { GetAllCompany } from 'api/clients/CompanyClient';

const validationSchema = yup.object().shape({
    codigo: yup.string().required(ValidationMessage.Requerido),
    descripcion: yup.string().required(ValidationMessage.Requerido),
    idUnidad: yup.string().required(ValidationMessage.Requerido),
    stopMinimo: yup.string().required(ValidationMessage.Requerido),
});

const lsOrdenesParaclinicos = [
    { nameEmpresa: 'FARMATODO', nameMedicamento: 'ACETAMINOFEN', nameUnidadMedicamento: 'MG', cantidad: 20 },
    { nameEmpresa: 'FARMATODO', nameMedicamento: 'DOLEX GRIPA', nameUnidadMedicamento: 'CC', cantidad: 30 },
    { nameEmpresa: 'LA REBAJA', nameMedicamento: 'GERINGA 100CC', nameUnidadMedicamento: 'ML', cantidad: 5 },
    { nameEmpresa: 'LA REBAJA', nameMedicamento: 'CONGESTIONANTE', nameUnidadMedicamento: 'MG', cantidad: 10 },
];

var dataMedicamento = {};

const MedicinesEntry = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openEdit, setOpenEdit] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [lsUnidad, setLsUnidad] = useState([]);
    const [lsSede, setLsSede] = useState([]);
    const [lsMedicamentos, setLsMedicamentos] = useState([]);
    const [lsEmpresa, setLsEmpresa] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });

    const { handleSubmit, formState: { errors }, reset } = methods;

    async function getAll() {
        try {
            const lsServerSede = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Sede);
            var resultSede = lsServerSede.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsSede(resultSede);

            const lsServerMedicamentos = await GetAllMedicines(0, 0);
            var resultMedicamentos = lsServerMedicamentos.data.entities.map((item) => ({
                value: item.id,
                label: item.descripcion
            }));
            setLsMedicamentos(resultMedicamentos);

            /* const lsServerEmpresa = await GetAllCompany(0, 0);
            var resultEmpresa = lsServerEmpresa.data.entities.map((item) => ({
                value: item.codigo,
                label: item.descripcionSpa
            }));
            setLsEmpresa(resultEmpresa); */

            const lsServerSupplier = await GetAllByTipoCatalogo(0, 0, CodCatalogo.UNIDAD);
            var resultSupplier = lsServerSupplier.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsUnidad(resultSupplier);
        } catch (error) {
        }
    }

    useEffect(() => {
        getAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostMedicamentos(datos.codigo, datos.descripcion, datos.idUnidad, datos.stopMinimo, undefined, undefined, undefined,
                datos.estado, user.nameuser, undefined, undefined, undefined);

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertMedicines(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    reset();
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    const handleClickEdit = async (indexMedicamento) => {
        try {
            dataMedicamento = lsOrdenesParaclinicos[indexMedicamento];

            setOpenEdit(true);



        } catch (error) {
            setOpenError(true);
            setErrorMessage(error.message);
        }
    };

    return (
        <MainCard title="Registrar Entrada De Medicamento">
            <ControlModal
                title="Editar Entrada De Medicamento"
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                maxWidth="sm"
            >
                {/* <EditMedicinesEntry dataMedicamento={dataMedicamento} /> */}
            </ControlModal>


            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} lg={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idMedicamento"
                                label="Buscar medicamento"
                                defaultValue=""
                                options={lsMedicamentos}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.idUnidad}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={4} lg={4}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="stopMinimo"
                                label="Medicamento"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.stopMinimo}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={4} lg={1.3}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                type="number"
                                fullWidth
                                name="stopMinimo"
                                label="Unidad"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.stopMinimo}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={4} lg={1.3}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                type="number"
                                fullWidth
                                name="stopMinimo"
                                label="Existencia"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.stopMinimo}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={4} lg={1.4}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                type="number"
                                fullWidth
                                name="stopMinimo"
                                label="Cantidad"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.stopMinimo}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={3.3}>
                        <FormProvider {...methods}>
                            <InputDatePicker
                                name="fecha"
                                label="Fecha"
                                defaultValue={new Date()}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={3.3}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idUnidad"
                                label="Proveedor"
                                defaultValue=""
                                options={lsEmpresa}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.idUnidad}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={3.3}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idSede"
                                label="Sede"
                                defaultValue=""
                                options={lsSede}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.idUnidad}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={4} lg={2.1}>
                        <AnimateButton>
                            <Button size='large' variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                Agregar
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} sx={{ pt: 4 }}>
                <SubCard title={<Typography variant='h4'>Lista de Medicamentos a Ingresar</Typography>}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Proveedor</TableCell>
                                            <TableCell>Medicamento</TableCell>
                                            <TableCell>Unidad</TableCell>
                                            <TableCell>Cantidad</TableCell>
                                            <TableCell>Acción</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {lsOrdenesParaclinicos.map((row, index) => (
                                            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                                                <TableCell component="th" scope="row">{row.nameEmpresa}</TableCell>
                                                <TableCell>{row.nameMedicamento}</TableCell>
                                                <TableCell>{row.nameUnidadMedicamento}</TableCell>
                                                <TableCell>{row.cantidad}</TableCell>

                                                <TableCell>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={6}>
                                                            <AnimateButton>
                                                                <Tooltip title="Editar" onClick={() => handleClickEdit(index)}>
                                                                    <IconButton color="primary" size="small">
                                                                        <EditIcon sx={{ fontSize: '2rem' }} />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </AnimateButton>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12} sx={{ pt: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <AnimateButton>
                            <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                {TitleButton.Guardar}
                            </Button>
                        </AnimateButton>
                    </Grid>

                    <Grid item xs={2}>
                        <AnimateButton>
                            <Button variant="outlined" fullWidth onClick={() => navigate("/medicines-entry/list")}>
                                {TitleButton.Cancelar}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default MedicinesEntry;