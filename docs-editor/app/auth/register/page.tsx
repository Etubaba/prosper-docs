import React from "react";
import AuthForm from "../../../components/auth/AuthForm";

const Register = () => {
  return (
    <div className="bg-[url('/docbg.jpg')] px-4 bg-cover bg-left-top flex justify-center items-center w-full h-screen">
      <AuthForm login={false} />
    </div>
  );
};

export default Register;
