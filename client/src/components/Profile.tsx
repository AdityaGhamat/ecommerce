import axios from "axios";
import { useEffect, useState } from "react";
import type { userSelect } from "@server/types/userTypes";
const Profile = () => {
  const [user, setUser] = useState<userSelect>();
  useEffect(() => {
    async function getUserProfile() {
      const response = await axios.get("/api/v1/user");
      console.log(response.data);
      setUser(response.data.data.userProfile);
    }
    getUserProfile();
  }, []);
  return <div>{user?.username}</div>;
};

export default Profile;
