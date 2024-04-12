/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DialogForm from '@/components/dialog/dialog-form'
import DialogField from '@/components/dialog/dialog-field'
import DialogSubmit from '@/components/dialog/dialog-submit'

interface addLisenceProps {
  fetchData: () => Promise<void>
  id: number
}

export function EditLisence ({ fetchData, id }: addLisenceProps): React.JSX.Element {
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(0)

  const initLisence = async (): Promise<void> => {
    const response = await axios.get(`/api/lisences/${id}`)
    const dataName: string = response.data.name
    const dataPrice: number = response.data.price
    setName(dataName)
    setPrice(dataPrice)
  }

  const handlePriceChange = (value: string): void => {
    setPrice(Number(value))
  }

  const postData = async (): Promise<void> => {
    try {
      await axios.patch(`/api/lisences/${id}`, {
        name,
        price
      })

      await fetchData()
    } catch (error) {
      console.error('Failed to add lisence:', error)
      throw error
    }
  }

  useEffect(() => {
    void initLisence()
  }, [])

  return (
    <DialogForm
      title='Edit Lisence'
      buttonText='Edit'
      description='Edit your lisence on your table. Click save when you&apos;re done.'
      saveButton={postData}
    >
      <DialogField label='name' placeholder='Indomie' onChange={setName} isNumber={false} defaultValue={name} />
      <DialogField label='price' placeholder='2400' onChange={handlePriceChange} isNumber={true} defaultValue={price} />
      <DialogSubmit text='Save' onClick={postData} />
    </DialogForm>
  )
}
