// components/EmployeeDetailModal.jsx
import {
    Avatar,
    Box,
    Chip,
    Divider,
    Drawer,
    IconButton,
    Modal,
    Paper,
    Typography
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import Iconify from 'components/iconify/iconify';

const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleString('es-CO', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
};

const formatDateShort = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('es-CO', {
        day: '2-digit', month: '2-digit', year: 'numeric',
    });
};

const calcularAntiguedad = (fechaIngreso) => {
    if (!fechaIngreso) return null;
    const inicio = new Date(fechaIngreso);
    const hoy = new Date();
    const años = hoy.getFullYear() - inicio.getFullYear();
    const meses = hoy.getMonth() - inicio.getMonth();
    const totalMeses = años * 12 + meses;
    if (totalMeses < 1) return 'Recién ingresado';
    const a = Math.floor(totalMeses / 12);
    const m = totalMeses % 12;
    if (a === 0) return `${m} mes${m !== 1 ? 'es' : ''}`;
    if (m === 0) return `${a} año${a !== 1 ? 's' : ''}`;
    return `${a} año${a !== 1 ? 's' : ''} ${m} mes${m !== 1 ? 'es' : ''}`;
};

const InfoChip = ({ icon, label, value, color = 'text.secondary' }) => {
    if (!value) return null;
    return (
        <Box sx={{
            display: 'flex', alignItems: 'center', gap: 0.75,
            px: 1.25, py: 0.5, borderRadius: '10px',
            bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.100',
        }}>
            <Box sx={{ display: 'flex', color, fontSize: '15px' }}>{icon}</Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
                <Box component="span" sx={{ fontWeight: 600, color: 'text.primary', mr: 0.5 }}>{label}</Box>
                {value}
            </Typography>
        </Box>
    );
};

const DrawerRow = ({ icon, label, value, colorIcon = 'text.disabled', children }) => {
    if (!value && !children) return null;
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, py: 1 }}>
            <Box sx={{ color: colorIcon, mt: 0.25, display: 'flex' }}>
                <Iconify icon={icon} width={20} />
            </Box>
            <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="caption" color="text.disabled" display="block" lineHeight={1.2}>
                    {label}
                </Typography>
                {value && (
                    <Typography variant="body2" fontWeight={500} color="text.primary" sx={{ wordBreak: 'break-word' }}>
                        {value}
                    </Typography>
                )}
                {children}
            </Box>
        </Box>
    );
};

