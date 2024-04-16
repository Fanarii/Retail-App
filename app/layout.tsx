import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import ReduxProvider from '@/features/reduxProvider'
import { ThemeProvider } from '@/components/theme-provider'
import NavigationBar from '@/components/navbar'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Retail App',
  description: 'Generated by create next app'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <div className='h-screen'>
              <div className='flex justify-center items-center w-screen'><NavigationBar /></div>
              {children}
            </div>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
