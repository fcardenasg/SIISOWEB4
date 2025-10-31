import {
  Box,
  Button,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BlurLinearIcon from '@mui/icons-material/BlurLinear';

export default function ItemUpload({
  acceptedFiles,
  handleFileRemove,
  handleViewPDF,
  handleFileSave,
  filecolor,
  enable,
  enableview,
  estado,
}) {

  const ViewExtraer = ({ file }) => (
    <Box
      component="section"
      sx={{
        fontSize: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        onClick={() => {
          console.log('entro');
          handleFileSave(file);
        }}
        sx={{
          background: '#4caf50',
          borderRadius: 4,
          mr: 0.5,
          '&:hover': {
            cursor: 'pointer',
            color: '#4caf50',
            background: '#c8e6c9',
          },
        }}
        variant="contained"
      >
        Extraer información
      </Button>
      <Tooltip title="Eliminar">
        <Box
          onClick={() => handleFileRemove(file)}
          component="section"
          sx={{
            fontSize: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0.5,
            '&:hover': {
              cursor: 'pointer',
              color: '#d32f2f',
              background: '#ffcdd2',
              borderRadius: 4,
            },
          }}
        >
          <DeleteForeverIcon />
        </Box>
      </Tooltip>
    </Box>
  );

  return (
    <List>
      {acceptedFiles.map((file, index) => {     
        return (
          <ListItem
            sx={{ marginBottom: 1.5, width: '100%', paddingRight: 4 }}
            disablePadding
            key={index}
          >
            <Card
              variant="outlined"
              sx={{
                width: '100%',
                height: 73,
                background: file.state ? '#e3f2fd' : '#ffffff', // Fondo verde si state es true
                alignItems: 'center',
              }}
            >
              <Box
                component="section"
                sx={{
                  paddingX: 2,
                  paddingY: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <ListItemText
                  sx={{ width: '20%', textAlign: 'left', marginY: 'auto', typography: 'body2' }}
                  primary={file.path}
                />

                <Box
                  component="section"
                  sx={{
                    paddingX: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {file.state ? (
                    <Box
                      component="section"
                      sx={{
                        fontSize: 18,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography sx={{ fontSize: '1rem', fontWeight: 500, marginRight: 2 }}>
                        Listo para guardar
                      </Typography>
                      <Box
                        onClick={() => handleViewPDF(file)}
                        component="section"
                        sx={{
                          fontSize: 16.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 1,
                          padding: 0.5,
                          '&:hover': {
                            cursor: 'pointer',
                            color: '#004d40',
                            background: '#80cbc4',
                            borderRadius: 4,
                          },
                        }}
                      >
                        <ImageSearchIcon />
                      </Box>

                      <Box
                        onClick={() => handleFileRemove(file)}
                        component="section"
                        sx={{
                          fontSize: 18,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0.5,
                          '&:hover': {
                            cursor: 'pointer',
                            color: '#d32f2f',
                            background: '#ffcdd2',
                            borderRadius: 4,
                          },
                        }}
                      >
                        <DeleteForeverIcon />
                      </Box>
                    </Box>
                  ) : (
                    <ViewExtraer file={file} />
                  )}
                </Box>
              </Box>
            </Card>
          </ListItem>
        );
      })}
    </List>
  );
}
