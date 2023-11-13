import { Badge } from '@material-tailwind/react'
import React from 'react'
import { PiShoppingCartSimpleFill } from 'react-icons/pi'

const CartIcon = ({ value }: { value: number }) => {
  return (
    <div className="">
      <PiShoppingCartSimpleFill />
      <Badge className=""> {value}</Badge>
    </div>
  )
}

export default CartIcon
