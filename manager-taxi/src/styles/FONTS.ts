import { StyleSheet } from "react-native";
import { COLORS } from "./COLORS";

export const FONTS = StyleSheet.create({
  custHebrew: {
    color: COLORS.white,
    fontFamily: "OpenSans-Regular",
    fontSize: 18,
    textAlign: "center",
    margin: 8,
  },
  custHebrewBold: {
    fontFamily: "OpenSans-Bold",
    color: COLORS.white,
    fontSize: 35,
    margin: 8,
  },
  btnBlackText: {
    textAlign: "center",
    fontSize: 21,
    color: COLORS.black,
  },
  btnBlackText2: {
    textAlign: "center",
    fontSize: 15,
    color: COLORS.black,
  },
  btnBlackTextSmall: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 18,
    color: COLORS.black,
  },
  blackText: {
    color: COLORS.black,
    textAlign: "left",
  },
  blackTextB: {
    color: COLORS.black,
    textAlign: "left",
    fontWeight: "bold",
  },
  btnBlackTextWithU: {
    textAlign: "left",
    color: COLORS.black,
    textDecorationLine: "underline",
  },
  marginTop: {
    marginTop: 20,
  },
  marginTopA: {
    marginTop: 80,
  },
  sideInfo: {
    color: COLORS.gray,
    marginStart: 10,
  },
  sideInfoBold: {
    color: COLORS.gray,
    fontWeight: "bold",
  },
  title: {
    color: COLORS.black,
    fontWeight: "bold",
  },
  btnWhiteText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
  },
  btnWhiteTextProfile: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
  },
});
