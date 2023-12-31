/*const root_directory_source = '/src/views/components/Image';
const testImage = `${root_directory_source}/CardsMenu/Rectangle 56.png`;*/
import Cookies from "js-cookie";
import testImage from "../../components/Image/CardsMenu/Rectangle 56.png";

let productData: any = [
  {
    id: "SP001",
    image: [
      "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
      testImage,
      testImage,
      "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
      testImage,
      testImage,
    ],
    name: "Áo sơ mi tay lỡ phối ren",
    price: 1999000,
    size: ["xl", "xs"],
    color: ["red", "green", "blue"],
    category: "Nón",
    state: 1,
    quantity: 50,
    decription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae rem eligendi repudiandae pariatur. Aut, esse molestias laborum sunt reprehenderit repellat officiis aspernatur consequatur nemo! Veritatis, ex architecto! Eligendi, istenulla.",
  },
  {
    id: "2",
    image: [testImage],
    name: "Áo sơ mi tay lỡ phối ren",
    price: 1999000,
    size: ["xl"],
    color: ["red", "pink", "blue"],
    category: "Vớ",
    state: 1,
    quantity: 50,
    decription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae rem eligendi repudiandae pariatur. Aut, esse molestias laborum sunt reprehenderit repellat officiis aspernatur consequatur nemo! Veritatis, ex architecto! Eligendi, istenulla.",
  },
  {
    id: "3",
    image: [testImage],
    name: "Áo sơ mi tay lỡ phối ren",
    price: 1999000,
    size: ["xl"],
    color: ["red", "green", "blue"],
    category: "Nón",
    state: 1,
    quantity: 50,
    decription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae rem eligendi repudiandae pariatur. Aut, esse molestias laborum sunt reprehenderit repellat officiis aspernatur consequatur nemo! Veritatis, ex architecto! Eligendi, istenulla.",
  },
  {
    id: "4",
    image: [testImage],
    name: "Áo sơ mi tay lỡ phối ren",
    price: 1999000,
    size: ["xl"],
    color: ["red", "green", "blue"],
    category: "Nón",
    state: 1,
    quantity: 50,
    decription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae rem eligendi repudiandae pariatur. Aut, esse molestias laborum sunt reprehenderit repellat officiis aspernatur consequatur nemo! Veritatis, ex architecto! Eligendi, istenulla.",
  },
  {
    id: "5",
    image: [testImage],
    name: "Áo sơ mi tay lỡ phối ren",
    price: 1999000,
    size: ["xl"],
    color: ["red"],
    category: "Nón",
    state: 1,
    quantity: 50,
    decription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae rem eligendi repudiandae pariatur. Aut, esse molestias laborum sunt reprehenderit repellat officiis aspernatur consequatur nemo! Veritatis, ex architecto! Eligendi, istenulla.",
  },
  {
    id: "6",
    image: [testImage],
    name: "Áo sơ mi tay lỡ phối ren",
    price: 1999000,
    size: ["xl"],
    color: ["red"],
    category: "Nón",
    state: 1,
    quantity: 50,
    decription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae rem eligendi repudiandae pariatur. Aut, esse molestias laborum sunt reprehenderit repellat officiis aspernatur consequatur nemo! Veritatis, ex architecto! Eligendi, istenulla.",
  },
  {
    id: "7",
    image: [testImage],
    name: "Áo sơ mi tay lỡ phối ren",
    price: 1999000,
    size: ["xl"],
    color: ["red"],
    category: "Nón",
    state: 1,
    quantity: 50,
    decription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae rem eligendi repudiandae pariatur. Aut, esse molestias laborum sunt reprehenderit repellat officiis aspernatur consequatur nemo! Veritatis, ex architecto! Eligendi, istenulla.",
  },
  {
    id: "8",
    image: [testImage],
    name: "Áo sơ mi tay lỡ phối ren",
    price: 1999000,
    size: ["xl"],
    color: ["red"],
    category: "Nón",
    state: 1,
    quantity: 50,
    decription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae rem eligendi repudiandae pariatur. Aut, esse molestias laborum sunt reprehenderit repellat officiis aspernatur consequatur nemo! Veritatis, ex architecto! Eligendi, istenulla.",
  },
  {
    id: "9",
    image: [testImage],
    name: "Áo sơ mi tay lỡ phối ren",
    price: 1999000,
    size: ["xl"],
    color: ["red"],
    category: "Nón",
    state: 0,
    quantity: 50,
    decription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae rem eligendi repudiandae pariatur. Aut, esse molestias laborum sunt reprehenderit repellat officiis aspernatur consequatur nemo! Veritatis, ex architecto! Eligendi, istenulla.",
  },
  {
    id: "10",
    image: [testImage],
    name: "Áo sơ mi tay lỡ phối ren",
    price: 1999000,
    size: ["xl"],
    color: ["red"],
    category: "Nón",
    state: 1,
    quantity: 50,
    decription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae rem eligendi repudiandae pariatur. Aut, esse molestias laborum sunt reprehenderit repellat officiis aspernatur consequatur nemo! Veritatis, ex architecto! Eligendi, istenulla.",
  },
];
export function setProductData(prodCate, prod) {
     return new Promise<any>((resolve, reject) => {
          // Mở cơ sở dữ liệu hoặc tạo mới nếu chưa tồn tại
          var request_idb = indexedDB.open("Product");

          request_idb.onupgradeneeded = function (event) {
          var db = request_idb.result;
          var objectStore = db.createObjectStore("product", { keyPath: "key" });
          objectStore.createIndex("index1", "field1", { unique: false });
          };

          request_idb.onsuccess = function (event) {
          var db = request_idb.result;

          // Lưu trữ dữ liệu
          var transaction = db.transaction(["product"], "readwrite");
          var objectStore = transaction.objectStore("product");

          let dataProduct = {
               key: 'prodAndCate',
               all: JSON.stringify(prodCate),
               data: JSON.stringify(prod),
          };
          objectStore.put(dataProduct).onsuccess = function (event) {
               resolve("Đã thêm hoặc cập nhật dữ liệu thành công!");
          };
          };

          request_idb.onerror = function (event) {
               reject("Lỗi khi mở cơ sở dữ liệu:");
          };
          })
}
export function getProductData(key) {
  return new Promise<any>(function (resolve, reject) {
    // Mở cơ sở dữ liệu
    var request = indexedDB.open("Product");

    request.onsuccess = function (event) {
      var db = request.result;

      // Bắt đầu một giao dịch đọc
      var transaction = db.transaction(["product"], "readonly");
      var objectStore = transaction.objectStore("product");
      // Truy vấn dữ liệu bằng key
      var getRequest = objectStore.get('prodAndCate');

      getRequest.onsuccess = function (event) {
        var data = getRequest.result;
        if (data) {
          // Trả về dữ liệu nếu có
          resolve(JSON.parse(data[key]));
        } else {
          // Trả về null nếu không tìm thấy dữ liệu
          resolve(null);
        }
      };

      getRequest.onerror = function (event) {
        // Trả về lỗi nếu có lỗi
        reject(this.error);
      };
    };

    request.onerror = function (event) {
      // Trả về lỗi nếu có lỗi khi mở cơ sở dữ liệu
      reject(this.error);
    };
  });
}
// export default productData
