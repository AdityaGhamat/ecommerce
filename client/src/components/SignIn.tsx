import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SignInProps } from "@/types/authentication";
import { toast } from "@/hooks/use-toast";
import useUserLogin from "@/hooks/auth/useUserLogin"; // Import the custom hook
import { useValidation } from "@/hooks/useValidation";
import { loginUserSchema } from "@schema/userSchema";

const SignIn: React.FC<SignInProps> = ({ isLogin, setIsLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginToggle = () => {
    setIsLogin(!isLogin);
  };

  const { validate } = useValidation(loginUserSchema);
  const login = useUserLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validateSubmission = validate({ email, password });
    if (!validateSubmission.success) {
      validateSubmission.errors.forEach((error: any) =>
        toast({ title: "Validation Error", description: error.message })
      );
      return;
    }
    login({ email, password });
  };

  return (
    <Card className="w-[300px] md:w-[450px]">
      <CardHeader>
        <CardTitle className="md:text-2xl">Sign In</CardTitle>
        <CardDescription className="md:text-md">
          Access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="md:text-md">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="md:text-md"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="w-full flex flex-col justify-center gap-2">
          <Button className="w-full" onClick={handleSubmit}>
            Sign In
          </Button>
          <span>
            Don't have an account?{" "}
            <span className="cursor-pointer underline" onClick={loginToggle}>
              SignUp
            </span>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignIn;
