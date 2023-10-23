import React from 'react';
import {Routes,Route} from 'react-router-dom';
import HomeAdmin from '../components/pagecontent/home';
import Customer from '../components/pagecontent/customer/customer';
import Product from '../components/pagecontent/product/product';
import Receipt from '../components/pagecontent/Orders/order';
import AccountCus from '../components/pagecontent/customer/accountCus';
import Message from '../components/pagecontent/message';
import Typeproduct from '../components/pagecontent/product/typeproduct';
import Inventory from '../components/pagecontent/product/inventory';
import Attribute from '../components/pagecontent/product/attribute';
export default class AppRoutesAdmin extends React.Component {
    
     render(){

          return(
               <Routes>
                    <Route path="/" element={<HomeAdmin/>}   ></Route>
                    <Route path="/Customers" element={<Customer/>}></Route>
                    <Route path="/AccountCus" element={<AccountCus/>} ></Route>              
                    <Route path="/Products" element={<Product/>} ></Route>
                    <Route path="/TypePro" element={<Typeproduct/>} ></Route>
                    <Route path="/ProInStock" element={<Inventory/>} ></Route>
                    <Route path="/Attribute" element={<Attribute/>} ></Route>
                    <Route path="/Message" element={<Message/>} ></Route>
                    <Route path="/Orders" element={<Receipt/>} ></Route>

               </Routes>
          )
     }
}