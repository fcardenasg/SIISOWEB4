import { FormattedMessage } from 'react-intl';

import { IconUsers } from '@tabler/icons';

const icons = {
    IconUsers
};

const pages = {
    id: 'pages',
    title: <FormattedMessage id="Seguridad" />,
    type: 'group',
    children: [
        {
            id: 'admin',
            title: <FormattedMessage id="Administración" />,
            type: 'collapse',
            icon: icons.IconUsers,
            children: [
                {
                    id: 'register3',
                    title: <FormattedMessage id="register" />,
                    type: 'item',
                    url: '/user/list',
                },
                {
                    id: 'Usuarios',
                    title: <FormattedMessage id="Usuarios Firebase" />,
                    type: 'item',
                    url: '/userfire/list',
                },
                {
                    id: 'forgot-password3',
                    title: <FormattedMessage id="forgot-password" />,
                    type: 'item',
                    url: '/forgot-password/view',
                },
                {
                    id: 'check-mail3',
                    title: <FormattedMessage id="check-mail" />,
                    type: 'item',
                    url: '/user3/list',
                },
                {
                    id: 'reset-password3',
                    title: <FormattedMessage id="reset-password" />,
                    type: 'item',
                    url: '/user2/list',
                },
                {
                    id: 'code-verification3',
                    title: <FormattedMessage id="code-verification" />,
                    type: 'item',
                    url: '/user1/list',
                }
            ]
        }
    ]
}

export default pages;