import { Col, Row, Image, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import FilterProduct from '../../components/filter/leftFilter';
import Product from '../../components/product/productList';
import banner1 from "../../components/Image/bannerHeader/Banner6.png";
import banner2 from "../../components/Image/bannerHeader/Banner7.png";
import { getProductData } from '../../components/product/productData';
import ProductItem from '../../components/product/productItem';
import { getProductsWithAllCategory } from '../../../controllers/modules/customer/products';
import axios from '../../../../utils/axios';
import { getAllCategories } from '../../../controllers/modules/customer/categories';
import ProductFilter from '../../components/product/productFilter';
import LoadingPage from '../../loadingPage';
// Inside the Product component file (productList.tsx)
interface ProductProps {
     productData: any[]; // Update the type of productData to accept any array
     // Other props...
}
export default function Category({ productData, allCategories, productDataCate, isAccess = true }) {
     const [selectedColor, setSelectedColor] = useState(null);
     const [thisProduct, setProductData] = useState([]);
     const [filteredProductData, setFilteredProductData] = useState([]);
     const [selectedTree, setSelectedTree] = useState(null);
     const [currentOption, setCurrentOption] = useState(null);
     const [isAccessState, setIsAccessState] = useState(isAccess);
     const [colorChoose, setColorChoose] = useState([]);
     const [cateChoose, setCateChoose] = useState([]);
     const [sizeChoose, setSizeChoose] = useState([]);
     const [priceChoose, setPriceChoose] = useState([]);
     const [filteredData, setFilteredProductBySize] = useState(null);
     const [filteredPrice, setFilteredProductByPrice] = useState(null);
     const [commonFiltered, setCommonFiltered] = useState(null);

     // Hàm callback để xử lý khi màu được chọn
     const handleFilterByColor = (color) => {
          setIsAccessState(true)
          // setSelectedColor(color); // Cập nhật màu đã chọn
          // const fetchProductByColor = (color) => {
          //      const thisProduct = productDataCate.filter(
          //           (item) => { 
          //                return item.mathang.some((product) => product.mau.ten === color); 
          //           }); // Thay thế 'color' bằng thông tin để lấy sản phẩm theo màu từ API
          //      setProductData(thisProduct);
          // };

          // fetchProductByColor(color);
          const index = colorChoose.indexOf(color)
          if (index == -1) {
               colorChoose.push(color)
          }
          else {
               colorChoose.splice(index,1)
          }
          handleFilterAll()
          setSelectedTree(null); // Hủy chọn tree
          setCurrentOption('color'); // Đặt trạng thái hiện tại là 'color'
          setIsAccessState(false)
     };
     const filterProductData = (tree) => {
          // Lấy dữ liệu sản phẩm từ API hoặc bất kỳ nguồn dữ liệu nào khác
          setIsAccessState(true)
          const response = allCategories;
          const filteredProductData = response.data.loaikhachhang.data.find(product => { return product.ten === tree });
          setFilteredProductData(filteredProductData);
          //setProductData(filteredProductData);

          if (filteredProductData) {
               const productList = filteredProductData.sanpham.map((product) => ({
                    ma: product.ma,
                    ten: product.ten,
                    anhminhhoa: product.anhminhhoa,
                    mota: product.mota,
                    gia: parseInt(product.gia),
                    mau: product.mathang[0].mau.ten,
                    kichco: product.mathang[0].kichco.ten,
               }));
               setFilteredProductData(productList)
          };
          setIsAccessState(false)

     }
     const fetchProductBySize = (tree) => {
          try {
               setIsAccessState(true)
               const filteredProductDatasize = productDataCate.filter(
                    (item) => item.mathang.some(mh => mh.kichco.ten.includes(tree))
               );
               setIsAccessState(false)
               setFilteredProductData(filteredProductDatasize);
          } catch (error) {
               console.error(error);
          }
     };
     const fetchProductByPrice = (tree) => {
          try {
            let filteredProductDataPrice
            setIsAccessState(true)
            const productData = productDataCate;
            if (tree.includes('less-than-one-milions')) {
              filteredProductDataPrice = productData.filter((item) => {
                return item.mathang.some((product) => parseInt(product.giaban) < 1000000);
              });
            } else if (tree.includes('from-one-milions-to-five-milions')) {
              filteredProductDataPrice = productData.filter((item) => {
                return item.mathang.some((product) => parseInt(product.giaban) >= 1000000 && parseInt(product.giaban) < 5000000);
              });
            } else if (tree.includes('Bigger-than-five-milions')) {
              filteredProductDataPrice = productData.filter((item) => {
                return item.mathang.some((product) => parseInt(product.giaban) >= 5000000);
              });
            }
            setIsAccessState(false)
            setFilteredProductData(filteredProductDataPrice);
          } catch (error) {
            console.error(error);
          }
        };
     const handleFilterAll = () => {
          let tempData = []
          let checkAll = true
          for (const cate of cateChoose) {
               tempData.push(productDataCate.filter(prod => {
                    return prod.loai.some(pro => pro.ten == cate)
               }))
               checkAll = false
          }
          for (const color of colorChoose) {
               tempData.push(productDataCate.filter(prod => {
                    return prod.mathang.some(mh => mh.mau.ten == color)
               }))
               checkAll = false
          }
          for (const size of sizeChoose) {
               tempData.push(productDataCate.filter(prod => {
                    return prod.mathang.some(mh => mh.kichco.ten == size)
               }))
               checkAll = false
          }
          for (const price of priceChoose) {
               if (price.includes('less-than-one-milions')) {
                    tempData.push(productDataCate.filter((item) => {
                         return item.mathang.some((product) => parseInt(product.giaban) < 1000000);
                    }));
               } else if (price.includes('from-one-milions-to-five-milions')) {
                    tempData.push(productDataCate.filter((item) => {
                         return item.mathang.some((product) => parseInt(product.giaban) >= 1000000 && parseInt(product.giaban) < 5000000);
                    }));
               } else if (price.includes('Bigger-than-five-milions')) {
                    tempData.push(productDataCate.filter((item) => {
                         return item.mathang.some((product) => parseInt(product.giaban) >= 5000000);
                    }));
               }
               checkAll = false
          }
          tempData = [].concat(...tempData)
          setFilteredProductData(checkAll ? productDataCate : tempData)
     }
     const handleFilterTree = (tree) => {
          setIsAccessState(true)
          setSelectedTree(tree); // Cập nhật màu đã chọn
          setSelectedColor(null); // Hủy chọn màu
          if (['less-than-one-milions', 'from-one-milions-to-five-milions', 'Bigger-than-five-milions'].includes(tree)) {
               // fetchProductByPrice(tree);
               const index = priceChoose.indexOf(tree)
               if (index == -1) {
                    priceChoose.push(tree)
               }
               else {
                    priceChoose.splice(index,1)
               }
               setPriceChoose(priceChoose)
               setCurrentOption('tree'); // Đặt trạng thái hiện tại là 'tree'
               setFilteredProductBySize(null)
          } else if (['S', 'XL', 'Free size', 'M', 'L'].includes(tree)) {
               // fetchProductBySize(tree);
               const index = sizeChoose.indexOf(tree)
               if (index == -1) {
                    sizeChoose.push(tree)
               }
               else {
                    sizeChoose.splice(index,1)
               }
               setSizeChoose(sizeChoose)
               setCurrentOption('tree'); // Đặt trạng thái hiện tại là 'tree'
               setFilteredProductBySize(null); // Reset giá trị filteredProductBySize
          } else {
               // filterProductData(tree);
               const index = cateChoose.indexOf(tree)
               if (index == -1) {
                    cateChoose.push(tree)
               }
               else {
                    cateChoose.splice(index,1)
               }
               setCateChoose(cateChoose)
               setCurrentOption('tree'); // Đặt trạng thái hiện tại là 'tree'
               setFilteredProductBySize(null); // Reset giá trị filteredProductBySize
          }
          handleFilterAll()
          setIsAccessState(false)
     };
     useEffect(() => {
          async function prepare() {
               if (isAccess) {
                    setIsAccessState(true)
                    setSelectedColor(null)
                    setSelectedTree(null)
                    setFilteredProductData(productData)
                    setCommonFiltered(productData)
                    setCurrentOption(null)
                    setFilteredProductBySize(null)
                    isAccess = false
                    setIsAccessState(false)
               }
          }
          prepare()
     },[productData, allCategories, productDataCate, isAccess])
     return (
          <div className="pageProduct">
               <Row>
                    <Col flex="1">
                         <div>
                              <FilterProduct onColorSelect={handleFilterByColor} onDataChange={handleFilterTree} dataCate={productDataCate} allCate={allCategories.data.loaikhachhang.data}/>
                         </div>

                    </Col>
                    <Col flex="4" >
                         <div className="banner-product-category">
                              <Image src={banner1} id="product-banner" />
                              <Image src={banner2} id="product-banner" />
                         </div>
                         {isAccessState ? <LoadingPage/>:
                         <><div className="product">
                              {/* {currentOption === 'color' && (
                                   <ProductItem productData={productData} selectedColor={selectedColor} />
                              )}
                              {currentOption === 'tree' && (

                              )}
                              {currentOption !== 'color' && currentOption !== 'tree' && ( */}
                                   {/* <Product productData={filteredProductData} /> */}
                              {/* )} */}
                              {/* <ProductFilter productData={filteredProductData} selectedTree={selectedTree} /> */}
                              <ProductItem productData={filteredProductData}/>
                         </div></>}
                    </Col>
               </Row>
          </div>
     )
}
