import "./App.css";
import Product from "./components/Product.jsx";
import ProductList from "./components/ProductList.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Cart from "./components/Cart.jsx";
import About from "./components/About.jsx";
import Register from "./components/Register.jsx";
import UserContextProvider from "./context/UserContextProvider.jsx";
import Userlogin from "./components/Userlogin.jsx";
import UserDetails from "./components/UserDetails.jsx";
import Logout from "./components/Logout.jsx";
import Paperproducts from "./components/Category component/Paperproducts.jsx";
import Desksupply from "./components/Category component/Desksupply.jsx";
import Reusable from "./components/Category component/Reusable.jsx";
import Filling from "./components/Category component/Filling.jsx";
import Writing from "./components/Category component/Writing.jsx";
import BuyProduct from "./components/BuyProduct.jsx";
import UserAddress from "./components/UserAddress.jsx";
import Payment from "./components/Payment.jsx";
removeEventListener;
import Myorder from "./components/Myorder.jsx";
import Helpdesk from "./components/Helpdesk.jsx";
import BulkAddProduct from "./components/BulkAddProduct.jsx";
import UserUpdateDetails from "./components/UserUpdateDetails.jsx";
import Reminder from "./components/Reminder.jsx";
import Wishlisted from "./components/Wishllisted.jsx";
import SearchResult from "./components/SearchResult.jsx";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Navbar />
        {/* Log statement to check if Navbar is rendering */}
        {console.log("Navbar component rendered")}
        {/* <Reminder/> */}
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/About" element={<Product />} />]
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Aboutus" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userLogin" element={<Userlogin />} />
          <Route path="/user" element={<UserDetails />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/PaperProduct" element={<Paperproducts />} />
          <Route path="/DeskSupply" element={<Desksupply />} />
          <Route path="/Reusable" element={<Reusable />} />
          <Route path="/Filling" element={<Filling />} />
          <Route path="/Writing" element={<Writing />} />
          <Route path="/BuyProduct" element={<BuyProduct />} />
          <Route path="/addressUpdate" element={<UserAddress />} />
          <Route path="/wishlist" element={<Wishlisted />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/myOrder" element={<Myorder />} />
          <Route path="/helpdesk" element={<Helpdesk />} />
          <Route path="/bulkAdd" element={<BulkAddProduct />} />
          <Route path="/update" element={<UserUpdateDetails />} />
          <Route path="/searchResult" element={<SearchResult />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
