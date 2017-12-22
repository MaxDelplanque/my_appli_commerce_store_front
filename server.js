const express = require("express");
const nunjucks = require("nunjucks");
const categoriesService = require("./categories");
const productsService = require("./products");
const fetch = require("node-fetch");

const app = express();
nunjucks.configure("views", {
  autoescape: true,
  express: app
});

app.set("views", __dirname + "/views");
app.set("view engine", "njk");

const port = process.env.PORT || 3000;

app.use(express.static("images"));
app.use(express.static("css"));

app.get("/", function(request, result) {
  categoriesService.getCategories()
    .then(categories => result.render("home", {categories: categories}))
    .catch(error => console.warn(error));
});

//
// app.get("/categories/:categoryid", function(request, result) {
//     return fetch(`https://decath-product-api.herokuapp.com/categories/${request.params.categoryid}`)
//     .then(response => response.json())
//     .then(category => result.render("/categories/${request.params.categoryid}", {categories: categories}))
//     .catch(error => console.warn(error));
// });


app.get("/categories/:categoryid/products", function(request, result) {
  productsService.getProducts(request.params.categoryid)
    .then(products => result.render("products", {products: products} ))
    .catch(error => console.warn(error));
});

app.get("/products/:productid", function(request, result) {
  return fetch(`https://decath-product-api.herokuapp.com/products/${request.params.productid}`)
    .then(response => response.json())
    .then(product => {
      console.log(product);
      result.render("product", {product: product} )
      ;})
    .catch(error => console.warn(error));
});


app.listen(port, function () {
  console.log("Server listening on port:" + port);
});
