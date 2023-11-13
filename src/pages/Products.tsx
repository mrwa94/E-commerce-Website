import { useEffect, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { Product, fetchProducts, searchProductByName } from '../redux/slices/products/productSlice'
import { AppDispatch } from '../redux/store'
import CardProducts from '../components/products/CardProducts'
import { Typography } from '@mui/material'
import { Spinner } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import SearchInput from '../components/SearchInput'
import SortInput from '../components/SortInput'
import { Pagination } from '../components/products/Pagination'
import useProductState from '../hooks/useProductState'

const Products = () => {
  const { products, isLoading, error, searchTerm } = useProductState()

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  if (isLoading) {
    return <Spinner className="h-16 w-16 text-gray-900/50" />
  }
  if (error) {
    return <p>{error}</p>
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchProductByName(event.target.value))
    console.log(event.target.value)
  }
  const searchProduct = searchTerm
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      )
    : products
  return (
    <div className=" container m-auto ">
      <div className="">
        {/* Search and Sort sections */}
        <Typography variant="h4">PRODUCTS</Typography>
        <div className="flex flex-row  m-4  justify-between">
          <SortInput />
          <SearchInput value={searchTerm} handleSearch={handleSearch} />
        </div>
      </div>
      <div className="grid  grid-cols-2 md:grid-cols-4 w-full ml-9 mb-5">
        {searchProduct.length > 0 &&
          searchProduct.map((item) => {
            return (
              <div key={item.id}>
                <CardProducts
                  id={item.id}
                  image={item.image}
                  price={`${item.price}$`}
                  name={item.name}
                  description={item.description}
                  //clickButton={handleAddToCart}
                />
              </div>
            )
          })}
      </div>
      <Pagination />
    </div>
  )
}

export default Products
