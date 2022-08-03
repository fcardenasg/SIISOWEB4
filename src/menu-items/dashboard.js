import { FormattedMessage } from 'react-intl';
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';

const icons = {
    IconDashboard,
    IconDeviceAnalytics
};

const dashboard = {
    id: 'dashboard',
    title: <FormattedMessage id="dashboard" />,
    type: 'group',
    children: [
        {
            id: 'default',
            title: <FormattedMessage id="default" />,
            type: 'item',
            url: '/dashboard/ltd',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'analytics',
            title: <FormattedMessage id="analytics" />,
            type: 'item',
            url: '/dashboard/analytics',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
