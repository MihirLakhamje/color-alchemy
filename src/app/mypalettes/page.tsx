import MyPalettes from '@/components/MyPalettes'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata = {
  title: 'My Palettes',
  description: 'see your created color palettes',
}

export default function page() {
  return (
    <>
      <MyPalettes />
    </>
  )
}
