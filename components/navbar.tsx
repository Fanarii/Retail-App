'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavigationBar = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<string>('home')
  const location = usePathname()

  useEffect(() => {
    setIsOpen(false)
    setIsActive(location)
  }, [location])

  return (
    <nav className='bg-primary min-w-[100%] md:flex md:justify-between items-center w-full'>
      <button
        className='text-4xl text-third p-2 md:hidden'
        onClick={() => { setIsOpen(!isOpen) }}
      >
        ☰
      </button>
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
        <li className={`py-3 flex flex-col items-center justify-center ${isActive === '/lisences' ? 'opacity-100' : 'opacity-50'}`}>
          <Link className='px-4 py-2' href='/lisences'>
            Lisence
          </Link>
          <div className={`rounded-lg bg-white w-7 h-1 ${isActive === '/lisences' ? '' : 'hidden'}`}></div>
        </li>
        <li className={`py-3 flex flex-col items-center justify-center ${isActive === '/product' ? 'opacity-100' : 'opacity-50'}`}>
          <Link className='px-4 py-2' href='/product'>
            Products
          </Link>
          <div className={`rounded-lg bg-white w-7 h-1 ${isActive === '/product' ? '' : 'hidden'}`}></div>
        </li>
      </ul>
    </nav>
  )
}

export default NavigationBar
