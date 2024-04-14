'use client'

import { fetchHistory } from '@/features/historySlice'
import { type RootState } from '@/features/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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

const History = (): React.JSX.Element => {
  const dispatch = useDispatch()
  const { history: historyData } = useSelector((state: RootState) => state.history)

  useEffect(() => {
    dispatch(fetchHistory() as any)
  }, [dispatch])

  const totalAmount = historyData.reduce((acc, curr) => acc + curr.totalAmount, 0)

  return (
    <Table>
      <TableCaption>A list of your recent historys.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Change</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {historyData.map((history, index) => (
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
            <TableCell className="text-right">{toRupiah(history.totalAmount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">{toRupiah(totalAmount)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default History
