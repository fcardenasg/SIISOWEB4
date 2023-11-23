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
import { useState } from "react";
import { MessageError, MessageSuccess } from "components/alert/AlertAll";
import InputSelect from "components/input/InputSelect";
import { ArrayMeses } from "components/Arrays";
import ListAnio from "./ListAnio";
import { GetAllHeadcountByAnio, InsertHeadcount } from "api/clients/HeadcountClient";

const validationSchema = yup.object().shape({
    mes: yup.string().required(ValidationMessage.Requerido),
    cantidad: yup.string().required(ValidationMessage.Requerido),
    anio: yup.string().length(4, 'El año debe tener 4 dígitos').required(ValidationMessage.Requerido),
});

const Headcount = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const methods = useForm({ resolver: yupResolver(validationSchema) });

    const [idHeadcount, setIdHeadcount] = useState(0);
    const [lsHeadcount, setLsHeadcount] = useState([]);
    const [rows, setRows] = useState([]);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { handleSubmit, formState: { errors }, reset } = methods;

    async function getAll() {
        try {
            const lsServer = await GetAllHeadcountByAnio(idHeadcount);
            setLsHeadcount(lsServer.data);
            setRows(lsServer.data);
        } catch (error) { }
    }

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
                    setIdHeadcount(result.data);
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
        <SubCard title={<Typography variant="h4">Registrar Headcount</Typography>}>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={3}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
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
                            {TitleButton.Guardar}
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
                    {idHeadcount === 0 ? null : <ListAnio idAnio={idHeadcount} getAll={getAll} setLsHeadcount={setLsHeadcount} lsHeadcount={lsHeadcount} rows={rows} />}
                </Grid>
            </Grid>
        </SubCard>
    );
}

export default Headcount;