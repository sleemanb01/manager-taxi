import React from "react";
import { Appbar } from "react-native-paper";
import { getCurrDay } from "../util/time";

export default function AppBar({ title }: { title: string }) {
  return (
    <Appbar.Header elevated={true} mode={"small"}>
      <Appbar.Content title={title} />
      <Appbar.Content title={getCurrDay().slice(5, 9)} onPress={() => {}} />
      <Appbar.Action icon="magnify" onPress={() => {}} />
    </Appbar.Header>
  );
}
