import jwtDecode, { JwtPayload } from "jwt-decode";
import { useHttpClient } from "../hooks/http-hook";
import { Keys } from "../types/types";
import { ENDPOINT_REFRESH_TOKENS } from "./constants";

export const getAccessUsingRefresh = async (
  token: string
): Promise<Keys | null> => {
  const { sendRequest } = useHttpClient();
  try {
    const res = await sendRequest(ENDPOINT_REFRESH_TOKENS, "GET", null, {
      Authorization: "Barer " + token,
    });
    return res;
  } catch (err) {
    return null;
  }
};

export const gettokenRemainingTime = (token: string) => {
  const exp = jwtDecode<JwtPayload>(token).exp;

  let remaining = new Date(exp! * 1000).getTime() - new Date().getTime();
  if (remaining < 0) {
    remaining = 0;
  }
  return remaining;
};
