import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '@rovna-ui/grid';
import { Apps } from '@rovna-ui/icons';
import { Paragraph } from '@rovna-ui/typography';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import { action } from 'storybook/actions';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import {
  Stand as HeaderStand,
  SamoletProfile,
  SamoletService,
  STANDS as stands,
} from '@rovna-ui/types';
import { SMaterials } from '@rovna-ui/logos';
import { Profile as _Profile } from '@rovna-ui/components/components';
import { BrowserRouter, Link } from 'react-router-dom';
import { argTypes } from '@rovna-ui/tools';
import { Radio } from '@rovna-ui/components/primitives';
import {
  pendingFixture,
  rejectFixture,
  resolveFixture,
  timeoutFixture,
} from '@rovna-internal/components/stories/asyncFixtures';

import { NavigationItem } from '@rovna-internal/header/core/types';

import { SAMOLET_SERVICES } from '../../../tend-ui-types/src/SamoletService';
import docs from './docs.json';
import { SamoletHeader } from './SamoletHeader';

const projectResponse = {
  results: [
    { id: 1, name: 'Алхимово' },
    { id: 2, name: 'Вереск' },
    { id: 3, name: 'Пригород Лесное' },
    { id: 4, name: 'Егорово Парк' },
  ],
};
const loadProjects = () => Promise.resolve(projectResponse);

