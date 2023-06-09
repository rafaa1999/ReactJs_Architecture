import { faCheckCircle, faCircle, faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext, checkProduct, deleteProduct, getProducts } from '../app/app'
import { useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm';

function Products() {
  const navigate = useNavigate();
  const [state, setState] = useContext(AppContext)
   useEffect(() => {
    handleGetProduct(state.keyWord, state.currentPage, state.pageSize);
  },[])

  const handleGetProduct = (keyWord, page, size) => {
    getProducts(keyWord, page, size).then(resp => {
      const totalElements = resp.headers['x-total-count'];
      let totalPages = Math.floor(totalElements / size);
      if(totalElements % size !== 0){
        ++ totalPages;
      }
      setState({
        ...state, 
        products: resp.data,
        currentPage: page,
        pageSize: size,
        keyWord: keyWord,
        totalPages: totalPages
      });
    }).catch(e => {
      console.log(e);
    })
  }

  const handleDeleteProduct = (product) => {
    deleteProduct(product).then((resp) => {
      const newProducts = state.products.filter((p) => p.id !== product.id);
      setState({
        ...state,
        products: newProducts
      });
    }).catch(e => {
      console.log(e);
    })
  }

  const handleCheckProduct = (product) => {
    checkProduct(product).then((resp) => {
      const newProducts = state.products.map(p => {
        if(p.id === product.id){
          p.checked = !product.checked;
        }
        return p;
      })
      setState({
        ...state,
        products: newProducts
      }); 
    }).catch(e => {
      console.log(e);
    })
  }

  const handleGoToPage = (page) => {
      handleGetProduct(state.keyWord, page, state.pageSize);
  }

  return (
    <div className="p-3">
          <div className='row'>
            <div className="col-md-6">
                <div className='card m-1'>
                <div className='card-body'>
                  <SearchForm handleGetProduct = {handleGetProduct}/>
                  </div>
                </div>
                <div className="card m-1">
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
                            state.products.map((product, index) => {
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
                                  <td>
                                    <button onClick={() => navigate(`/editProduct/${product.id}`)} className='btn btn-outline-success'>
                                      <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                    </button>
                                  </td>
                                </tr>
                              )
                            })
                          }
                      </tbody>
                    </table>
                    <nav className='nav nav-pills'>
                      {
                        new Array(state.totalPages).fill(0).map((v, index) => (
                          <li key={index + 1}>
                            <button onClick={() => handleGoToPage(index + 1)} 
                                    className={ (index + 1) === state.currentPage ? "btn btn-info ms-1" : "btn btn-outline-info ms-1"}>
                                {index + 1}
                            </button>
                          </li>   
                        ))
                      }
                    </nav>
                  </div>
                </div>
            </div>
          </div>
    </div>
  )
}

export default Products