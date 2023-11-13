import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Input, Button, Typography } from '@material-tailwind/react'
import { addUser, fetchUser } from '../../redux/slices/users/userSlice'
import { AppDispatch } from '../../redux/store'

const Register = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'visitor',
    ban: false
  })
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const newUser = { id: new Date().getTime(), ...user }
    dispatch(fetchUser()).then(() => dispatch(addUser(newUser)))
    navigate('/home')
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
  }

  return (
    <Card color="transparent" className="m-9 p-4   ">
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 ">
        <div className="mb-1 flex flex-col gap-6">
          <label>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              First Name
            </Typography>
          </label>

          <Input
            size="lg"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
            placeholder="marwa"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none'
            }}
          />
          <label>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Last Name
            </Typography>
          </label>

          <Input
            size="lg"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
            placeholder="alsubhi"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none'
            }}
          />
          <label>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
          </label>
          <Input
            size="lg"
            name="email"
            value={user.email}
            type="text"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            onChange={handleInputChange}
            labelProps={{
              className: 'before:content-none after:content-none'
            }}
          />
          <label>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
          </label>
          <Input
            name="password"
            value={user.password}
            onChange={handleInputChange}
            type="text"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none'
            }}
          />
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          sign up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{' '}
          <Link to={'/login'} className="font-medium text-gray-900">
            Sign In
          </Link>
        </Typography>
      </form>
    </Card>
  )
}

export default Register
