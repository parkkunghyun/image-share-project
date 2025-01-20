"use client";
import React, { useState } from 'react';
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaUserLarge } from "react-icons/fa6";
import { useMutation } from '@tanstack/react-query';
import { supabase } from "../../lib/supabaseClient";  // supabase client import

// 회원가입 후 users 테이블에 사용자 정보 삽입
const signup = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  
  if (error) throw new Error(error.message);

  // supabase.auth.signUp 후 users 테이블에 추가
  const { user } = data;
  const { error: insertError } = await supabase
    .from('users')
    .insert([
      {
        id: user.id,  // Supabase에서 제공하는 user.id 사용
        email: user.email,  // 사용자의 이메일
        created_at: new Date().toISOString(),  // 생성 시간
      }
    ]);

  if (insertError) throw new Error(insertError.message);

  return user;
};

const SignupComponent = ({ toggleAuthMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [error, setError] = useState('');

  // useMutation 훅 사용
  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log("User signed up successfully:", data);
      toggleAuthMode(true); // 회원가입 성공 후 로그인 화면으로 전환
    },
    onError: (error) => {
      setError(error.message); // 에러 처리
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== checkPassword) {
      setError("Passwords do not match");
      return;
    }
    mutation.mutate({ email, password }); // mutate 호출
  };

  return (
    <div className='bg-white flex flex-col gap-8 items-center rounded-lg shadow-xl p-2 mx-auto h-[500px] w-[600px]'>
      <h2 className='text-2xl my-4 font-bold text-gray-600'>회원가입</h2>

      <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
        <div className='flex w-[400px] items-center gap-2 border-2 rounded-md p-2'>
          <MdOutlineEmail className='text-xl text-gray-800'/>
          <input
            className='flex-1 focus:outline-none'
            type="email"
            required
            placeholder='Email을 입력헤주세요.'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='flex w-[400px] items-center gap-2 border-2 rounded-md p-2'>
          <RiLockPasswordLine className='text-xl text-gray-800'/>
          <input
            className='flex-1 focus:outline-none'
            type="password"
            required
            placeholder='Password를 입력헤주세요.'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='flex w-[400px] items-center gap-2 border-2 rounded-md p-2'>
          <RiLockPasswordLine className='text-xl text-gray-800'/>
          <input
            className='flex-1 focus:outline-none'
            type="password"
            required
            placeholder='Password를 한번 더 입력해주세요.'
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
          />
        </div>

        {error && <div className='text-red-500'>{error}</div>}

        <button
          type="submit"
          className='w-[400px] hover:scale-105 duration-300 text-center bg-black py-2 rounded-md font-extrabold text-white'
        >
          회원가입
        </button>
      </form>

      <div className='flex items-center'>
        <FaUserLarge className='mr-2'/>
        <span className='text-sm'>혹시 아이디가 있으신가요? </span>
        <span
          className='ml-4 text-md font-bold cursor-pointer hover:scale-105 text-green-600'
          onClick={() => toggleAuthMode(true)}
        >
          로그인하러 가기
        </span>
      </div>
    </div>
  );
};

export default SignupComponent;
