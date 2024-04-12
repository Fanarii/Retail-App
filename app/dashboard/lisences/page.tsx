/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'

import React, { useEffect, useState } from 'react'
import type { Lisence } from '@prisma/client'
import axios from 'axios'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { AddLisence } from './addLisences'
import { EditLisence } from './editLisence'
import { DeleteButton } from '@/components/buttons/delete-button'
import toRupiah from '@/lib/toRupiah'

const Lisences = (): React.JSX.Element => {
  const [lisences, setLisences] = useState<Lisence[]>([])

  const fetchData = async (): Promise<void> => {
    try {
      const response = await axios.get<Lisence[]>('/api/lisences')
      setLisences(response.data)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  useEffect(() => {
    void fetchData()
  }, [])

  const deleteLisence = async (id: number): Promise<void> => {
    await axios.delete(`/api/lisences/${id}`)
    await fetchData()
  }

  return (
    <div className='m-4'>
      <AddLisence fetchData={fetchData} />
      <Table>
        <TableCaption>A list of your Lisences.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lisences.map((lisence, index) => (
            <TableRow key={lisence.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{lisence.name}</TableCell>
              <TableCell>{toRupiah(lisence.price)}</TableCell>
              <TableCell className='text-right'>
                <EditLisence fetchData={fetchData} id={lisence.id} />
                <DeleteButton onClick={() => deleteLisence(lisence.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Lisences
