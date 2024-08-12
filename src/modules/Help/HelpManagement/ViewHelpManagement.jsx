import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Image from 'components/image';
import Iconify from 'components/iconify/iconify';
import { Fragment, useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { GetByIdSoporte, UpdateStateSoporte } from 'api/clients/HelpClient';
import { useParams } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { Button, Grid, Icon, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import MultiFilePreviewTwo from 'components/UploadDocument/MultiFilePreviewTwo';
import { DownloadFile } from 'components/helpers/ConvertToBytes';
import SelectOnChange from 'components/input/SelectOnChange';
import { MessageSuccess } from 'components/alert/AlertAll';
import { CodCatalogo } from 'components/helpers/Enums';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import Cargando from 'components/loading/Cargando';

export default function ViewHelpManagement() {
  const { id } = useParams();
  const theme = useTheme();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [lsData, setLsData] = useState(null);
  const [idEstado, setIdEstado] = useState(null);
  const [lsEstado, setLsEstado] = useState([]);
  const [lsArchivo, setLsArchivo] = useState([]);
  const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    async function getAllData() {
      try {
        const serverEstado = await GetByTipoCatalogoCombo(CodCatalogo.SoporteEstado);
        setLsEstado(serverEstado.data);

        const serverData = await GetByIdSoporte(id);
        if (serverData.status === 200) {
          setIdEstado(serverData.data.idEstado);
          setLsData(serverData.data);

          /* serverData.data.listArchivo.forEach(element => {
            var result = element.archivo.startsWith('data:image');
            if (result) {
              setLsArchivo(element);
            }
          }); */
        }
      } catch (error) { }
    }

    getAllData();
  }, [id]);

  const handleEstado = async () => {
    try {
      const serverData = await UpdateStateSoporte({ id, idEstado: idEstado });
      if (serverData.status === 200) {
        setOpenSuccess(true);
      }
    } catch (error) {

    }
  };

  const handleClickDownload = async (basefile, nombre) => {
    const comaIndex = basefile.indexOf(',');
    var base64format = basefile.substring(comaIndex + 1);
    DownloadFile(nombre, base64format);
  };

  const renderHead = (
    <>
      <Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="center">
        <Grid item xs={12}>
          <Button
            component={Link}
            to="/help/support-management"
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          >
            Regresar
          </Button>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h3" sx={{ flexGrow: 1 }}>
            {lsData?.nameTipoIncidente}
          </Typography>
        </Grid>

        <Grid item xs={10} md={3}>
          <SelectOnChange
            label="Estado"
            value={idEstado}
            onChange={(e) => setIdEstado(e.target.value)}
            options={lsEstado}
            size={matchesXS ? 'small' : 'medium'}
          />
        </Grid>

        <Grid item xs={2} md={1}>
          <Tooltip placement="top" title="Guardar">
            <IconButton onClick={handleEstado}>
              <Icon
                style={{
                  backgroundColor: theme.palette.error.main,
                  borderRadius: '50%',
                  padding: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <SaveIcon fontSize="small" sx={{ color: "white" }} />
              </Icon>
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );

  const renderOverview = (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
    >
      {[
        {
          label: 'Tipo incidente',
          value: lsData?.nameTipoIncidente,
          icon: <Iconify width={30} icon="material-symbols-light:contact-support-outline-rounded" />,
        },
        {
          label: 'Sede',
          value: lsData?.nameSede,
          icon: <Iconify width={30} icon="material-symbols-light:add-home-work-outline-rounded" />,
        },
        {
          label: 'Prioridad',
          value: lsData?.namePrioridad,
          icon: <Iconify width={30} icon="material-symbols-light:low-priority" />,
        },
        {
          label: 'Estado',
          value: lsData?.nameEstado,
          icon: <Iconify width={30} icon="lets-icons:status-list" />,
        },
        {
          label: 'Caso reportado por',
          value: lsData?.usuarioRegistro,
          icon: <Iconify width={30} icon="solar:user-linear" />,
        },
        {
          label: 'Fecha de solicitud',
          value: new Date(lsData?.fechaRegistro).toLocaleString(),
          icon: <Iconify width={30} icon="material-symbols-light:date-range" />,
        },
      ]?.map((item) => (
        <Stack key={item.label} spacing={1.5} direction="row">
          {item.icon}
          <ListItemText
            primary={item.label}
            secondary={item.value}
            primaryTypographyProps={{
              typography: 'body1',
              color: 'text.secondary',
              mb: 0.5,
            }}
            secondaryTypographyProps={{
              typography: 'subtitle1',
              color: 'text.primary',
              component: 'span',
            }}
          />
        </Stack>
      ))}
    </Box>
  );

  return (
    <MainCard>
      <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />

      {lsData !== null ?
        <Fragment>

          <Stack sx={{ maxWidth: 850, mx: 'auto', justifyContent: 'center' }}>
            {renderHead}

            <Divider sx={{ borderStyle: 'dashed', my: 4, borderColor: theme.palette.grey[300] }} />

            {renderOverview}

            <Divider sx={{ borderStyle: 'dashed', my: 4, borderColor: theme.palette.grey[300] }} />

            <Typography variant="h4">Descripción del caso</Typography>
            <Typography sx={{ mt: 2, color: 'text.secondary' }} align="justify" variant="h5">{lsData?.descripcionCaso}</Typography>


            {lsData?.listArchivo.length !== 0 ?
              <>
                <Divider sx={{ borderStyle: 'dashed', my: 4, borderColor: theme.palette.grey[300] }} />

                <Typography variant="h4" sx={{ mb: 2 }}>Archivos del caso</Typography>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {lsData?.listArchivo.map((item) => (
                    <Grid item xs={12} md={6}>
                      <MultiFilePreviewTwo
                        file={item}
                        onClickDownload={() => handleClickDownload(item?.archivo, item?.nombre)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </> : null
            }
          </Stack>
        </Fragment> : <Cargando />
      }
    </MainCard >
  );
}