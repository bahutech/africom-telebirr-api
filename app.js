const express = require("express");
const cors = require('cors');
var os = require('os');
const bodyParser = require("body-parser");
var request = require('request');
var WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;
var app = express();

//cors
app.use(cors())
var networkInterfaces = os.networkInterfaces();
const { signString } = require("./utils/tools");
const authToken = require("./service/authTokenService");
const createOrder = require("./service/createOrderService");

const api = new WooCommerceRestApi({
  url: "https://aliexpress.andagna.com",
  consumerKey: "ck_f698c13cdafb13d2dcf2ba42257522537bdff188",
  consumerSecret: "cs_97eb40b7df1e997925d5b9181f6ac080a308ac95",
  version: "wc/v3"
});

function applyUserToken(username , password) {
  console.log("Received Data =", username +"==="+ password);
  var un = username
  var pw = password
  return new Promise((resolve, reject) => {
    //'https://aliexpress.andagna.com/wp-json/jwt-auth/v1/token?username=hamli&password=password'
     
    var options = {
      'method': 'POST',
      'url': `https://aliexpress.andagna.com/wp-json/jwt-auth/v1/token?username=${un}&password=${pw}`,
      'headers': {
        'Cookie': 'mailchimp_landing_site=https%3A%2F%2Faliexpress.andagna.com%2Fwp-json%2F'
      }
    };
    console.log(options);
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log("****** WP TOKEN *****");
      //console.log("BODY", response.body);
      // console.log(typeof response.body);
      let result = JSON.parse(response.body);
      // console.log(result);
      // console.log("*****************");
      resolve(result);
    });
  });
}
//==== signup
function registerUser(username ,email, password) {
  console.log("Received Data =", username +"==="+email+"====="+ password);
  var un = username
  var em = email
  var pw = password
  return new Promise((resolve, reject) => {
    //'https://aliexpress.andagna.com/wp-json/jwt-auth/v1/token?username=hamli&password=password'
     
    var options = {
      'method': 'POST',
      'url': `https://aliexpress.andagna.com/wp-json/custom/v1/register?username=${un}&email=${em}&password=${pw}`,
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': un,
        'email': em,
        'password': pw
      }),
    };
    console.log(options);
    request(options, function (error, response) {
      if (error) resolve(error);
      console.log("****** WP SIGNUP *****");
      console.log("BODY", response.body);
      // console.log(typeof response.body);
      let result = JSON.parse(response.body);
      // console.log(result);
      // console.log("*****************");
      resolve(result);
    });
  });
}
// get customer getCustomerDetail
function getCustomerDetail(id) {
  return new Promise((resolve, reject) => {
    var options = {
      url: `https://aliexpress.andagna.com/wp-json/wc/v3/customers/${id}`,
      auth: {
          'user': 'ck_f698c13cdafb13d2dcf2ba42257522537bdff188',
          'pass': 'cs_97eb40b7df1e997925d5b9181f6ac080a308ac95'
      }
    };
    //console.log(options);
    request(options, function (error, response) {
      if (error) resolve(error);
      // console.log("***********");
      //console.log("BODY", response.body);
      // console.log(typeof response.body);
      let result = JSON.parse(response.body);
      // console.log(result);
      // console.log("*****************");
      resolve(result);
    });
  });
}
//========= get products
function getProducts(page, per_page) {
  return new Promise((resolve, reject) => {
    var options = {
      url: `https://aliexpress.andagna.com/wp-json/wc/v3/products?per_page=${per_page}&page=${page}`,
      auth: {
          'user': 'ck_f698c13cdafb13d2dcf2ba42257522537bdff188',
          'pass': 'cs_97eb40b7df1e997925d5b9181f6ac080a308ac95'
      }
    };
    //console.log(options);
    request(options, function (error, response) {
      if (error) resolve(error);
      // console.log("***********");
      //console.log("BODY", response.body);
      // console.log(typeof response.body);
      let result = JSON.parse(response.body);
      // console.log(result);
      // console.log("*****************");
      resolve(result);
    });
  });
}
//========= list products by category
function getProductsByCategory(page, per_page, category) {
  return new Promise((resolve, reject) => {
    var options = {
      url: `https://aliexpress.andagna.com/wp-json/wc/v3/products?per_page=${per_page}&page=${page}&category=${category}`,
      auth: {
          'user': 'ck_f698c13cdafb13d2dcf2ba42257522537bdff188',
          'pass': 'cs_97eb40b7df1e997925d5b9181f6ac080a308ac95'
      }
    };
    //console.log(options);
    request(options, function (error, response) {
      if (error) resolve(error);
      // console.log("***********");
      //console.log("BODY", response.body);
      // console.log(typeof response.body);
      let result = JSON.parse(response.body);
      // console.log(result);
      // console.log("*****************");
      resolve(result);
    });
  });
}
//========= get single products
function getProductSingle(id) {
  console.log("here id received "+ id)
  var url_single = "https://aliexpress.andagna.com/wp-json/wc/v3/products/"+id
  return new Promise((resolve, reject) => {
    var options = {
      url: url_single,
      auth: {
          'user': 'ck_f698c13cdafb13d2dcf2ba42257522537bdff188',
          'pass': 'cs_97eb40b7df1e997925d5b9181f6ac080a308ac95'
      }
    };
    //console.log(options);
    request(options, function (error, response) {
      if (error) throw new Error(error);
      // console.log("***********");
      //console.log("BODY", response.body);
      // console.log(typeof response.body);
      let result = JSON.parse(response.body);
       //console.log(result);
      // console.log("*****************");
      resolve(result);
    });
  });
}
//get categories
function getCategory() {
  return new Promise((resolve, reject) => {
    var options = {
      url: 'https://aliexpress.andagna.com/wp-json/wc/v3/products/categories',
      auth: {
          'user': 'ck_f698c13cdafb13d2dcf2ba42257522537bdff188',
          'pass': 'cs_97eb40b7df1e997925d5b9181f6ac080a308ac95'
      }
    };
    //console.log(options);
    request(options, function (error, response) {
      if (error) resolve(error);
      // console.log("***********");
      //console.log("BODY", response.body);
      // console.log(typeof response.body);
      let result = JSON.parse(response.body);
      // console.log(result);
      // console.log("*****************");
      resolve(result);
    });
  });
}
// get orders
function getOrder() {
  return new Promise((resolve, reject) => {
    var options = {
      url: 'https://aliexpress.andagna.com/wp-json/wc/v3/orders ',
      auth: {
          'user': 'ck_f698c13cdafb13d2dcf2ba42257522537bdff188',
          'pass': 'cs_97eb40b7df1e997925d5b9181f6ac080a308ac95'
      }
    };
    //console.log(options);
    request(options, function (error, response) {
      if (error) throw new Error(error);
      // console.log("***********");
      //console.log("BODY", response.body);
      // console.log(typeof response.body);
      let result = JSON.parse(response.body);
      // console.log(result);
      // console.log("*****************");
      resolve(result);
    });
  });
}
//======== get banners
var sliderList = [
  {
    id: 1,
    picurl: "https://ae01.alicdn.com/kf/S6645b6fd8c684c6883d3de87aaff8971Q/444x280.png",
    title: "jewelery",
  },
  {
    id: 2,
    picurl: "https://ae01.alicdn.com/kf/S92d630fabc0942c4b408615a25cf1929V/960x557.jpg",
    title: "Electronics",
  },
  {
    id: 3,
    picurl: "https://cdn.it120.cc/apifactory/2019/06/18/06b337d7-92a1-498b-8142-5c5951e8fb97.jpg",
    title: "Promotion",
  },
  {
    id: 4,
    picurl: "https://cdn.it120.cc/apifactory/2019/06/18/4c458676-85bb-4271-91a6-79ed9fc47545.jpg",
    title: "Ecommerce",
  },
  {
    id: 5,
    picurl: "https://dcdn.it120.cc/2022/02/02/d0442c95-cd44-435a-888d-2539c5399334.png",
    title: "aliexpress",
  },
  {
    id: 6,
    picurl: "https://dcdn.it120.cc/2022/05/05/ac956ae3-151f-418e-b0e9-fadd76a9ea6d.jpeg",
    title: "shopping",
  },
]
function getBanners() {
  return new Promise((resolve, reject) => {
    var options = {
      
    };
    //console.log(options);
    request(options, function (error, response) {
      if (error) throw new Error(error);
      // console.log("***********");
      //console.log("BODY", response.body);
      // console.log(typeof response.body);
      let result = JSON.parse(response.body);
      // console.log(result);
      // console.log("*****************");
      resolve(result);
    });
  });
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// allow cross-origin
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PATCH, PUT, DELETE"
  );
  res.header("Allow", "GET, POST, PATCH, OPTIONS, PUT, DELETE");
  next();
});

