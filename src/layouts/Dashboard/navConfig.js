import React from 'react';
import {colors} from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import ReceiptRoundedIcon from '@material-ui/icons/ReceiptRounded';
import CreateIcon from '@material-ui/icons/Create';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import SettingsIcon from '@material-ui/icons/Settings';
import Label from 'src/components/Label';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import AssessmentIcon from '@material-ui/icons/Assessment';

export function MY_navConfig() {
  return [
    {
      subheader: '차트',
      items: [
        {
          title: '온도차트',
          href: '/dashboards/analytics',
          icon: AssessmentIcon,
        },
      ]
    },
    // {
    //   subheader: 'Pages',
    //   items: [
    //     {
    //       title: 'Overview',
    //       href: '/overview',
    //       icon: CreateIcon
    //     },
    //     {
    //       title: 'Dashboards',
    //       href: '/dashboards',
    //       icon: AssessmentIcon,
    //       items: [
    //         {
    //           title: 'Default',
    //           href: '/dashboards/default'
    //         },
    //         {
    //           title: 'Analytics',
    //           href: '/dashboards/analytics'
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Management',
    //       href: '/management',
    //       icon: CreateIcon,
    //       items: [
    //         {
    //           title: 'Customers',
    //           href: '/management/customers'
    //         },
    //         {
    //           title: 'Customer Details',
    //           href: '/management/customers/1/summary'
    //         },
    //         {
    //           title: 'Projects',
    //           href: '/management/projects'
    //         },
    //         {
    //           title: 'Orders',
    //           href: '/management/orders'
    //         },
    //         {
    //           title: 'Order Details',
    //           href: '/management/orders/1'
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Social Feed',
    //       href: '/social-feed',
    //       icon: CreateIcon
    //     },
    //     {
    //       title: 'Profile',
    //       href: '/profile',
    //       icon: CreateIcon,
    //       items: [
    //         {
    //           title: 'Timeline',
    //           href: '/profile/1/timeline'
    //         },
    //         {
    //           title: 'Connections',
    //           href: '/profile/1/connections'
    //         },
    //         {
    //           title: 'Projects',
    //           href: '/profile/1/projects'
    //         },
    //         {
    //           title: 'Reviews',
    //           href: '/profile/1/reviews'
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Project',
    //       href: '/projects',
    //       icon: CreateIcon,
    //       items: [
    //         {
    //           title: 'Browse',
    //           href: '/projects'
    //         },
    //         {
    //           title: 'Create',
    //           href: '/projects/create'
    //         },
    //         {
    //           title: 'Overview',
    //           href: '/projects/1/overview'
    //         },
    //         {
    //           title: 'Files',
    //           href: '/projects/1/files'
    //         },
    //         {
    //           title: 'Activity',
    //           href: '/projects/1/activity'
    //         },
    //         {
    //           title: 'Subscribers',
    //           href: '/projects/1/subscribers'
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Invoice',
    //       href: '/documents/1',
    //       icon: ReceiptIcon
    //     },
    //     {
    //       title: 'Kanban Board',
    //       href: '/kanban-board',
    //       icon: CreateIcon
    //     },
    //     {
    //       title: 'Mail',
    //       href: '/mail',
    //       icon: CreateIcon,
    //       label: () => (
    //         <Label
    //           color={colors.red[500]}
    //           shape="rounded"
    //         >
    //           2
    //         </Label>
    //       )
    //     },
    //     {
    //       title: 'Chat',
    //       href: '/chat',
    //       icon: CreateIcon,
    //       label: () => (
    //         <Label
    //           color={colors.red[500]}
    //           shape="rounded"
    //         >
    //           4
    //         </Label>
    //       )
    //     },
    //     {
    //       title: 'Calendar',
    //       href: '/calendar',
    //       icon: CreateIcon,
    //       label: () => <Label color={colors.green[500]}>New</Label>
    //     },
    //     {
    //       title: 'Settings',
    //       href: '/settings',
    //       icon: SettingsIcon,
    //       items: [
    //         {
    //           title: 'General',
    //           href: '/settings/general'
    //         },
    //         {
    //           title: 'Subscription',
    //           href: '/settings/subscription'
    //         },
    //         {
    //           title: 'Notifications',
    //           href: '/settings/notifications'
    //         },
    //         {
    //           title: 'Security',
    //           href: '/settings/security'
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Authentication',
    //       href: '/auth',
    //       icon: CreateIcon,
    //       items: [
    //         {
    //           title: 'Login',
    //           href: '/auth/login'
    //         },
    //         {
    //           title: 'Register',
    //           href: '/auth/register'
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Errors',
    //       href: '/errors',
    //       icon: CreateIcon,
    //       items: [
    //         {
    //           title: 'Error 401',
    //           href: '/errors/error-401'
    //         },
    //         {
    //           title: 'Error 404',
    //           href: '/errors/error-404'
    //         },
    //         {
    //           title: 'Error 500',
    //           href: '/errors/error-500'
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   subheader: 'Support',
    //   items: [
    //     {
    //       title: 'Components',
    //       href: '/components',
    //       icon: CreateIcon,
    //       items: [
    //         {
    //           title: 'Buttons',
    //           href: '/components/buttons'
    //         },
    //         {
    //           title: 'Cards',
    //           href: '/components/cards'
    //         },
    //         {
    //           title: 'Chips',
    //           href: '/components/chips'
    //         },
    //         {
    //           title: 'Lists',
    //           href: '/components/lists'
    //         },
    //         {
    //           title: 'Forms',
    //           href: '/components/forms'
    //         },
    //         {
    //           title: 'Modals',
    //           href: '/components/modals'
    //         },
    //         {
    //           title: 'Typography',
    //           href: '/components/typography'
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Presentation',
    //       href: '/presentation',
    //       icon: CreateIcon
    //     },
    //     {
    //       title: 'Getting started',
    //       href: '/getting-started',
    //       icon: CreateIcon
    //     },
    //     {
    //       title: 'Changelog',
    //       href: '/changelog',
    //       icon: CreateIcon,
    //       label: () => <Label color={colors.blue['500']}>v1.3.0</Label>
    //     }
    //   ]
    // }
  ];
}
