import React, { useEffect, useState } from 'react'
import { getProduct, saveProduct, updateProduct } from '../app/app';
import { useParams } from 'react-router-dom';

function EditProduct() {
  const {id} = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    handleGetProductById(id);
  },[])

  const handleGetProductById = (id) => {
    getProduct(id).then((resp) => {
      const {name, price, checked} = resp.data;
      setName(name);
      setPrice(price);
      setChecked(checked);
    })
  }

  const handleUpdateProduct = (event) => {
    event.preventDefault();
    let product = {
      name,
      price,
      checked,
      id
    }
    updateProduct(product).then(resp => {
      alert(JSON.stringify(resp.data));
    });
  }

  return (
    <div className='row p-1'>
      <div className='col-md-6'>
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={handleUpdateProduct}>
              <div className='mb-3'>
                <label className='form-label'>Name :</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className='form-control'/>
              </div>
              <div className='mb-3'>
                <label className='form-label'>Price :</label>
                <input 
                  onChange={(e) => setPrice(e.target.value)}
                  value={price} 
                  className='form-control'/>
              </div>
              <div className="form-check">
                <input 
                  onChange={(e) => setChecked(e.target.value)}
                  checked={checked}
                  className="form-check-input" type="checkbox"/>
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  Checked
                </label>
              </div>
              <button className='btn btn-success mt-2'>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default EditProduct