import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from './store'

function Veg() {
  const vegproducts=useSelector(state=>state.products.veg)
  const dispatch=useDispatch()

  const items=vegproducts.map( (product,index)=>
    <li key ={index}>
      {product.name}-${product.price.toFixed(2)}
      <button onClick ={()=>dispatch(addToCart(product))}>Add to cart</button>
      </li>
  )
  
  return (
   <>
   <h1 style={{color:"green"}}>This is veg-items</h1>
   <ul> 
    {items}
   </ul>
   </>
  );
}

export default Veg;