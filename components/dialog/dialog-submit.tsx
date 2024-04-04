import React from 'react'
import { DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'
import * as DialogPrimitive from '@radix-ui/react-dialog'

interface DialogSubmitProps {
  text: string
  onClick: () => void
}

const DialogSubmit: React.FC<DialogSubmitProps> = ({ onClick, text }) => {
  return (
    <DialogFooter>
      <DialogPrimitive.Close>
        <Button variant="secondary" onClick={onClick}>
          {text}
        </Button>
      </DialogPrimitive.Close>
    </DialogFooter>
  )
}

export default DialogSubmit
