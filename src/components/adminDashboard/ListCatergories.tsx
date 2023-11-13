import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import {
  createCategory,
  deleteCategories,
  fetchCategories,
  searchCategories,
  updateCategory
} from '../../redux/slices/categories/categoriesSlice'

import {
  Button,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
  Spinner,
  Dialog,
  IconButton,
  Tooltip
} from '@material-tailwind/react'
import { PencilIcon } from '@heroicons/react/24/solid'
import { TiDelete } from 'react-icons/ti'
import { AdminSidebar } from './AdminSidebar'
import SearchInput from '../SearchInput'

const ListCatergories = () => {
  const { categories, isLoading, error, searchTerm } = useSelector(
    (state: RootState) => state.categories
  )
  const [categoryName, setCategoryName] = useState('')
  const [category, setCategory] = useState({
    name: categories.name
  })
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const TABLE_HEAD = ['Categories Name', 'Status']
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  if (isLoading) {
    return <Spinner />
  }
  if (error) {
    return <p> {error}</p>
  }

  //Create Category
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value)
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const newCategory = { id: new Date().getTime(), name: categoryName }
    dispatch(createCategory(newCategory))
    setCategoryName('')
    setOpen(!open)
  }

  //open form to create a new category
  const handleCreateForm = () => {
    setOpen(!open)
  }

  //search Categories
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchCategories(event.target.value))
  }

  //Edit Category
  const handleEditCategory = (id: number) => {
    setIsEdit(!isEdit)
    const updateCategory = { id: categories?.id, ...category }
    dispatch(updateCategory(updateCategory))
  }

  // delete categories
  const handleDeleteCategories = (id: number) => {
    dispatch(deleteCategories(id))
  }

  const searchCategory = searchTerm
    ? categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      )
    : categories

  return (
    <div className="flex flex-row">
      <AdminSidebar />
      <div className="flex flex-col w-full ">
        <div className="flex flex-row  gap-96">
          <SearchInput value={searchTerm} handleSearch={handleSearch} />
          <Button className=" rounded-full text-2xl  " onClick={handleCreateForm}>
            +
          </Button>
        </div>
        <div className="w-50 content-center m-10">
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
              {searchCategory.map((item, index) => {
                const isLast = index === categories.length - 1
                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

                return (
                  <tr key={item.id}>
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
                      <Tooltip content="Edit User">
                        <IconButton variant="text" onClick={() => handleEditCategory(item.id)}>
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="delete User">
                        <IconButton
                          onClick={() => {
                            handleDeleteCategories(item.id)
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

          <Dialog className=" w-full" open={open} handler={handleCreateForm}>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-between">
                <DialogHeader className="flex flex-col items-start">
                  {' '}
                  <Typography variant="h4">Create Category</Typography>
                </DialogHeader>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-3 h-5 w-5"
                  onClick={handleCreateForm}>
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <DialogBody>
                <div className="grid gap-6">
                  <Typography className="-mb-1" color="blue-gray" variant="h6">
                    Category Name
                  </Typography>
                  <Input label="Computer" value={categoryName} onChange={handleInputChange} />
                </div>
              </DialogBody>
              <DialogFooter className="space-x-2">
                <Button variant="text" color="gray" onClick={handleCreateForm}>
                  cancel
                </Button>
                <Button variant="gradient" color="gray" type="submit">
                  Create Category
                </Button>
              </DialogFooter>
            </form>
          </Dialog>

          {/* / Edit form */}
          <Dialog className=" w-full" open={isEdit} handler={handleEditCategory}>
            <form onSubmit={() => handleEditCategory}>
              <div className="flex items-center justify-between">
                <DialogHeader className="flex flex-col items-start">
                  {' '}
                  <Typography variant="h4"> Edit Category</Typography>
                </DialogHeader>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-3 h-5 w-5"
                  onClick={''}>
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <DialogBody>
                <div className="grid gap-6">
                  <Typography className="-mb-1" color="blue-gray" variant="h6">
                    Edit Category
                  </Typography>
                  <Input label="Computer" value={categoryName} onChange={handleInputChange} />
                </div>
              </DialogBody>
              <DialogFooter className="space-x-2">
                <Button variant="text" color="gray" onClick={handleEditCategory}>
                  cancel
                </Button>
                <Button variant="gradient" color="gray" type="submit">
                  Save Edit
                </Button>
              </DialogFooter>
            </form>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default ListCatergories
