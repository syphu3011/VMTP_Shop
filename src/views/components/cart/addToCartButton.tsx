import { Button, Col, Row, message } from "antd";
import { ShoppingCartOutlined} from '@ant-design/icons';
import { useCart } from 'react-use-cart';
import React, { useState } from "react";
import { convertB64ToImage } from "../../../../utils/util";
import { Link } from "react-router-dom";
function AddToCartButton({ item,selectedColor, selectedSize,amount }) {
     const [loading, setLoading] = React.useState(false);
     const { addItem,items} = useCart();

     const addProductToCart = () => {
      if (amount > 0) {
        setLoading(true);
        /*addToCart(item.id).then((res) => {
          message.success(`${item.title} has been added to cart!`);
          setLoading(false);
        });*/
        if (selectedColor && selectedSize) {
          // Only add to cart if color and size are selected
          setLoading(true);
          const itemToAdd = {
            id: item.ma,
            image:convertB64ToImage(item.anhminhhoa),
            name: item.ten,
            color: selectedColor,
            size: selectedSize,
            quantity:amount,
            price: item.gia,
          };
        addItem(itemToAdd, amount);
          message.success(`${itemToAdd.name} đã được thêm vào giỏ hàng!`);
        }
        setLoading(false);
      }
      else {
        message.warning("Số lượng phải lớn hơn 0!")
      }
     };
     return (
       <Row gutter={[6,6]} className="action-cart-btn">
       <Col >
           <Button disabled={amount > 0 ? false:true} onClick={addProductToCart} loading={loading} className="add-to-cart-button btn-1">
           <span><ShoppingCartOutlined />Thêm vào giỏ</span>
           </Button>
       </Col>
       <Col>
            <Link to="/gio-hang/xac-nhan-thong-tin-giao-hang">
            <Button disabled={amount > 0 ? false:true} onClick={addProductToCart} loading={loading} className="add-to-cart-button btn-2">
             <span>Mua ngay</span>
           </Button>
           </Link>
       </Col>
   </Row>
     );
   }
export default AddToCartButton;