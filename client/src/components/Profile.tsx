import { useUserProfile } from "@/hooks/useUserProfile";
const Profile = () => {
  const { data, isLoading } = useUserProfile();
  if (isLoading) return <>Loading...</>;
  return <div>{data?.username}</div>;
};

export default Profile;
