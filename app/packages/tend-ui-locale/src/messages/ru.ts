import { MessageSchema } from '../types';

export const ru: MessageSchema = {
  general: {
    open: 'Открыть',
    close: 'Закрыть',
    clear: 'Очистить',
    reset: 'Сбросить',
    error: 'Непредвиденная ошибка',
    empty: 'Ничего не найдено',
    signin: 'Войти',
    signup: 'Регистрация',
  },
  primitives: {
    Actions: {
      accept: 'Принять',
      cancel: 'Отмена',
      selected: 'Выбрано значений:',
    },
    Pagination: {
      prev: 'Предыдущие',
      next: 'Следующие',
      jumpto: 'на страницу',
    },
  },
  components: {
    Status: {
      button: 'На главную',
      phone: 'Телефон',
      support: 'Портал поддержки',
      schedule: 'График работы: c 9:00 до 21:00 без выходных',
      Forbidden: {
        title: 'Недостаточно прав',
        description: 'Чтобы получить доступ, обратитесь в поддержку',
      },
      NotFound: {
        title: 'Страница не найдена',
        description: 'Попробуйте другую ссылку или вернитесь на главную страницу',
      },
      InternalServerError: {
        title: 'Технические работы',
        description:
          'Страница может быть недоступна некоторое время — попробуйте зайти через несколько минут',
      },
    },
    ActionsButton: {
      button: 'Действия',
    },
    Filters: {
      title: 'Фильтрация таблицы',
      reset: 'Сбросить всё',
    },
    ColumnsSettings: {
      title: 'Настройка таблицы',
      reset: 'Сбросить всё',
    },
  },
  features: {
    Table: {
      filter: 'Фильтрация',
      sorter: 'Сортировка',
      ascending: {
        default: 'По возрастанию',
        alphabetical: 'А → Я',
        novelty: 'Сначала старые',
      },
      descending: {
        default: 'По убыванию',
        alphabetical: 'Я → А',
        novelty: 'Сначала новые',
      },
      hide: 'Скрыть',
      pin: 'Закрепить',
      unpin: 'Открепить',
      column: 'Колонка',
      reset: 'Сбросить',
      settings: 'Настройки',
    },
  },
  widgets: {
    Layout: {
      // TODO: Вынести как отдельную сущность
      Header: {
        analytics: 'Аналитика',
        support: 'Поддержка',
        info: 'Помощь',
        chat: 'Чат',
        notifications: 'Уведомления',
      },
      Apps: {
        /**
         * TODO: Устарело, удалить
         */
        title: 'Все сервисы',
        all: 'Все сервисы',
      },
      Profile: {
        profile: 'Профиль в S.Team',
        logout: 'Выйти',
      },
    },
  },
};
