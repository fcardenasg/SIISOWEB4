import { FormattedMessage } from 'react-intl';

import { IconChartArcs, IconClipboardList, IconChartInfographic } from '@tabler/icons';

const icons = { IconChartArcs, IconClipboardList, IconChartInfographic };

const widget = {
    id: 'widget',
    title: <FormattedMessage id="widget" />,
    type: 'group',
    children: [
        {
            id: 'statistics',
            title: <FormattedMessage id="statistics" />,
            type: 'item',
            url: '/employee/list',
            icon: icons.IconChartArcs
        },
        {
            id: 'data',
            title: <FormattedMessage id="data" />,
            type: 'item',
            url: '/sg-sst/list',
            icon: icons.IconClipboardList
        },
        {
            id: 'chart',
            title: <FormattedMessage id="chart" />,
            type: 'item',
            url: '/turner/add',
            icon: icons.IconChartInfographic
        }
    ]
};

export default widget;
