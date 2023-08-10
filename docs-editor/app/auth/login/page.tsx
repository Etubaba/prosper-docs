import React from "react";
import AuthForm from "../../../components/auth/AuthForm";

const Login = () => {
  return (
    <div className="bg-[url('/docbg.jpg')] px-4 bg-cover  flex justify-center items-center w-full h-screen">
      <AuthForm login={true} />
    </div>
  );
};

export default Login;
