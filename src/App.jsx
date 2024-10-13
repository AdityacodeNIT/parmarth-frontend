import "./App.css";
import Product from "./components/Product";
import ProductList from "./components/ProductList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import About from "./components/About"
import Register from "./components/Register.js";
import UserContextProvider from './context/UserContextProvider.jsx'
import Userlogin from "./components/Userlogin.js";
import UserDetails from "./components/UserDetails.js";
import Logout from "./components/Logout.js";
import Paperproducts from "./components/Category component/Paperproducts.js";
import Desksupply from "./components/Category component/Desksupply.js";
import Reusable from "./components/Category component/Reusable.js";
import Filling from "./components/Category component/Filling.js";
import Writing from "./components/Category component/Writing.js";
import BuyProduct from "./components/BuyProduct.js";
import UserAddress from "./components/UserAddress.js";
import Payment from "./components/Payment.js";
import Myorder from "./components/Myorder.js";
import Helpdesk from "./components/Helpdesk.js";
import BulkAddProduct from "./components/BulkAddProduct.js";
import UserUpdateDetails from "./components/UserUpdateDetails.js";
import Reminder from "./components/Reminder.js";
import Wishlisted from "./components/Wishllisted.js";

function App() {

  return (
    <UserContextProvider>


      <BrowserRouter>
        < Navbar />
        {/* <Reminder/> */}
        <Routes>

          <Route path="/"
            element={
              <ProductList />} />

          <Route
            path="/About"
            element={<Product />} />]
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Aboutus" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userLogin" element={<Userlogin />} />
          <Route path="/user" element={<UserDetails />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/PaperProduct" element={<Paperproducts />} />
          <Route path="/DeskSupply" element={<Desksupply />} />
          <Route path="/Electronics" element={<Reusable />} />
          <Route path="/Filling" element={<Filling />} />
          <Route path="/Writing" element={<Writing />} />
          <Route path="/BuyProduct" element={<BuyProduct />} />
          <Route path="/addressUpdate" element={<UserAddress />} />
          <Route path="/user/wishlist" element={<Wishlisted/>} />

          <Route path="/payments" element={<Payment />} />
          <Route path="/myOrder" element={<Myorder />} />
          <Route path="/helpdesk" element={<Helpdesk/>} />
          <Route path="/bulkAdd" element={<BulkAddProduct/>} />
          <Route path="/update" element={<UserUpdateDetails />} />


        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
