import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Button, Card, TextField, CardActions, useMediaQuery, CardContent, CardHeader, CardMedia, Divider, Grid, Typography, IconButton, Modal, } from '@mui/material';
import { QrReader } from 'react-qr-reader';
import { FormProvider, useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';
// project imports

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

import { GetAllTypeCatalog } from 'api/clients/TypeCatalogClient';
import InputText from 'components/input/InputText';

const videoConstraints = {
    width: 250,
    height: 87,
    margin: 0
};

// ===============================|| UI CARDS ||=============================== //

const Turner = () => {
    const theme = useTheme();
    const [scanResultWebCam, setScanResultWebCam] = useState('');
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();


    /* NUESTROS USESTATE */
    const [typeCatalog, setTypeCatalog] = useState([]);
    const [btnReport, setBtnReport] = useState(false);
    const [noSymptoms, setNoSymptoms] = useState(false);
    const [closeContact, setCloseContact] = useState(false);

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors, reset } = methods;

    /* METODO DONDE SE LLENA LA LISTA Y TOMA DE DATOS */
    async function GetAll() {
        try {
            const lsServer = await GetAllTypeCatalog(0, 0);
            var result = lsServer.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setTypeCatalog(result);
        } catch (error) {
            console.log(error);
        }
    }

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
    }, [])

    /* METODO DE INSERT  */
    const handleClick = () => {
        setBtnReport(true);
    };

    const handleNoSymptoms = (event) => {
        setNoSymptoms(event.target.checked);
    }

    const handleCloseContact = (event) => {
        setCloseContact(event.target.checked);
    }

    const navigate = useNavigate();


    const [text, setText] = useState('');
    const cardStyle = {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[100]
    };

    return (
        <>


            <MainCard
                title="Solicita tu turno"
                sx={{ mt: gridSpacing }}
            >
                <Grid container >

                    <Grid item xl={12} lg={4}>
                        <SubCard title="Solicitud de turno por código QR">
                            <Card sx={cardStyle}>
                                <CardContent>
                                    <Grid container spacing={4}>
                                        <Grid item xl={4}>
                                            <QrReader
                                                containerStyle={videoConstraints}
                                                style={{ width: '100%' }}
                                                onResult={(result, error) => {
                                                    if (!!result) {
                                                        setScanResultWebCam(result?.text);
                                                    }

                                                    if (!!error) {
                                                        console.info(error);
                                                    }
                                                }}
                                                scanDelay={1000}
                                            />
                                        </Grid>
                                        <Grid container spacing={1} justifyContent="center" alignItems="center">
                                            <Grid item>
                                                <Typography variant="subtitle1">

                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Grid container justifyContent="center">
                                        {/* <Grid item>
                                            <Button variant="contained">Solicitar turno</Button>
                                        </Grid> */}
                                    </Grid>
                                </CardActions>
                            </Card>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <SubCard title="Solicitud de turno por número de documento">
                            <Card sx={cardStyle}>
                                <CardContent>
                                    <Grid container spacing={1} justifyContent="center" alignItems="center">
                                        <Grid item>
                                            <TextField
                                                onChange={(e) => setText(e.target.value)}
                                                value={text}
                                                size={matchesXS ? 'small' : 'medium'}
                                                fullWidth
                                                label="Digite Nro. de documento"
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Grid container justifyContent="center">
                                        <Grid item>
                                            <Button variant="contained">Solicitar turno</Button>
                                        </Grid>
                                    </Grid>
                                </CardActions>
                            </Card>
                        </SubCard>
                    </Grid>
                    <Divider />
                    {/* 
                    Resultado de la consulta */}
                    <Grid item xs={12}>
                        <SubCard title="Información personal">
                            {/* <Grid container spacing={gridSpacing}> */}

                            <Grid container spacing={2} sx={{ pb: 4 }}>
                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="codigo"
                                            label="N° Documento"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="codigo"
                                            label="Apellidos y Nombres"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="codigo"
                                            label="Teléfono"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="codigo"
                                            label="Email"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                            </Grid>

                            {/* </Grid> */}
                        </SubCard>
                    </Grid>

                    <Divider />
                    <Grid item xs={12}>
                        <SubCard title="Qué quieres hacer? - Elige El tipo de atención que  solicitas:">
                            <Grid container spacing={gridSpacing}>
                                <Grid item sm={6} md={4}>
                                    <Card sx={{ bgcolor: theme.palette.error.main, color: theme.palette.background.paper }}>
                                        <CardHeader
                                            title={
                                                <Typography variant="h5" sx={{ color: theme.palette.background.paper }}>
                                                    TRIAGE
                                                </Typography>
                                            }
                                        />
                                        <Divider />
                                        <CardContent>
                                            <Grid container spacing={1}>
                                                <Grid container justifyContent="center">
                                                    <Grid item>
                                                        <Button component={Link} to="/e-commerce/products" variant="contained" fullWidth>
                                                            Solicitar turno
                                                        </Button>

                                                    </Grid>
                                                </Grid>


                                            </Grid>

                                        </CardContent>
                                    </Card>
                                </Grid>

                                
                                <Grid item sm={6} md={4}>
                                    <Card sx={{ bgcolor: theme.palette.secondary.main, color: theme.palette.secondary.light }}>
                                        <CardHeader
                                            title={
                                                <Typography variant="h5" sx={{ color: theme.palette.secondary.light }}>
                                                    ENFERMERIA
                                                </Typography>
                                            }
                                        />
                                        <Divider />
                                        <CardContent>
                                            <Grid container spacing={1}>
                                                <Grid container justifyContent="center">
                                                    <Grid item>
                                                        <Button component={Link} to="/e-commerce/products" variant="contained" fullWidth>
                                                            Solicitar turno
                                                        </Button>

                                                    </Grid>
                                                </Grid>


                                            </Grid>

                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item sm={6} md={4}>
                                    <Card sx={{ bgcolor: theme.palette.primary.main, color: theme.palette.background.paper }}>
                                        <CardHeader
                                            title={
                                                <Typography variant="h5" sx={{ color: theme.palette.background.paper }}>
                                                    ASESORIAS
                                                </Typography>
                                            }
                                        />
                                        <Divider />
                                        <CardContent>
                                            <Grid container spacing={1}>
                                                <Grid container justifyContent="center">
                                                    <Grid item>
                                                        <Button component={Link} to="/e-commerce/products" variant="contained" fullWidth>
                                                            Solicitar turno
                                                        </Button>

                                                    </Grid>
                                                </Grid>


                                            </Grid>

                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item sm={6} md={4}>
                                    <Card sx={{ bgcolor: theme.palette.info.dark, color: theme.palette.background.paper }}>
                                        <CardHeader
                                            title={
                                                <Typography variant="h5" sx={{ color: theme.palette.background.paper }}>
                                                    EXÁMENES MÉDICOS OCUPACIONALES
                                                </Typography>
                                            }
                                        />
                                        <Divider />
                                        <CardContent>
                                            <Grid container spacing={1}>
                                                <Grid container justifyContent="center">
                                                    <Grid item>
                                                        <Button component={Link} to="/e-commerce/products" variant="contained" fullWidth>
                                                            Solicitar turno
                                                        </Button>

                                                    </Grid>
                                                </Grid>


                                            </Grid>

                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item sm={6} md={4}>
                                    <Card sx={{ bgcolor: theme.palette.warning.dark, color: theme.palette.grey[800] }}>
                                        <CardHeader
                                            title={
                                                <Typography variant="h5" sx={{ color: theme.palette.grey[800] }}>
                                                    EXÁMENES PARACLÍNICOS
                                                </Typography>
                                            }
                                        />
                                        <Divider />
                                        <CardContent>
                                            <Grid container spacing={1}>
                                                <Grid container justifyContent="center">
                                                    <Grid item>
                                                        <Button component={Link} to="/e-commerce/products" variant="contained" fullWidth>
                                                            Solicitar turno
                                                        </Button>

                                                    </Grid>
                                                </Grid>


                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item sm={6} md={4}>
                                    <Card sx={{ bgcolor: theme.palette.success.main, color: theme.palette.background.paper }}>
                                        <CardHeader
                                            title={
                                                <Typography variant="h5" sx={{ color: theme.palette.background.paper }}>
                                                    PRUEBAS DE ALCOHOL Y DROGA
                                                </Typography>
                                            }
                                        />
                                        <Divider />
                                        <CardContent>
                                            <Grid container spacing={1}>
                                                <Grid container justifyContent="center">
                                                    <Grid item>
                                                        <Button component={Link} to="/e-commerce/products" variant="contained" fullWidth>
                                                            Solicitar turno
                                                        </Button>

                                                    </Grid>
                                                </Grid>


                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>

                            </Grid>
                        </SubCard>
                    </Grid>

                </Grid>
            </MainCard>
        </>
    );
};

export default Turner;

