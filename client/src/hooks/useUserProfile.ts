import { fetchUserProfile } from "@/queries/queries";
import { useQuery } from "@tanstack/react-query";

export function useUserProfile() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userProfileTwo"],
    queryFn: fetchUserProfile,
  });
  return { data, isLoading, isError, error };
}
