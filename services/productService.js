// productService.js
const pool = require("./config");

const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM tabel_product", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  getAllProducts,
};
