import { FormattedMessage } from 'react-intl';

import { IconClipboardCheck, IconPictureInPicture, IconForms, IconBorderAll, IconChartDots, IconStairsUp } from '@tabler/icons';

const icons = {
    IconClipboardCheck,
    IconPictureInPicture,
    IconForms,
    IconBorderAll,
    IconChartDots,
    IconStairsUp
};

const forms = {
    id: 'ui-forms',
    title: <FormattedMessage id="Otros" />,
    type: 'group',
    children: [
        {
            id: 'apexchart',
            title: <FormattedMessage id="apexchart" />,
            type: 'item',
            url: '/chart/apexchart',
            icon: icons.IconChartDots
        },
        {
            id: 'forms-validation',
            title: <FormattedMessage id="forms-validation" />,
            type: 'item',
            url: '/forms/forms-validation',
            icon: icons.IconClipboardCheck
        },
        {
            id: 'forms-wizard',
            title: <FormattedMessage id="forms-wizard" />,
            type: 'item',
            url: '/forms/forms-wizard',
            icon: icons.IconStairsUp
        }
    ]
};

export default forms;
