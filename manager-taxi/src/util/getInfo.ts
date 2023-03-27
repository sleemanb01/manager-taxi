import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHttpClient } from "../hooks/http-hook";
import { ENDPOINT_ROLES } from "./constants";

const getRoles = async () => {
  const storedRoles = AsyncStorage.getItem("roles");
  if (!storedRoles) {
    const { sendRequest } = useHttpClient();
    try {
      const res = await sendRequest(ENDPOINT_ROLES);
      const roles = res.roles;
      await AsyncStorage.setItem("roles", JSON.stringify(roles));
      return roles;
    } catch (err) {}
    return null;
  }
};
