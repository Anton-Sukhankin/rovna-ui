export type SamoletProfileRole = 'partner' | 'employee';

export type SamoletProfile = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: SamoletProfileRole;
};
