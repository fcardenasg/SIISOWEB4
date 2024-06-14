import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { TitleButton, CodCatalogo, ValidationMessage, Message } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import { PostUser } from 'formatdata/UserForm';
import { InsertUser } from 'api/clients/UserClient';
import { GetComboRol } from 'api/clients/RolClient';
import InputCheckBox from 'components/input/InputCheckBox';

const validationSchema = yup.object().shape({
    documento: yup.string().required(ValidationMessage.Requerido),
    nombreUsuario: yup.string().required(ValidationMessage.Requerido),
    nombre: yup.string().required(ValidationMessage.Requerido),
    telefono: yup.string().required(ValidationMessage.Requerido),
    correo: yup.string().required(ValidationMessage.Requerido),
    idRol: yup.string().required(ValidationMessage.Requerido),
});

const lsData = [
    { value: 0, label: "TODOS" }
]

const User = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [fileImg, setFileImg] = useState(null);
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

    const { handleSubmit, reset, watch, formState: { errors } } = methods;
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
            const arrayArea = lsData.concat(resultArea);
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
            const DataToInsert = PostUser(datos.documento, datos.nombreUsuario, datos.nombreUsuario, datos.nombre, datos.telefono,
                datos.idArea, datos.correo, datos.idRol, datos.especialidad, datos.registroMedico, datos.licencia,
                datos.tarjetaProfesional, fileImg, datos.estado, datos.idSede, datos.respondeReintegro, datos.respondeVentanillaUnica);

            const result = await InsertUser(DataToInsert);
            if (result.status === 200) {
                if (result.data.message === "") {
                    setFileImg(null);
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
        <MainCard title="Registrar información del usuario">
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={4}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
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
                            type="number"
                            defaultValue=""
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
                            defaultValue=""
                            name="nombre"
                            label="Nombres"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.nombre}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <FormProvider {...methods}>
                        <InputText
                            type="number"
                            defaultValue=""
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
                            defaultValue=""
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
                            defaultValue=""
                            options={lsRolUser}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.idRol}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <FormProvider {...methods}>
                        <InputSelect
                            name="especialidad"
                            label="Especialidad"
                            defaultValue={null}
                            options={lsEspecialidad}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.especialidad}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
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

                <Grid item xs={12} md={6} lg={4}>
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

                <Grid item xs={12} md={6} lg={4}>
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

                <Grid item xs={12} md={6} lg={4}>
                    <FormProvider {...methods}>
                        <InputSelect
                            name="idSede"
                            label="Sede de atención"
                            defaultValue={null}
                            options={lsSedeUser}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.idSede}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <FormProvider {...methods}>
                        <InputSelect
                            name="idArea"
                            label="Area"
                            defaultValue={null}
                            options={lsArea}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.idArea}
                        />
                    </FormProvider>
                </Grid>

                <FormProvider {...methods}>
                    <Grid item xs={12} md={6} lg={4}>
                        <InputCheckBox
                            name="estado"
                            defaultValue={true}
                            label={`Estado Usuario: ${values.estado ? "Activo" : "Inactivo"}`}
                            size={30}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputCheckBox
                            name="respondeReintegro"
                            defaultValue={false}
                            label="¿Este usuario responde ordenes de reintegro?"
                            size={30}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputCheckBox
                            name="respondeVentanillaUnica"
                            defaultValue={false}
                            label="¿Este usuario responde ventanilla única?"
                            size={30}
                        />
                    </Grid>
                </FormProvider>

                <Grid item xs={12} md={6} lg={4}>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <Button size="large" variant="contained" component="label" startIcon={<EditIcon fontSize="large" />}>
                                Subir firma
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
    );
};

export default User;