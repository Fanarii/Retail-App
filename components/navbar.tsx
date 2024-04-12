'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from './theme-button'

const NavigationBar = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<string>('home')
  const location = usePathname()

  useEffect(() => {
    setIsOpen(false)
    setIsActive(location)
  }, [location])

  return (
    <nav className='bg-primary min-w-[100%] md:flex md:justify-center items-center w-full'>
      <button
        className='text-4xl text-third p-2 md:hidden'
        onClick={() => { setIsOpen(!isOpen) }}
      >
        ☰
      </button>
      <ModeToggle />
      <ul
        className={`text-white text-1xl flex flex-col items-center 
          md:justify-center md:flex md:items-center gap-1 md:flex-row md:space-x-4 ${
          isOpen ? 'block md:hidden' : 'hidden md:block'
        }`}
      >
        <li className={`py-3 flex flex-col items-center justify-center ${isActive === '/' ? 'opacity-100' : 'opacity-50'}`}>
          <Link className='px-4 py-2 ' href='/'>
            Home
          </Link>
          <div className={`rounded-lg bg-white w-7 h-1 ${isActive === '/' ? '' : 'hidden'}`}></div>
        </li>
        <li className={`py-3 flex flex-col items-center justify-center ${isActive === '/dashboard/lisences' ? 'opacity-100' : 'opacity-50'}`}>
          <Link className='px-4 py-2' href='/dashboard/lisences'>
            Lisence
          </Link>
          <div className={`rounded-lg bg-white w-7 h-1 ${isActive === '/dashboard/lisences' ? '' : 'hidden'}`}></div>
        </li>
        <li className={`py-3 flex flex-col items-center justify-center ${isActive === '/dashboard/products' ? 'opacity-100' : 'opacity-50'}`}>
          <Link className='px-4 py-2' href='/dashboard/products'>
            Products
          </Link>
          <div className={`rounded-lg bg-white w-7 h-1 ${isActive === '/dashboard/products' ? '' : 'hidden'}`}></div>
        </li>
      </ul>
    </nav>
  )
}

export default NavigationBar
