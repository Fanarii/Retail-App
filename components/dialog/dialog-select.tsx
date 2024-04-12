import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface SelectInterface {
  children: React.ReactNode
  placeholder: string
  onChange: (value: string) => void
  value: string
}

export function DialogSelect ({ children, placeholder, onChange, value }: SelectInterface): React.ReactElement {
  const handleValueChange = (newValue: string): void => {
    onChange(newValue)
  }

  return (
    <Select onValueChange={handleValueChange} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Lisence</SelectLabel>
            {children}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
