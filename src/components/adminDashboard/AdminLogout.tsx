import { Button, Typography, Card, CardFooter } from '@material-tailwind/react'
import { useDispatch } from 'react-redux'
import { userLogout } from '../../redux/slices/users/userSlice'
import { useNavigate } from 'react-router-dom'
import { AdminSidebar } from './AdminSidebar'

export function AdminLogout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(userLogout())
    navigate('/')
  }
  return (
    <div className="flex flex-row ">
      <AdminSidebar />
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
