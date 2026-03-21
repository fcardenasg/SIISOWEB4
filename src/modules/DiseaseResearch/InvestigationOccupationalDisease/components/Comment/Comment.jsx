import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import { Box, Button, Fade, Grid, Stack, Typography } from "@mui/material";
import { InsertIELComentario } from 'api/clients/InvestigationClient';
import { ChangeStatusAssignment } from 'api/clients/ResearchAssignmentClient';
import ControlModal from "components/controllers/ControlModal";
import InputMultiselectTwo from 'components/input/InputMultiselectTwo';
import InputText from "components/input/InputText";
import { useBoolean } from 'hooks/use-boolean';
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom';
import SubCard from "ui-component/cards/SubCard";
import AnimateButton from 'ui-component/extended/AnimateButton';

const Comment = ({ idInvestigation, open, handleClose, arrayCompartments }) => {
    const { id } = useParams();
    const methods = useForm();
    const navigate = useNavigate();
    const { watch, resetField } = methods;
    const sectionComment = watch('sectionComment');
    const textImprove = watch('comentario');
    const improvingText = useBoolean(false);

    const activeContents = sectionComment?.map((id) => arrayCompartments[id - 1]?.content) || [];

    const handleSubmitComment = async () => {
        try {
            const data = {
                idInvestigacion: idInvestigation,
                comentario: textImprove
            }

            const result = await InsertIELComentario(data);
            if (!result.data.exito) {
                toast.error("Error al guardar el comentario: " + result.data.mensaje);
                return;
            }

            const resultDevuelta = await ChangeStatusAssignment(4, id);
            if (!resultDevuelta.data.exito) {
                toast.error("Error al devolver la investigación: " + resultDevuelta.data.mensaje);
                return;
            }

            toast.success("Comentario guardado e investigación devuelta", { duration: 10000 });
            handleClose();
            setTimeout(() => {
                navigate("/investigation-occupational-disease/view");
            }, 700);
        } catch (error) {
            toast.error("No se pudo realizar el comentario");
        }
    };

    const gridTransition = {
        transition: (theme) => theme.transitions.create(['flex-basis', 'max-width'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
        }),
    };

    return (
        <ControlModal
            open={open}
            onClose={() => {
                handleClose();
                resetField("sectionComment");
                resetField("comentario");
            }}
            maxWidth="xl"
            title="Agregar comentario"
        >
            <FormProvider {...methods}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={4} sx={gridTransition}>
                        <Stack spacing={0}>
                            <Box sx={{ mb: 2 }}>
                                <InputMultiselectTwo
                                    checkbox
                                    name="sectionComment"
                                    label="Sección de investigación a comentar"
                                    options={arrayCompartments.map((item, index) => ({
                                        value: index + 1,
                                        label: item.title.text?.toUpperCase()
                                    }))}
                                />
                            </Box>

                            <Box sx={{
                                transition: 'all 0.3s ease',
                                ...(improvingText.value && {
                                    opacity: 0.6,
                                    pointerEvents: 'none',
                                    filter: 'grayscale(0.5)'
                                })
                            }}>
                                <InputText
                                    name="comentario"
                                    label="Agregar comentario"
                                    multiline
                                    rows={window.innerHeight > 800 ? 18 : 15}
                                    showVoice
                                    showAI
                                />
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <AnimateButton>
                                    <Button disabled={!textImprove} variant="contained" onClick={handleSubmitComment}>
                                        Guardar
                                    </Button>
                                </AnimateButton>
                            </Box>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={6} lg={8} sx={gridTransition}>
                        <Box sx={{ height: 'calc(100vh - 200px)', overflowY: 'auto', pr: 1 }}>
                            <SubCard sx={{ minHeight: '100%' }}>
                                <Fade in={true} key={sectionComment?.length || 'empty'} timeout={500}>
                                    <Box>
                                        {activeContents.length > 0 ? (
                                            activeContents.map((content, index) => (
                                                <Box key={index} sx={{ mb: 2, p: 1, borderBottom: '1px solid #eee' }}>
                                                    {content}
                                                </Box>
                                            ))
                                        ) : (
                                            <EmptyContent />
                                        )}
                                    </Box>
                                </Fade>
                            </SubCard>
                        </Box>
                    </Grid>
                </Grid>
            </FormProvider>
        </ControlModal>
    );
}

export default Comment;

const EmptyContent = () => {
    return (
        <Stack
            spacing={2}
            alignItems="center"
            sx={{
                textAlign: 'center',
                py: 5,
            }}
        >
            <DescriptionTwoToneIcon
                sx={{
                    fontSize: 80,
                    color: 'primary.main',
                    opacity: 0.2,
                    mb: 1
                }}
            />

            <Typography variant="h4" color="textSecondary" fontWeight="600">
                Sin contenido seleccionado
            </Typography>

            <Typography variant="body1" color="textSecondary" sx={{ maxWidth: 450 }}>
                Visualice la información de las secciones de investigación para redactar comentarios sobre ajustes o correcciones. Seleccione una o varias secciones de la lista lateral para revisar los datos y agregar sus observaciones con facilidad.
            </Typography>
        </Stack>
    );
}