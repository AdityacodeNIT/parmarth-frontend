import Product from './pages/Products/Product.jsx';
import ProductList from './pages/Products/ProductList.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About/About.jsx';
import HowItWorks from './pages/About/HowItWorks.jsx';

import Cart from './pages/Products/Cart.jsx';
import Navbar from './layout/Navbar.jsx';
import { SpeedInsights } from '@vercel/speed-insights/react';

import Register from './pages/User/Register.jsx';
import Userlogin from './pages/User/Userlogin.jsx';
import UserDetails from './pages/User/UserDetails.jsx';
import Logout from './pages/User/Logout.jsx';

import BuyProduct from './pages/Products/BuyProduct.jsx';
import UserAddress from './pages/User/UserAddress.jsx';
import Payment from './pages/Payment/Payment.jsx';
removeEventListener;

import Helpdesk from './layout/Helpdesk.jsx';
import AddProduct from './pages/Seller/AddProduct.jsx';
import UserUpdateDetails from './pages/User/UserUpdateDetails.jsx';
import Wishlisted from './pages/Products/Wishlisted.jsx';
import SearchResult from './layout/SearchResult.jsx';
import ChangePassword from './pages/User/ChangePassword.jsx';
import UpdateUserAccountDetails from './pages/User/UpdateUserAccountDetails.jsx';

import UpdateDetails from './pages/User/UpdateDetails.jsx';
import UpdateAvatar from './pages/User/UpdateAvatar.jsx';
import AdminSection from './pages/Admin/AdminLayout.jsx';
import KeepAlive from './keepAlive.jsx';
import AllOrders from './pages/Products/AllOrders.jsx';
import OrderDetails from './pages/Products/OrderDetails.jsx';
import OrderSuccess from './pages/Products/OrderSuccess.jsx';
import Home from './layout/Home/Home.jsx';
import Seller from './pages/Seller/Seller.jsx';
import SellerRegister from './pages/Seller/SellerRegister.jsx';
import Sellerlogin from './pages/Seller/SellerLogin.jsx';

import ManageSellers from './pages/Admin/ManageSellers.jsx';
import UpdateProduct from './pages/Products/UpdateProudctDetails.jsx';
import ProtectedRoute from './context/ProtectedRoutes.jsx';
import Addresses from './pages/User/Addresses.jsx';
import ManageAddresses from './pages/Address/ManageAddresses.jsx';
import CashOnDelivery from './pages/Payment/Cod.jsx';
import SellerDashboard from './pages/Seller/SellerDashboard.jsx';
import AdminLayout from './pages/Admin/AdminLayout.jsx';

import Userlist from './pages/Admin/Userlist.jsx';
import Orderlist from './pages/Admin/Orderlist.jsx';
import AdminProducts from './pages/Admin/AdminProducts.jsx';
import SellerApprovalPanel from './pages/Admin/SellerApprovalPanel.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';


import { Toaster } from 'sonner';
import { verifyAuth } from './features/Auth/authSlice.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch=useDispatch();
  useEffect(() => {
  dispatch(verifyAuth());
}, [dispatch]);
  return (
      <BrowserRouter>
        <Navbar />
        <Toaster position='top-right' richColors closeButton />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<ProductList />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Aboutus' element={<About />} />
          <Route path='/how-it-works' element={<HowItWorks />} />
          <Route path='/register' element={<Register />} />
          <Route path='/userLogin' element={<Userlogin />} />
          <Route path='/user' element={<UserDetails />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/BuyProduct' element={<BuyProduct />} />
          <Route path='/addressUpdate' element={<UserAddress />} />
          <Route path='/wishlist' element={<Wishlisted />} />
          <Route path='/payments' element={<Payment />} />
          <Route path='/helpdesk' element={<Helpdesk />} />
          <Route path="/admin"
  element={
    <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<AdminDashboard />} />
  <Route path="users" element={<Userlist />} />
  <Route path="products" element={<AdminProducts />} />
  <Route path="orders" element={<Orderlist />} />
  <Route path="sellers" element={<ManageSellers />} />
</Route>

          <Route path='/update' element={<UserUpdateDetails />} />
          <Route path='/searchResult' element={<SearchResult />} />
          <Route path='/changePassword' element={<ChangePassword />} />
          <Route path='/changeDetails' element={<UpdateUserAccountDetails />} />
          <Route path='/updateDetails' element={<UpdateDetails />} />
          <Route path='/updateAvatar' element={<UpdateAvatar />} />
          <Route path='/allAddresses' element={<Addresses />} />
          <Route path='/adresses' element={<ManageAddresses />} />
          <Route path='cod' element={<CashOnDelivery />} />

          <Route path='/myOrder' element={<AllOrders />} />
          <Route path='/orderitems' element={<OrderDetails />} />

          <Route path='/order-success' element={<OrderSuccess />} />
          <Route path='/seller' element={<Seller />} />
          <Route path='/sellerRegister' element={<SellerRegister />} />
          <Route path='/sellerlogin' element={<Sellerlogin />} />
          <Route path='/updateProduct/:id' element={<UpdateProduct />} />

<Route
  path="/seller/dashboard"
  element={
    <ProtectedRoute allowedRoles={['seller']}>
      <SellerDashboard />
    </ProtectedRoute>
  }
/>

        </Routes>
        <KeepAlive />
        <SpeedInsights />
      </BrowserRouter>
  );
}

export default App;
