import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import swal from 'sweetalert';
import { MessageDelete, ParamDelete } from 'components/alert/AlertAll';
import { GetEdad, ViewFormat } from 'components/helpers/Format';
import { useTheme } from '@mui/material/styles';
import { Button, Card, CardContent, CardMedia, Chip, Grid, Typography } from '@mui/material';

import { DeleteAttention, UpdateEstadoRegistroAtencion } from 'api/clients/AttentionClient';
import { MessageSuccess } from 'components/alert/AlertAll';
import { ColorDrummondltd } from 'themes/colors';
import Avatar from 'ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';
import { IconEye, IconCircleMinus } from '@tabler/icons';
import { DefaultValue } from 'components/helpers/Enums';
import MenuOptions from './MenuOptions';
import useAuth from 'hooks/useAuth';

const ViewProgramming = ({ programming, getAll }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();

    const [openSuccess, setOpenSuccess] = useState(false);
    const [disabledButon, setDisabledButon] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);

    const handleUpdateAttention = async () => {
        try {
            const DataToUpdate = {
                id: programming?.id,
                estadoPac: DefaultValue.ATENCION_PENDIENTE_ATENDIDO,
                usuario: ""
            }

            const result = await UpdateEstadoRegistroAtencion(DataToUpdate);
            if (result.status === 200) {
                setOpenSuccess(true);
                setAnchorEl(null);
                getAll();
            }
        } catch (error) { }
    }

    const handleUpdateAttentionOpen = async () => {
        try {
            const DataToUpdate = {
                id: programming?.id,
                estadoPac: DefaultValue.ATENCION_ESTASIENDOATENDIDO,
                usuario: user?.nameuser
            }
            await UpdateEstadoRegistroAtencion(DataToUpdate);
        } catch (error) { }
    }

    const onClickDelete = async (id) => {
        try {
            swal(ParamDelete).then(async (willDelete) => {
                if (willDelete) {
                    const result = await DeleteAttention(id);
                    if (result.status === 200) {
                        setOpenDelete(true);
                        getAll();
                    }
                }
            });
        } catch (error) { }
    };

    const handleClick = () => {
        try {
            const tipoAtencion = programming?.tipo;
            const atencion = programming?.atencion;
            const estadoCaso = programming?.estadoCaso;
            const triage = atencion === DefaultValue.TRIAGE_I || atencion === DefaultValue.TRIAGE_II ||
                atencion === DefaultValue.TRIAGE_III || atencion === DefaultValue.TRIAGE_VI || atencion === DefaultValue.TRIAGE_V;

            handleUpdateAttentionOpen();

            if (tipoAtencion === DefaultValue.TIPO_ATENCION_EMO)
                navigate(`/programming/emo/${programming?.id}`);

            if (atencion === DefaultValue.TIPO_ATENCION_ASESORIAS_MEDICA)
                navigate(`/programming/medica/${programming?.id}`);

            if (atencion === DefaultValue.TIPO_ATENCION_ASESORIAS_PSICO)
                navigate(`/programming/psychological/${programming?.id}`);

            if (tipoAtencion === DefaultValue.TIPO_ATENCION_ASESORIAS &&
                atencion != DefaultValue.TIPO_ATENCION_ASESORIAS_PSICO &&
                atencion != DefaultValue.TIPO_ATENCION_ASESORIAS_MEDICA)
                navigate(`/programming/other/${programming?.id}`);

            if (tipoAtencion === DefaultValue.TIPO_ATENCION_ATENCIONMEDICA &&
                estadoCaso === DefaultValue.TIPO_ATENCION_ATENCIONMEDICA_NUEVO)
                navigate(`/programming/attention-new/${programming?.id}`);

            if (tipoAtencion === DefaultValue.TIPO_ATENCION_ATENCIONMEDICA &&
                estadoCaso == DefaultValue.TIPO_ATENCION_ATENCIONMEDICA_CONTROL)
                navigate(`/programming/attention-control/${programming?.id}`);

            if (tipoAtencion === DefaultValue.TIPO_ATENCION_ENFERMERIA &&
                atencion === DefaultValue.ATENCION_ENFERMERIA)
                navigate(`/programming/infirmary/${programming?.id}`);

            if (programming?.sede === DefaultValue.SEDE_PUERTO &&
                tipoAtencion === DefaultValue.TIPO_ATENCION_ENFERMERIA && triage)
                navigate(`/programming/infirmary/${programming?.id}`);

            if (tipoAtencion === DefaultValue.TIPO_ATENCION_ENFERMERIA &&
                atencion === DefaultValue.ATENCION_PRUEBA_ALCOHOL)
                navigate(`/programming/alcoholanddrugtesting/${programming?.id}`);
        } catch (error) { }
    }

    const handleSound = (nombre, atencion) => {
        let mensaje = new SpeechSynthesisUtterance();
        mensaje.text = `${nombre} pasar al consultorio 3 ${atencion}`;

        var agnesIndex = speechSynthesis.getVoices().findIndex(function (voice) {
            return voice.name;
        });
        speechSynthesis.speak(mensaje);
    }

    useEffect(() => {
        const handleDisabledButon = () => {
            try {
                if (programming?.estadoPac === DefaultValue.ATENCION_ESTASIENDOATENDIDO && programming?.usuarioCierreAtencion === user.nameuser) {
                    setDisabledButon(false);
                } else if (programming?.estadoPac === DefaultValue.ATENCION_PENDIENTE_ATENDIDO) {
                    setDisabledButon(false);
                } else if (programming?.estadoPac === DefaultValue.ATENCION_ESTASIENDOATENDIDO) {
                    setDisabledButon(true);
                } else if (programming?.estadoPac === DefaultValue.ATENCION_ATENDIDO) {
                    setDisabledButon(true);
                }
            } catch (error) { }
        }

        handleDisabledButon();
    }, []);

    const ColorCard = programming?.nameAtencion === 'TRIAGE I' ? ColorDrummondltd.RedDrummond :
        programming?.nameAtencion === 'TRIAGE II' ? ColorDrummondltd.RedDrummond :
            programming?.nameTipoAtencion === 'ENFERMERIA' ? ColorDrummondltd.BlueDrummond :
                programming?.nameTipoAtencion === 'ASESORIAS' ? ColorDrummondltd.GreenDrummond :
                    programming?.nameTipoAtencion === 'EMO' ? ColorDrummondltd.GrayDrummond :
                        programming?.nameAtencion === 'TRIAGE III' ? ColorDrummondltd.YellowSeDrummond : ColorDrummondltd.GrayDrummond;

    const ChipColor = programming?.estadoPac === 'PENDIENTE POR ATENCIÓN' ? ColorDrummondltd.BlueDrummond :
        programming?.estadoPac === 'ESTÁ SIENDO ATENDIDO' ? ColorDrummondltd.RedDrummond :
            programming?.estadoPac === 'ATENDIDO' ? ColorDrummondltd.GreenDrummond : ColorDrummondltd.GrayDrummond;

    return (
        <Card
            sx={{
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[100],
                border: theme.palette.mode === 'dark' ? 'none' : '2px solid',
                borderColor: theme.palette.grey[500],
                textAlign: 'center'
            }}
        >
            <MessageDelete open={openDelete} onClose={() => setOpenDelete(false)} />
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />

            <CardMedia component="div" title="Atención" sx={{ height: '90px', bgcolor: ColorCard }}>
                <Typography variant="h6" sx={{
                    pt: programming?.nameAtencion === 'PRUEBAS DE ALCOHOL Y DROGAS' ?
                        1.5 : 3, color: 'white'
                }}>{programming?.nameAtencion}</Typography>
            </CardMedia>

            <CardContent sx={{ p: 2, pb: '16px !important' }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Avatar alt={programming?.nameEmpleado} src={programming?.empleadoFoto === undefined ? null :
                                    programming?.empleadoFoto === '' ? null : programming?.empleadoFoto} sx={{ width: 60, height: 60, m: '-50px auto 0' }} />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} alignItems="center">
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={9}>
                                        <Typography fontSize={12}><b>{programming?.nameEmpleado} - {programming?.documento}</b></Typography>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <MenuOptions
                                            setAnchorEl={setAnchorEl}
                                            anchorEl={anchorEl}
                                            onClickEnable={handleUpdateAttention}
                                            onClickTurno={() => handleSound(programming?.nameEmpleado,
                                                programming?.nameAtencion)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} alignItems="center">
                                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid item xs={6}>
                                        <Typography variant="h6">{programming?.nameGenero}</Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Typography variant="h6">{GetEdad(programming?.fechaNacimi)} AÑOS</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Chip
                                    label={programming?.estadoPac}
                                    size="small"
                                    sx={{
                                        bgcolor: ChipColor,
                                        color: 'white'
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography fontSize={10}>{programming?.usuarioCierreAtencion}</Typography>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Typography variant="h6"><b>FECHA:</b> </Typography>
                                <Typography variant="h6">{ViewFormat(programming?.fecha)}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="h6"><b>SEDE:</b> </Typography>
                                <Typography variant="h6">{programming?.nameSedeAtencion}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="h6"><b>Turno/Grupo:</b> </Typography>
                                <Typography variant="h6" noWrap>{`${programming?.nameTurno} / ${programming?.nameGrupo}`}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="h6"><b>Fecha/Hora:</b> </Typography>
                                <Typography variant="h6">{new Date(programming?.fechaRegistro).toLocaleString()}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Button disabled={disabledButon} variant="outlined" onClick={handleClick} fullWidth startIcon={<IconEye />}>
                            Atender
                        </Button>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Button disabled={disabledButon} variant="outlined" color="error" onClick={() => onClickDelete(programming?.id)} fullWidth startIcon={<IconCircleMinus />}>
                            Anular
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

ViewProgramming.propTypes = {
    programming: PropTypes.object,
    onClickDelete: PropTypes.object
};

export default ViewProgramming;