const meta: Meta<typeof SamoletHeader> = {
  title: 'Rovna UI/Header/SamoletHeader',
  component: SamoletHeader,
  argTypes: argTypes(docs),
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    mockData: [
      {
        url: '/api/services/header/',
        delay: 0,
        method: 'GET',
        status: 200,
        response: {
          lk: false,
          categories: [
            {
              name: 'Управление',
              services: [
                {
                  id: 3,
                  name: 'S.Center',
                  shortDescription: 'Система контроля сроков всего девелоперского цикла',
                  icon: {
                    id: 29,
                    file: '/minio/spro-stage/media/system/1691408792855604/scentr.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=spro-stage%2F20240724%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240724T212546Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=947b0f165a3a6b06b6e0621f18b971248f37a9c1d22eba3fff20059a84d541f8',
                    fileName: 'scentr.svg',
                    type: '',
                  },
                  tuiIconName: 'scenter',
                  link: '',
                  externalId: 3,
                  isActive: true,
                },
                {
                  id: 9,
                  name: 'S.Project',
                  shortDescription:
                    'Система контроля своевременного выпуска рабочей документации \r\nдля строительных объектов',
                  icon: {
                    id: 35,
                    file: '/minio/spro-stage/media/system/1691410787492651/sproject.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=spro-stage%2F20240724%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240724T212546Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=bec79b6f112fd19afd1e88d30db889e95d1d0561fe5bde066ae2a0f7cd31ddba',
                    fileName: 'sproject.svg',
                    type: '',
                  },
                  tuiIconName: 'sproject',
                  link: '/',
                  externalId: 8,
                  isActive: true,
                },
                {
                  id: 27,
                  name: 'S.Task',
                  shortDescription: 'Список задач и протокольные встречи',
                  icon: {
                    id: 1029,
                    file: '/minio/spro-stage/media/system/1718165051980004/task_icon.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=spro-stage%2F20240724%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240724T212546Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=3bdb12f4cae1028687de8f5aac85650d870ed9f009a3fb30c32592413526b5c2',
                    fileName: 'task_icon.svg',
                    type: '',
                  },
                  tuiIconName: 'stask',
                  link: '/',
                  externalId: 31,
                  isActive: false,
                },
              ],
            },
            {
              name: 'Финансы',
              services: [
                {
                  id: 14,
                  name: 'S.Kek',
                  shortDescription:
                    'Оформление встреч с Технадзорами и подача актов выполненных работ КС-2',
                  icon: {
                    id: 43,
                    file: '/minio/spro-stage/media/system/1691411046753883/finance-ks-2.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=spro-stage%2F20240724%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240724T212546Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=07c9631e0220adcf98f641e42b1907958dda81a7ff68dfe81bcb1555f96c5d42',
                    fileName: 'finance-ks-2.svg',
                    type: '',
                  },
                  tuiIconName: 'skek',
                  link: '',
                  externalId: 4,
                  isActive: true,
                },
                {
                  id: 15,
                  name: 'S.Cost (РСС, АСОР)',
                  shortDescription:
                    'Расчеты стоимости (РСС), акты сверки объемов (АСОР) и единичные расценки',
                  icon: {
                    id: 45,
                    file: '/minio/spro-stage/media/system/1691411124592684/finance-rss.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=spro-stage%2F20240724%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240724T212546Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=b3fee388173dd628fff0c3d3b82edb12399dbe7db1d789dd814758d17b7e88d5',
                    fileName: 'finance-rss.svg',
                    type: '',
                  },
                  tuiIconName: 'scost',
                  link: '/',
                  externalId: 19,
                  isActive: true,
                },
                {
                  id: 24,
                  name: 'S.Fine',
                  shortDescription: 'Штрафы и премии подрядчиков',
                  icon: {
                    id: 100,
                    file: '/minio/spro-stage/media/system/1691411788616707/S.Fine.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=spro-stage%2F20240724%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240724T212546Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6ea61a34600234ab445687de6f5e68bae65c009fc45cf34d9a883862ed1e860b',
                    fileName: 'S.Fine.svg',
                    type: '',
                  },
                  tuiIconName: 'sfine',
                  link: '',
                  externalId: 28,
                  isActive: true,
                },
              ],
            },
            {
              name: 'Документация',
              services: [
                {
                  id: 13,
                  name: 'S.Docs',
                  shortDescription: 'Облачное хранилище документации по проектам',
                  icon: {
                    id: 39,
                    file: '/minio/spro-stage/media/system/1691411328948788/scontracts.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=spro-stage%2F20240724%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240724T212546Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=ebab3356323ab087e152df86acf6997baf0041b1aa1d270e77c3b4a981820c5e',
                    fileName: 'scontracts.svg',
                    type: '',
                  },
                  tuiIconName: 'sdocs',
                  link: '#autodesk-demo',
                  externalId: 18,
                  isActive: true,
                },
                {
                  id: 23,
                  name: 'S.Blueprint',
                  shortDescription: 'Сервис передачи рабочей документации на стройку',
                  icon: {
                    id: 98,
                    file: '/minio/spro-stage/media/system/1691411739152906/s_blueprint_circle.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=spro-stage%2F20240724%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240724T212546Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=0ac8efee70e1bc9155430da138c4ba16d92ddc674f7099b5b6cac07226e73f21',
                    fileName: 's_blueprint_circle.svg',
                    type: '',
                  },
                  tuiIconName: 'sblueprint',
                  link: '',
                  externalId: 27,
                  isActive: true,
                },
                {
                  id: 26,
                  name: 'S.AED',
                  shortDescription:
                    'Сервис по формированию и ведению приемочной исполнительной документации',
                  icon: {
                    id: 1028,
                    file: '/minio/spro-stage/media/system/1718024369716074/S.AED.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=spro-stage%2F20240724%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240724T212546Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=b44c152551b61ac9b1ef6f9a164cde842d889182b23f200511b443edc13a5496',
                    fileName: 'S.AED.svg',
                    type: '',
                  },
                  tuiIconName: 'saed',
                  link: '/',
                  externalId: 30,
                  isActive: true,
                },
              ],
            },
            {
              name: 'HR',
              services: [
                {
                  id: 17,
                  name: 'S.Team',
                  shortDescription:
                    'Цифровой опыт сотрудника. Развитие, кадровые сервисы, управление командой',
                  icon: {
                    id: 4,
                    file: '/minio/spro-stage/media/system/1691408230377687/steam.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=spro-stage%2F20240724%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240724T212546Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=b6939f78d8a3592cc3b37e21b220e979a2c734bb2b1ca3b3d552d9614baf29ec',
                    fileName: 'steam.svg',
                    type: '',
                  },
                  tuiIconName: 'steam',
                  link: '/',
                  externalId: 20,
                  isActive: true,
                },
              ],
            },
            {
              name: 'Строительство',
              services: [
                {
                  id: 4,
                  name: 'S.Control',
                  shortDescription:
                    'Система контроля качества строительства и планирования занятости служб строительного контроля',
                  icon: {
                    id: 33,
                    file: '/minio/spro-stage/media/system/1691410688373453/scontrol.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=spro-stage%2F20240724%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240724T212546Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6ed132ebbd0178c4de2e0281a37959f6bab2516e31ccd7ac2069806f96ccc9ad',
                    fileName: 'scontrol.svg',
                    type: '',
                  },
                  tuiIconName: 'scontrol',
                  link: '',
                  externalId: 2,
                  isActive: true,
                },
                {
                  id: 8,
                  name: 'S.Home',
                  shortDescription:
                    'Система передачи квартир в ОВП и передачи инженерных сетей в управляющую компанию',
                  icon: {
                    id: 34,
                    file: '/minio/spro-stage/media/system/1691410708656475/shome.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=spro-stage%2F20240724%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240724T212546Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=fa2afedfa9982f012c2ee933d35081399aabec2ba94c8351b87f5b1ab5a0b790',
                    fileName: 'shome.svg',
                    type: '',
                  },
                  tuiIconName: 'shome',
                  link: '',
                  externalId: 15,
                  isActive: true,
                },
                {
                  id: 12,
                  name: 'Roomer',
                  shortDescription: 'Система, осуществляющая передачу квартир клиентам',
                  icon: {
                    id: 44,
                    file: '/minio/spro-stage/media/system/1691410847107363/roomer.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=spro-stage%2F20240724%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240724T212546Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=a375cae8c172217da1b42848f6e76e060ea92664b52d3797bf44a6a94f588f93',
                    fileName: 'roomer.svg',
                    type: '',
                  },
                  tuiIconName: 'sroomer',
                  link: '/',
                  externalId: 16,
                  isActive: true,
                },
                {
                  id: 16,
                  name: 'S.Volume',
                  shortDescription: 'Формирование ведомостей объёмов по проектам из BIM',
                  icon: {
                    id: 46,
                    file: '/minio/spro-stage/media/system/1691411259837583/finace-project.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=spro-stage%2F20240724%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240724T212546Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=d6e2a828f3fc62be3ee0acd2794c198e47a6de70a280cc0406ed560245eff430',
                    fileName: 'finace-project.svg',
                    type: '',
                  },
                  tuiIconName: 'svolume',
                  link: '/',
                  externalId: 22,
                  isActive: true,
                },
              ],
            },
            {
              name: 'Снабжение',
              services: [
                {
                  id: 1,
                  name: 'S.Materials',
                  shortDescription:
                    'Система заказа и планирования поставок материалов на строительные площадки',
                  icon: {
                    id: 37,
                    file: '/minio/spro-stage/media/system/1691408677401209/smaterials.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=spro-stage%2F20240724%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240724T212546Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=7243bc632121aac38dab39ffce44d52a6bde999ef503b9db91dcf00404d7906f',
                    fileName: 'smaterials.svg',
                    type: '',
                  },
                  tuiIconName: 'smaterials',
                  link: '',
                  externalId: 5,
                  isActive: true,
                },
                {
                  id: 5,
                  name: 'S.Tender',
                  shortDescription:
                    'Система проведения торгов на работы и материалы для строительных площадок.',
                  icon: {
                    id: 30,
                    file: '/minio/spro-stage/media/system/1691409998838717/stender.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=spro-stage%2F20240724%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240724T212546Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=7fd5c1fc133e7dd754366238be226f09a2d013c32ca3e73a3c67c4ab24b0c41d',
                    fileName: 'stender.svg',
                    type: '',
                  },
                  tuiIconName: 'stender',
                  link: '/',
                  externalId: 10,
                  isActive: true,
                },
              ],
            },
            {
              name: 'Безопасность',
              services: [
                {
                  id: 19,
                  name: 'S.Pass',
                  shortDescription:
                    'Система оформления и согласования заявок на пропуска для рабочих на ОС',
                  icon: {
                    id: 59,
                    file: '/minio/spro-stage/media/system/1691411563282439/Frame_2885708_4.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=spro-stage%2F20240724%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240724T212546Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=7f56fd9a41e99e380d2d04354bc85f772ebf5ec60d341e677574ff17e6c44c61',
                    fileName: 'Frame_2885708_4.png',
                    type: '',
                  },
                  tuiIconName: 'spass',
                  link: '',
                  externalId: 23,
                  isActive: true,
                },
                {
                  id: 22,
                  name: 'S.Security',
                  shortDescription:
                    'Сервис для фиксации и обработки происшествий на ОС и ЖК',
                  icon: {
                    id: 97,
                    file: '/minio/spro-stage/media/system/1691411630174623/icon-Security.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=spro-stage%2F20240724%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240724T212546Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=5a4a4cb04898c7e773d81a101944c0cc5108154a0c03bcbad6c7fdce8c7e5a4a',
                    fileName: 'icon-Security.svg',
                    type: '',
                  },
                  tuiIconName: 'ssecurity',
                  link: '/',
                  externalId: 26,
                  isActive: true,
                },
              ],
            },
          ],
        },
      },
    ],
  },
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const signinAction = action('SamoletHeader sign in requested');
const signupAction = action('SamoletHeader sign up requested');
const navigationAction = fn(action('SamoletHeader navigation selected'));
const roleAction = action('SamoletHeader role selected');

