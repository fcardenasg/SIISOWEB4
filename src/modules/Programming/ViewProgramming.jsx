import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Card, CardContent, CardMedia, Chip, Divider, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MessageDelete, ParamDelete } from 'components/alert/AlertAll';
import { GetEdad, ViewFormat } from 'components/helpers/Format';
import swal from 'sweetalert';

import { IconCircleMinus, IconEye } from '@tabler/icons';
import { DeleteAttention, UpdateEstadoRegistroAtencion } from 'api/clients/AttentionClient';
import { MessageSuccess } from 'components/alert/AlertAll';
import { DefaultValue } from 'components/helpers/Enums';
import useAuth from 'hooks/useAuth';
import { gridSpacing } from 'store/constant';
import { ColorDrummondltd } from 'themes/colors';
import Avatar from 'ui-component/extended/Avatar';
import ChipControl from 'ui-component/extended/Chip';
import MenuOptions from './MenuOptions';
import { HtmlTooltip } from 'components/label/HtmlTooltip';

const ViewProgramming = ({ programming, getAll }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();

    const [openSuccess, setOpenSuccess] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);

    useEffect(() => {
        const handleDisabledButton = () => {
            try {
                if (programming?.estadoPac === DefaultValue.ATENCION_ESTASIENDOATENDIDO && programming?.usuarioCierreAtencion === user?.nameuser) {
                    setDisabledButton(false);
                } else if (programming?.estadoPac === DefaultValue.ATENCION_PENDIENTE_ATENDIDO) {
                    setDisabledButton(false);
                } else if (programming?.estadoPac === DefaultValue.ATENCION_ESTASIENDOATENDIDO) {
                    setDisabledButton(true);
                } else if (programming?.estadoPac === DefaultValue.ATENCION_ATENDIDO) {
                    setDisabledButton(true);
                }
            } catch (error) { }
        };

        handleDisabledButton();
    }, [programming, user?.nameuser]);

    const handleUpdateAttention = async () => {
        try {
            const DataToUpdate = {
                id: programming?.id,
                estadoPac: DefaultValue.ATENCION_PENDIENTE_ATENDIDO,
                usuario: ""
            };

            const result = await UpdateEstadoRegistroAtencion(DataToUpdate);
            if (result.status === 200) {
                setOpenSuccess(true);
                setAnchorEl(null);
                getAll();
            }
        } catch (error) { }
    };

    const handleUpdateAttentionOpen = async () => {
        try {
            const DataToUpdate = {
                id: programming?.id,
                estadoPac: DefaultValue.ATENCION_ESTASIENDOATENDIDO,
                usuario: user?.nameuser
            };
            await UpdateEstadoRegistroAtencion(DataToUpdate);
        } catch (error) { }
    };

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
                atencion !== DefaultValue.TIPO_ATENCION_ASESORIAS_PSICO &&
                atencion !== DefaultValue.TIPO_ATENCION_ASESORIAS_MEDICA)
                navigate(`/programming/other/${programming?.id}`);

            if (tipoAtencion === DefaultValue.TIPO_ATENCION_ATENCIONMEDICA &&
                estadoCaso === DefaultValue.TIPO_ATENCION_ATENCIONMEDICA_NUEVO)
                navigate(`/programming/attention-new/${programming?.id}`);

            if (tipoAtencion === DefaultValue.TIPO_ATENCION_ATENCIONMEDICA &&
                estadoCaso === DefaultValue.TIPO_ATENCION_ATENCIONMEDICA_CONTROL)
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
    };

    const handleSound = (nombre, atencion) => {
        let mensaje = new SpeechSynthesisUtterance();
        mensaje.text = `${nombre} pasar al consultorio 3 ${atencion}`;

        var agnesIndex = speechSynthesis.getVoices().findIndex(function (voice) {
            return voice.name;
        });
        speechSynthesis.speak(mensaje);
    };

    const ColorCard = programming?.nameAtencion === 'TRIAGE I' ? ColorDrummondltd.RedDrummond :
        programming?.nameAtencion === 'TRIAGE II' ? ColorDrummondltd.OrangeDrummond :
            programming?.nameTipoAtencion === 'ENFERMERIA' ? ColorDrummondltd.BlueDrummond :
                programming?.nameTipoAtencion === 'ASESORIAS' ? ColorDrummondltd.GreenDrummond :
                    programming?.nameTipoAtencion === 'EMO' ? ColorDrummondltd.GrayDrummond :
                        programming?.nameAtencion === 'TRIAGE III' ? ColorDrummondltd.YellowDrummond :
                            programming?.nameAtencion === 'TRIAGE IV' ? ColorDrummondltd.GreenDrummond :
                                programming?.nameAtencion === 'TRIAGE V' ? ColorDrummondltd.BlueDrummond : ColorDrummondltd.GrayDrummond;

    const ChipColor = programming?.estadoPac === 'PENDIENTE POR ATENCIÓN' ? "info" :
        programming?.estadoPac === 'ESTÁ SIENDO ATENDIDO' ? "error" :
            programming?.estadoPac === 'ATENDIDO' ? "success" : "gray";

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

            <CardMedia component="div" sx={{ height: '90px', backgroundColor: ColorCard, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Grid direction="row" container spacing={0.5} alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
                    <Grid item xs sx={{ ml: 8.5, textAlign: 'center' }}>
                        {programming?.descripcionAtencion ?
                            <HtmlTooltip
                                title={
                                    <Card sx={{ p: 2 }}>
                                        <Typography color="inherit">{programming?.nameAtencion}</Typography>
                                        <em>{programming?.descripcionAtencion}</em>
                                    </Card>
                                }
                            >
                                <Chip
                                    label={
                                        <Typography variant="h6" sx={{ color: 'black' }}>
                                            {programming?.nameAtencion}
                                        </Typography>
                                    }
                                    sx={{ cursor: 'pointer', backgroundColor: theme.palette.grey[100] }}
                                />
                            </HtmlTooltip> :

                            <Typography variant="h6" sx={{ color: ColorCard === ColorDrummondltd.YellowDrummond ? 'black' : 'white' }}>
                                {programming?.nameAtencion}
                            </Typography>
                        }
                    </Grid>

                    <Grid item xs={3} sx={{ textAlign: 'right' }}>
                        <MenuOptions
                            setAnchorEl={setAnchorEl}
                            anchorEl={anchorEl}
                            onClickEnable={handleUpdateAttention}
                            onClickTurno={() => handleSound(programming?.nameEmpleado, programming?.nameAtencion)}
                            sx={{ width: 'auto', height: 'auto', mr: 2, mt: 0, color: 'white' }}
                        />
                    </Grid>
                </Grid>
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
                                <Typography fontSize={12}><b>C.C. {programming?.documento}</b></Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Box height={30}>
                                    <Typography fontSize={12}><b>{programming?.nameEmpleado}</b></Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12}><Divider /></Grid>

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
                                <ChipControl
                                    size="small"
                                    label={programming?.estadoPac}
                                    chipcolor={ChipColor}
                                    sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Box height={20}>
                                    <Typography fontSize={10}>{programming?.usuarioCierreAtencion}</Typography>
                                </Box>
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
                                <Typography variant="h6"><b>TURNO / GRUPO:</b> </Typography>
                                <Typography variant="h6" noWrap>{`${programming?.nameTurno} / ${programming?.nameGrupo}`}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="h6"><b>FECHA / HORA:</b> </Typography>
                                <Typography variant="h6">{new Date(programming?.fechaRegistro).toLocaleString()}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Button disabled={disabledButton} variant="outlined" onClick={handleClick} fullWidth startIcon={<IconEye />}>
                            Atender
                        </Button>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Button disabled={disabledButton} variant="outlined" color="error" onClick={() => onClickDelete(programming?.id)} fullWidth startIcon={<IconCircleMinus />}>
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
