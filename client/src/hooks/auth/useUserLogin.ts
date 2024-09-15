import { loginUserProfile } from "@/queries/queries";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "@tanstack/react-router";

function useUserLogin() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: loginUserProfile,
    onSuccess: (data) => {
      toast({
        title: "Login Successful",
        description: data.message || "Welcome back!",
      });
      navigate({ to: "/profile" });
    },
    onError: (error: any) => {
      toast({
        title: "Login Failed",
        description: error?.response?.data?.message || "Something went wrong",
      });
    },
  });

  return mutate;
}
export default useUserLogin;
