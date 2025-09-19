import {
    Box,
    Button,
    Card,
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
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { GetComboRol } from 'api/clients/RolClient';
import { GetPermiso, InsertUser } from 'api/clients/UserClient';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import { AccionMenu, CodCatalogo, IdUser, Message, Modulo, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import InputCheckBox from 'components/input/InputCheckBox';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import { UploadBox } from 'components/upload';
import { PostUser } from 'formatdata/UserForm';
import useAuth from 'hooks/useAuth';
import Lottie from 'lottie-react';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';

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

const User = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { user } = useAuth();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [lsEspecialidad, setLsEspecialidad] = useState([]);
    const [lsRolUser, setLsRolUser] = useState([]);
    const [lsSedeUser, setLsSedeUser] = useState([]);
    const [lsArea, setLsArea] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, reset, setValue, watch, formState: { errors } } = methods;
    const values = watch();

    async function getAll() {
        try {
            const lsServerRol = await GetComboRol();
            setLsRolUser(lsServerRol.data);

            const lsServerEspecialidad = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ESPECIALIDAD_MEDICO);
            var resultEspecialidad = lsServerEspecialidad.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEspecialidad(resultEspecialidad);

            const lsServerArea = await GetAllByTipoCatalogo(0, 0, CodCatalogo.VentanillaArea);
            var resultArea = lsServerArea.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsArea(resultArea);
            const arrayArea = lsVentanillaUnica.concat(resultArea);
            setLsArea(arrayArea);

            const lsServerSede = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Sede);
            var resultSede = lsServerSede.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsSedeUser(resultSede);
        } catch (error) { }
    }

    useEffect(() => {
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
            const DataToInsert = PostUser(datos.documento, datos.nombreUsuario, datos.nombreUsuario, datos.nombre, datos.telefono,
                datos.idArea, datos.correo, datos.idRol, datos.especialidad, datos.registroMedico, datos.licencia,
                datos.tarjetaProfesional, datos.imgfirma, datos.estado, datos.idSede, datos.respondeReintegro,
                datos.respondeVentanillaUnica, datos.registraTaxi, datos.puedeAdministrarPermisos, datos.medicoRegistroAtencion);

            const result = await InsertUser(DataToInsert);
            if (result.status === 200) {
                if (result.data.message === "") {
                    reset();
                    setOpenSuccess(true);
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

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.Usuario}>
            <MainCard title="Registrar información del usuario">
                <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
                <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

                <FormProvider {...methods}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={9}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        defaultValue=""
                                        name="nombreUsuario"
                                        label="Usuario"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.nombreUsuario}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        type="number"
                                        defaultValue=""
                                        name="documento"
                                        label="Documento"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.documento}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        defaultValue=""
                                        name="nombre"
                                        label="Nombres"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.nombre}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        type="number"
                                        defaultValue=""
                                        name="telefono"
                                        label="Teléfono"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.telefono}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        defaultValue=""
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
                                        defaultValue=""
                                        options={lsRolUser}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idRol}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="especialidad"
                                        label="Especialidad"
                                        defaultValue={null}
                                        options={lsEspecialidad}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.especialidad}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="registroMedico"
                                        label="Registro Médico"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.registroMedico}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        defaultValue=""
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
                                            defaultValue={null}
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

                        <Grid item xs={12} md={6} lg={4}>
                            <InputText
                                defaultValue=""
                                name="tarjetaProfesional"
                                label="Tarjeta Profesional"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.tarjetaProfesional}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <InputSelect
                                name="idSede"
                                label="Sede de atención"
                                defaultValue={null}
                                options={lsSedeUser}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.idSede}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <InputSelect
                                name="idArea"
                                label="Area"
                                defaultValue={null}
                                options={lsArea}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.idArea}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <SubCard title="Control de acciones permitidas para el usuario">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <InputCheckBox
                                            name="estado"
                                            defaultValue={true}
                                            label={`Estado del usuario: ${values.estado ? "Activo" : "Inactivo"}`}
                                            size={30}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <InputCheckBox
                                            name="respondeReintegro"
                                            defaultValue={false}
                                            label="¿Responde ordenes de reintegro?"
                                            size={30}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <InputCheckBox
                                            name="respondeVentanillaUnica"
                                            defaultValue={false}
                                            label="¿Responde ventanilla única?"
                                            size={30}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <InputCheckBox
                                            name="registraTaxi"
                                            defaultValue={false}
                                            label="¿Registra solicitud de taxi?"
                                            size={30}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <InputCheckBox
                                            name="medicoRegistroAtencion"
                                            defaultValue={false}
                                            label="¿Es médico en registro de atención?"
                                            size={30}
                                        />
                                    </Grid>

                                    {user?.id == IdUser.fcardenas &&
                                        <Grid item xs={12} md={4}>
                                            <InputCheckBox
                                                name="puedeAdministrarPermisos"
                                                defaultValue={false}
                                                label="¿Administra los permisos de usuarios?"
                                                size={30}
                                            />
                                        </Grid>
                                    }
                                </Grid>
                            </SubCard>
                        </Grid>
                    </Grid>
                </FormProvider>

                <Grid item xs={12} sx={{ pt: 4 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4} lg={2}>
                            <AnimateButton>
                                <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                    {TitleButton.Guardar}
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
            </MainCard>
        </ValidateActionSkeleton>
    );
};

export default User;