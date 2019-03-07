import React from 'react';
import styled from 'styled-components';

const ProductItem = styled.section `
  border: black 1px solid;
  margin: 10px;
  width: 300px;
  padding: 10px 20px;
`;

const Image = styled.img `
  height: 40px;
`;

export default function ProductListItem(props) {

  return(
    <ProductItem>
      <Image src={ `/images/${props.product.image } `} alt={ props.product.image } />
      <h3>{ props.product.name }</h3>
      <p>{ props.product.price }</p>
      <p>{ props.product.description }</p>

      <button onClick={() => props.addToCart(props.product)} > Add to Cart({
          (props.cartItem && props.cartItem.quantity) ||  0
        })
      </button>

      {
        props.cartItem
        ?
        <button onClick={() => props.removeFromCart(props.cartItem)}> Remove </button>
        : null
      }
    </ProductItem>
  )
}
