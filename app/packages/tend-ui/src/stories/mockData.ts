export type RussianPerson = {
  firstName: string;
  lastName: string;
  fullName: string;
  job: string;
  bio: string;
  sex: 'Мужской' | 'Женский';
  zodiac: string;
  email: string;
};

export const russianAnimals = [
  'Кошка',
  'Собака',
  'Лиса',
  'Медведь',
  'Волк',
  'Заяц',
  'Белка',
  'Олень',
  'Лошадь',
  'Дельфин',
  'Пингвин',
  'Черепаха',
  'Жираф',
  'Тигр',
  'Лев',
] as const;

export const russianCompanies = [
  'Альфа Проект',
  'Городские решения',
  'Новая среда',
  'Вектор развития',
  'Стройтехнологии',
  'Цифровой контур',
  'Проектное бюро',
  'Инженерные системы',
  'Деловой квартал',
  'Точка роста',
] as const;

export const russianColors = [
  'Красный',
  'Синий',
  'Зеленый',
  'Желтый',
  'Фиолетовый',
  'Бирюзовый',
  'Серый',
  'Белый',
  'Черный',
  'Оранжевый',
] as const;

export const russianPeople: RussianPerson[] = [
  {
    firstName: 'Анна',
    lastName: 'Иванова',
    fullName: 'Анна Иванова',
    job: 'Дизайнер интерфейсов',
    bio: 'Проектирует понятные пользовательские интерфейсы.',
    sex: 'Женский',
    zodiac: 'Овен',
    email: 'anna.ivanova@example.ru',
  },
  {
    firstName: 'Михаил',
    lastName: 'Петров',
    fullName: 'Михаил Петров',
    job: 'Руководитель проекта',
    bio: 'Координирует команду и сроки проекта.',
    sex: 'Мужской',
    zodiac: 'Телец',
    email: 'mikhail.petrov@example.ru',
  },
  {
    firstName: 'Елена',
    lastName: 'Смирнова',
    fullName: 'Елена Смирнова',
    job: 'Бизнес-аналитик',
    bio: 'Исследует процессы и формулирует требования.',
    sex: 'Женский',
    zodiac: 'Близнецы',
    email: 'elena.smirnova@example.ru',
  },
  {
    firstName: 'Алексей',
    lastName: 'Соколов',
    fullName: 'Алексей Соколов',
    job: 'Инженер-программист',
    bio: 'Разрабатывает и поддерживает прикладные сервисы.',
    sex: 'Мужской',
    zodiac: 'Рак',
    email: 'alexey.sokolov@example.ru',
  },
  {
    firstName: 'Мария',
    lastName: 'Кузнецова',
    fullName: 'Мария Кузнецова',
    job: 'Специалист поддержки',
    bio: 'Помогает пользователям решать рабочие вопросы.',
    sex: 'Женский',
    zodiac: 'Лев',
    email: 'maria.kuznetsova@example.ru',
  },
  {
    firstName: 'Дмитрий',
    lastName: 'Попов',
    fullName: 'Дмитрий Попов',
    job: 'Архитектор решений',
    bio: 'Проектирует структуру и интеграции системы.',
    sex: 'Мужской',
    zodiac: 'Дева',
    email: 'dmitry.popov@example.ru',
  },
  {
    firstName: 'Ольга',
    lastName: 'Волкова',
    fullName: 'Ольга Волкова',
    job: 'Менеджер продукта',
    bio: 'Определяет приоритеты и развивает продукт.',
    sex: 'Женский',
    zodiac: 'Весы',
    email: 'olga.volkova@example.ru',
  },
  {
    firstName: 'Сергей',
    lastName: 'Морозов',
    fullName: 'Сергей Морозов',
    job: 'Инженер по качеству',
    bio: 'Проверяет надежность пользовательских сценариев.',
    sex: 'Мужской',
    zodiac: 'Скорпион',
    email: 'sergey.morozov@example.ru',
  },
  {
    firstName: 'Наталья',
    lastName: 'Лебедева',
    fullName: 'Наталья Лебедева',
    job: 'Исследователь',
    bio: 'Изучает потребности и поведение пользователей.',
    sex: 'Женский',
    zodiac: 'Стрелец',
    email: 'natalia.lebedeva@example.ru',
  },
  {
    firstName: 'Игорь',
    lastName: 'Новиков',
    fullName: 'Игорь Новиков',
    job: 'Системный администратор',
    bio: 'Обеспечивает стабильную работу инфраструктуры.',
    sex: 'Мужской',
    zodiac: 'Козерог',
    email: 'igor.novikov@example.ru',
  },
];

export const getRussianFixture = <T>(items: readonly T[], index: number): T =>
  items[index % items.length];

export const getRussianAnimal = (index: number) =>
  getRussianFixture(russianAnimals, index);

export const getRussianCompany = (index: number) =>
  getRussianFixture(russianCompanies, index);

export const getRussianColor = (index: number) =>
  getRussianFixture(russianColors, index);

export const getRussianPerson = (index: number) =>
  getRussianFixture(russianPeople, index);
