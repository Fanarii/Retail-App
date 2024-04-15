/* eslint-disable react/prop-types */
import React, { type ForwardedRef } from 'react'
import { type HistoryInterface } from '@/interfaces'
import toRupiah from '@/lib/toRupiah'

interface ComponentProps {
  props: HistoryInterface
}

const ComponentToPrint = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ props }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref} className="p-8 bg-white text-xl">
        <div className="flex justify-between mb-4">
          <h1 className="text-lg font-semibold">Receipt</h1>
          <p className="text-sm text-gray-500">{new Date().toLocaleString()}</p>
        </div>
        <div className="border-b border-gray-300 mb-4"></div>
        <div className="mb-4">
          <h2 className="text-sm text-gray-500">Items</h2>
          {props.items.map((item) => (
            <div key={item.id} className="flex justify-between py-1 gap-2">
              <p>{item.name}</p>
              <p>x{item.quantity} {toRupiah(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <div className="flex justify-between py-1">
            <p>Subtotal</p>
            <p>{toRupiah(props.totalAmount)}</p>
          </div>
          <div className="flex justify-between py-1">
            <p>Payment</p>
            <p>{toRupiah(props.pay)}</p>
          </div>
          <div className="flex justify-between py-1">
            <p>Change</p>
            <p>{toRupiah(props.change)}</p>
          </div>
        </div>
        <div className="border-b border-gray-300 mb-4"></div>
        <div className="flex justify-between">
          <p className="font-semibold">Total</p>
          <p className="font-semibold">{toRupiah(props.totalAmount)}</p>
        </div>
        <div className="text-xs text-gray-500 mt-2">Thank you for shopping with us!</div>
      </div>
    )
  }
)

ComponentToPrint.displayName = 'ComponentToPrint'

export default ComponentToPrint
