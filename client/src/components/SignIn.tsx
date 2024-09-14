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
import axios from "axios";
import { toast } from "@/hooks/use-toast";

const SignIn: React.FC<SignInProps> = ({ isLogin, setIsLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginToggle = () => {
    setIsLogin(!isLogin);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/user/login", {
        email,
        password,
      });
      if (response.data.success) {
        toast({
          title: "Login Successful",
          description: response.data.message || "Welcome back!",
        });
      }
      console.log(response.data);
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Something went wrong",
      });
    }
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
          <span className="cursor-pointer" onClick={loginToggle}>
            Not have an account
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignIn;
