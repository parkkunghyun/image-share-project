"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaUserLarge } from "react-icons/fa6";
import { supabase } from '../../lib/supabaseClient';  // supabase client import

const Header = () => {
  const [user, setUser] = useState(null);

  // 로그인 상태 확인
  useEffect(() => {
    const session = supabase.auth.getSession();
    session.then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);  // 로그인된 사용자 정보
      }
    });

    // 로그인 상태 변경을 실시간으로 확인
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);  // 로그아웃 후 상태 초기화
  };

  return (
    <div className='fixed left-32 top-4 left-10 right-10 flex justify-between items-center'>
      <Link href={"/"}>
        <Image className='hover:scale-110 duration-500' src={"/image-logo.png"} alt='image logo' width={100} height={100} />
      </Link>

      <nav className='flex items-center gap-8 mr-4'>
        <Link href={"/mypage"}>
          <p className='text-xl hover:scale-110 duration-500'>My Page</p>
        </Link>

        {user ? (
          <div className='flex items-center gap-2'>
            <p className='text-xl'>{user.email}</p>
            <button
              onClick={handleLogout}
              className='text-xl hover:scale-110 duration-500'
            >
              로그아웃
            </button>
          </div>
        ) : (
          <Link href={"/auth"} className='flex hover:scale-110 duration-500 items-center gap-2'>
            <FaUserLarge className='text-2xl text-gray-800' />
            <p className='text-xl'>Log in</p>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
