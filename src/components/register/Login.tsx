import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { z } from "zod";
import { fetchUser, userLogin } from "../../redux/slices/users/userSlice";
import useUserState from "../../hooks/useUserState";
import { Input, Button, Typography } from "@material-tailwind/react";
const Login = () => {
  const navigate = useNavigate();
  const { users } = useUserState();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const foundUser = users.find((userData) => userData.email === user.email);
      if (foundUser && foundUser.password === user.password) {
        dispatch(userLogin(foundUser));
        navigate(`/profile/${foundUser.role}`);
      } else {
        console.log("Something wrong with email and password");
      }

      if (!foundUser) {
        alert("User is Ban !");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = z
    .object({
      email: z.string().min(1, { message: "Email is required" }).email({
        message: "Must be a valid email",
      }),
      password: z
        .string()
        .min(6, { message: "Password must be atleast 6 characters" }),
      confirmPassword: z
        .string()
        .min(1, { message: "Confirm Password is required" }),
      terms: z.literal(true, {
        errorMap: () => ({ message: "You must accept Terms and Conditions" }),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Password don't match",
    });

  return (
    <form
      onSubmit={handleSubmit}
      className="  sm:w-96 text-center justify-center ml-96 pb-9 "
    >
      <Typography variant="h4" color="blue-gray" className="">
        Login
      </Typography>
      <Typography color="gray" className="mt-1 font-normal ">
        Nice to meet you! Enter your info to Login.
      </Typography>
      <div className="mb-1 flex flex-col gap-6  ">
        <Typography variant="h6" color="blue-gray" className="-mb-3 ">
          Your Email
        </Typography>
        <Input
          size="lg"
          value= {user.email}
          name="email"
          onChange={handleInputChange}
          placeholder="name@mail.com"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Password
        </Typography>
        <Input
          type="password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
          size="lg"
          placeholder="********"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>

      <Button type="submit" className="mt-6" fullWidth>
        Login
      </Button>
      <Typography color="gray" className="mt-4 text-center font-normal">
        not have an account?{" "}
        <Link to={"/register"} className="font-medium text-gray-900">
          Register Now
        </Link>
      </Typography>
    </form>
  );
};

export default Login;
