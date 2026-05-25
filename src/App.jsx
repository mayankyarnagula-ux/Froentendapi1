import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="page-content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;