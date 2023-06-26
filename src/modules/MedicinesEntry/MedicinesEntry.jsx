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
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { TitleButton, ValidationMessage, CodCatalogo, Message } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import { PostMedicamentos } from 'formatdata/MedicinesForm';
import { GetAllMedicines, GetByIdMedicines, InsertMedicines } from 'api/clients/MedicinesClient';
import InputDatePicker from 'components/input/InputDatePicker';
import SubCard from 'ui-component/cards/SubCard';
import ControlModal from 'components/controllers/ControlModal';
import EditMedicinesEntry from './EditMedicinesEntry';
import { GetAllCompany } from 'api/clients/CompanyClient';
import SelectOnChange from 'components/input/SelectOnChange';
import InputOnChange from 'components/input/InputOnChange';

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
    const [medicamentos, setMedicamentos] = useState('');
    const [lsEmpresa, setLsEmpresa] = useState([]);

    const [objetoMedicamentos, setObjetoMedicamentos] = useState({
        medica: '',
        unidad: '',
        existencia: '',
        cantidad: '',
    });

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });

    const { handleSubmit, formState: { errors }, reset } = methods;

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerSede = await GetByTipoCatalogoCombo(CodCatalogo.Sede);
                setLsSede(lsServerSede.data);

                const lsServerMedicamentos = await GetAllMedicines();
                var resultMedicamentos = lsServerMedicamentos.data.map((item) => ({
                    value: item.id,
                    label: `${item.codigo} - ${item.descripcion}`
                }));
                setLsMedicamentos(resultMedicamentos);

                const lsServerEmpresa = await GetAllCompany(0, 0);
                var resultEmpresa = lsServerEmpresa.data.entities.map((item) => ({
                    value: item.codigo,
                    label: item.descripcionSpa
                }));
                setLsEmpresa(resultEmpresa);

                const lsServerUnidad = await GetByTipoCatalogoCombo(CodCatalogo.UNIDAD);
                setLsUnidad(lsServerUnidad.data);
            } catch (error) {
            }
        }

        getAll();
    }, []);

    const handleChangeMedicamento = async (event) => {
        setMedicamentos(event.target.value);

        var objServerMedicamento = await GetByIdMedicines(event.target.value);

        setObjetoMedicamentos({
            medica: objServerMedicamento.data.descripcion,
            unidad: objServerMedicamento.data.nameUnidad,
            existencia: objServerMedicamento.data.existencia === null ? 0 : objServerMedicamento.data.existencia,
            cantidad: (objServerMedicamento.data.cantidadComprada - objServerMedicamento.data.cantidadConsumida)
        });
    };

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
                            <SelectOnChange
                                name="idMedicamento"
                                label="Buscar medicamento"
                                onChange={handleChangeMedicamento}
                                value={medicamentos}
                                options={lsMedicamentos}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.idUnidad}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={4} lg={4}>
                        <FormProvider {...methods}>
                            <InputOnChange
                                fullWidth
                                disabled
                                onChange={(e) => setObjetoMedicamentos({ ...objetoMedicamentos, medica: e.target.value })}
                                value={objetoMedicamentos.medica}
                                name="stopMinimo"
                                label="Medicamento"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.stopMinimo}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={4} lg={1.3}>
                        <FormProvider {...methods}>
                            <InputOnChange
                                fullWidth
                                disabled
                                onChange={(e) => setObjetoMedicamentos({ ...objetoMedicamentos, unidad: e.target.value })}
                                value={objetoMedicamentos.unidad}
                                name="stopMinimo"
                                label="Unidad"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.stopMinimo}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={4} lg={1.3}>
                        <FormProvider {...methods}>
                            <InputOnChange
                                fullWidth
                                disabled
                                onChange={(e) => setObjetoMedicamentos({ ...objetoMedicamentos, existencia: e.target.value })}
                                value={objetoMedicamentos.existencia}
                                name="stopMinimo"
                                label="Existencia"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.stopMinimo}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={4} lg={1.4}>
                        <FormProvider {...methods}>
                            <InputOnChange
                                fullWidth
                                disabled
                                onChange={(e) => setObjetoMedicamentos({ ...objetoMedicamentos, cantidad: e.target.value })}
                                value={objetoMedicamentos.cantidad}
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