const DrawerSection = ({ title, children }) => (
    <Box sx={{ mb: 1 }}>
        <Typography variant="overline" color="text.disabled" sx={{ letterSpacing: 1.2, fontSize: '0.68rem', fontWeight: 700 }}>
            {title}
        </Typography>
        <Divider sx={{ mt: 0.5, mb: 1.25, opacity: 0.6 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {children}
        </Box>
    </Box>
);

const EmployeeDetailModal = ({ open, onClose, dataInfo, statusConfig, viewMode = "list" }) => {
    const theme = useTheme();
    const investigadores = dataInfo?.nombreInvestigador?.filter(Boolean) || [];
    const diagnosticos = dataInfo?.nombreDx?.filter(Boolean) || [];
    const antiguedad = calcularAntiguedad(dataInfo?.fechaIngreso);

    if (!open) return null;

    // Si se quiere usar el drawer en mobile y modal en desktop, puedes condicionarlo así:
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;

    if (isMobile) {
        return (
            <Drawer
                anchor="right"
                open={open}
                onClose={onClose}
                PaperProps={{
                    sx: {
                        width: { xs: '100vw', sm: 500 },
                        maxWidth: '100vw',
                        borderRadius: { xs: 0, sm: '20px 0 0 20px' },
                        p: 3,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                    }
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Avatar
                            src={dataInfo?.foto}
                            variant="rounded"
                            sx={{
                                width: 54, height: 54,
                                bgcolor: alpha(statusConfig?.color || theme.palette.primary.main, 0.12),
                                color: statusConfig?.color || theme.palette.primary.main,
                                fontWeight: 700, fontSize: '1.35rem',
                                borderRadius: '12px',
                            }}
                        >
                            {!dataInfo?.foto && dataInfo?.nombreEmpleado?.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                            <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>
                                {dataInfo?.nombreEmpleado}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
                                {dataInfo?.nombreRoster}
                            </Typography>
                        </Box>
                    </Box>
                    <IconButton onClick={onClose} size="small" sx={{ border: '1px solid', borderColor: 'divider' }}>
                        <Iconify icon="solar:close-square-outline" width={18} />
                    </IconButton>
                </Box>

                <Box sx={{ overflowY: 'auto', flex: 1, pr: 0.5 }}>
                    <DrawerSection title="Contacto">
                        {dataInfo?.celular && (
                            <DrawerRow icon="solar:phone-calling-rounded-bold-duotone" label="Celular" colorIcon="success.main">
                                <Typography
                                    component="a"
                                    href={`tel:${dataInfo?.celular}`}
                                    variant="body2"
                                    fontWeight={600}
                                    sx={{ color: 'success.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                                >
                                    {dataInfo?.celular}
                                </Typography>
                            </DrawerRow>
                        )}
                        {dataInfo?.email && (
                            <DrawerRow icon="solar:letter-rounded-bold-duotone" label="Correo" colorIcon="primary.main">
                                <Typography
                                    component="a"
                                    href={`mailto:${dataInfo?.email}`}
                                    variant="body2"
                                    fontWeight={600}
                                    sx={{ color: 'primary.main', textDecoration: 'none', wordBreak: 'break-all', '&:hover': { textDecoration: 'underline' } }}
                                >
                                    {dataInfo?.email}
                                </Typography>
                            </DrawerRow>
                        )}
                        {dataInfo?.telefonoContacto && (
                            <DrawerRow
                                icon="solar:shield-user-bold-duotone"
                                label={`Contacto de emergencia ${dataInfo?.contacto ? `(${dataInfo?.contacto})` : ''}`}
                                value={dataInfo?.telefonoContacto}
                                colorIcon="warning.main"
                            />
                        )}
                    </DrawerSection>

                    <DrawerSection title="Datos personales">
                        <DrawerRow icon="solar:user-id-bold-duotone" label="Documento" value={dataInfo?.documento} />
                        <DrawerRow icon="solar:calendar-date-bold-duotone" label="Fecha de nacimiento" value={formatDateShort(dataInfo?.fechaNaci)} />
                        <DrawerRow icon="solar:diploma-verified-bold-duotone" label="Escolaridad" value={dataInfo?.nombreEscolaridad} />
                        <DrawerRow icon="solar:heart-bold-duotone" label="Estado civil" value={dataInfo?.nombreEstadoCivil} />
                    </DrawerSection>

                    <DrawerSection title="Posición organizacional">
                        <DrawerRow icon="solar:case-minimalistic-bold-duotone" label="Departamento" value={dataInfo?.nombreDepartamento} />
                        <DrawerRow icon="solar:structure-bold-duotone" label="Área" value={dataInfo?.nombreArea} />
                        <DrawerRow icon="solar:diagram-up-bold-duotone" label="SubÁrea" value={dataInfo?.nombreSubArea} />
                        <DrawerRow icon="solar:id-card-bold-duotone" label="Posición general" value={dataInfo?.nombreGeneralPosition} />
                        <DrawerRow icon="solar:tuning-square-bold-duotone" label="Oficio" value={dataInfo?.nombreOficio} />
                        <DrawerRow icon="solar:restart-bold-duotone" label="Rotación" value={dataInfo?.rotation} />
                    </DrawerSection>

                    <DrawerSection title="Contrato y nómina">
                        <DrawerRow icon="solar:document-text-bold-duotone" label="Tipo de contrato" value={dataInfo?.nombreTipoContrato} colorIcon="info.main" />
                        <DrawerRow icon="solar:calendar-add-bold-duotone" label="Fecha de contrato" value={formatDateShort(dataInfo?.fechaContrato)} colorIcon="info.main" />

                        {dataInfo?.fechaIngreso && (
                            <DrawerRow icon="solar:login-3-bold-duotone" label="Fecha de ingreso" colorIcon="success.main">
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                    <Typography variant="body2" fontWeight={500}>{formatDateShort(dataInfo?.fechaIngreso)}</Typography>
                                    {antiguedad && (
                                        <Chip label={antiguedad} size="small" variant="soft" color="success" sx={{ height: 20, fontSize: '0.7rem', fontWeight: 600 }} />
                                    )}
                                </Box>
                            </DrawerRow>
                        )}

                        {(dataInfo?.fechaEgreso || dataInfo?.termDate) && (
                            <DrawerRow
                                icon="solar:logout-3-bold-duotone"
                                label="Fecha de egreso"
                                value={formatDateShort(dataInfo?.fechaEgreso || dataInfo?.termDate)}
                                colorIcon="error.main"
                            />
                        )}
                        <DrawerRow icon="solar:medical-kit-bold-duotone" label="EPS" value={dataInfo?.nombreEPS} colorIcon="error.light" />
                        <DrawerRow icon="solar:banknote-bold-duotone" label="AFP" value={dataInfo?.nombreAfp} />
                        <DrawerRow icon="solar:shield-star-bold-duotone" label="ARL" value={dataInfo?.nombreArl} />
                        <DrawerRow icon="solar:safe-2-bold-duotone" label="Cesantías" value={dataInfo?.nombreCesantias} />
                    </DrawerSection>

                    {(investigadores.length > 0 || diagnosticos.length > 0) && (
                        <DrawerSection title="Investigación">
                            {investigadores.length > 0 && (
                                <DrawerRow icon="solar:test-tube-bold-duotone" label="Investigadores" colorIcon="primary.main">
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 0.5 }}>
                                        {investigadores.map((nombre, i) => (
                                            <Chip key={`inv-${i}`} label={nombre} size="small" variant="outlined"
                                                sx={{ height: 22, fontSize: '0.72rem', borderRadius: '6px' }} />
                                        ))}
                                    </Box>
                                </DrawerRow>
                            )}
                            {diagnosticos.length > 0 && (
                                <DrawerRow icon="solar:pulse-bold-duotone" label="Diagnósticos (DX)" colorIcon="error.main">
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 0.5 }}>
                                        {diagnosticos.map((dx, i) => (
                                            <Chip key={`dx-${i}`} label={dx} size="small"
                                                sx={{
                                                    height: 22, fontSize: '0.72rem', borderRadius: '6px',
                                                    bgcolor: alpha(theme.palette.error.main, 0.08),
                                                    color: 'error.dark',
                                                    border: `1px solid ${alpha(theme.palette.error.main, 0.15)}`
                                                }} />
                                        ))}
                                    </Box>
                                </DrawerRow>
                            )}
                        </DrawerSection>
                    )}

                    <DrawerSection title="Auditoría">
                        <DrawerRow icon="solar:user-hand-up-bold-duotone" label="Registrado por" value={dataInfo?.usuarioRegistro} />
                        <DrawerRow icon="solar:clock-square-bold-duotone" label="Fecha de registro" value={formatDate(dataInfo?.fechaRegistro)} />
                        {dataInfo?.usuarioModifico && (
                            <>
                                <DrawerRow icon="solar:pen-new-square-bold-duotone" label="Modificado por" value={dataInfo?.usuarioModifico} />
                                <DrawerRow icon="solar:clock-square-bold-duotone" label="Fecha de modificación" value={formatDate(dataInfo?.fechaModifico)} />
                            </>
                        )}
                        {dataInfo?.fechaUltimoControl && (
                            <DrawerRow icon="solar:verified-check-bold-duotone" label="Último control" value={formatDateShort(dataInfo?.fechaUltimoControl)} colorIcon="success.main" />
                        )}
                    </DrawerSection>
                </Box>
            </Drawer>
        );
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Paper
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '95%', sm: 500 },
                    maxHeight: '90vh',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    outline: 'none',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Avatar
                            src={dataInfo?.foto}
                            variant="rounded"
                            sx={{
                                width: 54, height: 54,
                                bgcolor: alpha(statusConfig?.color || theme.palette.primary.main, 0.12),
                                color: statusConfig?.color || theme.palette.primary.main,
                                fontWeight: 700, fontSize: '1.35rem',
                                borderRadius: '12px',
                            }}
                        >
                            {!dataInfo?.foto && dataInfo?.nombreEmpleado?.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                            <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>
                                {dataInfo?.nombreEmpleado}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
                                {dataInfo?.nombreRoster}
                            </Typography>
                        </Box>
                    </Box>
                    <IconButton onClick={onClose} size="small" sx={{ border: '1px solid', borderColor: 'divider' }}>
                        <Iconify icon="solar:close-square-outline" width={18} />
                    </IconButton>
                </Box>

                <Box sx={{ overflowY: 'auto', flex: 1, p: 3 }}>
                    <DrawerSection title="Contacto">
                        {dataInfo?.celular && (
                            <DrawerRow icon="solar:phone-calling-rounded-bold-duotone" label="Celular" colorIcon="success.main">
                                <Typography
                                    component="a"
                                    href={`tel:${dataInfo?.celular}`}
                                    variant="body2"
                                    fontWeight={600}
                                    sx={{ color: 'success.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                                >
                                    {dataInfo?.celular}
                                </Typography>
                            </DrawerRow>
                        )}
                        {dataInfo?.email && (
                            <DrawerRow icon="solar:letter-rounded-bold-duotone" label="Correo" colorIcon="primary.main">
                                <Typography
                                    component="a"
                                    href={`mailto:${dataInfo?.email}`}
                                    variant="body2"
                                    fontWeight={600}
                                    sx={{ color: 'primary.main', textDecoration: 'none', wordBreak: 'break-all', '&:hover': { textDecoration: 'underline' } }}
                                >
                                    {dataInfo?.email}
                                </Typography>
                            </DrawerRow>
                        )}
                        {dataInfo?.telefonoContacto && (
                            <DrawerRow
                                icon="solar:shield-user-bold-duotone"
                                label={`Contacto de emergencia ${dataInfo?.contacto ? `(${dataInfo?.contacto})` : ''}`}
                                value={dataInfo?.telefonoContacto}
                                colorIcon="warning.main"
                            />
                        )}
                    </DrawerSection>

                    <DrawerSection title="Datos personales">
                        <DrawerRow icon="solar:user-id-bold-duotone" label="Documento" value={dataInfo?.documento} />
                        <DrawerRow icon="solar:calendar-date-bold-duotone" label="Fecha de nacimiento" value={formatDateShort(dataInfo?.fechaNaci)} />
                        <DrawerRow icon="solar:diploma-verified-bold-duotone" label="Escolaridad" value={dataInfo?.nombreEscolaridad} />
                        <DrawerRow icon="solar:heart-bold-duotone" label="Estado civil" value={dataInfo?.nombreEstadoCivil} />
                    </DrawerSection>

                    <DrawerSection title="Posición organizacional">
                        <DrawerRow icon="solar:case-minimalistic-bold-duotone" label="Departamento" value={dataInfo?.nombreDepartamento} />
                        <DrawerRow icon="solar:structure-bold-duotone" label="Área" value={dataInfo?.nombreArea} />
                        <DrawerRow icon="solar:diagram-up-bold-duotone" label="SubÁrea" value={dataInfo?.nombreSubArea} />
                        <DrawerRow icon="solar:id-card-bold-duotone" label="Posición general" value={dataInfo?.nombreGeneralPosition} />
                        <DrawerRow icon="solar:tuning-square-bold-duotone" label="Oficio" value={dataInfo?.nombreOficio} />
                        <DrawerRow icon="solar:restart-bold-duotone" label="Rotación" value={dataInfo?.rotation} />
                    </DrawerSection>

                    <DrawerSection title="Contrato y nómina">
                        <DrawerRow icon="solar:document-text-bold-duotone" label="Tipo de contrato" value={dataInfo?.nombreTipoContrato} colorIcon="info.main" />
                        <DrawerRow icon="solar:calendar-add-bold-duotone" label="Fecha de contrato" value={formatDateShort(dataInfo?.fechaContrato)} colorIcon="info.main" />

                        {dataInfo?.fechaIngreso && (
                            <DrawerRow icon="solar:login-3-bold-duotone" label="Fecha de ingreso" colorIcon="success.main">
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                    <Typography variant="body2" fontWeight={500}>{formatDateShort(dataInfo?.fechaIngreso)}</Typography>
                                    {antiguedad && (
                                        <Chip label={antiguedad} size="small" variant="soft" color="success" sx={{ height: 20, fontSize: '0.7rem', fontWeight: 600 }} />
                                    )}
                                </Box>
                            </DrawerRow>
                        )}

                        {(dataInfo?.fechaEgreso || dataInfo?.termDate) && (
                            <DrawerRow
                                icon="solar:logout-3-bold-duotone"
                                label="Fecha de egreso"
                                value={formatDateShort(dataInfo?.fechaEgreso || dataInfo?.termDate)}
                                colorIcon="error.main"
                            />
                        )}
                        <DrawerRow icon="solar:medical-kit-bold-duotone" label="EPS" value={dataInfo?.nombreEPS} colorIcon="error.light" />
                        <DrawerRow icon="solar:banknote-bold-duotone" label="AFP" value={dataInfo?.nombreAfp} />
                        <DrawerRow icon="solar:shield-star-bold-duotone" label="ARL" value={dataInfo?.nombreArl} />
                        <DrawerRow icon="solar:safe-2-bold-duotone" label="Cesantías" value={dataInfo?.nombreCesantias} />
                    </DrawerSection>

                    {(investigadores.length > 0 || diagnosticos.length > 0) && (
                        <DrawerSection title="Investigación">
                            {investigadores.length > 0 && (
                                <DrawerRow icon="solar:test-tube-bold-duotone" label="Investigadores" colorIcon="primary.main">
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 0.5 }}>
                                        {investigadores.map((nombre, i) => (
                                            <Chip key={`inv-${i}`} label={nombre} size="small" variant="outlined"
                                                sx={{ height: 22, fontSize: '0.72rem', borderRadius: '6px' }} />
                                        ))}
                                    </Box>
                                </DrawerRow>
                            )}
                            {diagnosticos.length > 0 && (
                                <DrawerRow icon="solar:pulse-bold-duotone" label="Diagnósticos (DX)" colorIcon="error.main">
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 0.5 }}>
                                        {diagnosticos.map((dx, i) => (
                                            <Chip key={`dx-${i}`} label={dx} size="small"
                                                sx={{
                                                    height: 22, fontSize: '0.72rem', borderRadius: '6px',
                                                    bgcolor: alpha(theme.palette.error.main, 0.08),
                                                    color: 'error.dark',
                                                    border: `1px solid ${alpha(theme.palette.error.main, 0.15)}`
                                                }} />
                                        ))}
                                    </Box>
                                </DrawerRow>
                            )}
                        </DrawerSection>
                    )}

                    <DrawerSection title="Auditoría">
                        <DrawerRow icon="solar:user-hand-up-bold-duotone" label="Registrado por" value={dataInfo?.usuarioRegistro} />
                        <DrawerRow icon="solar:clock-square-bold-duotone" label="Fecha de registro" value={formatDate(dataInfo?.fechaRegistro)} />
                        {dataInfo?.usuarioModifico && (
                            <>
                                <DrawerRow icon="solar:pen-new-square-bold-duotone" label="Modificado por" value={dataInfo?.usuarioModifico} />
                                <DrawerRow icon="solar:clock-square-bold-duotone" label="Fecha de modificación" value={formatDate(dataInfo?.fechaModifico)} />
                            </>
                        )}
                        {dataInfo?.fechaUltimoControl && (
                            <DrawerRow icon="solar:verified-check-bold-duotone" label="Último control" value={formatDateShort(dataInfo?.fechaUltimoControl)} colorIcon="success.main" />
                        )}
                    </DrawerSection>
                </Box>
            </Paper>
        </Modal>
    );
};

export default EmployeeDetailModal;