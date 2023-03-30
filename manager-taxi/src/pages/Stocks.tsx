import React from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { useStocks } from "../hooks/useStocks";
import { getCurrDay } from "../util/time";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IStock } from "../types/interfaces";
import { RootStackParamList } from "../types/types";

export default function Stocks() {
  // const nav = useNavigate();
  // const { shift, setShift } = useContext(ShiftContext);

  // const { user } = useContext(AuthContext);

  // const { error, sendRequest, clearError } = useHttpClient();
  // const [openShiftPicker, setOpenShiftPicker] = useState(!!!shift);

  // useEffect(() => {
  //   const uploadShift = async () => {
  //     try {
  //       const res = await sendRequest(
  //         ENDPOINT_SHIFTS,
  //         "POST",
  //         JSON.stringify(shift),
  //         {
  //           ...DEFAULT_HEADERS,
  //           Authorization: "Barer " + user?.token,
  //         }
  //       );
  //       const fetchedShift = res.shift;
  //       setShift(fetchedShift);
  //       setOpenShiftPicker(false);
  //     } catch (err) {}
  //   };

  //   if (shift && !shift._id) {
  //     uploadShift();
  //   }
  // }, [
  //   shift,
  //   shift?._id,
  //   sendRequest,
  //   user?.token,
  //   setShift,
  //   setOpenShiftPicker,
  // ]);

  // const addClickHandler = () => {
  //   nav("/stocks/new/undefined");
  // };

  // const closeStepperHandler = () => {
  //   setOpenShiftPicker(false);
  // };

  const { categories } = useStocks();

  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const addHandler = () => {
    navigation.navigate("NewStock");
  };

  return (
    <View style={styles.container}>
      <Appbar.Header elevated={true} mode={"small"}>
        <Appbar.Content title={t("Stocks")} />
        <Appbar.Content title={getCurrDay().slice(5, -6)} onPress={() => {}} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <FAB icon="plus" style={styles.fab} onPress={addHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
  },
});
