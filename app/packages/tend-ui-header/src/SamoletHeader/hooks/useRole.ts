import { SamoletProfile } from '@rovna-ui/types';

export const useRole = (profile?: SamoletProfile) => {
  const isEmployee = profile?.role === 'employee';
  const isPartner = profile?.role === 'partner';

  return { isEmployee, isPartner };
};
