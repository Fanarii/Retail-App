/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DialogForm from '@/components/dialog/dialog-form'
import DialogField from '@/components/dialog/dialog-field'
import DialogSubmit from '@/components/dialog/dialog-submit'

interface addProductProps {
  fetchData: () => Promise<void>
  id: number
}

export function EditProduct ({ fetchData, id }: addProductProps): React.JSX.Element {
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(0)
  const [marketPrice, setMarketPrice] = useState<number>(0)

  const initLisence = async (): Promise<void> => {
    const response = await axios.get(`/api/products/${id}`)
    const dataName: string = response.data.name
    const dataPrice: number = response.data.price
    const dataMarketPrice: number = response.data.marketPrice
    const dataQuantity: number = response.data.quantity
    setName(dataName)
    setPrice(dataPrice)
    setMarketPrice(dataMarketPrice)
    setQuantity(dataQuantity)
  }

  const handlePriceChange = (value: string): void => {
    setPrice(Number(value))
  }

  const handleQuantityChange = (value: string): void => {
    setQuantity(Number(value))
  }

  const handleMarketPriceChange = (value: string): void => {
    setMarketPrice(Number(value))
  }

  const postData = async (): Promise<void> => {
    try {
      await axios.patch(`/api/products/${id}`, {
        name,
        price,
        marketPrice,
        quantity
      })

      await fetchData()
    } catch (error) {
      console.error('Failed to add product:', error)
      throw error
    }
  }

  useEffect(() => {
    void initLisence()
  }, [])

  return (
    <DialogForm
      title='Edit Product'
      buttonText='Edit'
      description='Edit your product on your table. Click save when you&apos;re done.'
      saveButton={postData}
    >
      <DialogField label='name' placeholder='Indomie' onChange={setName} isNumber={false} defaultValue={name} />
      <DialogField label='price' placeholder='66000' onChange={handlePriceChange} isNumber={true} defaultValue={price} />
      <DialogField label='marketPrice' placeholder='2400' onChange={handleMarketPriceChange} isNumber={true} defaultValue={marketPrice} />
      <DialogField label='quantity' placeholder='1' onChange={handleQuantityChange} isNumber={true} defaultValue={quantity} />
      <DialogSubmit text='Save' onClick={postData} />
    </DialogForm>
  )
}
