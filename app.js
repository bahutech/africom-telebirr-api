const express = require("express");
var os = require('os');
const bodyParser = require("body-parser");
var request = require('request');
var app = express();
var networkInterfaces = os.networkInterfaces();
const { signString } = require("./utils/tools");
const authToken = require("./service/authTokenService");
const createOrder = require("./service/createOrderService");

function applyUserToken() {
  return new Promise((resolve, reject) => {
    var options = {
      'method': 'POST',
      'url': 'https://aliexpress.andagna.com/wp-json/jwt-auth/v1/token?username=hamli&password=password',
      'headers': {
        'Cookie': 'mailchimp_landing_site=https%3A%2F%2Faliexpress.andagna.com%2Fwp-json%2F'
      }
    };
    console.log(options);
    request(options, function (error, response) {
      if (error) throw new Error(error);
      // console.log("***********");
      console.log("BODY", response.body);
      // console.log(typeof response.body);
      let result = JSON.parse(response.body);
      // console.log(result);
      // console.log("*****************");
      resolve(result);
    });
  });
}
//========= get products
function getProducts() {
  return new Promise((resolve, reject) => {
    var options = {
      url: 'https://aliexpress.andagna.com/wp-json/wc/v3/products',
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
    title: "diamond_1",
  },
  {
    id: 2,
    picurl: "https://ae01.alicdn.com/kf/S92d630fabc0942c4b408615a25cf1929V/960x557.jpg",
    title: "diamond_2",
  },
  {
    id: 3,
    picurl: "https://cdn.it120.cc/apifactory/2019/06/18/06b337d7-92a1-498b-8142-5c5951e8fb97.jpg",
    title: "diamond_3",
  },
  {
    id: 4,
    picurl: "https://cdn.it120.cc/apifactory/2019/06/18/4c458676-85bb-4271-91a6-79ed9fc47545.jpg",
    title: "diamond_4",
  },
  {
    id: 5,
    picurl: "https://dcdn.it120.cc/2022/02/02/d0442c95-cd44-435a-888d-2539c5399334.png",
    title: "diamond_5",
  },
  {
    id: 6,
    picurl: "https://dcdn.it120.cc/2022/05/05/ac956ae3-151f-418e-b0e9-fadd76a9ea6d.jpeg",
    title: "diamond_6",
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

//for testing
 app.get("/api/listen", async (req, res) => {
   
  var userToken = await applyUserToken();
   res.status(200).json({ usertoken: userToken });
 });
 //========
 //for product
 app.get("/api/products", async (req, res) => {
   
  var allProducts = await getProducts();
   res.status(200).json({ allProducts: allProducts });
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
  // console.log({ REQ_BODY: req });
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
  console.log(networkInterfaces);
});
