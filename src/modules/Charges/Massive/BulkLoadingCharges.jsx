import { Grid } from '@mui/material';
import { AccionMenu, Modulo } from 'components/helpers/Enums';
import AnimateComponent from 'components/loading/AnimateComponent';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import SubCard from 'ui-component/cards/SubCard';
import StepperExtractInformation from '../components/StepperExtractInformation';

const BulkLoadingCharges = () => {
    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.Panoramadecargo}>
            <AnimateComponent>
                <SubCard darkTitle title="Cargue masivo de cargos">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <StepperExtractInformation />
                        </Grid>
                    </Grid>
                </SubCard>
            </AnimateComponent>
        </ValidateActionSkeleton>
    );
};

export default BulkLoadingCharges;