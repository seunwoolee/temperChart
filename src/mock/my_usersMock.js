import uuid from 'uuid/v1';
import moment from 'moment';
import mock from 'src/utils/mock';
import PT from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const users = {
  id: PT.number.isRequired,
  이름: PT.string.isRequired,
  avatar: PT.string.isRequired,
  부서: PT.string.isRequired,
  직책: PT.string.isRequired,
};


mock.onGet('/api/users').reply(200, {
  users: [
    {
      id: uuid(),
      이름: '이철용',
      avatar: '/images/avatars/avatar_4.png',
      부서: '전산팀',
      직책: '부장',
    },
    {
      id: uuid(),
      이름: '이승우',
      avatar: '/images/avatars/avatar_1.png',
      부서: '전산팀',
      직책: '주임',
    },
    {
      id: uuid(),
      이름: '서태호',
      avatar: '/images/avatars/avatar_2.png',
      부서: '전산팀',
      직책: '과장',
    },
    {
      id: uuid(),
      이름: '이병학',
      avatar: '/images/avatars/avatar_3.png',
      부서: '구매팀',
      직책: '대리',
    },
    {
      id: uuid(),
      이름: '김해림',
      avatar: '/images/avatars/avatar_2.png',
      부서: '구매팀',
      직책: '주임',
    },
    {
      id: uuid(),
      이름: '윤주영',
      avatar: '/images/avatars/avatar_4.png',
      부서: '임원',
      직책: '부사장',
    },
    {
      id: uuid(),
      이름: '홍길동',
      avatar: '/images/avatars/avatar_1.png',
      부서: '총무',
      직책: '차장',
    },
  ]
});
