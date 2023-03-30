import { createContext, useCallback, useEffect, useState } from "react";
import { AuthCtx, userWToken } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAccessUsingRefresh, gettokenRemainingTime } from "../util/tokens";

export const AuthContext = createContext<AuthCtx>({
  user: undefined,
  login: () => {},
  updateUser: () => {},
  logout: () => {},
});

let logoutTimer: ReturnType<typeof setTimeout>;

export const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [user, setUser] = useState<userWToken | undefined>(undefined);

  const login = useCallback(
    async (user: userWToken, saveToStorage: boolean) => {
      if (saveToStorage) {
        await AsyncStorage.setItem("userData", JSON.stringify(user));
      }
      setUser(user);
    },
    []
  );

  const updateUser = useCallback((user: userWToken) => {
    setUser(user);
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem("userData");
    setUser(undefined);
  }, []);

  const updateToken = useCallback(async () => {
    if (gettokenRemainingTime(user!.refreshToken) > 0) {
      const newTokens = await getAccessUsingRefresh(user!.refreshToken);
      if (newTokens) {
        const currUser: userWToken = {
          ...user!,
          accessToken: newTokens.accessToken,
          refreshToken: newTokens.refreshToken,
        };
        login(currUser, false);
      }
    } else {
      logout();
    }
  }, [login, logout]);

  useEffect(() => {
    if (user && user.accessToken) {
      logoutTimer = setTimeout(
        updateToken,
        gettokenRemainingTime(user.accessToken)
      );
    } else {
      clearTimeout(logoutTimer);
    }
  }, [user, logout]);

  useEffect(() => {
    (async () => {
      const storedData = await AsyncStorage.getItem("userData");
      if (storedData) {
        const data = JSON.parse(storedData);
        if (
          data &&
          data.accessToken &&
          new Date(data.accessToken) > new Date()
        ) {
          const user: userWToken = {
            _id: data._id,
            name: data.name,
            phone: data.phone,
            image: data.image,
            role: data.role,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
          login(user, false);
        }
      }
    })();
  }, [login]);

  const value: AuthCtx = {
    user,
    updateUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
