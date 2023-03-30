import React from "react";
import { Image, View, StyleSheet, Alert, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { launchCameraAsync, ImagePickerAsset } from "expo-image-picker";
import { Button, Menu, Divider } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTranslation } from "react-i18next";

export default function ImagePickerEx() {
  const { t } = useTranslation();
  const [visible, setVisible] = React.useState(false);
  const [pickedImage, setPickedImage] = React.useState<
    ImagePickerAsset[] | null
  >();

  const [cameraPermission, requestCameraPermission] =
    ImagePicker.useCameraPermissions();

  const [storagePermission, requestStoragePermission] =
    ImagePicker.useMediaLibraryPermissions();

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const verifyCameraPermission = async () => {
    if (cameraPermission) {
      if (
        cameraPermission.status === ImagePicker.PermissionStatus.UNDETERMINED
      ) {
        const permissionResponse = await requestCameraPermission();

        return permissionResponse.granted;
      }
      if (cameraPermission.status === ImagePicker.PermissionStatus.DENIED) {
        Alert.alert(
          "Insufficient permission!",
          "You need to grant camera access to use this app"
        );
        return false;
      }
    }
    return true;
  };

  const verifyMediaPermission = async () => {
    if (storagePermission) {
      if (
        storagePermission.status === ImagePicker.PermissionStatus.UNDETERMINED
      ) {
        const permissionResponse = await requestStoragePermission();

        return permissionResponse.granted;
      }
      if (storagePermission.status === ImagePicker.PermissionStatus.DENIED) {
        Alert.alert(
          "Insufficient permission!",
          "You need to grant camera access to use this app"
        );
        return false;
      }
    }
    return true;
  };

  async function cameraPressHandler() {
    const hasPermission = await verifyCameraPermission();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.assets);
  }

  async function mediaPressHandler() {
    const hasPermission = await verifyMediaPermission();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.assets);
  }

  let imagePreview = <Text style={styles.previewText}>{t("noPhoto")}</Text>;

  if (pickedImage) {
    imagePreview = (
      <Image source={{ uri: pickedImage[0].uri }} style={styles.imageStyle} />
    );
  }
  return (
    <View>
      <View style={styles.imagepreviewcontainer}>{imagePreview}</View>
      <View
        style={{
          paddingTop: 10,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>{t("choosePhoto")}</Button>}
        >
          <Menu.Item
            onPress={cameraPressHandler}
            title={t("takeImage")}
            leadingIcon={"camera"}
          />
          <Divider />
          <Menu.Item
            onPress={mediaPressHandler}
            title={t("pickImage")}
            leadingIcon={"folder-image"}
          />
        </Menu>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imagepreviewcontainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    marginVertical: 8,
    borderRadius: 8,
  },
  previewText: {
    color: "#592454",
  },
  imageStyle: {
    width: "50%",
    height: "100%",
    aspectRatio: 1,
  },
});
