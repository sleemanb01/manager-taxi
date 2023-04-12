import { View } from "react-native";
import { httpStatus } from "../../types/types";
import { ErrorModal } from "../util/ErrorModal";
import KeyBoardAvoid from "../util/KeyBoardAvoid";
import { Loading } from "../util/Loading";

export default function HttpComponent({
  httpStatus,
  children,
}: {
  httpStatus: httpStatus;
  children: JSX.Element[] | JSX.Element;
}) {
  const { error, clearError, isLoading } = httpStatus;
  return (
    <KeyBoardAvoid>
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <Loading />}
        {children}
      </View>
    </KeyBoardAvoid>
  );
}
