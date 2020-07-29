import React from 'react';
import AssessmentIcon from '@material-ui/icons/Assessment';

export function MY_navConfig() {
  return [
    {
      subheader: '차트',
      items: [
        {
          title: '온도차트',
          href: '/dashboards/default',
          icon: AssessmentIcon,
        },
        {
          title: '온도차트2',
          href: '/dashboards/analytics',
          icon: AssessmentIcon,
        },
      ]
    },
  ];
}
