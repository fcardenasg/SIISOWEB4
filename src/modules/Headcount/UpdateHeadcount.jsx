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
import { Fragment, useState } from "react";
import { MessageError, MessageSuccess } from "components/alert/AlertAll";
import InputSelect from "components/input/InputSelect";
import { ArrayMeses } from "components/Arrays";
import ListAnio from "./ListAnio";
import { GetAllHeadcountByAnio, InsertHeadcount } from "api/clients/HeadcountClient";
import { useEffect } from "react";

const validationSchema = yup.object().shape({
    mes: yup.string().required(ValidationMessage.Requerido),
    cantidad: yup.string().required(ValidationMessage.Requerido),
    anio: yup.string().length(4, 'El año debe tener 4 dígitos').required(ValidationMessage.Requerido),
});

const UpdateHeadcount = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const methods = useForm({ resolver: yupResolver(validationSchema) });

    const [lsHeadcount, setLsHeadcount] = useState([]);
    const [rows, setRows] = useState([]);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { handleSubmit, formState: { errors } } = methods;

    async function getAll() {
        try {
            const lsServer = await GetAllHeadcountByAnio(id);
            setLsHeadcount(lsServer.data);
            setRows(lsServer.data);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, []);

    const handleClick = async (datos) => {
        try {
            const DataToInsert = {
                anio: datos.anio,
                mes: datos.mes,
                cantidad: datos.cantidad,
                usuarioRegistro: user.nameuser
            };

            const result = await InsertHeadcount(DataToInsert);
            if (result.status === 200) {
                if (!isNaN(result.data)) {
                    setOpenSuccess(true);
                    getAll();
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
        <SubCard title={<Typography variant="h4">Actualizar Headcount - Año {id}</Typography>}>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={3}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue={id}
                            type="number"
                            name="anio"
                            label="Año"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.anio}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <FormProvider {...methods}>
                        <InputSelect
                            name="mes"
                            label="Mes"
                            defaultValue=""
                            options={ArrayMeses}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.mes}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            type="number"
                            name="cantidad"
                            label="Cantidad"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.cantidad}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={6} md={4} lg={1.5}>
                    <AnimateButton>
                        <Button size={matchesXS ? 'small' : 'large'} variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                            {TitleButton.AgregarOrden}
                        </Button>
                    </AnimateButton>
                </Grid>

                <Grid item xs={6} md={4} lg={1.5}>
                    <AnimateButton>
                        <Button size={matchesXS ? 'small' : 'large'} variant="outlined" fullWidth onClick={() => navigate("/headcount/list")}>
                            {TitleButton.Cancelar}
                        </Button>
                    </AnimateButton>
                </Grid>

                <Grid item xs={12}>
                    <ListAnio idAnio={id} getAll={getAll} setLsHeadcount={setLsHeadcount} lsHeadcount={lsHeadcount} rows={rows} />
                </Grid>
            </Grid>
        </SubCard>
    );
}

export default UpdateHeadcount;