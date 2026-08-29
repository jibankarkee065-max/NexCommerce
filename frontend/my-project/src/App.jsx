import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserLayout from "./assets/image/components/Layout/UserLayout";
import { Toaster } from "sonner";
import Login from "./pages/Login";  
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./assets/image/components/Product/ProductDetails";
import Checkout from "./assets/image/components/Card/Checkout";
import OrderConformation from "./pages/OrderConformation";
import OrderDetailsPages from "./pages/OrderDetailsPages";
import MyOrderPage from "./pages/MyOrderPage";
import Admin from "./assets/image/components/Admin/AdminLayout";
const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path ="collectionpage" element ={<CollectionPage />} />
          <Route path ="product/:id" element ={<ProductDetails />} />
          <Route path ="checkout" element ={<Checkout />} />
          <Route path ="orderconformation" element ={< OrderConformation/>} />
          <Route path="order/:id" element={<OrderDetailsPages />} />
          <Route path="my-orders" element={<MyOrderPage />} />          
        </Route>
        <Route path="admin" element={<Admin/>}>
        
        {/* admin layout  */}</Route>
      </Routes>
    </BrowserRouter>
    
  );
};

export default App;