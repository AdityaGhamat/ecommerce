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
import { validateSignup } from "@/validations/UserValidation";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";
const SignUp: React.FC<SignInProps> = ({ isLogin, setIsLogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validateSubmission = validateSignup(username, email, password);
    if (!validateSubmission.success) {
      validateSubmission.errors.forEach((error: any) =>
        toast({ title: "Validation Error", description: error.message })
      );
      return;
    }
    try {
      const { data } = await axios.post("/api/v1/user/signup", {
        username,
        email,
        password,
      });
      toast({
        title: data?.success ? "Signup Successfull" : "Signup Failed",
        description:
          data.message ||
          (data.success
            ? "Account has been created"
            : "Account has not been created"),
      });
      if (data.success) {
        navigate({ to: "/" });
      }
    } catch (error: any) {
      if (error.response) {
        toast({
          title: "Signup Error",
          description: error.response?.data?.message || "Something went wrong",
        });
      }
    }
  };

  return (
    <Card className="w-[300px] md:w-[450px]">
      <CardHeader>
        <CardTitle className="md:text-2xl">Sign Up</CardTitle>
        <CardDescription className="text-md">
          Create a new account
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
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            Sign up
          </Button>
          <span className="">
            Already have an account?{" "}
            <span className="cursor-pointer underline" onClick={loginToggle}>
              Login
            </span>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
