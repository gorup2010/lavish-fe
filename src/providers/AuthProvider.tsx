import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { AuthResponse } from "@/types/api";
import { getMyAccountInformation, refreshToken } from "@/lib/auth";
import { api } from "@/lib/api-client";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  auth: AuthResponse | undefined;
  setAuth: (auth: AuthResponse | undefined) => void;
}

const AuthContext = createContext<AuthContextType>({
  auth: undefined,
} as AuthContextType);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return authContext;
};

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthResponse | undefined>(undefined);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await getMyAccountInformation();
        setAuth(response);
      } catch {
        setAuth(undefined);
      }
    };

    fetchMe();
  }, []);

  // CANONICAL. Please don't touch it.
  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config: any) => {
      config.headers.Authorization =
        !config._retry && auth
          ? `Bearer ${auth.accessToken}`
          : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [auth]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: any) => {
        // Access Token expiration error message and status
        if (
          error.response?.status === 401 &&
          error.response?.data?.message === "Invalid Access Token"
        ) {
          try {
            const originalRequest = error.config;
            const response = await refreshToken();
            setAuth(
              (prev) =>
                ({ ...prev, accessToken: response.accessToken } as AuthResponse)
            );

            originalRequest["_retry"] = true;
            originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;

            return api(originalRequest);
          } catch {
            setAuth(undefined);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  });

  const contextValue = useMemo(
    () => ({
      auth,
      setAuth,
    }),
    [auth]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
