import {
    Box,
    Button,
    Card,
    Divider,
    Grid,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { alpha } from '@mui/material/styles';
import animation from 'assets/img/animation.json';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { GetComboRol } from 'api/clients/RolClient';
import { GetByIdUser, UpdateUsers } from 'api/clients/UserClient';
import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import { CodCatalogo, IdUser, Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import InputCheckBox from 'components/input/InputCheckBox';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import Cargando from 'components/loading/Cargando';
import { UploadBox } from 'components/upload';
import { PutUser } from 'formatdata/UserForm';
import Lottie from 'lottie-react';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ListActionMenu from './ListActionMenu';
import useAuth from 'hooks/useAuth';

const validationSchema = yup.object().shape({
    documento: yup.string().required(ValidationMessage.Requerido),
    nombreUsuario: yup.string().required(ValidationMessage.Requerido),
    nombre: yup.string().required(ValidationMessage.Requerido),
    telefono: yup.string().required(ValidationMessage.Requerido),
    correo: yup.string().required(ValidationMessage.Requerido),
    idRol: yup.string().required(ValidationMessage.Requerido),
});

const lsVentanillaUnica = [
    { value: 0, label: "TODOS" },
    { value: 1, label: "NO RESPONDE" },
]

const UpdateUser = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsUsuario, setLsUsuario] = useState([]);
    const [timeWait, setTimeWait] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [lsEspecialidad, setLsEspecialidad] = useState([]);
    const [lsArea, setLsArea] = useState([]);
    const [lsRolUser, setLsRolUser] = useState([]);
    const [lsSedeUser, setLsSedeUser] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, watch, setValue, formState: { errors } } = methods;
    const values = watch();

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerUpdate = await GetByIdUser(id);
                if (lsServerUpdate.status === 200) {
                    setValue("estado", lsServerUpdate.data.estado);
                    setValue("puedeAdministrarPermisos", lsServerUpdate.data.puedeAdministrarPermisos);
                    setLsUsuario(lsServerUpdate.data);
                }

                const lsServerRol = await GetComboRol();
                setLsRolUser(lsServerRol.data);

                const lsServerArea = await GetAllByTipoCatalogo(0, 0, CodCatalogo.VentanillaArea);
                var resultArea = lsServerArea.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                const arrayArea = lsVentanillaUnica.concat(resultArea);
                setLsArea(arrayArea);

                const lsServerEspecialidad = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ESPECIALIDAD_MEDICO);
                var resultEspecialidad = lsServerEspecialidad.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsEspecialidad(resultEspecialidad);

                const lsServerSede = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Sede);
                var resultSede = lsServerSede.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsSedeUser(resultSede);
            } catch (error) { }
        }

        getAll();
    }, []);

    const handleDropFirm = useCallback((acceptedFiles) => {
        const archivo = acceptedFiles[0];

        if (archivo) {
            const reader = new FileReader();
            reader.readAsDataURL(archivo);
            reader.onloadend = (event) => {
                setValue('imgfirma', event.target.result, { shouldValidate: true });
            }
        }
    }, [setValue]);

    const handleRemoveFile = useCallback(() => {
        setValue('imgfirma', null);
    }, [setValue]);

    const handleClick = async (datos) => {
        try {
            var resert = datos.checkResetearPass ? "yes" : "";

            const DataToUpdate = PutUser(id, datos.documento, datos.nombreUsuario, resert, datos.nombre, datos.telefono, datos.idArea,
                datos.correo, datos.idRol, datos.especialidad, datos.registroMedico, datos.licencia, datos.tarjetaProfesional,
                datos.imgfirma, datos.estado, datos.idSede, datos.respondeReintegro, datos.respondeVentanillaUnica,
                datos.registraTaxi, datos.puedeAdministrarPermisos);

            const result = await UpdateUsers(DataToUpdate);
            if (result.status === 200) {
                if (result.data.message === "") {
                    setOpenUpdate(true);
                } else {
                    setOpenError(true);
                    setErrorMessage(result.data.message);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    setTimeout(() => {
        if (lsUsuario.length != 0)
            setTimeWait(true);
    }, 1000);

    return (
        <MainCard title="Actualizar información del usuarios">
            <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            {timeWait ?
                <FormProvider {...methods}>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        defaultValue={lsUsuario.nombreUsuario}
                                        name="nombreUsuario"
                                        label="Usuario"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.nombreUsuario}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        defaultValue={lsUsuario.documento}
                                        name="documento"
                                        label="Documento"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.documento}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        defaultValue={lsUsuario.nombre}
                                        name="nombre"
                                        label="Nombre"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.nombre}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        defaultValue={lsUsuario.telefono}
                                        name="telefono"
                                        label="Teléfono"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.telefono}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        defaultValue={lsUsuario.correo}
                                        fullWidth
                                        name="correo"
                                        label="Correo"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.correo}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="idRol"
                                        label="Rol"
                                        defaultValue={lsUsuario.idRol}
                                        options={lsRolUser}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idRol}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="especialidad"
                                        label="Especialidad"
                                        defaultValue={lsUsuario.especialidad}
                                        options={lsEspecialidad}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.especialidad}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        defaultValue={lsUsuario.registroMedico}
                                        fullWidth
                                        name="registroMedico"
                                        label="Registro Médico"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.registroMedico}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        defaultValue={lsUsuario.licencia}
                                        name="licencia"
                                        label="Licencia"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.licencia}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={12} lg={3}>
                            <Grid container spacing={0.2} sx={{ textAlign: 'center' }}>
                                <Grid item xs={12}>
                                    <Card sx={{ border: (theme) => `dashed 1px ${alpha(theme.palette.grey[500], 0.3)}` }}>
                                        <UploadBox
                                            name="imgfirma"
                                            defaultValue={lsUsuario?.firma}
                                            onDrop={handleDropFirm}
                                            placeholder={
                                                <Stack alignItems="center" sx={{ color: 'text.disabled' }}>
                                                    <Box sx={{ alignContent: 'center', width: '80px', height: '80px', marginX: 'auto' }}>
                                                        <Lottie animationData={animation} />
                                                    </Box>
                                                    <Typography variant="body1">Subir firma</Typography>
                                                </Stack>
                                            }
                                            sx={{ py: 1.5, width: 'auto', height: 'auto', borderRadius: 1.5 }}
                                        />
                                    </Card>
                                </Grid>

                                <Grid item xs={12}>
                                    <Button size="medium" sx={{ mt: 2 }} color="error" onClick={handleRemoveFile}>Remover</Button>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
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

                        <Grid item xs={12} md={6} lg={3}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idSede"
                                    label="Sede de atención"
                                    defaultValue={lsUsuario.idSede}
                                    options={lsSedeUser}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.idSede}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idArea"
                                    label="Area"
                                    defaultValue={lsUsuario.idArea}
                                    options={lsArea}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.idArea}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <InputCheckBox
                                name="checkResetearPass"
                                defaultValue={false}
                                label="¿Restablecer contraseña?"
                                size={30}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <SubCard title={<Typography variant='h4'>Acciones permitidas para el usuario</Typography>}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputCheckBox
                                            name="estado"
                                            defaultValue={lsUsuario.estado}
                                            label={`Estado de usuario: ${values.estado ? "Activo" : "Inactivo"}`}
                                            size={30}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputCheckBox
                                            name="respondeReintegro"
                                            defaultValue={lsUsuario.respondeReintegro}
                                            label="¿Responde ordenes de reintegro?"
                                            size={30}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputCheckBox
                                            name="respondeVentanillaUnica"
                                            defaultValue={lsUsuario.respondeVentanillaUnica}
                                            label="¿Responde ventanilla única?"
                                            size={30}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputCheckBox
                                            name="registraTaxi"
                                            defaultValue={lsUsuario.registraTaxi}
                                            label="¿Registra solicitud de taxi?"
                                            size={30}
                                        />
                                    </Grid>

                                    {user?.id == IdUser.fcardenas &&
                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputCheckBox
                                                name="puedeAdministrarPermisos"
                                                defaultValue={lsUsuario.puedeAdministrarPermisos}
                                                label="¿Administra los permisos de usuarios?"
                                                size={30}
                                            />
                                        </Grid>
                                    }

                                    {console.log(lsUsuario)}
                                    {console.log(user)}

                                    {user?.puedeAdministrarPermisos == true && <>
                                        <Grid item xs={12} sx={{ my: 2 }}><Divider /></Grid>

                                        <Grid item xs={12}>
                                            <ListActionMenu />
                                        </Grid>
                                    </>}
                                </Grid>
                            </SubCard>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{ pt: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={4} lg={2}>
                                <AnimateButton>
                                    <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                        {TitleButton.Actualizar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={6} md={4} lg={2}>
                                <AnimateButton>
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/user/list")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </FormProvider> : <Cargando />
            }
        </MainCard>
    );
};

export default UpdateUser;