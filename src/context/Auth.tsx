import { useSession } from "next-auth/client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface User {
  name: string;
  image: string;
}

interface AuthContextData {
  user: User;
  isLogged: boolean;
  toggleIsLogged: (value: boolean) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLogged, setIsLogged] = useState(false)
  const [session] = useSession()
  const [user, setUser] = useState({} as User)

  useEffect(() => {
    if (session) {
      setUser({
        name: session.user.name ? session.user?.name : '',
        image: session.user.image ? session.user?.image : '',
      })
    }
  }, [session])

  function toggleIsLogged(value: boolean) {
    setIsLogged(value)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLogged,
      toggleIsLogged,
    }}>
      { children }
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}