import uuid from 'uuid/v1';
import moment from 'moment';
import mock from 'src/utils/mock';
import PT from 'prop-types';

export const signType = {"결재": 10, "합의": 20, "참조": 30};

// eslint-disable-next-line import/prefer-default-export
export const users = {
  id: PT.number.isRequired,
  name: PT.string.isRequired,
  avatar: PT.string.isRequired,
  department: PT.string.isRequired,
  position: PT.string.isRequired,
  signType: PT.number.isRequired,
  order: PT.number.isRequired
};


mock.onGet('/api/allUsers').reply(200, {
  users: [
    {
      id: uuid(),
      name: '이철용',
      avatar: '/images/avatars/avatar_4.png',
      department: '전산팀',
      position: '부장',
      signType: signType["결재"]
    },
    {
      id: uuid(),
      name: '이승우',
      avatar: '/images/avatars/avatar_1.png',
      department: '전산팀',
      position: '주임',
      signType: signType["합의"]
    },
    {
      id: uuid(),
      name: '김해림',
      avatar: '/images/avatars/avatar_2.png',
      department: '구매팀',
      position: '주임',
      signType: signType["결재"]
    },
    {
      id: uuid(),
      name: '윤주영',
      avatar: '/images/avatars/avatar_4.png',
      department: '임원',
      position: '부사장',
      signType: signType["결재"]
    },
    {
      id: uuid(),
      name: '홍길동',
      avatar: '/images/avatars/avatar_1.png',
      department: '총무',
      position: '차장',
      signType: signType["결재"]
    },
    {
      id: uuid(),
      name: '이철용',
      avatar: '/images/avatars/avatar_4.png',
      department: '전산팀',
      position: '부장',
      signType: signType["결재"]
    },
    {
      id: uuid(),
      name: '김해림',
      avatar: '/images/avatars/avatar_2.png',
      department: '구매팀',
      position: '주임',
      signType: signType["결재"]
    },
    {
      id: uuid(),
      name: '윤주영',
      avatar: '/images/avatars/avatar_4.png',
      department: '임원',
      position: '부사장',
      signType: signType["결재"]
    },
    {
      id: uuid(),
      name: '홍길동',
      avatar: '/images/avatars/avatar_1.png',
      department: '총무',
      position: '차장',
      signType: signType["결재"]
    },
    {
      id: uuid(),
      name: '이철용',
      avatar: '/images/avatars/avatar_4.png',
      department: '전산팀',
      position: '부장',
      signType: signType["결재"]
    },
    {
      id: uuid(),
      name: '김해림',
      avatar: '/images/avatars/avatar_2.png',
      department: '구매팀',
      position: '주임',
      signType: signType["결재"]
    },
    {
      id: uuid(),
      name: '윤주영',
      avatar: '/images/avatars/avatar_4.png',
      department: '임원',
      position: '부사장',
      signType: signType["결재"]
    },
    {
      id: uuid(),
      name: '홍길동',
      avatar: '/images/avatars/avatar_1.png',
      department: '총무',
      position: '차장',
      signType: signType["결재"]
    },
  ]
});

mock.onGet('/api/defaultUsers').reply(200, {
  users: [
    {
      id: uuid(),
      name: '이철용',
      avatar: '/images/avatars/avatar_4.png',
      department: '전산팀',
      position: '부장',
      signType: signType["결재"],
      order: 0
    },
    {
      id: uuid(),
      name: '이병학',
      avatar: '/images/avatars/avatar_3.png',
      department: '구매팀',
      position: '대리',
      signType: signType["합의"],
      order: 1
    },
    {
      id: uuid(),
      name: '윤주영',
      avatar: '/images/avatars/avatar_4.png',
      department: '임원',
      position: '부사장',
      signType: signType["결재"],
      order: 2
    },
    {
      id: uuid(),
      name: '홍길동',
      avatar: '/images/avatars/avatar_1.png',
      department: '총무',
      position: '차장',
      signType: signType["참조"],
      order: 3
    },
  ]
});

mock.onGet('/api/departmentUsers').reply(200, {
  users: [
    {
      id: uuid(),
      name: '이철용',
      avatar: '/images/avatars/avatar_4.png',
      department: '전산팀',
      position: '부장',
      signType: signType["결재"],
      order: 0
    },
    {
      id: uuid(),
      name: '윤주영',
      avatar: '/images/avatars/avatar_4.png',
      department: '임원',
      position: '부사장',
      signType: signType["결재"],
      order: 2
    },
  ]
});
