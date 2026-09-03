export type SamoletService = {
  id: number;
  name: string;
  shortDescription: string;
  icon: {
    id: number;
    file: string;
    fileName: string;
    type: string;
  };
  tuiIconName: string;
  link: string;
  externalId: number;
  isActive: boolean;
};

export type SamoletServicesResponse = {
  lk: boolean;
  categories: {
    name: string;
    services: SamoletService[];
  }[];
};
