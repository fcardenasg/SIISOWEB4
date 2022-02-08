// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconClipboardCheck, IconPictureInPicture, IconForms, IconBorderAll, IconChartDots, IconStairsUp } from '@tabler/icons';

// constant
const icons = {
    IconClipboardCheck,
    IconPictureInPicture,
    IconForms,
    IconBorderAll,
    IconChartDots,
    IconStairsUp
};

// ==============================|| UI FORMS MENU ITEMS ||============================== //

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