const onSignin = (event: React.MouseEvent) => {
  event.preventDefault();
  signinAction();
};
const onSignup = (event: React.MouseEvent) => {
  event.preventDefault();
  signupAction();
};
const onSelect = (path: string[]) => {
  navigationAction(path);
};
const DemoLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} onClick={event => event.preventDefault()}>
    {children}
  </Link>
);
const user: SamoletProfile = {
  username: 'Kvokka',
  firstName: 'Квокка',
  lastName: 'Квокковна',
  email: 'user@example.com',
  role: 'employee',
};

const items: NavigationItem[] = [
  {
    key: '1',
    label: 'Меню 1',
    children: [
      { key: '14', label: <DemoLink to='/menu-14'>Меню 14</DemoLink> },
      { key: '15', label: <DemoLink to='/menu-15'>Меню 15</DemoLink> },
      {
        key: '16',
        label: <DemoLink to='/menu-16'>Меню 16</DemoLink>,
        badge: { type: 'dot' },
      },
    ],
  },
  {
    key: '2',
    label: <DemoLink to='/menu-2'>Меню 2</DemoLink>,
  },
  {
    key: '3',
    label: <DemoLink to='/menu-3'>Меню 3</DemoLink>,
    badge: { type: 'counter', inner: 50 },
  },
  { key: '4', label: <DemoLink to='/menu-4'>Меню 4</DemoLink> },
  { key: '5', label: <DemoLink to='/menu-5'>Меню 5</DemoLink>, badge: { type: 'dot' } },
  { key: '6', label: <DemoLink to='/menu-6'>Меню 6</DemoLink> },
  { key: '7', label: <DemoLink to='/menu-7'>Меню 7</DemoLink> },
  { key: '8', label: <DemoLink to='/menu-8'>Меню 8</DemoLink> },
  { key: '9', label: <DemoLink to='/menu-9'>Меню 9</DemoLink> },
  { key: '10', label: <DemoLink to='/menu-10'>Меню 10</DemoLink> },
  { key: '11', label: <DemoLink to='/menu-11'>Меню 11</DemoLink> },
  {
    key: '12',
    label: <DemoLink to='/menu-12'>Меню 12</DemoLink>,
    badge: { type: 'counter', inner: 100 },
  },
  { key: '13', label: <DemoLink to='/menu-13'>Меню 13</DemoLink> },
];

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('S.Pro')).toBeVisible();
    const menuItem = canvas.getByRole('menuitem', { name: /Меню 3/ });
    navigationAction.mockClear();
    await userEvent.click(menuItem);
    await waitFor(() => expect(navigationAction).toHaveBeenCalledWith(['3']));
  },
  args: {
    authorization: { onSignin, onSignup },
    user,
    stand: 'stage',
    app: 's.pro',
    navigation: {
      onSelect,
      defaultSelectedKeys: ['2'],
      items,
    },
  },
};

