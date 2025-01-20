"use client";

import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaUserLarge } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { useMutation } from "@tanstack/react-query";

// 로그인 요청 함수
const loginMutationFn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message); // 에러 발생 시 예외 처리
  }
  return data; // 성공 시 반환
};

const LoginComponent = ({ toggleAuthMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // 에러 상태 추가
  const router = useRouter();

  // React Query mutation for login
  const loginMutation = useMutation(
    {
      mutationFn: loginMutationFn,
      onSuccess: () => {
      // 로그인 성공 시 메인 페이지로 이동
      router.push("/");
    },
    onError: (error) => {
      setError(error.message); // 에러 메시지 상태 업데이트
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // 기존 에러 초기화
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="bg-white flex flex-col gap-8 items-center rounded-lg shadow-xl p-2 mx-auto h-[500px] w-[600px]">
      <h2 className="text-2xl my-4 font-bold text-gray-600">로그인</h2>

      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex w-[400px] items-center gap-2 border-2 rounded-md p-2">
          <MdOutlineEmail className="text-xl text-gray-800" />
          <input
            className="flex-1 focus:outline-none"
            type="email"
            required
            placeholder="Email을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex w-[400px] items-center gap-2 border-2 rounded-md p-2">
          <RiLockPasswordLine className="text-xl text-gray-800" />
          <input
            className="flex-1 focus:outline-none"
            type="password"
            required
            placeholder="Password를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* 에러 메시지 표시 */}
        {error && <div className="text-red-500">{error}</div>}

        <button
          type="submit"
          className="w-[400px] hover:scale-105 duration-300 text-center bg-black py-2 rounded-md font-extrabold text-white"
          disabled={loginMutation.isLoading}
        >
          {loginMutation.isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      <div className="flex items-center">
        <FaUserLarge className="mr-2" />
        <span className="text-sm">혹시 유저가 아니신가요? </span>
        <span
          className="ml-4 text-md font-bold cursor-pointer hover:scale-105 text-green-600"
          onClick={() => toggleAuthMode(false)}
        >
          회원가입하러 가기
        </span>
      </div>
    </div>
  );
};

export default LoginComponent;
