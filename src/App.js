import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import "bootstrap/dist/css/bootstrap.min.css"
import NewProduct from "./components/NewProduct";
import { useEffect, useState } from "react";
import EditProduct from "./components/EditProduct";

function App() {
  const [currentRoute, setCurrentRoute] = useState();
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    setCurrentRoute(path.slice(1, path.length));
  },[])
  return (
   <BrowserRouter>
    <nav>
      <ul className="nav nav-pills p-1 m-3">
      <li>
            <Link onClick={() => setCurrentRoute("home")} className={currentRoute === "home" ? "btn btn-info ms-1" : "btn btn-outline-info ms-1"} to={"/home"}>
              Home
            </Link>
            <Link onClick={() => setCurrentRoute("products")} className={currentRoute === "products" ? "btn btn-info ms-1" : "btn btn-outline-info ms-1"} to={"/products"}>
              Products
            </Link>
            <Link onClick={() => setCurrentRoute("newProduct")} className={currentRoute === "newProduct" ? "btn btn-info ms-1" : "btn btn-outline-info ms-1"} to={"/newProduct"}>
              New Product
            </Link>
          </li>
      </ul>
    </nav>
    <Routes>
      <Route path="/home" element={<Home/>} />
      <Route path="/products" element={<Products/>} />
      <Route path="/newProduct" element={<NewProduct/>} />
      <Route path="/editProduct/:id" element={<EditProduct/>} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