const StandTemplate = (_args: object) => {
  const [stand, setStand] = React.useState<HeaderStand>('stage');

  return (
    <Box>
      <SamoletHeader app='s.pro' stand={stand} />
      <Radio.Group
        onChange={e => setStand(e.target.value)}
        layout='vertical'
        value={stand}
        options={stands.map(app => ({ label: app, value: app }))}
      />
    </Box>
  );
};

export const Stand: Story = {
  args: {
    authorization: { onSignin, onSignup },
    user,
    stand: 'dev',
    app: 's.pro',
    navigation: {
      onSelect,
      defaultSelectedKeys: ['2'],
      items,
    },
  },
  render: StandTemplate,
};

const AppTemplate = (_args: object) => {
  const [app, setApp] = React.useState<SamoletService>('s.pro');

  return (
    <Box>
      <SamoletHeader app={app} />
      <Radio.Group
        onChange={e => setApp(e.target.value)}
        layout='vertical'
        options={SAMOLET_SERVICES.map(app => ({ label: app, value: app }))}
      />
    </Box>
  );
};
export const App: Story = {
  args: {
    authorization: { onSignin, onSignup },
    user,
    stand: 'stage',
    app: 's.pro',
    navigation: {
      onSelect,
      defaultSelectedKeys: ['2'],
      items,
    },
  },
  render: AppTemplate,
};

