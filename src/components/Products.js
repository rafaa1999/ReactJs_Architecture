import { faCheckCircle, faCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { checkProduct, deleteProduct, getProducts } from '../app/app'

function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    handleGetProduct();
  },[])

  const handleGetProduct = () => {
    getProducts().then(resp => {
      const products = resp.data;
      setProducts(products);
    }).catch(e => {
      console.log(e);
    })
  }
  const handleDeleteProduct = (product) => {
    deleteProduct(product).then((resp) => {
      const newProducts = products.filter((p) => p.id !== product.id);
      setProducts(newProducts);
    }).catch(e => {
      console.log(e);
    })
  }

  const handleCheckProduct = (product) => {
    checkProduct(product).then((resp) => {
      const newProducts = products.map(p => {
        if(p.id === product.id){
          p.checked = !product.checked;
        }
        return p;
      })
      setProducts(newProducts); 
    }).catch(e => {
      console.log(e);
    })
  }

  return (
    <div className="p-3">
          <div className='row'>
            <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Checked</th>
                        </tr>
                      </thead>
                      <tbody>
                          {
                            products.map((product, index) => {
                              return(
                                <tr key={product.id}>
                                  <td>{product.id}</td>
                                  <td>{product.name}</td>
                                  <td>{product.price}</td>
                                  <td>
                                    <button onClick={() => handleCheckProduct(product)} className='btn btn-outline-success'>
                                      <FontAwesomeIcon icon={product.checked ? faCheckCircle : faCircle}></FontAwesomeIcon>
                                    </button>
                                  </td>
                                  <td>
                                    <button onClick={() => handleDeleteProduct(product)} className='btn btn-outline-danger'>
                                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                    </button>
                                  </td>
                                </tr>
                              )
                            })
                          }
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>
          </div>
    </div>
  )
}

export default Products