import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { fetchUser, updateUserProfile } from '../../redux/slices/users/userSlice'
import useUserState from '../../hooks/useUserState'
import { AdminSidebar } from './AdminSidebar'
import {
  Avatar,
  Button,
  Card,
  Chip,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography
} from '@material-tailwind/react'

import { CardActions, Dialog } from '@mui/material'

const UserProfile = () => {
  const { userData } = useUserState()
  const dispatch: AppDispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    email: userData?.email,
    password: userData?.password
  })
  const handleOpenEditForm = () => {
    setOpen(!open)
  }
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const updateProfile = { id: userData?.id, ...user }
    dispatch(updateUserProfile(updateProfile))
  }

  useEffect(() => {
    dispatch(fetchUser)
  }, [])
  return (
    <div className="flex flex-row ">
      <AdminSidebar />

      <Card className="flex flex-col  h-3/4  w-3/4 ">
        <CardActions className="justify-end">
          <Button onClick={handleOpenEditForm}>Edit profile</Button>
          <Dialog className=" w-full" open={open} onSubmit={handleOpenEditForm}>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-between">
                <DialogHeader className="flex flex-col items-start">
                  {' '}
                  <Typography variant="h4">Edit Profile</Typography>
                </DialogHeader>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-3 h-5 w-5"
                  onClick={handleOpenEditForm}>
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
                    First Name
                  </Typography>
                  <Input
                    label="Marwa"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-6">
                  <Typography className="-mb-1" color="blue-gray" variant="h6">
                    Last Name
                  </Typography>
                  <Input
                    label="Alsubhi"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-6">
                  <Typography className="-mb-1" color="blue-gray" variant="h6">
                    Email
                  </Typography>
                  <Input
                    label="mewa@gmail.com"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-6">
                  <Typography className="-mb-1" color="blue-gray" variant="h6">
                    Email
                  </Typography>
                  <Input
                    label="mewa@gmail.com"
                    name="password"
                    value={user.password}
                    onChange={handleInputChange}
                  />
                </div>
              </DialogBody>
              <DialogFooter className="space-x-2">
                <Button variant="text" color="gray" onClick={handleOpenEditForm}>
                  cancel
                </Button>
                <Button variant="gradient" color="gray" type="submit">
                  Save Edit
                </Button>
              </DialogFooter>
            </form>
          </Dialog>
        </CardActions>
        <Typography className="" variant="h4">
          User profile{' '}
        </Typography>
        <div className="flex lg:flex-row sm:flex-col  sm:mx-14">
          <Avatar className="  w-44 h-44" src={userData?.avatar} alt="avatar" />
          <div className="text-start m-5">
            <div className="flex flex-row p-2">
              <Typography className="px-1" variant="h6">
                First Name :
              </Typography>
              <Chip variant="ghost" value={userData?.firstName && userData.firstName}></Chip>
            </div>
            <div className="flex flex-row p-2">
              <Typography className="px-1" variant="h6">
                {' '}
                Last Name :
              </Typography>
              <Chip variant="ghost" value={userData?.lastName && userData.lastName}></Chip>
            </div>
            <div className="flex flex-row p-2">
              <Typography className="px-1" variant="h6">
                Email :
              </Typography>
              <Chip variant="ghost" value={userData?.email && userData?.email}></Chip>
            </div>
            <div className="flex flex-row p-2">
              <Typography className="px-1" variant="h6">
                password :
              </Typography>
              <Chip variant="ghost" value={userData?.password && userData?.password}></Chip>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default UserProfile