const ProjectCode = `
const loadProjects = () => Promise.resolve({
  results: [
    { id: 1, name: 'Алхимово' },
    { id: 2, name: 'Вереск' }
  ]
});

<SamoletHeader
  project={{
    api: loadProjects,
    options: (options) => [
      { key: 'all_projects', label: 'Все проекты' },
      { type: 'divider }
    ].concat(options);
  }}
/>
`;

export const Project: Story = {
  parameters: {
    docs: {
      source: {
        code: ProjectCode,
      },
    },
  },
  args: {
    authorization: { onSignin, onSignup },
    user,
    stand: 'stage',
    app: 's.pro',
    navigation: {
      onSelect,
      defaultSelectedKeys: ['2'],
      items,
    },
    project: {
      api: loadProjects,
      options: options => [
        { value: 'all_projects', label: 'Все проекты' },
        { type: 'divider' },
        ...[
          ...options,
          ...options,
          ...options,
          ...options,
          ...options,
          ...options,
          ...options,
        ],
      ],
      onChange: v => {
        console.log(v);
      },
    },
  },
};

export const ProjectEmpty: Story = {
  args: {
    ...(Project.args ?? {}),
    project: { api: () => resolveFixture({ results: [] }) },
  },
};

export const ProjectError: Story = {
  args: {
    ...(Project.args ?? {}),
    project: { api: () => rejectFixture(new Error('Локальная ошибка загрузки проектов')) },
  },
};

export const ProjectLoading: Story = {
  args: {
    ...(Project.args ?? {}),
    project: { api: () => pendingFixture() },
  },
};

export const ProjectTimeout: Story = {
  args: {
    ...(Project.args ?? {}),
    project: { api: () => timeoutFixture() },
  },
};

const ProjectSearchableCode = `
<SamoletHeader
  project={{
    api: () => Promise.resolve({ results: localProjects }),
    searchable: true
  }}
/>
`;

export const ProjectSearchable: Story = {
  parameters: {
    docs: {
      source: {
        code: ProjectSearchableCode,
      },
    },
  },
  args: {
    authorization: { onSignin, onSignup },
    user,
    stand: 'stage',
    app: 's.pro',
    navigation: {
      onSelect,
      defaultSelectedKeys: ['2'],
      items,
    },
    project: {
      api: loadProjects,
      options: options => [
        ...[
          ...options,
          ...options,
          ...options,
          ...options,
          ...options,
          ...options,
          ...options,
        ],
      ],
      onChange: v => {
        console.log(v);
      },
      searchable: true,
    },
  },
};

