import { Box, Typography } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { Divider, Drawer, IconButton } from '@mui/material';

const RightDrawer = ({ open, onClose, title, children, width }) => {
    return (
        <Drawer
            anchor="right"
            open={open}
            PaperProps={{
                sx: {
                    width: { xs: '100%', sm: width },
                    boxShadow: '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)'
                }
            }}
        >
            <Box sx={{ p: 2 }} role="presentation">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h4">{title}</Typography>
                    <IconButton onClick={onClose} aria-label="close drawer">
                        <CloseIcon color="error" />
                    </IconButton>
                </Box>
                <Divider />
                <Box sx={{ mt: 2 }}>{children}</Box>
            </Box>
        </Drawer>
    );
};

RightDrawer.defaultProps = {
    title: 'Detalles',
    children: null,
    width: 450
};

export default RightDrawer;