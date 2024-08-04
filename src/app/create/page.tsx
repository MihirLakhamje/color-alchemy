import ColorInput from '@/components/ColorInput'
import { Metadata } from 'next'

export const metadata:Metadata = {
  title: 'Create Palette',
  description: 'Create your own color palette',
  keywords: ["color", "palette", "generator", "randomize", "colorize", "constructive random", "constructive color palettes"],
}

export default function page() {
  return (
    <>  
      <div className="flex items-center justify-center card mt-10">
        <ColorInput />
      </div>
    </>
  )
}
