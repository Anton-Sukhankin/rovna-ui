import { MessageSchema } from '../types';

export const en: MessageSchema = {
  general: {
    open: 'Open',
    close: 'Close',
    clear: 'Clear',
    reset: 'Reset',
    error: 'Internal server error',
    empty: 'No data',
    signin: 'SignIn',
    signup: 'SignUp',
  },
  primitives: {
    Actions: {
      accept: 'Accept',
      cancel: 'Cancel',
      selected: 'Selected values:',
    },
    Pagination: {
      prev: 'Prev',
      next: 'Next',
      jumpto: 'to page',
    },
  },
  components: {
    Status: {
      button: 'Go main',
      phone: 'Tel',
      support: 'Support',
      schedule: 'Schedule: from 9:00 to 21:00',
      Forbidden: {
        title: 'Forbidden',
        description: 'Contact the support center to get access',
      },
      NotFound: {
        title: 'Page not found',
        description: 'Try another link or return to the main page',
      },
      InternalServerError: {
        title: 'Internal server error',
        description: 'Page is unavailable at this moment - try again in few minutes',
      },
    },
    ActionsButton: {
      button: 'Actions',
    },
    Filters: {
      title: 'Table filtering',
      reset: 'Reset all filters',
    },
    ColumnsSettings: {
      title: 'Table settings',
      reset: 'Reset to default',
    },
  },
  features: {
    Table: {
      filter: 'Filtering',
      sorter: 'Sorting',
      ascending: {
        default: 'Ascending',
        alphabetical: 'Z → A',
        novelty: 'Old first',
      },
      descending: {
        default: 'Descending',
        alphabetical: 'A → Z',
        novelty: 'New first',
      },
      pin: 'Pin',
      unpin: 'Unpin',
      hide: 'Hide',
      column: 'Column',
      reset: 'Reset',
      settings: 'Settings',
    },
  },
  widgets: {
    Layout: {
      // TODO: Вынести как отдельную сущность
      Header: {
        analytics: 'Analytics',
        support: 'Support',
        info: 'Info',
        chat: 'Chat',
        notifications: 'Notifications',
      },
      Apps: {
        /**
         * TODO: Устарело, удалить
         */
        title: 'All services',
        /**
         * TODO: Устарело, удалить
         */
        all: 'All services',
      },
      Profile: {
        profile: 'Profile',
        logout: 'Logout',
      },
    },
  },
};
