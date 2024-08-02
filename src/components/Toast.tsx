import React from 'react'

interface IToastProps {
  message: string | undefined;
  type: "success" | "error" | "info" | "warning";
}


export default function Toast({ message, type }: IToastProps) {
  return (
    <>
      <div className={`toast toast-ending `}>
        <div className={`alert alert-${type} text-xs sm:text-base `}>
          <span>{message}</span>
        </div>
      </div>
    </>
  )
}