export const NotAuthenticated: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const locationBefore = canvasElement.ownerDocument.location.href;
    await userEvent.click(canvas.getByText('Войти'));
    await expect(canvasElement.ownerDocument.location.href).toBe(locationBefore);
  },
  args: {
    authorization: { onSignin, onSignup },
    authenticated: false,
    stand: 'stage',
    app: 's.pro',
    navigation: {
      onSelect,
      defaultSelectedKeys: ['2'],
      items,
    },
  },
};

export const Profile: Story = {
  args: {
    authorization: { onSignin, onSignup },
    user,
    stand: 'stage',
    app: 's.pro',
    navigation: {
      onSelect,
      defaultSelectedKeys: ['2'],
      items,
    },
    profile: {
      items: [
        {
          key: 'role',
          label: 'Роль',
          type: 'group',
          children: [
            {
              key: 'contractor',
              label: 'Подрядчик',
              selectable: true,
              onClick: () => roleAction('Подрядчик'),
            },
            {
              key: 'provider',
              label: 'Поставщик',
              selectable: true,
              onClick: () => roleAction('Поставщик'),
            },
          ],
        },
      ],
    },
  },
};

export const Sticky: Story = {
  args: {
    authorization: { onSignin, onSignup },
    stand: 'stage',
    app: 's.pro',
    navigation: {
      onSelect,
      defaultSelectedKeys: ['2'],
      items,
    },
  },
  render: args => (
    <Box>
      <SamoletHeader {...args} />
      <Box $padding={16}>
        <Paragraph>
          Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.
        </Paragraph>
      </Box>
    </Box>
  ),
};

export const Mobile: Story = {
  args: {
    authorization: { onSignin, onSignup },
    user,
    stand: 'stage',
    app: 's.pro',
    navigation: {
      onSelect,
      defaultSelectedKeys: ['2'],
      items: [
        {
          key: '1',
          label: 'Меню 1',
          children: [
            { key: '14', label: 'Меню 14' },
            { key: '15', label: 'Меню 15' },
            { key: '16', label: 'Меню 16', badge: { type: 'dot' } },
          ],
        },
        {
          key: '2',
          label: 'Меню 2',
        },
        {
          key: '3',
          label: 'Меню 3',
          badge: { type: 'counter', inner: 50 },
        },
        { key: '4', label: 'Меню 4' },
        { key: '5', label: 'Меню 5', badge: { type: 'dot' } },
        { key: '6', label: 'Меню 6' },
        { key: '7', label: 'Меню 7' },
        { key: '8', label: 'Меню 8' },
        { key: '9', label: 'Меню 9' },
        { key: '10', label: 'Меню 10' },
        { key: '11', label: 'Меню 11' },
        { key: '12', label: 'Меню 12', badge: { type: 'counter', inner: 100 } },
        { key: '13', label: 'Меню 13' },
      ],
    },
  },
  globals: {
    viewport: {
      value: 'iphone6',
      isRotated: false,
    },
  },
};

export const MobileNotAuthenticated: Story = {
  args: {
    authorization: { onSignin, onSignup },
    authenticated: false,
    stand: 'stage',
    app: 's.pro',
    navigation: {
      onSelect,
      defaultSelectedKeys: ['2'],
      items,
    },
  },
  globals: {
    viewport: {
      value: 'iphone6',
      isRotated: false,
    },
  },
};

export const MobileProfile: Story = {
  args: {
    authorization: { onSignin, onSignup },
    user,
    stand: 'stage',
    app: 's.pro',
    navigation: {
      onSelect,
      defaultSelectedKeys: ['2'],
      items,
    },
    profile: {
      items: [
        {
          key: 'role',
          label: 'Роль',
          type: 'group',
          children: [
            {
              key: 'contractor',
              label: 'Подрядчик',
              selectable: true,
              onClick: () => roleAction('Подрядчик'),
            },
            {
              key: 'provider',
              label: 'Поставщик',
              selectable: true,
              onClick: () => roleAction('Поставщик'),
            },
          ],
        },
      ],
    },
  },
  globals: {
    viewport: {
      value: 'iphone6',
      isRotated: false,
    },
  },
};

