export type GlobalServiceResponse = {
  id: string;
  name: string;
  display_name: string;
  home_link: string;
  fe_config?: {
    icon_name?: string;
    icon_visible?: boolean;
    show_under_divider?: boolean;
    show_under_second_divider?: boolean;
  };
};

export type SendSupportEmail = {
  module: string;
  fio: string;
  email: string;
  criticality: string;
  title: string;
  description: string;
  role: string;
  phone: string;
  tenant: string;
  files: string[];
};
