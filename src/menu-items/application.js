// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconUserCheck,
    IconBasket,
    IconMessages,
    IconLayoutKanban,
    IconMail,
    IconCalendar,
    IconNfc,
    IconTool,
    IconHeartbeat,
    IconMessageReport,
    IconVirus
} from '@tabler/icons';

// constant
const icons = {
    IconUserCheck,
    IconBasket,
    IconMessages,
    IconLayoutKanban,
    IconMail,
    IconCalendar,
    IconNfc,
    IconTool,
    IconHeartbeat,
    IconMessageReport,
    IconVirus
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const application = {
    id: 'application',
    title: <FormattedMessage id="application" />,
    type: 'group',
    children: [
        {
            id: 'users',
            title: <FormattedMessage id="users" />,
            type: 'collapse',
            icon: icons.IconUserCheck,
            children: [
                {
                    id: 'assistance',
                    title: <FormattedMessage id="Historia Clínica" />,
                    type: 'item',
                    url: '/assistance/list'
                },
                {
                    id: 'evolutionnotes',
                    title: <FormattedMessage id="Nota de Evolución" />,
                    type: 'item',
                    url: '/evolutionnotes/list'
                },

                {
                    id: 'infirmary',
                    title: <FormattedMessage id="Nota de Enfermería" />,
                    type: 'item',
                    url: '/infirmary/list'
                },

                {
                    id: 'medicalformula',
                    title: <FormattedMessage id="Recetario" />,
                    type: 'item',
                    url: '/medicalformula/list'
                },

                {
                    id: 'account-profile',
                    title: <FormattedMessage id="account-profile" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'profile1',
                            title: (
                                <>
                                    <FormattedMessage id="profile" /> 01
                                </>
                            ),
                            type: 'item',
                            url: '/user/account-profile/profile1'
                        },
                        {
                            id: 'profile2',
                            title: (
                                <>
                                    <FormattedMessage id="profile" /> 02
                                </>
                            ),
                            type: 'item',
                            url: '/user/account-profile/profile2'
                        },
                        {
                            id: 'profile3',
                            title: (
                                <>
                                    <FormattedMessage id="profile" /> 03
                                </>
                            ),
                            type: 'item',
                            url: '/user/account-profile/profile3'
                        }
                    ]
                },
                {
                    id: 'user-card',
                    title: <FormattedMessage id="cards" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'card1',
                            title: (
                                <>
                                    <FormattedMessage id="style" /> 01
                                </>
                            ),
                            type: 'item',
                            url: '/user/card/card1'
                        },
                        {
                            id: 'card2',
                            title: (
                                <>
                                    <FormattedMessage id="style" /> 02
                                </>
                            ),
                            type: 'item',
                            url: '/user/card/card2'
                        },
                        {
                            id: 'card3',
                            title: (
                                <>
                                    <FormattedMessage id="style" /> 03
                                </>
                            ),
                            type: 'item',
                            url: '/user/card/card3'
                        }
                    ]
                },
                {
                    id: 'user-list',
                    title: <FormattedMessage id="list" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'list1',
                            title: (
                                <>
                                    <FormattedMessage id="style" /> 01
                                </>
                            ),
                            type: 'item',
                            url: '/user/list/list1'
                        },
                        {
                            id: 'list2',
                            title: (
                                <>
                                    <FormattedMessage id="style" /> 02
                                </>
                            ),
                            type: 'item',
                            url: '/user/list/list2'
                        }
                    ]
                }
            ]
        },
        {
            id: 'customer',
            title: <FormattedMessage id="customer" />,
            type: 'collapse',
            icon: icons.IconBasket,
            children: [
                {
                    id: 'occupationalexamination',
                    title: <FormattedMessage id="Historia clínica ocupacional" />,
                    type: 'item',
                    url: '/occupationalexamination/list',
                    breadcrumbs: true
                },
                {
                    id: 'work-absenteeism',
                    title: <FormattedMessage id="Ausentismo Laboral" />,
                    type: 'item',
                    url: '/work-absenteeism/list',
                    breadcrumbs: true
                },
                {
                    id: 'occupational-health',
                    title: <FormattedMessage id="Salud Ocupacional" />,
                    type: 'item',
                    url: '/occupational-health/list',
                    breadcrumbs: true
                },
                {
                    id: 'product',
                    title: <FormattedMessage id="product" />,
                    type: 'item',
                    url: '/customer/product',
                    breadcrumbs: false
                },
                {
                    id: 'product-review',
                    title: <FormattedMessage id="product-review" />,
                    type: 'item',
                    url: '/customer/product-review',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'contact',
            title: <FormattedMessage id="contact" />,
            type: 'collapse',
            icon: icons.IconNfc,
            children: [
                {
                    id: 'medicalAdvice',
                    title: <FormattedMessage id="Asesoría Médica" />,
                    type: 'item',
                    url: '/medicaladvice/list'
                },
                {
                    id: 'psychologicalCounseling',
                    title: <FormattedMessage id="Asesoría Psicológica" />,
                    type: 'item',
                    url: '/psychologicalcounseling/list'
                },
                {
                    id: 'otheradvice',
                    title: <FormattedMessage id="Otras Asesorías" />,
                    type: 'item',
                    url: '/otheradvice/list'
                }
            ]
        },
        {
            id: 'e-commerce',
            title: <FormattedMessage id="e-commerce" />,
            type: 'collapse',
            icon: icons.IconBasket,
            children: [
                {
                    id: 'products',
                    title: <FormattedMessage id="products" />,
                    type: 'item',
                    url: '/e-commerce/products'
                },
                {
                    id: 'product-details',
                    title: <FormattedMessage id="product-details" />,
                    type: 'item',
                    url: '/e-commerce/product-details/default',
                    breadcrumbs: false
                },
                {
                    id: 'product-list',
                    title: <FormattedMessage id="product-list" />,
                    type: 'item',
                    url: '/e-commerce/product-list',
                    breadcrumbs: false
                },
                {
                    id: 'checkout',
                    title: <FormattedMessage id="checkout" />,
                    type: 'item',
                    url: '/e-commerce/checkout'
                }
            ]
        },
        {
            id: 'components',
            title: <FormattedMessage id="components" />,
            type: 'collapse',
            icon: icons.IconHeartbeat,
            children: [
                {
                    id: 'autocomplete',
                    title: <FormattedMessage id="autocomplete" />,
                    type: 'item',
                    url: '/components/autocomplete',
                    breadcrumbs: false
                },
                {
                    id: 'button',
                    title: <FormattedMessage id="button" />,
                    type: 'item',
                    url: '/components/button',
                    breadcrumbs: false
                },
                {
                    id: 'checkbox',
                    title: <FormattedMessage id="checkbox" />,
                    type: 'item',
                    url: '/components/checkbox',
                    breadcrumbs: false
                },
                {
                    id: 'date-time',
                    title: <FormattedMessage id="date-time" />,
                    type: 'item',
                    url: '/components/date-time',
                    breadcrumbs: false
                },
                {
                    id: 'radio',
                    title: <FormattedMessage id="radio" />,
                    type: 'item',
                    url: '/components/radio',
                    breadcrumbs: false
                },
                {
                    id: 'slider',
                    title: <FormattedMessage id="slider" />,
                    type: 'item',
                    url: '/components/slider',
                    breadcrumbs: false
                },
                {
                    id: 'switch',
                    title: <FormattedMessage id="switch" />,
                    type: 'item',
                    url: '/components/switch',
                    breadcrumbs: false
                },
                {
                    id: 'text-field',
                    title: <FormattedMessage id="text-field" />,
                    type: 'item',
                    url: '/components/text-field',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'plugins',
            title: <FormattedMessage id="plugins" />,
            type: 'collapse',
            icon: icons.IconMessageReport,
            children: [
                {
                    id: 'frm-autocomplete',
                    title: <FormattedMessage id="autocomplete" />,
                    type: 'item',
                    url: '/forms/frm-autocomplete',
                    breadcrumbs: false
                },
                {
                    id: 'frm-mask',
                    title: <FormattedMessage id="mask" />,
                    type: 'item',
                    url: '/forms/frm-mask',
                    breadcrumbs: false
                },
                {
                    id: 'frm-clipboard',
                    title: <FormattedMessage id="clipboard" />,
                    type: 'item',
                    url: '/forms/frm-clipboard',
                    breadcrumbs: false
                },
                {
                    id: 'frm-recaptcha',
                    title: <FormattedMessage id="recaptcha" />,
                    type: 'item',
                    url: '/forms/frm-recaptcha',
                    breadcrumbs: false
                },
                {
                    id: 'frm-wysiwug',
                    title: <FormattedMessage id="wysiwug-editor" />,
                    type: 'item',
                    url: '/forms/frm-wysiwug',
                    breadcrumbs: false
                },
                {
                    id: 'frm-modal',
                    title: <FormattedMessage id="modal" />,
                    type: 'item',
                    url: '/forms/frm-modal',
                    breadcrumbs: false
                },
                {
                    id: 'frm-tooltip',
                    title: <FormattedMessage id="tooltip" />,
                    type: 'item',
                    url: '/forms/frm-tooltip'
                }
            ]
        },
        {
            id: 'layouts',
            title: 'Pandemias',
            type: 'collapse',
            icon: icons.IconVirus,
            children: [
                {
                    id: 'frm-layouts',
                    title: <FormattedMessage id="layouts" />,
                    type: 'item',
                    url: '/forms/layouts/layouts'
                },
                {
                    id: 'frm-multi-column-forms',
                    title: <FormattedMessage id="multi-column-forms" />,
                    type: 'item',
                    url: '/forms/layouts/multi-column-forms'
                },
                {
                    id: 'frm-action-bar',
                    title: <FormattedMessage id="action-bar" />,
                    type: 'item',
                    url: '/forms/layouts/action-bar'
                },
                {
                    id: 'frm-sticky-action-bar',
                    title: <FormattedMessage id="sticky-action-bar" />,
                    type: 'item',
                    url: '/forms/layouts/sticky-action-bar'
                }
            ]
        },
        {
            id: 'advance',
            title: <FormattedMessage id="Parametrización" />,
            type: 'collapse',
            icon: icons.IconTool,
            children: [
                {
                    id: 'alert',
                    title: <FormattedMessage id="Tipo Catálogo" />,
                    type: 'item',
                    url: '/typecatalog/list',
                    breadcrumbs: false
                },
                {
                    id: 'dialog',
                    title: <FormattedMessage id="Catálogo" />,
                    type: 'item',
                    url: '/catalog/list',
                    breadcrumbs: false
                },
                {
                    id: 'pagination',
                    title: <FormattedMessage id="Empresas" />,
                    type: 'item',
                    url: '/company/list',
                    breadcrumbs: false
                },
                {
                    id: 'progress',
                    title: <FormattedMessage id="Proveedor" />,
                    type: 'item',
                    url: '/supplier/list',
                    breadcrumbs: false
                },
                {
                    id: 'rating',
                    title: <FormattedMessage id="CIE11" />,
                    type: 'item',
                    url: '/cie11/list',
                    breadcrumbs: false
                },
                {
                    id: 'snackbar',
                    title: <FormattedMessage id="Plantilla" />,
                    type: 'item',
                    url: '/template/list',
                    breadcrumbs: false
                },
                {
                    id: 'skeleton',
                    title: <FormattedMessage id="skeleton" />,
                    type: 'item',
                    url: '/advance/skeleton',
                    breadcrumbs: false
                },
                {
                    id: 'speeddial',
                    title: <FormattedMessage id="speeddial" />,
                    type: 'item',
                    url: '/advance/speeddial',
                    breadcrumbs: false
                },
                {
                    id: 'timeline',
                    title: <FormattedMessage id="timeline" />,
                    type: 'item',
                    url: '/advance/timeline',
                    breadcrumbs: false
                },
                {
                    id: 'toggle-button',
                    title: <FormattedMessage id="toggle-button" />,
                    type: 'item',
                    url: '/advance/toggle-button',
                    breadcrumbs: false
                },
                {
                    id: 'treeview',
                    title: <FormattedMessage id="treeview" />,
                    type: 'item',
                    url: '/advance/treeview',
                    breadcrumbs: false
                }
            ]
        },
    ]
};

export default application;
