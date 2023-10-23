import React from 'react';
import HomeAdmin from '../components/pagecontent/home';
import Customer from '../components/pagecontent/customer';
import {Routes,Route} from 'react-router-dom';
import Product from '../components/pagecontent/product'
import Receipt from '../components/pagecontent/receipt';
import AccountCus from '../components/pagecontent/accountCus'
import Message from '../components/pagecontent/message';
import Typeproduct from '../components/pagecontent/typeproduct';
import Inventory from '../components/pagecontent/inventory';

export default class AppRoutesAdmin extends React.Component {
    
     render(){

          return(
               <Routes>
                    <Route path="/" element={<HomeAdmin/>}   ></Route>
                    <Route path="/Customers" element={<Customer/>}></Route>\
                    <Route path="/AccountCus" element={<AccountCus/>} ></Route>
                    <Route path="/Receipt" element={<Receipt/>} ></Route>
                    <Route path="/Products" element={<Product/>} ></Route>
                    <Route path="/TypePro" element={<Typeproduct/>} ></Route>
                    <Route path="/ProInStock" element={<Inventory/>} ></Route>
                    <Route path="/Message" element={<Message/>} ></Route>
                   
                    
               </Routes>
          )
     }
}
