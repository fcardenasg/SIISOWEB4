import { AnimatePresence } from 'framer-motion';

import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { fData } from 'components/helpers/ConvertToBytes';
import Iconify from 'components/iconify/iconify';
import { Box, Tooltip } from '@mui/material';
import { fileThumb } from './utils';

export default function MultiFilePreviewTwo({ file, onRemove, disabledControl, onClickDownload, sx }) {
    return (
        <AnimatePresence initial={false}>
            <Stack
                key={file?.key}
                spacing={2}
                direction="row"
                alignItems="center"
                sx={{
                    my: 1,
                    py: 1,
                    px: 1.5,
                    borderRadius: 1,
                    border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
                    ...sx,
                }}
            >
                <Box
                    component="img"
                    src={fileThumb(file?.nombre)}
                    sx={{
                        width: 32,
                        height: 32,
                        flexShrink: 0,
                        ...sx,
                    }}
                />

                <ListItemText
                    primary={file?.nombre}
                    secondary={fData(file?.size)}
                    secondaryTypographyProps={{
                        component: 'span',
                        typography: 'caption',
                    }}
                />

                <Tooltip title="Descargar">
                    <IconButton size="small" onClick={onClickDownload}>
                        <Iconify icon="material-symbols-light:download" width={25} />
                    </IconButton>
                </Tooltip>

                {onRemove && <Tooltip title="Eliminar">
                    <IconButton disabled={disabledControl} size="small" onClick={onRemove}>
                        <Iconify icon="mingcute:close-line" width={20} />
                    </IconButton>
                </Tooltip>}
            </Stack>
        </AnimatePresence>
    );
}