import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Products from '../pages/Products'
import Services from '../pages/Services'
import ContactUs from '../pages/ContactUs'
import ErrorPage from '../pages/ErrorPage'
import Register from '../components/register/Register'
import Favorite from '../pages/Favorite'
import Cart from '../pages/Cart'
import ProductsDetails from '../pages/ProductsDetails'
import ListUsers from '../components/adminDashboard/ListUsers'
import ListCatergories from '../components/adminDashboard/ListCatergories'
import ListOrder from '../components/adminDashboard/ListOrder'
import ProfileUser from '../components/adminDashboard/ProfileAdmin'
import { UserSidebar } from '../components/userDashboard/UserSidebar'
import UserProfile from '../components/userDashboard/UserProfile'
import UserOrders from '../components/userDashboard/UserOrders'
import Login from '../components/register/Login'
import ProtectedRouter from './ProtectedRouter'
import AdminRouter from './AdminRouter'
import AdminProfile from '../components/adminDashboard/ProfileAdmin'
import NewProducts from '../components/adminDashboard/NewProducts'
import { AdminLogout } from '../components/adminDashboard/AdminLogout'
import { LogoutUser } from '../components/userDashboard/LogoutUser'

const Index = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/Products" element={<Products />}></Route>
        <Route path="/Product/:id" element={<ProductsDetails />}></Route>
        <Route path="/services" element={<Services />}></Route>
        <Route path="/contactUs" element={<ContactUs />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route path="/*" element={<ErrorPage />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        {/* //user should login to show those pages by protected router */}
        {/* Admin Profile */}
        <Route path="/profile" element={<AdminRouter />}>
          <Route path="admin" element={<AdminProfile />}></Route>
          <Route path="adminProfile" element={<AdminProfile />}></Route>
          <Route path="NewProducts" element={<NewProducts />}></Route>
          <Route path="ListCatergories" element={<ListCatergories />}></Route>
          <Route path="ListOrder" element={<ListOrder />}></Route>
          <Route path="ListUsers" element={<ListUsers />}></Route>
          <Route path="AdminLogout" element={<AdminLogout />}></Route>
        </Route>
        <Route path="/favorite" element={<Favorite />}></Route>
        <Route path="/cart" element={<Cart />}></Route>

        {/* user profile */}
        <Route path="/profile" element={<ProtectedRouter />}>
          <Route path="visitor" element={<UserProfile />}></Route>
          <Route path="userprofile" element={<UserProfile />}></Route>
          <Route path="userOrders" element={<UserOrders />}></Route>
          <Route path="userLogout" element={<LogoutUser />}></Route>
        </Route>
      </Routes>
      <Footer />
    </Router>
  )
}

export default Index
