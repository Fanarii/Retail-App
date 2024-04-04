/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import React, { useState } from 'react'
import axios from 'axios'
import DialogForm from '@/components/dialog/dialog-form'
import DialogField from '@/components/dialog/dialog-field'
import DialogSubmit from '@/components/dialog/dialog-submit'

interface addLisenceProps {
  fetchData: () => Promise<void>
}

export function AddLisence ({ fetchData }: addLisenceProps): React.JSX.Element {
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(0)

  const handlePriceChange = (value: string): void => {
    setPrice(Number(value))
  }

  const postData = async (): Promise<void> => {
    try {
      await axios.post('/api/lisences', {
        name,
        price
      })

      await fetchData()
    } catch (error) {
      console.error('Failed to add lisence:', error)
      throw error
    }
  }

  return (
    <DialogForm
      title='Add Lisence'
      buttonText='Add'
      description='Create new lisence on your table. Click add when you&apos;re done.'
      saveButton={postData}
    >
      <DialogField label='name' placeholder='Indomie' onChange={setName} isNumber={false} />
      <DialogField label='price' placeholder='2400' onChange={handlePriceChange} isNumber={true} />
      <DialogSubmit text='Add' onClick={postData} />
    </DialogForm>
  )
}
