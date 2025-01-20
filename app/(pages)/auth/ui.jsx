"use client";

import React, { useState } from 'react'

import LoginComponent from "../../components/Login";
import SignupComponent from "../../components/Signup";

const AuthUI = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
    {isLogin ? (
      <LoginComponent toggleAuthMode={toggleAuthMode} />
    ) : (
      <SignupComponent toggleAuthMode={toggleAuthMode} />
    )}
    </>
  )
}

export default AuthUI;