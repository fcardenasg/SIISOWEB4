import { Grid, Typography } from "@mui/material";
import InputSelect from "components/input/InputSelect";
import InputText from "components/input/InputText";
import FileDropzone from "components/UploadDocument/FileDropzone";
import { useState } from "react";
import ImageListPreview from "./ImageListPreview";

export const OrganizationalAspects = () => {
    const [lsTurno, setLsTurno] = useState([]);
    const [lsRitmoTrabajo, setLsRitmoTrabajo] = useState([]);
    const [lsCategoria, setLsCategoria] = useState([]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
                <InputText
                    defaultValue=""
                    fullWidth
                    name="jornadaTrabajo"
                    label="Jornada de trabajo"
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="turno"
                    label="Turno"
                    defaultValue=""
                    options={lsTurno}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputText
                    defaultValue=""
                    fullWidth
                    name="rotaciones"
                    label="Rotaciones"
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="ritmoTrabajo"
                    label="Ritmo de trabajo"
                    defaultValue=""
                    options={lsRitmoTrabajo}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputText
                    defaultValue=""
                    fullWidth
                    name="descansos"
                    label="Descansos"
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="categoria"
                    label="Categoría"
                    defaultValue=""
                    options={lsCategoria}
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    defaultValue=""
                    fullWidth
                    multiline
                    minRows={1}
                    maxRows={3}
                    name="caracteristicasOrganizacionales"
                    label="Características"
                />
            </Grid>
        </Grid>
    )
}

export const JobDescription = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputText
                    defaultValue=""
                    fullWidth
                    name="caracteristicasDiseno"
                    label="Características de diseño"
                    multiline
                    minRows={2}
                    maxRows={5}
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    defaultValue=""
                    fullWidth
                    name="mobiliario"
                    label="Mobiliario"
                    multiline
                    minRows={2}
                    maxRows={5}
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    defaultValue=""
                    fullWidth
                    name="herramientasEquipos"
                    label="Herramientas y equipos"
                    multiline
                    minRows={2}
                    maxRows={5}
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    defaultValue=""
                    fullWidth
                    name="ayudasMecanicas"
                    label="Ayudas mecánicas"
                    multiline
                    minRows={2}
                    maxRows={5}
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    defaultValue=""
                    fullWidth
                    name="materiales"
                    label="Materiales"
                    multiline
                    minRows={2}
                    maxRows={5}
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    defaultValue=""
                    fullWidth
                    name="elementosConfort"
                    label="Elementos de confort"
                    multiline
                    minRows={2}
                    maxRows={5}
                />
            </Grid>
        </Grid>
    )
}

export const EnvironmentalAspects = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputText
                    defaultValue=""
                    fullWidth
                    name="acceso"
                    label="Acceso"
                    multiline
                    minRows={2}
                    maxRows={5}
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    defaultValue=""
                    fullWidth
                    name="iluminacion"
                    label="Iluminación"
                    multiline
                    minRows={2}
                    maxRows={5}
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    defaultValue=""
                    fullWidth
                    name="temperatura"
                    label="Temperatura"
                    multiline
                    minRows={2}
                    maxRows={5}
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    defaultValue=""
                    fullWidth
                    name="ruido"
                    label="Ruido"
                    multiline
                    minRows={2}
                    maxRows={5}
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    defaultValue=""
                    fullWidth
                    name="vibracion"
                    label="Vibración"
                    multiline
                    minRows={2}
                    maxRows={5}
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    defaultValue=""
                    fullWidth
                    name="epp"
                    label="EPP"
                    multiline
                    minRows={2}
                    maxRows={5}
                />
            </Grid>
        </Grid>
    )
}

export const WorkActivity = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputText
                    defaultValue=""
                    fullWidth
                    name="objetivoCargo"
                    label="Objetivo del cargo"
                    multiline
                    minRows={3}
                    maxRows={5}
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    defaultValue=""
                    fullWidth
                    name="descripcionGeneral"
                    label="Descripción general"
                    multiline
                    minRows={3}
                    maxRows={5}
                />
            </Grid>
        </Grid>
    )
}

export const WorkCycle = () => {
    return (
        <Grid container spacing={2}>
            {/* Content for Work Cycle */}
        </Grid>
    )
}

export const ActivityPercentageDistribution = () => {
    return (
        <Grid container spacing={2}>
            {/* Content for Activity Percentage Distribution */}
        </Grid>
    )
}

export const NonRoutineActivities = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputText
                    defaultValue=""
                    fullWidth
                    name="actividadesNoRutinarias"
                    label="Actividades no rutinarias"
                    multiline
                    minRows={3}
                    maxRows={5}
                />
            </Grid>
        </Grid>
    )
}

export const PhotographicRecord = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={5} sx={{ flexDirection: 'row', alignItems: 'center' }}>
                <InputText
                    defaultValue=""
                    fullWidth
                    name="actividadesNoRutinarias"
                    label="Titulo"
                    sx={{ mb: 2 }}
                />

                <FileDropzone name="listaArchivo" />
            </Grid>

            <Grid item xs={12} sm={7}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                    Imágenes Cargadas:
                </Typography>

                <ImageListPreview name="listaArchivo" />
            </Grid>
        </Grid>
    )
}