const fetch = require("node-fetch");

function getProducts(id) {
  return fetch(`https://decath-product-api.herokuapp.com/categories/${id}/products`)
    .then(response => response.json())
    .catch(error => console.warn(error))
}

//console.log(getProducts("9f8d8840-e22c-496f-b865-f5014710e234"));

module.exports = {
  getProducts: getProducts
};
