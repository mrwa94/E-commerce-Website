import { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Spinner } from '@material-tailwind/react'
import { fetchCategories } from '../redux/slices/categories/categoriesSlice'
import { sortProduct } from '../redux/slices/products/productSlice'

const SortInput = () => {
  const { isLoading, error } = useSelector((state: RootState) => state.products)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])
  if (isLoading) {
    return <Spinner className="h-16 w-16 text-gray-900/50" />
  }
  if (error) {
    return <p>{error}</p>
  }

  const handleSortCategories = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortProduct(event.target.value))
  }
  return (
    <div className="w-72 mx-20">
      <select onChange={handleSortCategories}>
        <option value={'name'}>name</option>
        <option value={'id'}>id</option>
      </select>
    </div>
  )
}

export default SortInput
