import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import "bootstrap/dist/css/bootstrap.min.css"
import NewProduct from "./components/NewProduct";

function App() {
  return (
   <BrowserRouter>
    <nav>
      <ul className="nav nav-pills p-1 m-3">
      <li>
            <Link className="btn btn-outline-info ms-1" to={"/"}>
              Home
            </Link>
            <Link className="btn btn-outline-info ms-1" to={"/products"}>
              Products
            </Link>
            <Link className="btn btn-outline-info ms-1" to={"/newProduct"}>
              New Product
            </Link>
          </li>
      </ul>
    </nav>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Products" element={<Products/>} />
      <Route path="/NewProduct" element={<NewProduct/>} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
