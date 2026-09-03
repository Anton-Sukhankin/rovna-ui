import React from 'react';

type GroupContextType = {
  defaultOpen?: string[];
};

export const GroupContext = React.createContext<GroupContextType | undefined>(undefined);
export const useGroupContext = () => React.useContext(GroupContext);
