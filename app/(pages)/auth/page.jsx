import React from 'react'
import AuthUI from "./ui";

export async function generateMetadata() {
  return {
    title: "Image Share - 인증 페이지",
    description: "Image Share 프로젝트의 로그인 및 회원가입 페이지입니다. 사용자 인증을 처리하고, 안전하게 사진을 공유할 수 있습니다.",
    openGraph: {
      images: ["/image-auth.jpg"],
    }
  }
}

const AuthPage = () => {
  return (
    <div className='pt-40 w-4/5 mx-auto'>
      <AuthUI/>
    </div>
  )
}

export default AuthPage