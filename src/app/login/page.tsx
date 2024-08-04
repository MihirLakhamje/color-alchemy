import LoginForm from '@/components/LoginForm'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default function LoginPage() {
  return (
    <>
      <div className="flex items-center justify-center card mt-20">
        <LoginForm />
      </div>
    </>
  )
}
