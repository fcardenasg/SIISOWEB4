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
import { TitleButton, CodCatalogo } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import { PutUser } from 'formatdata/UserForm';
import { GetByIdUser, UpdateUsers } from 'api/clients/UserClient';
import Cargando from 'components/loading/Cargando';

const UpdateUser = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsUsuario, setLsUsuario] = useState([]);
    const [especialidad, setEspecialidad] = useState([]);
    const [fileImg, setFileImg] = useState(null);
    const [timeWait, setTimeWait] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [lsEspecialidad, setLsEspecialidad] = useState([]);
    const [lsRolUser, setLsRolUser] = useState([]);

    const methods = useForm();

    const { handleSubmit, errors } = methods;

    async function GetAll() {
        try {
            const lsServerUpdate = await GetByIdUser(id);
            if (lsServerUpdate.status === 200) {
                setEspecialidad(JSON.parse(lsServerUpdate.data.especialidad));
                setLsUsuario(lsServerUpdate.data);
                setFileImg(lsServerUpdate.data.firma);
            }

            const lsServerEspecialidad = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ESPECIALIDAD_MEDICO);
            var resultEspecialidad = lsServerEspecialidad.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEspecialidad(resultEspecialidad);

            const lsServerRolUser = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ROL_USUARIO);
            var resultRolUser = lsServerRolUser.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRolUser(resultRolUser);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
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
            const DataToInsert = PutUser(id, datos.documento, datos.nombre, datos.telefono, datos.correo,
                datos.idRol, JSON.stringify(especialidad), datos.registroMedico, datos.licencia,
                datos.tarjetaProfesional, fileImg);

            if (Object.keys(datos.length !== 0)) {
                if (fileImg !== null) {
                    const result = await UpdateUsers(DataToInsert);
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
                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsUsuario.documento}
                                    name="documento"
                                    label="Documento"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsUsuario.nombre}
                                    name="nombre"
                                    label="Nombre"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsUsuario.telefono}
                                    name="telefono"
                                    label="Teléfono"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsUsuario.correo}
                                    fullWidth
                                    name="correo"
                                    label="Correo"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idRol"
                                    label="Rol"
                                    defaultValue={lsUsuario.idRol}
                                    options={lsRolUser}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InputMultiSelects
                                fullWidth
                                onChange={(event, value) => setEspecialidad(value)}
                                value={especialidad}
                                label="Especialidad"
                                options={lsEspecialidad}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsUsuario.registroMedico}
                                    fullWidth
                                    name="registroMedico"
                                    label="Registro Médico"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsUsuario.licencia}
                                    name="licencia"
                                    label="Licencia"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsUsuario.tarjetaProfesional}
                                    name="tarjetaProfesional"
                                    label="Tarjeta Profesional"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Grid container>
                                <Grid item xs={12} md={6}>
                                    <Button size="large" variant="contained" component="label" startIcon={<EditIcon fontSize="large" />}>
                                        SUBIR FIRMA
                                        <input hidden accept="image/*" type="file" onChange={handleFile} />
                                    </Button>
                                </Grid>

                                <Grid item xs={3}>
                                    <CardMedia
                                        component="img"
                                        height="100"
                                        image={fileImg}
                                        alt="Firma"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={2}>

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