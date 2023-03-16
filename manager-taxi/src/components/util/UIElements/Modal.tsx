import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { HandlerFuncType } from "../../../types/types";

type ModalProps = {
  show: boolean;
  header?: string;
  content: string;
  onCancel: HandlerFuncType;
  onSubmit?: Function;
  footer?: JSX.Element;
};

export function SimpleModal({
  show,
  header,
  content,
  onCancel,
  onSubmit,
  footer,
}: ModalProps) {
  return (
    <Modal
      visible={show}
      onRequestClose={() => onCancel}
      animationType="slide"
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{header}</Text>
            <Text style={styles.modalText}>{content}</Text>
            {footer}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
