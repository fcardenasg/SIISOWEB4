import { Button, Grid, Typography, useMediaQuery } from "@mui/material";
import SubCard from "ui-component/cards/SubCard";
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
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
import InputMultiSelectCheck from "components/input/InputMultiSelectCheck";
import { GetByListMenuRol, GetComboCardItem, GetComboComponente, GetComboItemMenu, InsertRol } from "api/clients/RolClient";
import InputCheck from "components/input/InputCheck";
import { MessageError, MessageSuccess } from "components/alert/AlertAll";

const validationSchema = yup.object().shape({
    nombreRol: yup.string().required(ValidationMessage.Requerido),
});

const Rol = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const methods = useForm({ resolver: yupResolver(validationSchema) });

    const [idRol, setIdRol] = useState(0);
    const [valueCompo, setValueCompo] = useState({ labelComponente: [], valueComponente: [] });
    const [valueItem, setValueItem] = useState({ labelItemMenu: [], valueItemMenu: [] });
    const [valueCard, setValueCard] = useState({ labelCardItem: [], valueCardItem: [] });

    const [lsPermisos, setLsPermisos] = useState([]);
    const [rows, setRows] = useState([]);

    const [lsComponente, setLsComponente] = useState([]);
    const [lsItemMenu, setLsItemMenu] = useState([]);
    const [lsCardItem, setLsCardItem] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { handleSubmit, formState: { errors }, reset } = methods;

    async function getAll() {
        try {
            const lsServer = await GetByListMenuRol(idRol);
            setLsPermisos(lsServer.data);
            setRows(lsServer.data);
        } catch (error) { }
    }

    useEffect(() => {
        async function getAll() {
            try {
                const lsServer = await GetComboComponente();
                setLsComponente(lsServer.data);
            } catch (error) { }
        }

        getAll();
    }, []);

    const handleChangeCompo = async (event) => {
        try {
            const {
                target: { value },
            } = event;

            const lsIdComponente = [];
            var lsComponenteFilter = lsComponente;

            value.forEach(xValue => {
                var idComponente = lsComponenteFilter.filter(x => x.label === xValue)[0].value;
                lsIdComponente.push(idComponente);
            });

            setValueCompo({ valueCompo: lsIdComponente, labelComponente: typeof value === 'string' ? value.split(',') : value });

            const lsServe = await GetComboItemMenu(lsIdComponente);
            setLsItemMenu(lsServe.data);
        } catch (error) { }
    };

    const handleChangeItem = async (event) => {
        try {
            const {
                target: { value },
            } = event;

            const lsIdItemMenu = [];
            var lsItemMenuFilter = lsItemMenu;
            
            value.forEach(xValue => {
                var idComponente = lsItemMenuFilter.filter(x => x.label === xValue)[0].value;
                lsIdItemMenu.push(idComponente);
            });

            setValueItem({ valueItemMenu: lsIdItemMenu, labelItemMenu: typeof value === 'string' ? value.split(',') : value });

            const lsServe = await GetComboCardItem(lsIdItemMenu);
            setLsCardItem(lsServe.data);
        } catch (error) { }
    };

    const handleChangeCard = (event) => {
        try {
            const {
                target: { value },
            } = event;

            const lsIdItemMenu = [];
            var lsCardItemFilter = lsCardItem;
            value.forEach(xValue => {
                var idItemMenu = lsCardItemFilter.filter(x => x.label === xValue).map(dataMap => ({ idCard: dataMap.value, idItem: parseInt(dataMap.codigo) }));
                lsIdItemMenu.push(idItemMenu[0]);
            });

            setValueCard({ valueCardItem: lsIdItemMenu, labelCardItem: typeof value === 'string' ? value.split(',') : value });
        } catch (error) { }
    };

    const handleChangeIsAdmin = (event) => {
        try {
            setIsAdmin(event.target.checked);
            setValueCompo({ labelComponente: [], valueComponente: [] });
            setValueItem({ labelItemMenu: [], valueItemMenu: [] });
            setValueCard({ labelCardItem: [], valueCardItem: [] });
            setLsItemMenu([]);
            setLsCardItem([]);
        } catch (error) { }
    };

    const handleClick = async (datos) => {
        try {
            const DataToInsert = {
                nombreRol: datos.nombreRol,
                lsItemMenu_CardItem: valueCard.valueCardItem,
                usuarioRegistro: user.nameuser,
                isPermiso: false,
                isAdmin: isAdmin
            };

            const result = await InsertRol(DataToInsert);
            if (result.status === 200) {
                if (!isNaN(result.data)) {
                    setOpenSuccess(true);
                    setIsAdmin(false);
                    setValueCompo({ labelComponente: [], valueComponente: [] });
                    setValueItem({ labelItemMenu: [], valueItemMenu: [] });
                    setValueCard({ labelCardItem: [], valueCardItem: [] });
                    setLsItemMenu([]);
                    setLsCardItem([]);

                    reset();
                    getAll();
                    setIdRol(result.data);
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
        <SubCard title={<Typography variant="h4">Registrar Rol</Typography>}>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container spacing={2}>
                <Grid item xs={7} lg={10}>
                    <FormProvider {...methods}>
                        <InputText
                            fullWidth
                            name="nombreRol"
                            label="Nombre Del Rol"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.nombreRol}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={5} lg={2}>
                    <InputCheck
                        label="¿Será Admin?"
                        onChange={handleChangeIsAdmin}
                        checked={isAdmin}
                        size={matchesXS ? 25 : 30}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputMultiSelectCheck
                        onChange={handleChangeCompo}
                        value={valueCompo.labelComponente}
                        label="Componente"
                        options={lsComponente}
                        size={matchesXS ? 'small' : 'medium'}
                        disabled={isAdmin}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputMultiSelectCheck
                        onChange={handleChangeItem}
                        value={valueItem.labelItemMenu}
                        label="Ìtem"
                        options={lsItemMenu}
                        size={matchesXS ? 'small' : 'medium'}
                        disabled={isAdmin}
                    />
                </Grid>

                <Grid item xs={12}>
                    <InputMultiSelectCheck
                        onChange={handleChangeCard}
                        value={valueCard.labelCardItem}
                        label="Card"
                        options={lsCardItem}
                        size={matchesXS ? 'small' : 'medium'}
                        disabled={isAdmin}
                    />
                </Grid>

                <Grid item xs={12}>
                    {idRol === 0 ? null : <ListaRol getAll={getAll} setLsPermisos={setLsPermisos} lsPermisos={lsPermisos} rows={rows} />}
                </Grid>

                <Grid item xs={12} sx={{ mt: 4 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4} lg={2}>
                            <AnimateButton>
                                <Button disabled={idRol === 0 ? false : true} variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                    {TitleButton.Guardar}
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
        </SubCard>
    );
}

export default Rol;