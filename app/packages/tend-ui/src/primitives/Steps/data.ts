import {
  ApprovalGroupStep,
  ApprovalProcessStep,
  ApprovalUserStep,
  Items,
} from '../StepsHistoryApproval/types';

export const steps: Items = [
  {
    title: 'Заголовок 1',
    description: 'Описание 1',
    step: {
      stepType: 'start',
    },
  },
  {
    title: 'Заголовок 2',
    description: 'Описание 2',
    step: {
      stepType: 'future',
    },
  },
  {
    title: 'Заголовок 3',
    description: 'Описание 3',
    step: {
      stepType: 'future',
    },
  },
  {
    title: 'Заголовок 4',
    description: 'Описание 4',
    step: {
      stepType: 'disabled',
    },
  },
  {
    title: 'Заголовок 5',
    description: 'Описание 5',
    disabled: true,
    step: {
      stepType: 'cancel',
    },
  },
];

export const items: ApprovalProcessStep[] = [
  {
    id: 'uuid',
    title:
      'First stepFirst stepFirst stepFirst stepFirst stepFirst stepFirst stepFirst stepFirst stepFirst stepFirst stepFirst stepFirst stepFirst stepFirst stepFirst stepFirst stepFirst stepFirst stepFirst stepFirst stepFirst stepFirst stepFirst stepFirst stepFirst step',
    docId: 'uuid',
    step: {
      id: 'uuid',
      name: 'First step',
      routeId: 'uuid',
      stepType: 'start',
    },
    user: {
      id: 1,
      username: 'test',
      firstName: 'Testovich',
      lastName: 'Testov',
      position: 'Frontend',
      email: 'test@example.com',
    },
    group: {
      id: 123,
      name: 'Group name',
    },
    created: '2023-10-05 15:45',
    updated: '2023-10-05 15:45',
    deleted: null,
    comment: '',
  },
  {
    id: 'uuid',
    title: 'First step',
    docId: 'uuid',
    step: {
      id: 'uuid',
      name: 'First step',
      routeId: 'uuid',
      stepType: 'cancel',
    },
    user: {
      id: 2,
      username: 'test',
      firstName: 'Testovich',
      lastName: 'Testov',
      position: 'Frontend',
      email: 'test@example.com',
    },
    created: '2023-10-05 15:45',
    updated: '2023-10-05 15:45',
    deleted: null,
    comment:
      'Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com. Посетите наш сайт http://example.com  для подробностей. Такжеыыыыыыыыыыы https://docs.example.com. https://docs.example.com.Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com.Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com.Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com.Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com.Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com.Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com.Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com.Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com.Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com.Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com.Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com.',
  },
  {
    id: 'uuid',
    title: 'Disabled',
    docId: 'uuid',
    step: {
      id: 'uuid',
      name: 'Disabled',
      routeId: 'uuid',
      stepType: 'disabled',
    },
  },
  {
    id: 'uuid',
    title: 'First step',
    docId: 'uuid',
    step: {
      id: 'uuid',
      name: 'First step',
      routeId: 'uuid',
      stepType: 'finish',
    },
    user: {
      id: 3,
      username: 'test',
      firstName: 'Testovich',
      lastName: 'Testov',
      position: 'Frontend',
      email: 'test@example.com',
    },
    group: {
      id: 123,
      name: 'Group name',
    },
    created: '2023-10-05 15:45',
    updated: '2023-10-05 15:45',
    deleted: null,
    comment:
      'Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com. Посетите наш сайт http://example.com  для подробностей. Такжеыыыыыыыыыыы https://docs.example.com. https://docs.example.com.Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com. Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com.Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com.Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com.Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com.Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com.Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com.Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com.Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com.Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com.Посетите наш сайт http://example.com  для подробностей. Также можно посмотреть https://docs.example.com.',
  },
];

export const currentStepUsers: ApprovalUserStep[] = [
  {
    user: {
      id: 1,
      username: 'test',
      firstName: 'Testovich',
      lastName: 'Testov',
      position: 'Frontend',
      email: 'test@example.com',
    },
  },
  {
    user: {
      id: 2,
      username: 'test',
      firstName: 'Testovich',
      lastName: 'Testov',
      position: 'Frontend',
      email: 'test@example.com',
    },
  },
  {
    user: {
      id: 3,
      username: 'test',
      firstName: 'Testovich',
      lastName: 'Testov',
      position: 'Frontend',
      email: 'test@example.com',
    },
  },
  {
    user: {
      id: 4,
      username: 'test',
      firstName: 'Testovich',
      lastName: 'Testov',
      position: 'Frontend',
      email: 'test@example.com',
    },
  },
  {
    user: {
      id: 5,
      username: 'test',
      firstName: 'Testovich',
      lastName: 'Testov',
      position: 'Frontend',
      email: 'test@example.com',
    },
  },
  {
    user: {
      id: 6,
      username: 'test',
      firstName: 'Testovich',
      lastName: 'Testov',
      position: 'Frontend',
      email: 'test@example.com',
    },
  },
  {
    user: {
      id: 7,
      username: 'test',
      firstName: 'Testovich',
      lastName: 'Testov',
      position: 'Frontend',
      email: 'test@example.com',
    },
  },
  {
    user: {
      id: 8,
      username: 'test',
      firstName: 'Testovich',
      lastName: 'Testov',
      position: 'Frontend',
      email: 'test@example.com',
    },
  },
];

export const currentStepGroup: ApprovalGroupStep[] = [
  {
    group: {
      id: 1,
      name: 'PTO',
      users: [
        {
          id: 1,
          username: 'test',
          firstName: 'Testovich',
          lastName: 'Testov',
          position: 'Frontend',
          email: 'test@example.com',
        },
        {
          id: 2,
          username: 'test',
          firstName: 'Testovich',
          lastName: 'Testov',
          position: 'Frontend',
          email: 'test@example.com',
        },
      ],
    },
  },
  {
    group: {
      id: 2,
      name: 'PTO',
      users: [
        {
          id: 3,
          username: 'test',
          firstName: 'Testovich',
          lastName: 'Testov',
          position: 'Frontend',
          email: 'test@example.com',
        },
        {
          id: 4,
          username: 'test',
          firstName: 'Testovich',
          lastName: 'Testov',
          position: 'Frontend',
          email: 'test@example.com',
        },
        {
          id: 5,
          username: 'test',
          firstName: 'Testovich',
          lastName: 'Testov',
          position: 'Frontend',
          email: 'test@example.com',
        },
        {
          id: 6,
          username: 'test',
          firstName: 'Testovich',
          lastName: 'Testov',
          position: 'Frontend',
          email: 'test@example.com',
        },
        {
          id: 7,
          username: 'test',
          firstName: 'Testovich',
          lastName: 'Testov',
          position: 'Frontend',
          email: 'test@example.com',
        },
        {
          id: 8,
          username: 'test',
          firstName: 'Testovich',
          lastName: 'Testov',
          position: 'Frontend',
          email: 'test@example.com',
        },
      ],
    },
  },
];
