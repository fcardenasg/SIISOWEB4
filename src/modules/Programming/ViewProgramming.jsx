import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { GetEdad, ViewFormat } from 'components/helpers/Format';
import { useTheme } from '@mui/material/styles';
import { Button, Card, CardContent, CardMedia, Chip, Grid, Typography } from '@mui/material';

import { ColorDrummondltd } from 'themes/colors';
import Avatar from 'ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';
import { IconEye, IconCircleMinus } from '@tabler/icons';
import { DefaultValue } from 'components/helpers/Enums';

const ViewProgramming = ({ programming, onClickDelete }) => {
    const navigate = useNavigate();
    const theme = useTheme();

    const handleClick = () => {
        try {
            if (programming.tipo === DefaultValue.TIPO_ATENCION_EMO)
                navigate(`/programming/emo/${programming.id}`);

            if (programming.atencion === DefaultValue.TIPO_ATENCION_ASESORIAS_MEDICA)
                navigate(`/programming/medica/${programming.id}`);

            if (programming.atencion === DefaultValue.TIPO_ATENCION_ASESORIAS_PSICO)
                navigate(`/programming/psychological/${programming.id}`);

            if (programming.tipo === DefaultValue.TIPO_ATENCION_ASESORIAS &&
                programming.atencion != DefaultValue.TIPO_ATENCION_ASESORIAS_PSICO &&
                programming.atencion != DefaultValue.TIPO_ATENCION_ASESORIAS_MEDICA)
                navigate(`/programming/other/${programming.id}`);

            if (programming.tipo === DefaultValue.TIPO_ATENCION_ATENCIONMEDICA &&
                programming.estadoCaso == DefaultValue.TIPO_ATENCION_ATENCIONMEDICA_NUEVO)
                navigate(`/programming/attention-new/${programming.id}`);

            if (programming.tipo === DefaultValue.TIPO_ATENCION_ATENCIONMEDICA &&
                programming.estadoCaso == DefaultValue.TIPO_ATENCION_ATENCIONMEDICA_CONTROL)
                navigate(`/programming/attention-control/${programming.id}`);

            if (programming.tipo === DefaultValue.TIPO_ATENCION_ENFERMERIA &&
                programming.atencion === DefaultValue.ATENCION_ENFERMERIA)
                navigate(`/programming/infirmary/${programming.id}`);

            if (programming.tipo === DefaultValue.TIPO_ATENCION_ENFERMERIA &&
                programming.atencion === DefaultValue.ATENCION_PRUEBA_ALCOHOL)
                navigate(`/programming/alcoholanddrugtesting/${programming.id}`);

        } catch (error) {
            console.log(error);
        }
    }

    var disabledButon = programming.estadoPac === 'PENDIENTE POR ATENCIÓN' ? false :
        programming.estadoPac === 'ESTÁ SIENDO ATENDIDO' ? true :
            programming.estadoPac === 'ATENDIDO' ? true : false;

    const ColorCard = programming.nameAtencion === 'TRIAGE I' ? ColorDrummondltd.RedDrummond :
        programming.nameAtencion === 'TRIAGE II' ? ColorDrummondltd.RedDrummond :
            programming.nameTipoAtencion === 'ENFERMERIA' ? ColorDrummondltd.BlueDrummond :
                programming.nameTipoAtencion === 'ASESORIAS' ? ColorDrummondltd.GreenDrummond :
                    programming.nameTipoAtencion === 'EMO' ? ColorDrummondltd.GrayDrummond :
                        programming.nameAtencion === 'TRIAGE III' ? ColorDrummondltd.YellowSeDrummond : ColorDrummondltd.GrayDrummond;

    const ChipColor = programming.estadoPac === 'PENDIENTE POR ATENCIÓN' ? ColorDrummondltd.BlueDrummond :
        programming.estadoPac === 'ESTÁ SIENDO ATENDIDO' ? ColorDrummondltd.RedDrummond :
            programming.estadoPac === 'ATENDIDO' ? ColorDrummondltd.GreenDrummond : ColorDrummondltd.GrayDrummond;

    return (
        <Card
            sx={{
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                border: theme.palette.mode === 'dark' ? 'none' : '1px solid',
                borderColor: theme.palette.grey[100],
                textAlign: 'center'
            }}
        >
            <CardMedia component="div" title="Atención" sx={{ height: '90px', bgcolor: ColorCard }}>
                <Typography variant="h6" sx={{
                    pt: programming.nameAtencion === 'PRUEBAS DE ALCOHOL Y DROGAS' ?
                        1.5 : 3, color: 'white'
                }}>{programming.nameAtencion}</Typography>
            </CardMedia>

            <CardContent sx={{ p: 2, pb: '16px !important' }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Avatar alt={programming.nameEmpleado} src={programming.empleadoFoto} sx={{ width: 60, height: 60, m: '-50px auto 0' }} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} alignItems="center">
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="h4">{programming.nameEmpleado}</Typography>
                            </Grid>

                            <Grid item xs={12} alignItems="center">
                                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Typography variant="body2">{programming.empleadoGenero}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Typography variant="body2">{GetEdad(new Date(programming.empleadoFechaNacimiento))} AÑOS</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Chip
                                    label={programming.estadoPac}
                                    size="small"
                                    sx={{
                                        bgcolor: ChipColor,
                                        color: 'white'
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h5">FECHA: </Typography>
                                <Typography variant="h6">{ViewFormat(programming.fecha)}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h5">SEDE: </Typography>
                                <Typography variant="h6">{programming.nameSede}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Button disabled={disabledButon} variant="outlined" onClick={handleClick} fullWidth startIcon={<IconEye />}>
                            Atender
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button disabled={disabledButon} variant="outlined" color="error" onClick={() => onClickDelete(programming.id)} fullWidth startIcon={<IconCircleMinus />}>
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