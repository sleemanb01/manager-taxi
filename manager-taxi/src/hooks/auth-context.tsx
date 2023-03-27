import { createContext, useCallback, useEffect, useState } from "react";
import { AuthCtx, userWToken } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAccessUsingRefresh } from "../util/refreshToken";

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
  const [accessExpirationDate, setAccessExpirationDate] = useState<Date | null>();
  // const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>();

  const login = useCallback(async (user: userWToken) => {
    await AsyncStorage.setItem("userData", JSON.stringify(user));
    const EXPIRATION_TIME = 1000 * 60 * 60 * 24;
    const accessExpirationDate = user.token
      ? new Date(user.token)
      : new Date(new Date().getTime() + EXPIRATION_TIME);
    user.tokenExpiration = accessExpirationDate;
    setUser(user);
    setAccessExpirationDate(accessExpirationDate);
    AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        id: user._id,
        token: user.token,
        image: user.image,
        role: user.role,
        tokenExpiration: accessExpirationDate.toISOString(),
      })
    );
  }, []);

  const updateUser = useCallback((user: userWToken) => {
    setUser(user);
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem("userData");
    setUser(undefined);
    setAccessExpirationDate(null);
  }, []);

  const updateToken = useCallback(async () => {
    //call refresh token
    // const EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7;

    const newTokens = await getAccessUsingRefresh();
    const currUser = {
      ...user,
      token: newTokens.accessToken,
      refreshToken: newTokens.refreshToken,
    };
    login(currUser);
  }, [login]);

  useEffect(() => {
    if (user && user.token && accessExpirationDate) {
      let remainingTime = accessExpirationDate.getTime() - new Date().getTime();
      if (remainingTime < 0) {
        remainingTime = 0;
      }
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [user, logout, accessExpirationDate]);

  useEffect(() => {
    (async () => {
      const storedData = await AsyncStorage.getItem("userData");
      if (storedData) {
        const data = JSON.parse(storedData);
        if (data && data.token && new Date(data.tokenExpiration) > new Date()) {
          const user = {
            id: data.id,
            phone: data.phone,
            name: data.name,
            image: data.image,
            role: data.role,
            token: data.token,
            refreshToken: data.refreshToken,
            tokenExpiration: new Date(data.tokenExpiration),
          };
          login(user);
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
