// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics, IconQrcode, IconScan, IconVaccine, IconReportMedical } from '@tabler/icons';

// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    IconQrcode,
    IconScan,
    IconVaccine,
    IconReportMedical
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const home = {
    id: 'dashboard',
    title: <FormattedMessage id="dashboard" />,
    type: 'group',
    children: [
        {
            id: 'questionnaire',
            title: <FormattedMessage id="Cuestionario" />,
            type: 'item',
            url: '/dashboard/questionnaire',
            icon: icons.IconReportMedical,
            breadcrumbs: false
        },
        /* {
            id: 'vacunacion',
            title: <FormattedMessage id="Vacunación" />,
            type: 'item',
            url: '/dashboard/vaccination',
            icon: icons.IconVaccine,
            breadcrumbs: false
        },
        {
            id: 'generarQr',
            title: <FormattedMessage id="Generar QR" />,
            type: 'item',
            url: '/dashboard/generateqr',
            icon: icons.IconQrcode,
            breadcrumbs: false
        },
        {
            id: 'visorQr',
            title: <FormattedMessage id="Visor QR" />,
            type: 'item',
            url: '/dashboard/viewfinderqr',
            icon: icons.IconScan,
            breadcrumbs: false
        } */
    ]
};

export default home;
