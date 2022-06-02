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
    IconVirus,
    IconEyeglass
} from '@tabler/icons';

// constant
const icons = {
    IconEyeglass,
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
                    url: '/evolution-note/list'
                },
                {
                    id: 'infirmary',
                    title: <FormattedMessage id="Nota de Enfermería" />,
                    type: 'item',
                    url: '/note-infirmary/list'
                },
                {
                    id: 'alcoholanddrugtesting',
                    title: <FormattedMessage id="Prueba de Alcohol y Drogas" />,
                    type: 'item',
                    url: '/alcoholanddrugtesting/list'
                },
                {
                    id: 'medicalformula',
                    title: <FormattedMessage id="Recetario" />,
                    type: 'item',
                    url: '/medicalformula/list'
                },
                {
                    id: 'taxi',
                    title: <FormattedMessage id="Taxi" />,
                    type: 'collapse',
                    children: [
                        // {
                        //     id: 'profile1',
                        //     title: (
                        //         <>
                        //             <FormattedMessage id="Rutas de Taxis" />
                        //         </>
                        //     ),
                        //     type: 'item',
                        //     url: '/user/account-profile/profile1'
                        // },
                        // {
                        //     id: 'profile2',
                        //     title: (
                        //         <>
                        //             <FormattedMessage id="Destino de Taxis" />
                        //         </>
                        //     ),
                        //     type: 'item',
                        //     url: '/user/account-profile/profile2'
                        // },
                        {
                            id: 'profile3',
                            title: (
                                <>
                                    <FormattedMessage id="Solicitud de Taxi" />
                                </>
                            ),
                            type: 'item',
                            url: '/user/account-profile/profile3'
                        }
                    ]
                },
                {
                    id: 'user-card',
                    title: <FormattedMessage id="Fisioterapia" />,
                    type: 'item',
                    url: '/user/card/card1'
                },
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
                    title: <FormattedMessage id="Historia Clínica Ocupacional" />,
                    type: 'item',
                    url: '/occupational-examination/list',
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
                    id: 'history',
                    title: <FormattedMessage id="Historico Ausentismo" />,
                    type: 'item',
                    url: '/customer/product-review',
                    breadcrumbs: false
                },
            
                {
                    id: 'product',
                    title: <FormattedMessage id="Medicina Laboral" />,
                    type: 'item',
                    url: '/occupationalmedicine/list',
                    breadcrumbs: true
                },
                {
                    id: 'product-re',
                    title: <FormattedMessage id="Reintegro Laboral" />,
                    type: 'item',
                    url: '/customer/product-review',
                    breadcrumbs: false
                },
                {
                    id: 'work',
                    title: <FormattedMessage id="Trabajo En Altura" />,
                    type: 'item',
                    url: '/customer/product-review',
                    breadcrumbs: false
                },
                {
                    id: 'history',
                    title: <FormattedMessage id="Accidente De Trabajo" />,
                    type: 'item',
                    url: '/customer/product-review',
                    breadcrumbs: false
                },
                {
                    id: 'investigacion',
                    title: <FormattedMessage id="Investigación Laboral" />,
                    type: 'item',
                    url: '/customer/product-review',
                    breadcrumbs: false
                },
                {
                    id: 'Framingham ',
                    title: <FormattedMessage id="Framingham" />,
                    type: 'item',
                    url: '/customer/product-review',
                    breadcrumbs: false
                },
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
                    id: 'charges',
                    title: <FormattedMessage id="Panorama De Cargo" />,
                    type: 'item',
                    url: '/charges/list'
                },
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
                    title: <FormattedMessage id="Ordenes" />,
                    type: 'item',
                    url: '/components/autocomplete',
                    breadcrumbs: false
                },
                {
                    id: 'button',
                    title: <FormattedMessage id="Audiometría" />,
                    type: 'item',
                    url: '/components/button',
                    breadcrumbs: false
                },
                {
                    id: 'checkbox',
                    title: <FormattedMessage id="Electrocardiograma" />,
                    type: 'item',
                    url: '/components/checkbox',
                    breadcrumbs: false
                },
                {
                    id: 'date-time',
                    title: <FormattedMessage id="Espirometría" />,
                    type: 'item',
                    url: '/components/date-time',
                    breadcrumbs: false
                },
                {
                    id: 'radio',
                    title: <FormattedMessage id="Laboratorios" />,
                    type: 'item',
                    url: '/components/radio',
                    breadcrumbs: false
                },
                {
                    id: 'slider',
                    title: <FormattedMessage id="RX de Torax" />,
                    type: 'item',
                    url: '/components/slider',
                    breadcrumbs: false
                },
                {
                    id: 'switch',
                    title: <FormattedMessage id="Visiometria" />,
                    type: 'item',
                    url: '/components/switch',
                    breadcrumbs: false
                },
                {
                    id: 'text-field',
                    title: <FormattedMessage id="RMN" />,
                    type: 'item',
                    url: '/components/text-field',
                    breadcrumbs: false
                },
                {
                    id: 'psa',
                    title: <FormattedMessage id="PSA" />,
                    type: 'item',
                    url: '/components/text-field',
                    breadcrumbs: false
                },
                {
                    id: 'citologia',
                    title: <FormattedMessage id="Citología" />,
                    type: 'item',
                    url: '/components/text-field',
                    breadcrumbs: false
                },
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
                    title: <FormattedMessage id="PQRSD" />,
                    type: 'item',
                    url: '/forms/frm-autocomplete',
                    breadcrumbs: false
                },
            ]
        },
        {
            id: 'users',
            title: <FormattedMessage id="Ordenes EPP" />,
            type: 'collapse',
            icon: icons.IconEyeglass,
            children: [
                {
                    id: 'frm-multi-column-forms',
                    title: <FormattedMessage id="Individuales" />,
                    type: 'item',
                    url: '/forms/layouts/multi-column-forms'
                },
                {
                    id: 'frm-multi-column-forms',
                    title: <FormattedMessage id="Masivas" />,
                    type: 'item',
                    url: '/forms/layouts/multi-column-forms'
                },
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
                    title: <FormattedMessage id="Registro Aislamiento" />,
                    type: 'item',
                    url: '/forms/layouts/layouts'
                },
                {
                    id: 'frm-multi-column-forms',
                    title: <FormattedMessage id="Vacunas" />,
                    type: 'item',
                    url: '/forms/layouts/multi-column-forms'
                },
                {
                    id: 'frm-action-bar',
                    title: <FormattedMessage id="Ordenes de Laboratorio" />,
                    type: 'item',
                    url: '/forms/layouts/action-bar'
                },
                {
                    id: 'censo',
                    title: <FormattedMessage id="Cuestionario y Censo" />,
                    type: 'item',
                    url: '/forms/layouts/sticky-action-bar'
                },
                {
                    id: 'tablerocontrol',
                    title: <FormattedMessage id="Tablero de Control" />,
                    type: 'item',
                    url: '/forms/layouts/sticky-action-bar'
                },
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
                    id: 'skeleton',
                    title: <FormattedMessage id="Items" />,
                    type: 'item',
                    url: '/item/list',
                    breadcrumbs: false
                },
                {
                    id: 'snackbar',
                    title: <FormattedMessage id="Plantilla" />,
                    type: 'item',
                    url: '/template/list',
                    breadcrumbs: false
                },
            ]
        },
    ]
};

export default application;