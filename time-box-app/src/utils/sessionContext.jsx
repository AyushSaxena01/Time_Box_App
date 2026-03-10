import { createContext, useContext } from 'react';

export const SessionContext = createContext(null);

/**
 * Provider component for session state
 */
export function SessionProvider({ children, sessionState }) {
  return (
    <SessionContext.Provider value={sessionState}>
      {children}
    </SessionContext.Provider>
  );
}

/**
 * Hook to use session context
 */
export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return context;
}
