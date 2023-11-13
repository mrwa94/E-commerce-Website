import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const useProductState = () => {
  const { products, isLoading, error, searchTerm, singleProduct } = useSelector(
    (state: RootState) => state.products
  )

  return {
    products,
    isLoading,
    error,
    searchTerm,
    singleProduct
  }
}

export default useProductState
