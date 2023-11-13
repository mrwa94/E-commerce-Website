import { Button, Typography, Card, CardFooter } from '@material-tailwind/react'
import { useDispatch } from 'react-redux'
import { userLogout } from '../../redux/slices/users/userSlice'
import { useNavigate } from 'react-router-dom'
import { UserSidebar } from './UserSidebar'

export function LogoutUser() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(userLogout())
    navigate('/')
  }
  return (
    <div className="flex flex-row ">
      <UserSidebar />
      <Card className=" h-3/4  w-3/4 p-9">
        <div>
          <Typography variant="h6">Are You sure you want logout ?</Typography>
        </div>

        <CardFooter>
          <Button variant="gradient" color="red" onClick={handleLogout}>
            <span>Logout</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
