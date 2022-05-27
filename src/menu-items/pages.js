// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconKey, IconReceipt2, IconBug, IconBellRinging, IconPhoneCall } from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconReceipt2,
    IconBug,
    IconBellRinging,
    IconPhoneCall
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: <FormattedMessage id="Seguridad" />,
    // caption: <FormattedMessage id="pages-caption" />,
    type: 'group',
    children: [
        {
            id: 'authentication3',
            title: (
                <>
                    <FormattedMessage id="Administración" />
                </>
            ),
            type: 'collapse',
            children: [
                {
                    id: 'register3',
                    title: <FormattedMessage id="register" />,
                    type: 'item',
                    url: '/pages/register/register3',
                    target: true
                },
                {
                    id: 'forgot-password3',
                    title: <FormattedMessage id="forgot-password" />,
                    type: 'item',
                    url: '/pages/forgot-password/forgot-password3',
                    target: true
                },
                {
                    id: 'check-mail3',
                    title: <FormattedMessage id="check-mail" />,
                    type: 'item',
                    url: '/pages/check-mail/check-mail3',
                    target: true
                },
                {
                    id: 'reset-password3',
                    title: <FormattedMessage id="reset-password" />,
                    type: 'item',
                    url: '/pages/reset-password/reset-password3',
                    target: true
                },
                {
                    id: 'code-verification3',
                    title: <FormattedMessage id="code-verification" />,
                    type: 'item',
                    url: '/pages/code-verification/code-verification3',
                    target: true
                }
            ]
        }
    ]
}
//     {
//         id: 'price',
//         title: <FormattedMessage id="pricing" />,
//         type: 'collapse',
//         icon: icons.IconReceipt2,
//         children: [
//             {
//                 id: 'price1',
//                 title: (
//                     <>
//                         <FormattedMessage id="price" /> 01
//                     </>
//                 ),
//                 type: 'item',
//                 url: '/pages/price/price1'
//             },
//             {
//                 id: 'price2',
//                 title: (
//                     <>
//                         <FormattedMessage id="price" /> 02
//                     </>
//                 ),
//                 type: 'item',
//                 url: '/pages/price/price2'
//             }
//         ]
//     },
//     {
//         id: 'maintenance',
//         title: <FormattedMessage id="maintenance" />,
//         type: 'collapse',
//         icon: icons.IconBug,
//         children: [
//             {
//                 id: 'error',
//                 title: <FormattedMessage id="error-404" />,
//                 type: 'item',
//                 url: '/pages/error',
//                 target: true
//             },
//             {
//                 id: 'coming-soon',
//                 title: <FormattedMessage id="coming-soon" />,
//                 type: 'collapse',
//                 children: [
//                     {
//                         id: 'coming-soon1',
//                         title: (
//                             <>
//                                 <FormattedMessage id="coming-soon" /> 01
//                             </>
//                         ),
//                         type: 'item',
//                         url: '/pages/coming-soon1',
//                         target: true
//                     },
//                     {
//                         id: 'coming-soon2',
//                         title: (
//                             <>
//                                 <FormattedMessage id="coming-soon" /> 02
//                             </>
//                         ),
//                         type: 'item',
//                         url: '/pages/coming-soon2',
//                         target: true
//                     }
//                 ]
//             },
//             {
//                 id: 'under-construction',
//                 title: <FormattedMessage id="under-construction" />,
//                 type: 'item',
//                 url: '/pages/under-construction',
//                 target: true
//             }
//         ]
//     },
//     {
//         id: 'landing',
//         title: <FormattedMessage id="landing" />,
//         type: 'item',
//         icon: icons.IconBellRinging,
//         url: '/pages/landing',
//         target: true
//     },
//     {
//         id: 'contact-us',
//         title: <FormattedMessage id="contact-us" />,
//         type: 'item',
//         icon: icons.IconPhoneCall,
//         url: '/pages/contact-us',
//         target: true
//     }
// ]
//};

export default pages;
