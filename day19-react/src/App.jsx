import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/products" element={<PrivateRoute><ProductsPage/></PrivateRoute>} />
        <Route path="/products/:id" element={<PrivateRoute><ProductDetailPage/></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;