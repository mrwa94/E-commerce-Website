import { ChangeEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { banUser, deleteUser, fetchUser, searchUser } from '../../redux/slices/users/userSlice'
import { AppDispatch } from '../../redux/store'
import { Avatar, Spinner } from '@material-tailwind/react'
import { Typography, Chip, IconButton, Tooltip } from '@material-tailwind/react'
import { PencilIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { TiDelete } from 'react-icons/ti'
import { FaBan } from 'react-icons/fa'
import { AdminSidebar } from './AdminSidebar'
import SearchInput from '../SearchInput'
import useUserState from '../../hooks/useUserState'

const ListUsers = () => {
  const { users, isLoading, error, userTerm } = useUserState()
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUser())
  }, [])
  if (isLoading) {
    return <Spinner className="h-16 w-16 text-gray-900/50" />
  }
  if (error) {
    return <p>{error}</p>
  }

  //search users
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchUser(event.target.value))
    console.log(event.target.value)
  }
  const searchUsers = userTerm
    ? users.filter((user) => user.firstName.toLowerCase().includes(userTerm.toLocaleLowerCase()))
    : users

  //     delete user
  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id))
  }

  //edit user

  //  ban user
  const handleBan = (id: number) => {
    dispatch(banUser(id))
  }

  const TABLE_HEAD = ['avatar', 'Member', 'Function', 'Status']
  return (
    <div className="flex flex-row">
      <AdminSidebar />
      <div className="container flex flex-col ">
        <SearchInput value={userTerm} handleSearch={handleSearch} />
        <table className="mt-4 w-50 min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    {head}{' '}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {searchUsers.map(({ id, firstName, lastName, email, role, ban, avatar }, index) => {
              const isLast = index === users.length - 1
              const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'
              if (role != 'admin') {
                return (
                  <tr key={email}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Avatar className="w-20 h-20" src={avatar} alt="avatar" />
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {`${firstName}+ ${lastName}`}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70">
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={role}
                          color={role === 'admin' ? 'green' : 'blue-gray'}
                        />
                      </div>
                    </td>

                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton
                          variant="text"
                          onClick={() => {
                            handleEdit()
                          }}>
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="delete User">
                        <IconButton
                          variant="text"
                          onClick={() => {
                            handleDeleteUser(id)
                          }}>
                          <TiDelete className="h-4 w-4 text-red-900" />
                        </IconButton>
                      </Tooltip>
                      <IconButton
                        variant="text"
                        onClick={() => {
                          handleBan(id)
                        }}>
                        {ban ? (
                          <FaBan className=" text-light-green-900" />
                        ) : (
                          <FaBan className=" text-red-900" />
                        )}
                      </IconButton>
                    </td>
                  </tr>
                )
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListUsers
