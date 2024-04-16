/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import React, { useState } from 'react'
import axios from 'axios'
import DialogForm from '@/components/dialog/dialog-form'
import DialogField from '@/components/dialog/dialog-field'
import DialogSubmit from '@/components/dialog/dialog-submit'

interface AddLisenceProps {
  fetchData: () => Promise<void>
}

export function AddProduct ({ fetchData }: AddLisenceProps): React.JSX.Element {
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(0)
  const [marketPrice, setMarketPrice] = useState<number>(0)
  const [stock, setStock] = useState<number>(0)

  const handlePriceChange = (value: string): void => {
    setPrice(Number(value))
  }

  const handleQuantityChange = (value: string): void => {
    setQuantity(Number(value))
  }

  const handleMarketPriceChange = (value: string): void => {
    setMarketPrice(Number(value))
  }

  const handleStockCange = (value: string): void => {
    setStock(Number(value))
  }

  const postData = async (): Promise<void> => {
    try {
      await axios.post('/api/products', {
        name,
        price,
        marketPrice,
        quantity,
        stock
      })
    } catch (error) {
      console.error('Failed to add product:', error)
      throw error
    }
  }

  return (
    <DialogForm
      title='Add Product'
      buttonText='Add'
      description='Create a new product on your table. Click add when you&apos;re done.'
      saveButton={postData}
    >
      <DialogField label='name' placeholder='Indomie' onChange={setName} isNumber={false} />
      <DialogField label='price' placeholder='10000' onChange={handlePriceChange} isNumber={true} />
      <DialogField label='marketPrice' placeholder='2400' onChange={handleMarketPriceChange} isNumber={true} />
      <DialogField label='quantity' placeholder='1' onChange={handleQuantityChange} isNumber={true} />
      <DialogField label='stock' placeholder='1' onChange={handleStockCange} isNumber={true} />
      <DialogSubmit text='Add' onClick={postData} />
    </DialogForm>
  )
}
