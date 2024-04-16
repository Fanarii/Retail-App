/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { fetchHistory } from '@/features/historySlice'
import { type RootState } from '@/features/store'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useReactToPrint } from 'react-to-print'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import toRupiah from '@/lib/toRupiah'
import { Button } from '@/components/ui/button'
import ComponentToPrint from './ComponentToPrint'
import { DeleteButton } from '@/components/buttons/delete-button'
import axios from 'axios'
import { type HistoryInterface } from '@/interfaces'

const History = (): React.JSX.Element => {
  const dispatch = useDispatch()
  const history = useSelector((state: RootState) => state.history.history)
  const [printData, setPrintData] = useState<HistoryInterface>(history[1])

  useEffect(() => {
    dispatch(fetchHistory() as any)
  }, [])

  const totalAmount = history.reduce((acc, curr) => acc + curr.totalAmount, 0)

  const componentRef = useRef<HTMLDivElement>(null)

  const handleClickPrint = async (id: number): Promise<void> => {
    try {
      const response = await axios.get(`/api/history/${id}`)
      const data: HistoryInterface = response.data
      handlePrint()
      setPrintData(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current ?? null
  })

  const handleDelete = async (id: number): Promise<void> => {
    await axios.delete(`/api/history/${id}`)
    dispatch(fetchHistory() as any)
  }

  return (
    <Table>
      <TableCaption>A list of your recent historys.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Change</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right">Action</TableHead>
          <div className='hidden'>
            {printData && (
              <ComponentToPrint props={printData} ref={componentRef} />
            )}
          </div>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map((history, index) => (
          <TableRow key={history.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{toRupiah(history.pay)}</TableCell>
            <TableCell>
              <Popover>
                <PopoverTrigger asChild>
                  <a className='cursor-pointer'>See Items</a>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Item Detail</h4>
                      <p className="text-sm text-muted-foreground">
                        Detail of bought items
                      </p>
                    </div>
                    <div className="grid gap-2">
                      {history.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="grid grid-cols-3 items-center gap-5">
                          <p>{item.name}</p>
                          <p>{toRupiah(item.price)}</p>
                          <p>x{item.quantity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
            <TableCell>{toRupiah(history.change)}</TableCell>
            <TableCell>{toRupiah(history.totalAmount)}</TableCell>
            <TableCell className="text-right">
              <Button onClick={() => handleClickPrint(history.id) }>
                Print
              </Button>
              <DeleteButton onClick={() => handleDelete(history.id)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right">{toRupiah(totalAmount)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default History
