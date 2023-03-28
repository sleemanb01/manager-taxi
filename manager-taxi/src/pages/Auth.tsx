import React from "react";
import { Button, SafeAreaView, TextInput, StyleSheet } from "react-native";
import { AuthContext } from "../hooks/auth-context";
import { ENDPOINT_LOGIN, DEFAULT_HEADERS } from "../util/constants";
import { useHttpClient } from "../hooks/http-hook";
import { ErrorModal } from "../components/util/ErrorModal";
import { Loading } from "../components/util/Loading";
import auth from "@react-native-firebase/auth";

export default function Auth() {
  const { login } = React.useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [confirm, setConfirm] = React.useState(null);
  const [code, setCode] = React.useState("");

  const onAuthStateChanged = async () => {
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
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  async function signInWithPhoneNumber(phoneNumber: string) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log(confirmation);

    // setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      // await confirm.confirm(code);
    } catch (error) {
      console.log("Invalid code.");
    }
  }

  function confirmComponent() {
    return (
      <React.Fragment>
        <TextInput value={code} onChangeText={(text) => setCode(text)} />
        <Button title="Confirm Code" onPress={() => confirmCode()} />
      </React.Fragment>
    );
  }

  function notConfirmComponent() {
    return (
      <React.Fragment>
        <Button
          title="Phone Number Sign In"
          onPress={() => signInWithPhoneNumber("+972548879522")}
        />
      </React.Fragment>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Loading />}
      {confirm ? confirmComponent() : notConfirmComponent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
