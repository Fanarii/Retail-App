'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

interface dialogInterface {
  children: React.ReactNode
  buttonText: string
  title: string
  description: string
  saveButton: () => void
}

const DialogForm = ({ children, buttonText, title, description, saveButton }: dialogInterface): React.JSX.Element => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
          <div className="grid gap-4 py-4">
            {description}
          </div>
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>)
}

export default DialogForm
