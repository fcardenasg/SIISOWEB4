import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    CardMedia
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import InputMultiSelects from 'components/input/InputMultiSelects';
import useAuth from 'hooks/useAuth';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { TitleButton, CodCatalogo, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import { PutUser } from 'formatdata/UserForm';
import { GetByIdUser, UpdateUsers } from 'api/clients/UserClient';
import Cargando from 'components/loading/Cargando';
import { GetAllRol } from 'api/clients/RolClient';
import InputCheck from 'components/input/InputCheck';

const validationSchema = yup.object().shape({
    documento: yup.string().required(`${ValidationMessage.Requerido}`),
    nombreUsuario: yup.string().required(`${ValidationMessage.Requerido}`),
    nombre: yup.string().required(`${ValidationMessage.Requerido}`),
    telefono: yup.string().required(`${ValidationMessage.Requerido}`),
    correo: yup.string().email(`${ValidationMessage.ValidarCorreo}`).required(`${ValidationMessage.Requerido}`),
    idRol: yup.string().required(`${ValidationMessage.Requerido}`),
});

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [checkResetearPass, setCheckResetearPass] = useState(false);
    const [checkEstadoUsuario, setCheckEstadoUsuario] = useState(true);

    const [lsUsuario, setLsUsuario] = useState([]);
    const [especialidad, setEspecialidad] = useState([]);
    const [fileImg, setFileImg] = useState(null);
    const [timeWait, setTimeWait] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [lsEspecialidad, setLsEspecialidad] = useState([]);
    const [lsRolUser, setLsRolUser] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors } } = methods;

    async function getAll() {
        try {
            const lsServerUpdate = await GetByIdUser(id);
            if (lsServerUpdate.status === 200) {
                setEspecialidad(JSON.parse(lsServerUpdate.data.especialidad));
                setLsUsuario(lsServerUpdate.data);
                setFileImg(lsServerUpdate.data.firma);
                setCheckEstadoUsuario(lsServerUpdate.data.estado);
            }

            const lsServerRol = await GetAllRol(0, 0);
            var resultRol = lsServerRol.data.entities.map((item) => ({
                value: item.id,
                label: item.nombreRol.toUpperCase()
            }));
            setLsRolUser(resultRol);

            const lsServerEspecialidad = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ESPECIALIDAD_MEDICO);
            var resultEspecialidad = lsServerEspecialidad.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEspecialidad(resultEspecialidad);
        } catch (error) {
        }
    }

    useEffect(() => {
        getAll();
    }, []);

    const allowedFilesJPEG = ['image/jpeg'];
    const allowedFilesPNG = ['image/png'];
    const handleFile = (event) => {
        let selectedFile = event.target.files[0];

        if (selectedFile) {
            if (selectedFile && allowedFilesJPEG.includes(selectedFile.type) || allowedFilesPNG.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setFileImg(e.target.result);
                }
            }
            else {
                setFileImg('');
                setOpenError(true);
                setErrorMessage('Seleccione una Imagen');
            }
        }
    }

    const handleClick = async (datos) => {
        try {
            const password = checkResetearPass ? datos.nombreUsuario : lsUsuario.password;

            const DataToUpdate = PutUser(id, datos.documento, datos.nombreUsuario, password, datos.nombre, datos.telefono, datos.correo,
                datos.idRol, JSON.stringify(especialidad), datos.registroMedico, datos.licencia, datos.tarjetaProfesional,
                fileImg, checkEstadoUsuario);

            if (Object.keys(datos.length !== 0)) {
                if (fileImg !== null) {
                    const result = await UpdateUsers(DataToUpdate);
                    if (result.status === 200) {
                        setOpenUpdate(true);
                    }
                }
                else {
                    setOpenError(true);
                    setErrorMessage('Debe selecionar una Firma');
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage('No se pudo guardar el registro');
        }
    };

    setTimeout(() => {
        if (lsUsuario.length != 0) {
            setTimeWait(true);
        }
    }, 1000);

    return (
        <MainCard title="Actualizar Información del Usuarios">
            <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            {timeWait ?
                <Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsUsuario.nombreUsuario}
                                    name="nombreUsuario"
                                    label="Usuario"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.nombreUsuario}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsUsuario.documento}
                                    name="documento"
                                    label="Documento"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.documento}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsUsuario.nombre}
                                    name="nombre"
                                    label="Nombre"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.nombre}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsUsuario.telefono}
                                    name="telefono"
                                    label="Teléfono"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.telefono}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsUsuario.correo}
                                    fullWidth
                                    name="correo"
                                    label="Correo"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.correo}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idRol"
                                    label="Rol"
                                    defaultValue={lsUsuario.idRol}
                                    options={lsRolUser}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.idRol}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <InputMultiSelects
                                fullWidth
                                onChange={(event, value) => setEspecialidad(value)}
                                value={especialidad}
                                label="Especialidad"
                                options={lsEspecialidad}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsUsuario.registroMedico}
                                    fullWidth
                                    name="registroMedico"
                                    label="Registro Médico"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.registroMedico}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsUsuario.licencia}
                                    name="licencia"
                                    label="Licencia"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.licencia}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsUsuario.tarjetaProfesional}
                                    name="tarjetaProfesional"
                                    label="Tarjeta Profesional"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.tarjetaProfesional}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <InputCheck
                                label={`Estado Usuario: ${checkEstadoUsuario ? "Activo" : "Inactivo"}`}
                                onChange={(e) => setCheckEstadoUsuario(e.target.checked)}
                                checked={checkEstadoUsuario}
                                size={30}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <InputCheck
                                label="Resetear Clave"
                                onChange={(e) => setCheckResetearPass(e.target.checked)}
                                checked={checkResetearPass}
                                size={30}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <Grid container>
                                <Grid item xs={12} md={6}>
                                    <Button size="large" variant="contained" component="label" startIcon={<EditIcon fontSize="large" />}>
                                        SUBIR FIRMA
                                        <input hidden accept="image/*" type="file" onChange={handleFile} />
                                    </Button>
                                </Grid>

                                <Grid item xs={3}>
                                    <img src={fileImg} width="120" />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{ pt: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <AnimateButton>
                                    <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                        {TitleButton.Actualizar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={6}>
                                <AnimateButton>
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/user/list")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Fragment> : <Cargando />
            }
        </MainCard>
    );
};

export default UpdateUser;