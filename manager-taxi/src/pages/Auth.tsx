import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ErrorModal } from "../components/util/ErrorModal";
import { Loading } from "../components/util/Loading";
import { AuthContext } from "../hooks/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import { DEFAULT_HEADERS, ENDPOINT_LOGIN } from "../util/constants";
/* ************************************************************************************************** */

export default function Auth() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { login, logout } = React.useContext(AuthContext);
  // const [formState, inputHandler, setFormData] = useForm(
  //   {
  //     code: reducerInputStateInitVal,
  //     password: reducerInputStateInitVal,
  //   },
  //   false
  // );

  /* ************************************************************************************************** */

  const authSubmitHandler = async () => {
    let TEST = { phone: "0548879522" };
    try {
      let res = await sendRequest(
        ENDPOINT_LOGIN,
        "POST",
        JSON.stringify(TEST),
        DEFAULT_HEADERS
      );
      login(res!);
    } catch (err) {}
  };

  React.useEffect(() => {
    authSubmitHandler();
  }, []);

  /* ************************************************************************************************** */

  return (
    <SafeAreaView style={styles.container}>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Loading />}
      <Text> Auth</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