app.post("/apply/h5token", function (req, res) {
  authToken.authToken(req, res);
});

app.post("/create/order", function (req, res) {
  createOrder.createOrder(req, res);
});
//woo product section
app.get("api/list", async function (req, res) {
  console.log("RECEIVED PARAM")
  console.log(req)
  // List products
  var allProducts = await getProducts();
  res.status(200).json({code: 0, data: allProducts, msg: 'success' });
});

//wooo end

//for testing
//signup
app.post("/api/register", async (req, res) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var response = await registerUser(username,email, password);
   res.status(200).json(response);
 });
 //login
 app.post("/api/listen", async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var userToken = await applyUserToken(username, password);
   res.status(200).json({ usertoken: userToken });
 });
 //====================== wooo rest api =======
 app.get("/api/woo", async (req, res) => {
  // List products
  var resData = []
  await api.get("products", {
    per_page: 2, // 20 products per page
  })
  .then((response) => {
    // Successful request
    resData = response.data
   // console.log("Response Status:", response.status);
    //console.log("Response Headers:", response.headers);
    //console.log("Response Data:", response.data);
   // console.log("Total of pages:", response.headers['x-wp-totalpages']);
   // console.log("Total of items:", response.headers['x-wp-total']);
  })
  .catch((error) => {
    // Invalid request, for 4xx and 5xx statuses
    //console.log("Response Status:", error.response.status);
    //console.log("Response Headers:", error.response.headers);
    console.log("Response Data:", error.response.data);
  })
  .finally(() => {
    // Always executed.
  });
   res.status(200).json({code: 0, data: resData, msg: 'success' });
 });
 //================== end =====================
 //========
 //for product
 app.get("/api/products", async (req, res) => {
  console.log("RECEIVED PARAM")
  
  var allProducts = await getProducts();
   res.status(200).json({ allProducts: allProducts });
 });
 app.post("/api/products", async (req, res) => {
  console.log("RECEIVED PARAMO")
  // Define the object 
  const inputObject = req.body; // Convert the object key to a string 
  const jsonString = Object.keys(inputObject)[0]; // Remove the last characters 
  console.log(jsonString)
  const trimmedString =JSON.parse(jsonString);
  var page = trimmedString.page
  var per_page = trimmedString.pageSize
  console.log(page +" and "+ per_page)
  var allProducts = await getProducts(page, per_page);
   res.status(200).json({ allProducts: allProducts });
 });
 //list by category 
 app.post("/api/list", async (req, res) => {
  console.log("RECEIVED PARAM for category list")
  // Define the object 
  const inputObject = req.body; // Convert the object key to a string 
  const jsonString = Object.keys(inputObject)[0]; // Remove the last characters 
  console.log(jsonString)
  const trimmedString =JSON.parse(jsonString);
  var page = trimmedString.page
  var per_page = trimmedString.pageSize
  var category = trimmedString.categoryId
  console.log(page +" and "+ per_page+"=="+category)
  var allProducts = await getProductsByCategory(page, per_page, category);
   res.status(200).json({ allProducts: allProducts });
 });
 //get single product
 app.post("/api/detail", async (req, res) => {
  console.log("RECEIVED DATA for single product")
  // Define the object 
  const inputObject = req.body; // Convert the object key to a string 
  const jsonString = Object.keys(inputObject)[0]; // Remove the last characters 
  console.log(jsonString)
  const trimmedString =JSON.parse(jsonString);
  var idProduct = trimmedString
  console.log(idProduct)
  //var item = await getProductSingle(id);
   //res.status(200).json({ allProducts: item });
   var endPoint = "products/"+idProduct
  api.get(endPoint)
  .then((response) => {
    
    res.status(200).json({ allProducts: response.data });
    //console.log(response.data);
  })
  .catch((error) => {
    res.status(200).json({ allProducts: error.response.data });
    console.log(error.response.data);
  });
 });
 //get Customers  
 app.post("/api/customer", async (req, res) => {
  console.log("RECEIVED PARAM for get customer")
  // Define the object 
  const inputObject = req.body; // Convert the object key to a string 
  const jsonString = Object.keys(inputObject)[0]; // Remove the last characters 
  console.log(jsonString)
  const trimmedString =JSON.parse(jsonString);
  var id = trimmedString.token
  console.log(id)
  var customer = await getCustomerDetail(id);
   res.status(200).json({ data: customer });
 });
 //get Customers by email
 app.post("/api/customer/info", async (req, res) => {
  console.log("RECEIVED PARAM for get customer by email")
  // Define the object 
  const inputObject = req.body; // Convert the object key to a string 
  const jsonString = Object.keys(inputObject)[0]; // Remove the last characters 
  console.log(jsonString)
  const trimmedString =JSON.parse(jsonString);
  console.log(trimmedString)
  
  //console.log(data)
  var id = trimmedString.email
  console.log(id)
  var endPoint = "customers"
  api.get(endPoint, { email: id })
  .then((response) => {
    
    res.status(200).json({ data: response.data });
    //console.log(response.data);
  })
  .catch((error) => {
    res.status(200).json({ data: error.response.data });
    console.log(error.response.data);
  });
 });
 //update customer address
 app.post("/api/address", async (req, res) => {
  console.log("RECEIVED PARAM for Address")
  // Define the object 
  const inputObject = req.body; // Convert the object key to a string 
  const jsonString = Object.keys(inputObject)[0]; // Remove the last characters 
  console.log(jsonString)
  const trimmedString =JSON.parse(jsonString);
  console.log(trimmedString)
  var data = {
    shipping: trimmedString.shipping
  };
  console.log(data)
  var id = trimmedString.id
  console.log(id)
  var endPoint = "customers/" + id
  api.put(endPoint, data)
  .then((response) => {
    res.status(200).json({ data: response.data });
    //console.log(response.data);
  })
  .catch((error) => {
    res.status(200).json({ data: error.response.data });
    console.log(error.response.data);
  });
  //var customer = await getCustomerDetail(id);
   
 });
 //get orders
 app.post("/api/order/list", async (req, res) => {
  console.log("RECEIVED PARAM for orders")
  
  // Define the object 
  const inputObject = req.body; // Convert the object key to a string 
  const jsonString = Object.keys(inputObject)[0]; // Remove the last characters 
  console.log(jsonString)
  const trimmedString =JSON.parse(jsonString);
  console.log(trimmedString)
  
  //console.log(data)
  var id = trimmedString.token
  console.log(id)
  var endPoint = "orders"
  api.get(endPoint, { customer: id })
  .then((response) => {
    
    res.status(200).json({ data: response.data });
    //console.log(response.data);
  })
  .catch((error) => {
    res.status(200).json({ data: error.response.data });
    console.log(error.response.data);
  });
  //var customer = await getCustomerDetail(id);
 });
 //create orders
 app.post("/api/order/create", async (req, res) => {
  console.log("RECEIVED PARAM for Create orders")
  
  // Define the object 
  //const inputObjectO = req.body; // Convert the object key to a string 
  //const jsonStringO = Object.keys(inputObjectO)[0]; // Remove the last characters 
   //console.log(req.body)
  /*const trimmedString =JSON.parse(jsonString);
  console.log(trimmedString)
  
  var id = trimmedString.token
  console.log(req.body) */
  api.post("orders", req.body)
  .then((response) => {
    console.log(response.data);
    res.json(response.data)
  })
  .catch((error) => {
    console.log(error.response.data);
    res.json(error.response.data)
  });
  //var customer = await getCustomerDetail(id);
 });
 //update order status
 app.post("/api/order/status", async (req, res) => {
  console.log("RECEIVED PARAM for order status")
  // Define the object 
  const inputObjectOS = req.body; // Convert the object key to a string 
  const jsonStringOS = Object.keys(inputObjectOS)[0]; // Remove the last characters 
  console.log(jsonStringOS)
  const trimmedStringOS =JSON.parse(jsonStringOS);
  console.log(trimmedStringOS.id)
  var data = {
    status: "processing"
  };
  //console.log(data)
  var id = trimmedStringOS.id
  console.log(id)
  var endPoint = "orders/" + id
  api.put(endPoint, data)
  .then((response) => {
    res.status(200).json({ data: response.data });
    //console.log(response.data);
  })
  .catch((error) => {
    res.status(200).json({ data: error.response.data });
    console.log(error.response.data);
  });
  //var customer = await getCustomerDetail(id);
   
 });
 //for categories
 app.get("/api/category", async (req, res) => {
   
  var category = await getCategory();
   res.status(200).json({ category: category });
 });

 //for banners
 app.get("/api/banners", async (req, res) => {
   
  //var userToken = await applyUserToken();
   res.status(200).json({ banners: sliderList });
 });

 //for orders
 app.get("/api/orders", async (req, res) => {
   
  var orders = await getOrder();
   res.status(200).json({ orders: orders });
 });
 //========
app.post("/api/v1/notify", (req, res) => {
  console.log("Notify Response Hits HERE!");
  console.log({ REQ_BODY: req });
  res.status(201).json({ body: req.body });
});

app.put("/api/v1/notify", (req, res) => {
  console.log("New Notify Response Body Hit PUT");
  console.log({ REQ_BODY: req.body });
  res.status(201).json({ body: req.body });
});
// start server
let serverPort = process.env.PORT | 8081;
var app = app.listen(serverPort, function () {
  console.log("server started, port:" + serverPort);
  //console.log(networkInterfaces);
});
