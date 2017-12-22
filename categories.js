// on appelle l'API avec les infos souhaitées
const fetch = require("node-fetch")

function getCategories() {
  return fetch("https://decath-product-api.herokuapp.com/categories/")
    .then(response => response.json())
    .catch(error => console.warn(error))
}

module.exports = {
  getCategories: getCategories
};
