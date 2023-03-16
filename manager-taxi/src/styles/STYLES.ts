import { StyleSheet } from "react-native";
import { COLORS } from "./COLORS";

/* ******************** STYLES FOR LAYOTS ******************** */

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headContainer: {
    marginTop: 0,
    flex: 3,
    alignItems: "center",
  },
  mainContainer: {
    flex: 2,
    margin: 8,
    paddingHorizontal: 8,
  },
  footerContainer: {
    flex: 1,
  },
});

/* **************************************** */

export const WhoRYouStyles = StyleSheet.create({
  headerContainer: {
    marginTop: 100,
    alignItems: "center",
    flex: 3,
  },
  mainContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
  },
  footerContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

/* **************************************** */

export const categoriesStyles = StyleSheet.create({
  headerContainer: {
    marginTop: 120,
    alignItems: "center",
    flex: 2,
  },
  mainContainer: {
    flex: 3,
  },
  footerContainer: {
    flex: 1,
  },
  scrollableViewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 10,
  },
});

/* **************************************** */

export const errorScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

/* **************************************** */

export const loadingStyles = StyleSheet.create({
  headerContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  footerContainer: {
    flex: 1,
    alignItems: "center",
  },
});

/* **************************************** */

export const postStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 15,
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 2,
  },
  headerRightSide: {
    flexDirection: "row",
  },
  headerLeftSide: {
    flexDirection: "row",
  },
  mainContainer: {
    flex: 3,
  },
  footerContainer: {
    flex: 1,
    marginTop: 15,
  },
  footerButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

/* **************************************** */

export const mainStyles = StyleSheet.create({
  mainContainer: {
    flex: 13,
  },
});

/* **************************************** */

export const newPostStyles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    marginTop: 20,
  },
  mainContainer: {
    flex: 5,
    marginHorizontal: 15,
  },
  footerContainer: {
    flex: 1,
  },
  chooseGalleryContainer: {
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
  },
  image: {
    margin: 10,
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectedRowStyle: {
    borderColor: COLORS.black,
    borderWidth: 1,
    color: "red",
    borderRadius: 50,
  },
  textInput: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 17,
    marginTop: 50,
    padding: 8,
    textAlignVertical: "top",
  },
});

/* **************************************** */

export const imagePickerModalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.white,
    marginTop: 80,
    marginLeft: 40,
  },
  image: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "column",
  },
});

export const headerStyle = {
  headerStyle: {
    backgroundColor: COLORS.secondary,
  },
  headerTitleAlign: "center",
  headerTintColor: COLORS.white,
};

export const imageStyles = StyleSheet.create({
  standart: {
    height: 100,
    width: 150,
  },
  second: {
    margin: 5,
    width: 85,
    height: 85,
  },
  main: {
    margin: 5,
    width: 160,
    height: 200,
  },
  tinyLogo: {
    height: 50,
    width: 50,
    margin: 15,
    borderRadius: 100,
  },
  tinytinyLogo: {
    height: 15,
    width: 15,
    margin: 15,
    borderRadius: 100,
  },
  tinyResizedLogo: {
    height: 40,
    width: 40,
    margin: 20,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  tinytinyResizedLogo: {
    height: 20,
    width: 20,
    margin: 20,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  tinyProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    // marginBottom: 10,
  },
  tinytinyProfileImage: {
    width: 20,
    height: 20,
    borderRadius: 50,
    // marginBottom: 10,
  },
});

export const commonStyles = StyleSheet.create({
  centerRowDir: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    fontSize: 17,
    marginVertical: 10,
    padding: 8,
    width: "80%",
  },
  textInput2: {
    width: "90%",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 17,
    marginTop: 50,
    padding: 8,
    alignSelf: "center",
    textAlignVertical: "top",
  },
});

export const dropDownStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.black,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    zIndex: 1,
    elevation: 1,
  },
  dropdownContainer: {
    top: 50,
    width: "100%",
    position: "absolute",
  },
  button: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.black,
    textAlignVertical: "center",
    height: 35,
    paddingHorizontal: 10,
  },
});

export const ProfileSettingsStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 3,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 10,
    justifyContent: "space-around",
    alignContent: "center",
    paddingHorizontal: 30,
    paddingBottom: 150,
    paddingTop: 20,
  },
});

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  headerContainer: {
    flex: 2,
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  footerContainer: {
    flex: 4,
  },
});

export const mediumProfileStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    paddingVertical: 30,
  },
});

export const editProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
    alignItems: "center",
    paddingVertical: 30,
  },
  editWCheck: {
    flexDirection: "row",
  },
});

export const roundedProfilesStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // alignItems: 'center',
    position: "absolute",
    marginHorizontal: 10,
  },
});
