export interface ProductInterface {
  id: number
  name: string
  price: number
  marketPrice: number | null
  lisenceId: number | null
  quantity: number
  lisence: {
    id: number
    name: string
    price: number
  }
}

export interface HistoryInterface {
  id: number
  pay: number
  change: number
  totalAmount: number
  createdAt: Date
  items: Array<{
    id: number
    name: string
    price: number
    quantity: number
  }>
}

export interface ItemInterface {
  name: string
  marketPrice: number
  quantity: number
}
