import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    CardMedia
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { useNavigate } from 'react-router-dom';
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
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import { PostUser } from 'formatdata/UserForm';
import { InsertUser } from 'api/clients/UserClient';
import { GetAllRol } from 'api/clients/RolClient';

const validationSchema = yup.object().shape({
    documento: yup.string().required(`${ValidationMessage.Requerido}`),
    nombreUsuario: yup.string().required(`${ValidationMessage.Requerido}`),
    nombre: yup.string().required(`${ValidationMessage.Requerido}`),
    telefono: yup.string().required(`${ValidationMessage.Requerido}`),
    correo: yup.string().required(`${ValidationMessage.Requerido}`),
    idRol: yup.string().required(`${ValidationMessage.Requerido}`),
    registroMedico: yup.string().required(`${ValidationMessage.Requerido}`),
    licencia: yup.string().required(`${ValidationMessage.Requerido}`),
    tarjetaProfesional: yup.string().required(`${ValidationMessage.Requerido}`),
});

const User = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [especialidad, setEspecialidad] = useState([]);
    const [fileImg, setFileImg] = useState(null);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [lsEspecialidad, setLsEspecialidad] = useState([]);
    const [lsRolUser, setLsRolUser] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, reset, formState: { errors } } = methods;

    async function GetAll() {
        try {
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
        } catch (error) { }
    }

    useEffect(() => {
        GetAll();
    }, []);

    const allowedFilesJPEG = ['image/jpeg'];
    const allowedFilesPNG = ['image/png'];
    const handleFile = (event) => {
        let selectedFile = event.target.files[0];

        if (selectedFile) {
            if (selectedFile && (allowedFilesJPEG.includes(selectedFile.type) || allowedFilesPNG.includes(selectedFile.type))) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setFileImg(e.target.result);
                }
            }
            else {
                setFileImg('');
                setOpenError(true);
                setErrorMessage('Seleccione una Imagen (jpeg/png)');
            }
        }
    }

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostUser(datos.documento, datos.nombre, datos.telefono, datos.correo,
                datos.idRol, JSON.stringify(especialidad), datos.registroMedico, datos.licencia, datos.tarjetaProfesional,
                fileImg);

            if (Object.keys(datos.length !== 0)) {
                if (fileImg === null) {
                    setOpenError(true);
                    setErrorMessage('Debe selecionar una Firma');
                } else if (especialidad.length === 0) {
                    setOpenError(true);
                    setErrorMessage('Debe seleccionar por lo menos una Especialidad');
                }
                else {
                    const result = await InsertUser(DataToInsert);
                    if (result.status === 200) {
                        setOpenSuccess(true);
                        reset();
                        setEspecialidad([]);
                        setFileImg(null);
                    }
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage('No se pudo guardar el registro');
        }
    };

    return (
        <MainCard title="Registrar Información del Usuario">
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            name="nombreUsuario"
                            label="Nombre de usuario"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.nombreUsuario}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            name="documento"
                            label="Documento"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.documento}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            name="nombre"
                            label="Nombres"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.nombre}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            name="telefono"
                            label="Teléfono"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.telefono}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            fullWidth
                            name="correo"
                            label="Correo"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.correo}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputSelect
                            name="idRol"
                            label="Rol"
                            defaultValue=""
                            options={lsRolUser}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.idRol}
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
                            defaultValue=""
                            fullWidth
                            name="registroMedico"
                            label="Registro Médico"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.registroMedico}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            name="licencia"
                            label="Licencia"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.licencia}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            name="tarjetaProfesional"
                            label="Tarjeta Profesional"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.tarjetaProfesional}
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
                                {TitleButton.Guardar}
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
        </MainCard>
    );
};

export default User;