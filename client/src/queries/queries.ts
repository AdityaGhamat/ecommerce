import axios from "axios";
import type { userSelect, signupUser } from "@server/types/userTypes";

export const fetchUserProfile = async (): Promise<userSelect> => {
  const { data } = await axios.get("/api/v1/user");
  return data.data.userProfile;
};

export const loginUserProfile = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data } = await axios.post("/api/v1/user/login", {
    email,
    password,
  });
  return data;
};

export const signupUserProfile = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  const { data } = await axios.post("/api/v1/user/signup", {
    username,
    email,
    password,
  });
  return data;
};
