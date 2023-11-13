import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { AdminSidebar } from './AdminSidebar'
import { deleteOrder, fetchOrder } from '../../redux/slices/orders/orderSlice'
import { IconButton, Spinner, Tooltip, Typography } from '@material-tailwind/react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { TiDelete } from 'react-icons/ti'

const ListOrder = () => {
  const { order, isLoading, error, searchTerm } = useSelector((state: RootState) => state.orders)
  const dispatch: AppDispatch = useDispatch()
  const TABLE_HEAD = ['product Id', 'userId', 'purchasedAt', 'Status']

  useEffect(() => {
    dispatch(fetchOrder())
  }, [])

  if (isLoading) {
    return <Spinner className="h-16 w-16 text-gray-900/50" />
  }
  if (error) {
    return <p>{error}</p>
  }

  const searchOrder = searchTerm
    ? order.find((orderTerm) => orderTerm.productId === order.productId)
    : order

  const handleDeleteOrder = (id: number) => {
    dispatch(deleteOrder(id))
  }

  return (
    <div className="flex flex-row">
      <AdminSidebar />
      <div className="w-full content-center m-10">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {searchOrder.map((item, index) => {
              const isLast = index === order.length - 1
              const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

              return (
                <tr key={item.id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {item.productId}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {item.userId}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {item.purchasedAt}
                        </Typography>
                      </div>
                    </div>
                  </td>

                  <td className={classes}>
                    <Tooltip content="Edit User">
                      <IconButton variant="text" onClick={() => console.log('clicked')}>
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="delete User">
                      <IconButton
                        onClick={() => {
                          handleDeleteOrder(item.id)
                        }}
                        variant="text">
                        <TiDelete className="h-4 w-4 text-red-900" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListOrder
