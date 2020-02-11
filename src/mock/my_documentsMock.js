import uuid from 'uuid/v1';
import mock from 'src/utils/mock';
import PT from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const documents = {
  id: PT.string.isRequired,
  title: PT.string.isRequired,
  content: PT.string.isRequired,
  attachments: PT.object.isRequired,
  approvers: PT.array.isRequired
};


mock.onGet('/api/documents').reply(200, {
  invoices: [
    {
      id: uuid(),
      title: '오라클 유지보수비',
      content: 'PNS 정보 오라클 유지보수비',
      attachments: '',
      approvers: '2020-01-02',
    },
  ]
});
