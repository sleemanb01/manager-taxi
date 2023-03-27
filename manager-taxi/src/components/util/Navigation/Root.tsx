import React from "react";
import { AuthContext } from "../../../hooks/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userWToken } from "../../../types/types";
import { NavigationContainer } from "@react-navigation/native";
import LandingPage from "../LandingPage";
import { AuthenticatedStack, AuthStack } from "./NavStacks";
import i18n from "../../../util/i18n";
import { Loading } from "../Loading";

function Navigation({ user }: { user: userWToken | undefined }) {
  return (
    <NavigationContainer independent={true}>
      {user ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export function Root() {
  const [isLoading, setIsLoading] = React.useState(true);
  const { user, login } = React.useContext(AuthContext);

  React.useEffect(() => {
    (async () => {
      const storedUsr = await AsyncStorage.getItem("user");

      if (storedUsr) {
        login(JSON.parse(storedUsr));
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    <Loading />;
  }
  return <Navigation user={user} />;
}
