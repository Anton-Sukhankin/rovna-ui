export type Language = 'ru' | 'en';

export type MessageSchema = {
  general: {
    open: string;
    close: string;
    clear: string;
    reset: string;
    error: string;
    empty: string;
    signin: string;
    signup: string;
  };
  primitives: {
    Actions: {
      accept: string;
      cancel: string;
      selected: string;
    };
    Pagination: {
      prev: string;
      next: string;
      jumpto: string;
    };
  };
  components: {
    Status: {
      button: string;
      phone: string;
      schedule: string;
      support: string;
      NotFound: {
        title: string;
        description: string;
      };
      Forbidden: {
        title: string;
        description: string;
      };
      InternalServerError: {
        title: string;
        description: string;
      };
    };
    ActionsButton: {
      button: string;
    };
    Filters: {
      title: string;
      reset: string;
    };
    ColumnsSettings: {
      title: string;
      reset: string;
    };
  };
  features: {
    Table: {
      filter: string;
      sorter: string;
      ascending: {
        default: string;
        alphabetical: string;
        novelty: string;
      };
      descending: {
        default: string;
        alphabetical: string;
        novelty: string;
      };
      pin: string;
      unpin: string;
      hide: string;
      column: string;
      reset: string;
      settings: string;
    };
  };
  widgets: {
    Layout: {
      Header: {
        analytics: string;
        support: string;
        info: string;
        chat: string;
        notifications: string;
      };
      Apps: {
        title: string;
        all: string;
      };
      Profile: {
        profile: string;
        logout: string;
      };
    };
  };
};
