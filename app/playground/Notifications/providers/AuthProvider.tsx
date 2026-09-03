import React, { ReactNode, useEffect, useState } from 'react';
import { initAuth } from 'samolet-oauth2';

type AuthProviderType = ({
  children,
}: {
  children: ReactNode;
}) => React.JSX.Element | null;

export const AuthProvider: AuthProviderType = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const authorize = async () => {
    try {
      await initAuth({ clientId: 'hYiBWK9hyZBFAN4tFOkiWdn6hIRY6VnT7QVE4tpf' });
      setIsAuthorized(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    authorize();
  }, []);

  if (loading || !isAuthorized) return null;

  return <>{children}</>;
};
