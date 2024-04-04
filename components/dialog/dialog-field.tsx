import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

interface dialogFieldInterface {
  label: string
  placeholder: string
  isNumber: boolean
  onChange: (value: string) => void
  defaultValue?: string | number
}

const DialogField = ({ label, placeholder, isNumber, onChange, defaultValue }: dialogFieldInterface): React.JSX.Element => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={label} className="text-right">
        {label.replace(/^[a-z]/, (match) => match.toUpperCase())}
      </Label>
      <Input
        id={label}
        className="col-span-3"
        onChange={(e) => { onChange(e.target.value) }}
        placeholder={placeholder}
        type={isNumber ? 'number' : ''}
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default DialogField
