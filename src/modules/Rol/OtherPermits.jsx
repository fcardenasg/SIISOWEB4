import { Button, Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import {
    DeleteSubCardMenu,
    GetByIdRol,
    GetComboCardItem,
    GetComboComponente,
    GetComboItemMenu,
    GetComboSubCard,
    GetSubCardMenu,
    InsertSubCardMenu
} from "api/clients/RolClient";
import { ParamDelete } from "components/alert/AlertAll";
import { AccionMenu, Message, Modulo, ValidationMessage } from "components/helpers/Enums";
import { UpperFirstChar } from "components/helpers/Format";
import InputCheck from "components/input/InputCheck";
import InputSelect from "components/input/InputSelect";
import Cargando from "components/loading/Cargando";
import ValidateActionSkeleton from "components/ValidateAction/ValidateActionSkeleton";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import MainCard from "ui-component/cards/MainCard";
import AnimateButton from "ui-component/extended/AnimateButton";
import * as yup from 'yup';
import SubCard from "../../ui-component/cards/SubCard";
import ListDetailOther from "./ListDetailOther";

const validationSchema = yup.object().shape({
    componente: yup.string().required(ValidationMessage.Requerido),
    item: yup.string().required(ValidationMessage.Requerido),
    card: yup.string().required(ValidationMessage.Requerido),
    idSubCard: yup.string().required(ValidationMessage.Requerido),
});

const OtherPermits = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, formState: { errors }, reset, resetField, setValue } = methods;

    const [rol, setRol] = useState({});
    const [estadoPermiso, setEstadoPermiso] = useState(true);
    const [lsSubCardMenu, setLsSubCardMenu] = useState([]);
    const [lsComponente, setLsComponente] = useState([]);
    const [lsItemMenu, setLsItemMenu] = useState([]);
    const [lsCardItem, setLsCardItem] = useState([]);
    const [lsSubCardItem, setLsSubCardItem] = useState([]);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        async function getAll() {
            try {
                const serviceRol = await GetByIdRol(id);
                setRol(serviceRol.data);

                const lsServer = await GetComboComponente();
                setLsComponente(lsServer.data);
            } catch (error) { }
        }

        getAll();

        const timer = setTimeout(() => {
            setShowContent(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    async function getSubCardMenu() {
        try {
            const lsServer = await GetSubCardMenu(id, false);
            if (lsServer.data.exito)
                setLsSubCardMenu(lsServer.data.datos);
        } catch (error) { }
    }

    useEffect(() => {
        getSubCardMenu();
    }, [id]);

    const handleChangeComponente = async (event) => {
        try {
            setLsItemMenu([]);
            setLsCardItem([]);
            setLsSubCardItem([]);
            resetField("item");
            resetField("card");
            resetField("idSubCard");

            const idComponente = event.target.value;
            setValue("componente", Number(idComponente));
            const lsServe = await GetComboItemMenu([idComponente]);
            setLsItemMenu(lsServe.data);
        } catch (error) { }
    };

    const handleChangeItem = async (event) => {
        try {
            setLsCardItem([]);
            setLsSubCardItem([]);
            resetField("card");
            resetField("idSubCard");

            const idItemMenu = event.target.value;
            setValue("item", Number(idItemMenu));
            const lsServe = await GetComboCardItem([idItemMenu]);
            setLsCardItem(lsServe.data);
        } catch (error) { }
    };

    const handleChangeCard = async (event) => {
        try {
            setLsSubCardItem([]);
            resetField("idSubCard");

            const idCardItem = event.target.value;
            setValue("card", Number(idCardItem));
            const lsServe = await GetComboSubCard(Number(idCardItem));
            setLsSubCardItem(lsServe.data);
        } catch (error) { }
    };

    const handleClick = async (datos) => {
        try {
            datos.idRol = id;
            datos.estado = estadoPermiso;

            const lsServer = await InsertSubCardMenu(datos);
            if (lsServer.data.exito) {
                toast.success(lsServer.data.mensaje);
                getSubCardMenu();
                reset();
            } else
                toast.error(lsServer.data.mensaje);
        } catch (error) {
            toast.error(Message.RegistroNoGuardado);
        }
    };

    const handleDelete = async (id) => {
        try {
            swal(ParamDelete).then(async (willDelete) => {
                if (willDelete) {
                    const result = await DeleteSubCardMenu(id);
                    if (result.data.exito) {
                        toast.success("Diagnóstico eliminado de la lista correctamente");
                        getSubCardMenu();
                    } else {
                        toast.error(result.data.mensaje);
                    }
                }
            });
        } catch (error) {
            toast.error(Message.RegistroNoEliminado);
        }
    };

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.Rol}>
            <FormProvider {...methods}>
                <MainCard title={<Typography variant="h4">Registrar otros permisos - Rol: {UpperFirstChar(rol?.nombreRol)}</Typography>}>
                    {showContent ? (
                        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                            <Grid item xs={12} md={6} lg={4}>
                                <InputSelect
                                    defaultValue=""
                                    onChange={handleChangeComponente}
                                    name="componente"
                                    label="Componente"
                                    options={lsComponente}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.componente}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <InputSelect
                                    defaultValue=""
                                    onChange={handleChangeItem}
                                    name="item"
                                    label="Item"
                                    options={lsItemMenu}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.item}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <InputSelect
                                    defaultValue=""
                                    onChange={handleChangeCard}
                                    name="card"
                                    label="Card"
                                    options={lsCardItem}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.card}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <InputSelect
                                    defaultValue=""
                                    name="idSubCard"
                                    label="SubCard"
                                    options={lsSubCardItem}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.idSubCard}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <InputCheck
                                    label={`Estado Del Permiso: ${estadoPermiso ? 'Activo' : 'Inactivo'}`}
                                    onChange={(e) => setEstadoPermiso(e.target.checked)}
                                    checked={estadoPermiso}
                                    size={matchesXS ? 25 : 30}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <AnimateButton>
                                    <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)} startIcon={<AddIcon />}>
                                        Agregar
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={12}><Divider sx={{ my: 1 }} /></Grid>

                            <Grid item xs={12} sx={{ mb: 2 }}>
                                <SubCard content={false}>
                                    <ListDetailOther lsData={lsSubCardMenu} handleDelete={handleDelete} />
                                </SubCard>
                            </Grid>

                            <Grid item xs={6} md={5} sx={{ display: 'flex', gap: 2 }}>
                                <AnimateButton>
                                    <Button variant="outlined" fullWidth onClick={() => navigate(`/rol/update/${id}`)}>
                                        Regresar al rol
                                    </Button>
                                </AnimateButton>

                                <AnimateButton>
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/rol/list")}>
                                        Regresar a la lista
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    ) : (
                        <Cargando />
                    )}
                </MainCard>
            </FormProvider>
        </ValidateActionSkeleton>
    );
}

export default OtherPermits;