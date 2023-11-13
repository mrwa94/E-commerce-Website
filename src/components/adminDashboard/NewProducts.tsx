import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { AdminSidebar } from './AdminSidebar'
import { Card, Input, Button, Typography, Spinner } from '@material-tailwind/react'
import { addProduct, fetchProducts } from '../../redux/slices/products/productSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import useProductState from '../../hooks/useProductState'

const NewProducts = () => {
  const { products, singleProduct, isLoading, error } = useProductState()
  const TABLE_HEAD = ['Product image', 'Product name ', 'Description', 'price']

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const [product, setProduct] = useState({
    name: singleProduct.name,
    image: singleProduct.image,
    description: singleProduct.description,
    price: singleProduct.price
  })
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProduct((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const updateProfile = { id: singleProduct.id, ...product }
    dispatch(addProduct(updateProfile))
  }
  if (isLoading) {
    return <Spinner className="h-16 w-16 text-gray-900/50" />
  }
  if (error) {
    return <p>{error}</p>
  }
  return (
    <div className="m-9 flex flex-row">
      <AdminSidebar />
      <div className="text-left">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Add Product
          </Typography>
          <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <label className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Product Name
              </Typography>
              <Input
                name="name"
                onChange={handleChange}
                value={product.name}
                size="lg"
                placeholder="Computer"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none'
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Image URL:
              </Typography>
              <Input
                size="lg"
                name="image"
                onChange={handleChange}
                value={product.image}
                placeholder="url:"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none'
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Description:
              </Typography>
              <Input
                type={''}
                onChange={handleChange}
                name="description"
                value={product.description}
                size="lg"
                placeholder=" Description:"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none'
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Price:
              </Typography>
              <Input
                type={''}
                onChange={handleChange}
                name="price"
                value={product.price}
                size="lg"
                placeholder=" 250$"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none'
                }}
              />
            </label>

            <Button type="submit" className="mt-6" fullWidth>
              Add product
            </Button>
          </form>
        </Card>
      </div>
      <div className="ml-9">
        show all product
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
            {products.map((item, index) => {
              const isLast = index === products.length - 1
              const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

              return (
                <tr key={item.id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <img src={item.image} width={50} />
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {item.name}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {item.description}
                        </Typography>
                      </div>
                    </div>
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

export default NewProducts
