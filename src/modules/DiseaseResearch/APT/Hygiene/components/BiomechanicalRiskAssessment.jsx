import { yupResolver } from '@hookform/resolvers/yup';
import { AccessTime, Add, Close, Edit, ImageNotSupported, PhotoLibrary, PlaylistAddCheck } from '@mui/icons-material';
import {
    Backdrop,
    Box,
    Button,
    CardMedia,
    Chip,
    Divider,
    Fade,
    Grid,
    IconButton,
    Modal,
    Stack,
    Table, TableBody, TableCell,
    TableContainer, TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography
} from '@mui/material';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { CodCatalogo } from 'components/helpers/Enums';
import { UpperFirstChar } from 'components/helpers/Format';
import InputCheckBox from 'components/input/InputCheckBox';
import InputRadioGroup from 'components/input/InputRadioGroup';
import InputText from 'components/input/InputText';
import { AnimatePresence, motion } from 'framer-motion';
import { Fragment, useEffect, useRef, useState } from 'react';
import { FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import SubCard from 'ui-component/cards/SubCard';
import * as yup from 'yup';

const schema = yup.object().shape({
    tipoTrabajo: yup.number().required('El tipo de trabajo es requerido'),
    observaciones: yup.string().required('Las observaciones son requeridas'),
    listPlano: yup.array().of(
        yup.object().shape({
            aplica: yup.boolean(),
            descripcion: yup.string().when('aplica', {
                is: true,
                then: () => yup.string().required('La descripción es requerida'),
                otherwise: () => yup.string(),
            }),
        })
    ),
});

const plano = ["Plano alto", "Plano medio", "Plano bajo"]

const BiomechanicalRiskAssessment = () => {
    const methods = useForm({ resolver: yupResolver(schema) });
    const { handleSubmit, reset, watch, setValue, formState: { errors } } = methods;

    return (
        <FormProvider {...methods}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4">Gasto metabólico estimado</Typography>
                </Grid>

                <Grid item xs={12}>
                    <InputRadioGroup row name="tipoTrabajo" options={[{ value: 1, label: "Trabajo liviano" }, { value: 2, label: "Trabajo moderado" }, { value: 3, label: "Trabajo pesado" }]} defaultValue="" />
                </Grid>

                <Grid item xs={12}>
                    <InputText name="observaciones" label="Observaciones" bug={errors.observaciones} multiline minRows={2} maxRows={4} />
                </Grid>

                <Grid item xs={12}><Divider /></Grid>

                <Grid item xs={12}>
                    <Typography variant="h4">Planos de trabajo</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                        {plano.map((item, index) => (
                            <Fragment key={index}>
                                <Grid item xs={1.5}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{item}</Typography>
                                </Grid>

                                <Grid item xs={1.5}>
                                    <InputCheckBox name={`listPlano.${index}.aplica`} label="Aplica" bug={errors.listPlano?.[index]?.aplica} defaultValue={false} />
                                </Grid>

                                <Grid item xs={9}>
                                    <InputText name={`listPlano.${index}.descripcion`} label="Descripción" bug={errors.listPlano?.[index]?.descripcion} />
                                </Grid>
                            </Fragment>
                        ))}
                    </Grid>
                </Grid>

                <Grid item xs={12}><Divider /></Grid>

                <Grid item xs={12}>
                    <InputText name="postura" label="Postura" bug={errors.postura} multiline minRows={2} maxRows={4} />
                </Grid>

                <Grid item xs={12}>
                    <InputText name="cargaFisica" label="Carga física" bug={errors.cargaFisica} multiline minRows={2} maxRows={4} />
                </Grid>

                <Grid item xs={12}>
                    <InputText name="movimientos" label="Movimientos" bug={errors.movimientos} multiline minRows={2} maxRows={4} />
                </Grid>

                <Grid item xs={12}>
                    <InputText name="fuerza" label="Fuerza" bug={errors.fuerza} multiline minRows={2} maxRows={4} />
                </Grid>

                <Grid item xs={12}>
                    <InputText name="vibracion" label="Vibración" bug={errors.vibracion} multiline minRows={2} maxRows={4} />
                </Grid>
            </Grid>
        </FormProvider>
    )
}

export default BiomechanicalRiskAssessment