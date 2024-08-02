"use client"
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {
  href: string
  children: React.ReactNode
  titleName?: string
}

export default function NavBarLink({ href, children, titleName }: Props) {
  const location = usePathname()
  const isActive = location === href
  return (
    <>
      <a href={href} className={isActive ? 'active' : ''} title={titleName}>{children}</a>
    </>
  )
}