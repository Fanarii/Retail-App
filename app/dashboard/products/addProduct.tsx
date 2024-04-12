// /* eslint-disable @typescript-eslint/no-misused-promises */
// 'use client'

// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import DialogForm from '@/components/dialog/dialog-form'
// import DialogField from '@/components/dialog/dialog-field'
// import DialogSubmit from '@/components/dialog/dialog-submit'
// import { Label } from '@/components/ui/label'
// import { DialogSelect } from '@/components/dialog/dialog-select'
// import type { Lisence } from '@prisma/client'
// import { SelectItem } from '@/components/ui/select'

// interface AddLisenceProps {
//   fetchData: () => Promise<void>
// }

// export function AddProduct ({ fetchData }: AddLisenceProps): React.JSX.Element {
//   const [name, setName] = useState<string>('')
//   const [price, setPrice] = useState<number>(0)
//   const [quantity, setQuantity] = useState<number>(0)
//   const [marketPrice, setMarketPrice] = useState<number>(0)
//   const [lisenceId, setLisenceId] = useState<string>('')
//   const [lisences, setLisences] = useState<Lisence[]>([])

//   useEffect(() => {
//     const fetchLisences = async (): Promise<void> => {
//       try {
//         const response = await axios.get<Lisence[]>('/api/lisences')
//         setLisences(response.data)
//       } catch (error) {
//         console.error('Failed to fetch lisences:', error)
//       }
//     }

//     void fetchLisences()
//   }, [])

//   const handlePriceChange = (value: string): void => {
//     setPrice(Number(value))
//   }

//   const handleQuantityChange = (value: string): void => {
//     setQuantity(Number(value))
//   }

//   const handleMarketPriceChange = (value: string): void => {
//     setMarketPrice(Number(value))
//   }

//   const postData = async (): Promise<void> => {
//     try {
//       await axios.post('/api/products', {
//         name,
//         price,
//         lisenceId,
//         marketPrice,
//         quantity
//       })

//       await fetchData()
//       setLisences(await getLisences())
//     } catch (error) {
//       console.error('Failed to add product:', error)
//       throw error
//     }
//   }

//   const getLisences = async (): Promise<Lisence[]> => {
//     try {
//       const response = await axios.get<Lisence[]>('/api/lisences')
//       return response.data
//     } catch (error) {
//       console.error('Failed to fetch lisences:', error)
//       return []
//     }
//   }

//   return (
//     <DialogForm
//       title='Add Product'
//       buttonText='Add'
//       description='Create a new product on your table. Click add when you&apos;re done.'
//       saveButton={postData}
//     >
//       <DialogField label='name' placeholder='Indomie' onChange={setName} isNumber={false} />
//       <DialogField label='price' placeholder='10000' onChange={handlePriceChange} isNumber={true} />
//       <DialogField label='marketPrice' placeholder='2400' onChange={handleMarketPriceChange} isNumber={true} />
//       <DialogField label='quantity' placeholder='1' onChange={handleQuantityChange} isNumber={true} />
//       <div className="grid grid-cols-4 items-center gap-4">
//         <Label htmlFor='Lisence' className="text-right">
//           Lisence
//         </Label>
//         <DialogSelect value={lisenceId} onChange={setLisenceId} placeholder='Select the Lisence'>
//           {lisences.map((lisence) => (
//             <SelectItem key={lisence.id} value={lisence.id.toString()}>{lisence.name}</SelectItem>
//           ))}
//         </DialogSelect>
//       </div>
//       <DialogSubmit text='Add' onClick={postData} />
//     </DialogForm>
//   )
// }
