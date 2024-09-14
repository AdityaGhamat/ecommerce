import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import { useState } from "react";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
    <div className="h-screen w-full flex justify-center items-center">
      {isLogin ? (
        <SignIn setIsLogin={setIsLogin} isLogin={isLogin} />
      ) : (
        <SignUp setIsLogin={setIsLogin} isLogin={isLogin} />
      )}
    </div>
  );
};

export default Authentication;
