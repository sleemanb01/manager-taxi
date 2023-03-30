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
  if (user) {
    return (
      <NavigationContainer independent={true}>
        <AuthenticatedStack />
      </NavigationContainer>
    );
  }
  return <AuthStack />;
}

export function Root() {
  const [isLoading, setIsLoading] = React.useState(true);
  const { user, login } = React.useContext(AuthContext);

  React.useEffect(() => {
    (async () => {
      const storedUsr = await AsyncStorage.getItem("userData");

      if (storedUsr) {
        login(JSON.parse(storedUsr), false);
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return <Navigation user={user} />;
}
