import { DeleteOutline, PhotoLibraryOutlined } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button, CircularProgress, Grid, IconButton, Paper, Typography } from '@mui/material';
import { DeleteAPTHFirma, GetAllAPTHFirma, SaveAPTHFirma } from 'api/clients/APTHigienePlantillaClient';
import { GetAllComboAsesorAptHigiene } from 'api/clients/UserClient';
import { ParamDelete } from 'components/alert/AlertAll';
import swal from 'sweetalert';
import InputSelect from 'components/input/InputSelect';
import { AnimatePresence, motion } from 'framer-motion';
import { ComponentNote } from 'modules/DiseaseResearch/methods';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

const APTHSignature = () => {
    const formMain = useFormContext();
    const { watch, setValue } = formMain;
    const idAPTHigiene = watch("idAPTHigiene");
    const asesorFirma = watch("asesorFirma");

    const [lsSignatures, setLsSignatures] = useState([]);
    const [lsUsuarios, setLsUsuarios] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        async function getData() {
            const lsServer = await GetAllComboAsesorAptHigiene();
            setLsUsuarios(lsServer.data);
        }

        getData();
    }, []);


    async function getDataSignatures() {
        try {
            const lsServer = await GetAllAPTHFirma(idAPTHigiene);
            if (lsServer.data.exito)
                setLsSignatures(lsServer.data.datos);
        } catch (error) {
            toast.error("Error al obtener firmas");
        }
    }

    useEffect(() => {
        if (idAPTHigiene)
            getDataSignatures();
    }, [idAPTHigiene]);

    const SaveSignature = async () => {
        try {
            if (!asesorFirma) {
                toast.error("Por favor, seleccione un asesor");
                return;
            }

            setIsSubmitting(true);

            const objFirma = {
                idAPT: idAPTHigiene,
                idUsuario: asesorFirma,
                rolUsuario: 3,
            };

            const lsServer = await SaveAPTHFirma(objFirma);
            if (!lsServer.data.exito) {
                toast.error(lsServer.data.mensaje);
                return;
            }

            toast.success("Firma agregada correctamente");
            await getDataSignatures();
            setValue("asesorFirma", "");
        } catch (error) {
            toast.error("Error al guardar firma");
            console.error("Error al guardar firma:", error);
        } finally {
            setTimeout(() => { setIsSubmitting(false); }, 200);
        }
    }

    const DeleteSignature = async (id) => {
        try {
            swal(ParamDelete).then(async (willDelete) => {
                if (willDelete) {
                    const lsServer = await DeleteAPTHFirma(id);
                    if (lsServer.data.exito) {
                        toast.success("Firma eliminada correctamente");
                        getDataSignatures();
                    } else {
                        toast.error("Error al eliminar firma");
                    }
                }
            });
        } catch (error) {
            toast.error("Error al eliminar firma");
        }
    }

    return (
        <SubCard darkTitle title="Participantes">
            <Grid container spacing={2.5}>
                <Grid item xs={12}>
                    <ComponentNote title="El sistema registra de forma automática las firmas de los participantes principales (Higienista Industrial/Ergónomo y Supervisor Corporativo de Higiene Industrial) al crear el APT Higiene por primera vez. Adicionalmente, la interfaz permite incorporar de manera manual a los asesores de la ARL Seguros Bolívar que participaron en el desarrollo del proceso." />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputSelect name="asesorFirma" label="Asesor ARL Seguros Bolívar" options={lsUsuarios} defaultValue="" />
                </Grid>

                <Grid item xs={6} md={4} lg={1.5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <AnimateButton>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={SaveSignature}
                            disabled={isSubmitting}
                            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <AddCircleIcon />}
                            sx={{ minWidth: '110px' }}
                        >
                            {isSubmitting ? 'Guardando...' : 'Agregar'}
                        </Button>
                    </AnimateButton>
                </Grid>

                <AnimatePresence mode="popLayout">
                    {lsSignatures.length > 0 ? (
                        lsSignatures.map((field) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                key={field.id}
                                component={motion.div}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                layout
                            >
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 4,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        cursor: 'pointer',
                                        position: 'relative',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            bgcolor: 'rgba(0,0,0,0.01)',
                                            borderColor: 'primary.main',
                                            boxShadow: '0 10px 20px rgba(0,0,0,0.04)',
                                            transform: 'translateY(-2px)',
                                            '& .delete-btn': { opacity: 1 }
                                        }
                                    }}
                                >
                                    <Box sx={{ width: 200, borderRadius: 3, overflow: 'hidden', flexShrink: 0, bgcolor: 'grey.100' }}>
                                        <img src={field.imgBase64} alt={field.nameUsuario} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </Box>

                                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                        <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                                            {field.nameUsuario?.toLowerCase()}
                                        </Typography>

                                        <Typography variant="body2" noWrap sx={{ textTransform: 'capitalize' }}>
                                            {field.nameRol?.toLowerCase()}
                                        </Typography>

                                        <Typography variant="caption">
                                            {new Date(field.fechaRegistro).toLocaleDateString('es-CO', {
                                                day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                            })}
                                        </Typography>
                                    </Box>

                                    {field.rolUsuario !== 1 && field.rolUsuario !== 2 && (
                                        <IconButton
                                            className="delete-btn"
                                            size="medium"
                                            onClick={(e) => { e.stopPropagation(); DeleteSignature(field.id); }}
                                            sx={{
                                                opacity: 0,
                                                transition: 'all 0.2s',
                                                bgcolor: 'secondary.main',
                                                '&:hover': { color: 'secondary.dark', bgcolor: 'secondary.main' }
                                            }}
                                        >
                                            <DeleteOutline fontSize="medium" sx={{ color: 'white' }} />
                                        </IconButton>
                                    )}
                                </Paper>
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Paper
                                variant="outlined"
                                sx={{
                                    py: 4,
                                    borderRadius: 4,
                                    borderStyle: 'dashed',
                                    borderWidth: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'rgba(0,0,0,0.01)',
                                    color: 'text.disabled'
                                }}
                            >
                                <PhotoLibraryOutlined sx={{ fontSize: 60, mb: 2, opacity: 0.3 }} />
                                <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                                    Aún no hay firmas
                                </Typography>
                                <Typography variant="body2">
                                    Las firmas que cargues aparecerán en esta sección.
                                </Typography>
                            </Paper>
                        </Grid>
                    )}
                </AnimatePresence>
            </Grid>
        </SubCard>
    );
};

export default APTHSignature;