const _CompositionCode = `
import { Profile } from '@rovna-ui/components/components';
import { Box } from '@rovna-ui/components/grid';
import { Apps } from '@rovna-ui/icons';
import { SamoletHeader } from '@rovna-ui/header';

<SamoletHeader.Root background="gray25">
  <Box
    $display="flex"
    $gap={12}
  >
    <Apps
      color="#EA1B29"
      size={24}
    />
    <SamoletHeader.Logo
      before={<SMaterials color="gray900" />}
      color="gray900"
    >
      S.Materials
    </SamoletHeader.Logo>
    <Box
      $alignItems="center"
      $display="flex"
      $flex="1"
      $gap={8}
      $justifyContent="flex-end"
    >
      <Profile
        description="user@example.com"
        title="Квокка Квокковна"
      />
    </Box>
  </Box>
  <SamoletHeader.Navigation
    items={[
      {
        key: '1',
        label: <Link to='/menu-1'>Меню 1</Link>,
      },
      {
        key: '2',
        label: <Link to='/menu-2'>Меню 2</Link>,
      },
      {
        key: '3',
        label: <Link to='/menu-3'>Меню 3</Link>,
      },
      { key: '4', label: <Link to='/menu-4'>Меню 4</Link> },
      { key: '5', label: <Link to='/menu-5'>Меню 5</Link> },
      { key: '6', label: <Link to='/menu-6'>Меню 6</Link> },
      { key: '7', label: <Link to='/menu-7'>Меню 7</Link> },
      { key: '8', label: <Link to='/menu-8'>Меню 8</Link> },
      { key: '9', label: <Link to='/menu-9'>Меню 9</Link> },
      { key: '10', label: <Link to='/menu-10'>Меню 10</Link> },
      { key: '11', label: <Link to='/menu-11'>Меню 11</Link> },
      {
        key: '12',
        label: <Link to='/menu-12'>Меню 12</Link>,
      },
      { key: '13', label: <Link to='/menu-13'>Меню 13</Link> },
    ]}
   />
</SamoletHeader.Root>
`;

export const Composition: Story = {
  render: _args => (
    <SamoletHeader.Root background='gray25'>
      <Box $display='flex' $gap={12}>
        <Apps size={24} color='#EA1B29' />
        <SamoletHeader.Logo before={<SMaterials color='gray900' />} color='gray900'>
          S.Materials
        </SamoletHeader.Logo>
        <Box
          $display='flex'
          $alignItems='center'
          $justifyContent='flex-end'
          $flex='1'
          $gap={8}
        >
          <_Profile title='Квокка Квокковна' description='user@example.com' />
        </Box>
      </Box>
      <SamoletHeader.Navigation
        styling={{
          tabDefaultBg: 'transparent',
          tabActiveBg: 'linear-gradient(265.82deg, #EA1B29 0%, #98258E 100%)',
          tabActiveHoverBg: 'linear-gradient(265.82deg, #EA1B29 0%, #98258E 100%)',
          tabHoverBg: 'linear-gradient(265.82deg, #EA1B29 0%, #98258E 100%)',
          defaultText: 'linear-gradient(269deg, #EA1B29 0%, #98258E 100%)',
          tabDefaultIcon: '#EA1B29',
          tabHoverIcon: 'white',
          hoverText: 'white',
        }}
        items={[
          {
            key: '1',
            label: 'Меню 1',
          },
          {
            key: '2',
            label: 'Меню 2',
          },
          {
            key: '3',
            label: 'Меню 3',
            badge: { type: 'counter', inner: 50 },
          },
          { key: '4', label: 'Меню 4' },
          { key: '5', label: 'Меню 5', badge: { type: 'dot' } },
          { key: '6', label: 'Меню 6' },
          { key: '7', label: 'Меню 7' },
          { key: '8', label: 'Меню 8' },
          { key: '9', label: 'Меню 9' },
          { key: '10', label: 'Меню 10' },
          { key: '11', label: 'Меню 11' },
          { key: '12', label: 'Меню 12', badge: { type: 'counter', inner: 100 } },
          { key: '13', label: 'Меню 13' },
        ]}
      />
    </SamoletHeader.Root>
  ),
};
