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
import { useState } from 'react';
import toast from 'react-hot-toast';
import SaveInformation from './Tabs/SaveInformation';
import UploadFile from './Tabs/UploadFile';
import ViewExportedSetail from './Tabs/ViewExportedSetail';
import AnimateButton from 'ui-component/extended/AnimateButton';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg, #E31937 0%, #E31937 100%)',
            animation: 'progress-line 0.8s ease-in-out forwards',
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
        backgroundColor: '#E31937',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundColor: '#E31937',
    }),
    ...(!ownerState.active && !ownerState.completed && {
        backgroundColor: '#ccc',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <SettingsIcon style={{ color: '#FFFFFF' }} />,
        2: <GroupAddIcon style={{ color: '#FFFFFF' }} />,
        3: <VideoLabelIcon style={{ color: '#FFFFFF' }} />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ active, completed }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

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
            const formData = new FormData();
            filesData.forEach((excel, index) => {
                formData.append('files', excel.archivo);
            });

            const result = await GetInformationFromExcel(formData);
            if (result.data.exito) {
                setTimeout(() => {
                    setRows(result.data.datos);
                    setLsDataExcel(result.data.datos);

                    toast.success("Información básica extraída correctamente");
                }, 500);
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {
            toast.error("Error al extraer información del archivo");
        }
    };

    const handleExtractInformation = async () => {
        try {
            const formData = new FormData();

            lsDataExcel.forEach((row, index) => {
                const fileData = filesData.find(file => file.nombre === row.filename);

                formData.append(`exposicionOcupacional[${index}].idcargo`, row.idcargo);
                formData.append(`exposicionOcupacional[${index}].idges`, row.idges);
                formData.append(`exposicionOcupacional[${index}].claseriesgo`, row.claseriesgo);
                formData.append(`exposicionOcupacional[${index}].descripcionges`, row.descripcionges);

                if (fileData?.archivo) {
                    formData.append(
                        `exposicionOcupacional[${index}].archivoexcel`,
                        fileData.archivo,
                        fileData.archivo.name
                    );
                }
            });

            const result = await ExtractInformationFromExcel(formData);
            if (result.data.exito) {
                console.log(result.data);
                setTimeout(() => {
                    toast.success("Información avanzada extraída correctamente");
                }, 200);
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
        alert("¡Información guardada exitosamente!");
        setActiveStep(0);
    };

    return (
        <>
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
                    <AnimateButton>
                        <Button variant="contained" color="primary" onClick={handleBack} disabled={activeStep === 0 || activeStep === 2}>
                            Atrás
                        </Button>
                    </AnimateButton>

                    {activeStep === steps.length - 1 ?
                        <AnimateButton>
                            <Button variant="contained" color="primary" onClick={handleSave}>
                                Finalizar
                            </Button>
                        </AnimateButton>
                        :
                        <AnimateButton>
                            <Button variant="contained" color="primary" onClick={handleNext} disabled={activeStep === 0 && filesData.length === 0}>
                                Siguiente
                            </Button>
                        </AnimateButton>
                    }
                </Box>
            </Stack>
        </>
    );
}