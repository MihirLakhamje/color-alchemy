"use client"
import axios, { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function LogoutBtn() {
  const {refresh} = useRouter()
  async function handleLogout() {
    try {
      await axios.get('/api/users/logout')
      refresh()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}
