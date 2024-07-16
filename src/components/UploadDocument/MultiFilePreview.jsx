import { AnimatePresence } from 'framer-motion';

import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ic_pdf from 'assets/icons/files/ic_pdf.svg';

import { fData } from 'components/helpers/ConvertToBytes';
import Iconify from 'components/iconify/iconify';
import { Box, Tooltip } from '@mui/material';

export default function MultiFilePreview({ files, onRemove, disabledControl, onClickDownload, sx }) {
    return (
        <AnimatePresence initial={false}>
            {files?.map((file) => {
                const { key, nombre = '', size = 0, id } = file;

                return (
                    <Stack
                        key={key}
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
                            src={ic_pdf}
                            sx={{
                                width: 32,
                                height: 32,
                                flexShrink: 0,
                                ...sx,
                            }}
                        />

                        <ListItemText
                            primary={nombre}
                            secondary={fData(size)}
                            secondaryTypographyProps={{
                                component: 'span',
                                typography: 'caption',
                            }}
                        />

                        <Tooltip title="Descargar">
                            <IconButton size="small" onClick={() => onClickDownload(id)}>
                                <Iconify icon="material-symbols-light:download" width={25} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Eliminar">
                            <IconButton disabled={disabledControl} size="small" onClick={() => onRemove(id)}>
                                <Iconify icon="mingcute:close-line" width={20} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                );
            })}
        </AnimatePresence>
    );
}