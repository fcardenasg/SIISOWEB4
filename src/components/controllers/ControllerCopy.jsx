import PropTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch } from 'react-redux';
import { Grid, IconButton, Tooltip } from '@mui/material';
import { SNACKBAR_OPEN } from 'store/actions';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import AnimateButton from 'ui-component/extended/AnimateButton';

const ControllerCopy = ({ text, size, color, title = 'Copiar', message = 'Texto Copiado' }) => {
    const dispatch = useDispatch();

    return (
        <CopyToClipboard
            text={text}
            onCopy={() =>
                dispatch({
                    type: SNACKBAR_OPEN,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    transition: 'SlideLeft',
                    open: true,
                    message: message,
                    variant: 'alert',
                    alertSeverity: 'success',
                    close: false
                })
            }
        >
            <Grid container justifyContent="center" alignItems="center">
                <AnimateButton>
                    <Tooltip title={title}>
                        <IconButton>
                            <ContentCopyTwoToneIcon sx={{ fontSize: `${size}rem`, color: color }} />
                        </IconButton>
                    </Tooltip>
                </AnimateButton>
            </Grid>
        </CopyToClipboard>
    );
}

export default ControllerCopy;

ControllerCopy.propTypes = {
    text: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string,
    title: PropTypes.string
}