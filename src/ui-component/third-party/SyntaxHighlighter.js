import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card } from '@mui/material';

// third-party

// ==============================|| SYNTAX HIGHLIGHTER ||============================== //

const ReactSyntaxHighlighter = ({ codeString, showLineNumbers = true }) => {
    const theme = useTheme();
    return (
        <Card
            sx={{
                fontSize: '1rem !important',
                overflow: 'hidden',
                '& pre': {
                    margin: 0,
                    padding: '16px !important',
                    fontFamily: theme.typography.fontFamily,
                    bgcolor:
                        theme.palette.mode === 'dark' ? `${theme.palette.grey[50]} !important` : `${theme.palette.grey[900]} !important`
                }
            }}
        >
            <></>
        </Card>
    );
};

ReactSyntaxHighlighter.propTypes = {
    codeString: PropTypes.string,
    showLineNumbers: PropTypes.bool
};

export default ReactSyntaxHighlighter;
