import { Button, Grid, Typography, useMediaQuery } from "@mui/material";
import SubCard from "ui-component/cards/SubCard";
import { useTheme } from '@mui/material/styles';
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { FormProvider, useForm } from "react-hook-form";
import InputText from "components/input/InputText";

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Message, TitleButton, ValidationMessage } from "components/helpers/Enums";
import AnimateButton from "ui-component/extended/AnimateButton";
import ListaRol from "./ListaRol";
import { useEffect } from "react";
import { useState } from "react";
import { GetByIdRol, GetByListMenuRol, GetComboCardItem, GetComboComponente, GetComboItemMenu, InsertRol } from "api/clients/RolClient";
import InputCheck from "components/input/InputCheck";
import { MessageError, MessageUpdate } from "components/alert/AlertAll";
import SelectOnChange from "components/input/SelectOnChange";
import { Fragment } from "react";
import Cargando from "components/loading/Cargando";

const validationSchema = yup.object().shape({
    nombreRol: yup.string().required(ValidationMessage.Requerido),
});

const UpdateRol = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const methods = useForm({ resolver: yupResolver(validationSchema) });

    const [valueComponente, setValueComponente] = useState('');
    const [valueItem, setValueItem] = useState('');
    const [valueCard, setValueCard] = useState('');
    const [estadoPermiso, setEstadoPermiso] = useState(true);

    const [lsPermisos, setLsPermisos] = useState([]);
    const [rows, setRows] = useState([]);

    const [dataRol, setDataRol] = useState([]);
    const [lsComponente, setLsComponente] = useState([]);
    const [lsItem, setLsItem] = useState([]);
    const [lsCard, setLsCard] = useState([]);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { handleSubmit, formState: { errors } } = methods;

    async function getAll() {
        try {
            const lsServer = await GetByListMenuRol(id);
            setLsPermisos(lsServer.data);
            setRows(lsServer.data);
        } catch (error) { }
    }

    useEffect(() => {
        async function getAll() {
            try {
                const lsServer = await GetComboComponente();
                setLsComponente(lsServer.data);

                const lsServerData = await GetByIdRol(id);
                if (lsServerData.status === 200) {
                    setDataRol(lsServerData.data);
                }
            } catch (error) { }
        }

        getAll();
    }, []);

    const handleChangeComponente = async (event) => {
        try {
            setValueItem(''); setValueCard(''); setLsItem([]); setLsCard([]);
            setValueComponente(event.target.value);

            var resultComponente = await GetComboItemMenu([event.target.value]);
            setLsItem(resultComponente.data);
        } catch (error) { }
    };

    const handleChangeItem = async (event) => {
        try {
            setValueCard('');
            setValueItem(event.target.value);
            var resultItem = await GetComboCardItem([event.target.value]);
            setLsCard(resultItem.data);
        } catch (error) { }
    };

    const handleClickPermisos = async () => {
        try {
            const DataToInsert = {
                id: 0,
                idRol: id,
                idItemMenu: valueItem,
                idCardItem: valueCard,
                estado: estadoPermiso,
                usuarioRegistro: user.nameuser,

                isPermiso: true
            };

            const result = await InsertRol(DataToInsert);
            if (result.status === 200) {
                if (!isNaN(result.data)) {
                    setOpenSuccess(true);
                    getAll();

                    setLsItem([]);
                    setLsCard([]);

                    setValueComponente('');
                    setValueItem('');
                    setValueCard('');

                    setEstadoPermiso(true);
                } else {
                    setOpenError(true);
                    setErrorMessage(result.data);
                }
            }

        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    const handleClick = async (datos) => {
        try {
            const DataToInsert = {
                id: id,
                nombreRol: datos.nombreRol,
                estado: estadoPermiso,
                usuarioModifico: user.nameuser,

                isPermiso: true
            };

            const result = await InsertRol(DataToInsert);
            if (result.status === 200) {
                if (!isNaN(result.data)) {
                    setOpenSuccess(true);
                } else {
                    setOpenError(true);
                    setErrorMessage(result.data);
                }
            }

        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <SubCard title={<Typography variant="h4">Actualizar Rol</Typography>}>
            {dataRol.length !== 0 ?
                <Fragment>
                    <MessageUpdate open={openSuccess} onClose={() => setOpenSuccess(false)} />
                    <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputText
                                    fullWidth
                                    defaultValue={dataRol.nombreRol}
                                    name="nombreRol"
                                    label="Nombre Del Rol"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.nombreRol}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard title={<Typography variant="h4">Gestión De Permisos</Typography>}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <SelectOnChange
                                            name="idComponentes"
                                            label="Componente"
                                            value={valueComponente}
                                            options={lsComponente}
                                            onChange={handleChangeComponente}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <SelectOnChange
                                            name="idItem"
                                            label="Ìtem"
                                            value={valueItem}
                                            options={lsItem}
                                            onChange={handleChangeItem}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <SelectOnChange
                                            disabled={lsCard.length === 0 ? true : false}
                                            name="idCard"
                                            label="Card"
                                            value={valueCard}
                                            options={lsCard}
                                            onChange={(e) => setValueCard(e.target.value)}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputCheck
                                            label={`Estado Del Permiso: ${estadoPermiso ? 'Activo' : 'Inactivo'}`}
                                            onChange={(e) => setEstadoPermiso(e.target.checked)}
                                            checked={estadoPermiso}
                                            size={matchesXS ? 25 : 30}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <AnimateButton>
                                            <Button variant="contained" fullWidth onClick={handleSubmit(handleClickPermisos)}>
                                                {TitleButton.AgregarOrden}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <ListaRol getAll={getAll} setLsPermisos={setLsPermisos} lsPermisos={lsPermisos} rows={rows} />
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 4 }}>
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
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/rol/list")}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Fragment> : <Cargando />
            }
        </SubCard>
    );
}

export default UpdateRol;