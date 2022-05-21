import PropTypes from 'prop-types';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Grid, Tooltip, Fab } from "@mui/material";

const DetailedIcon = ({ title, onClick, icons, xs = 2, ...sx }) => {
    return (
        <Grid item xs={xs}>
            <Grid container justifyContent="center" alignItems="center">
                <AnimateButton>
                    <Tooltip title={title}>
                        <Fab
                            color="primary"
                            size="small"
                            onClick={onClick}
                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                        >
                            {icons}
                        </Fab>
                    </Tooltip>
                </AnimateButton>
            </Grid>
        </Grid>
    );
}

export default DetailedIcon;

DetailedIcon.propTypes = {
    xs: PropTypes.number,
    title: PropTypes.string,
    onClick: PropTypes.func,
    icons: PropTypes.node,

};