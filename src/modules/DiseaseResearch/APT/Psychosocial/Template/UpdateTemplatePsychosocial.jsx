import SubCard from "ui-component/cards/SubCard";
import { Grid, Button } from "@mui/material";
import AnimateButton from "ui-component/extended/AnimateButton";
import { useNavigate } from "react-router-dom";
import { TitleButton } from "components/helpers/Enums";

const UpdateTemplatePsychosocial = () => {
    const navigate = useNavigate();

    return (
        <SubCard darkTitle title="Actualizar plantilla psicosocial">
            <Grid container spacing={2}>


                <Grid item xs={12} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <AnimateButton>
                                <Button variant="contained" /* onClick={handleSubmit(handleClick)} */ fullWidth>
                                    {TitleButton.Guardar}
                                </Button>
                            </AnimateButton>
                        </Grid>

                        <Grid item xs={2}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={() => navigate("/apt-psychosocial/template/list")}>
                                    {TitleButton.Cancelar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default UpdateTemplatePsychosocial;