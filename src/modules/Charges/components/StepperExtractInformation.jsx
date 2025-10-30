import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import { Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import { ExtractInformationFromExcel, GetInformationFromExcel } from 'api/clients/OccupationalExposure';
import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import UploadFile from './Tabs/UploadFile';
import ViewExportedSetail from './Tabs/ViewExportedSetail';
import SaveInformation from './Tabs/SaveInformation';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg, #E31937 0%, #E31937 100%)',
            animation: 'progress-line 0.8s ease-in-out forwards', // Animación para la línea
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg, #E31937 0%, #E31937 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
}));

// Animación CSS para la línea
const GlobalStyles = `@keyframes progress-line {
    0% {
        width: 0%;
    }
    100% {
        width: 100%;
    }
}`;

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    zIndex: 1,
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundColor: '#E31937', // Rojo para pasos activos
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundColor: '#E31937', // Rojo para pasos completados
    }),
    ...(!ownerState.active && !ownerState.completed && {
        backgroundColor: '#ccc', // Gris claro para pasos incompletos
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <SettingsIcon style={{ color: '#FFFFFF' }} />, // Icono blanco
        2: <GroupAddIcon style={{ color: '#FFFFFF' }} />, // Icono blanco
        3: <VideoLabelIcon style={{ color: '#FFFFFF' }} />, // Icono blanco
    };

    return (
        <ColorlibStepIconRoot ownerState={{ active, completed }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

export default function StepperExtractInformation() {
    const [activeStep, setActiveStep] = useState(0);
    const [filesData, setFilesData] = useState([]);
    const [lsDataExcel, setLsDataExcel] = useState([]);
    const [rows, setRows] = useState([]);

    const steps = [
        {
            component: <UploadFile setFilesData={setFilesData} filesData={filesData} />,
            label: "Cargar archivo"
        },
        {
            component: <ViewExportedSetail lsData={lsDataExcel} rows={rows} setLsData={setLsDataExcel} />,
            label: "Extraer información"
        },
        {
            component: <SaveInformation />,
            label: "Guardar información"
        }
    ];

    const handleClickExtraer = async () => {
        try {
            const bases64Excel = filesData.map(excel => ({ fileName: excel.nombre, base64String: excel.base64 }));
            const result = await GetInformationFromExcel(bases64Excel);
            if (result.data.exito) {
                setTimeout(() => {
                    setRows(result.data.datos);
                    setLsDataExcel(result.data.datos);

                    toast.success("Información básica extraída correctamente");
                }, 200);
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {
            toast.error("Error al extraer información del archivo");
        }
    }

    const handleExtractInformation = async () => {
        try {
            const exposicionOcupacional = lsDataExcel.map(row => {
                var fileData = filesData.find(file => file.nombre === row.filename);

                return {
                    idcargo: row.idcargo,
                    idges: row.idges,
                    claseriesgo: row.claseriesgo,
                    descripcionges: row.descripcionges,
                    base64excel: fileData ? fileData.base64 : null,
                };
            });

            console.log("Datos con base64:", exposicionOcupacional);

            const result = await ExtractInformationFromExcel(exposicionOcupacional);
            if (result.data.exito) {
                console.log(result.data);
                toast.success("Información avanzada extraída correctamente");
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {
            toast.error("Error al extraer información del archivo");
        }
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => {
            const nextStep = prevActiveStep + 1;

            if (nextStep === 1) {
                handleClickExtraer();
            }

            if (nextStep === 2) {
                handleExtractInformation();
            }

            return nextStep;
        });
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    const handleSave = () => {
        // Lógica para guardar la información
        console.log("Guardando información...");
        alert("¡Información guardada exitosamente!");
        // Opcional: Reiniciar el stepper después de guardar
        setActiveStep(0);
    };

    const handleClick = async () => {
        try {
            /* const bases64Excel = filesData.map(excel => excel.base64);

            const result = await InsertPanoramaMasivo(bases64Excel);
            if (result.data.response) {
                toast.success(result.data.mensaje);
            } else {
                toast.error(result.data.mensaje);
            } */
        } catch (error) {

        }
    };

    return (
        <>
            {/* Agregar estilos globales para la animación */}
            <style>{GlobalStyles}</style>

            <Stack sx={{ width: '100%' }} spacing={4}>
                <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{step.label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box sx={{ mt: 2 }}>
                    {steps[activeStep].component}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" color="primary" onClick={handleBack} disabled={activeStep === 0}>
                        Atrás
                    </Button>

                    {activeStep === steps.length - 1 ? (
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Guardar
                        </Button>
                    ) : (
                        <Button variant="contained" color="primary" onClick={handleNext}>
                            Siguiente
                        </Button>
                    )}
                </Box>
            </Stack>
        </>
    );
}