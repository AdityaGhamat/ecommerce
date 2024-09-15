import { signupUserProfile } from "@/queries/queries";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "@tanstack/react-router";

function useUserSignup() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: signupUserProfile,
    onSuccess: (data) => {
      toast({
        title: "Account Created Successful",
        description: data.message || "Welcome OnBoard!",
      });
      navigate({ to: "/profile" });
    },
    onError: (error: any) => {
      toast({
        title: "Signup Failed",
        description: error?.response?.data?.message || "Something went wrong",
      });
    },
  });

  return mutate;
}
export default useUserSignup;
