/** @format */

require('./apps/connect');
const RouterMain = require('./routes/main.router');
const RouterToken = require('./routes/token.router');
const RouterProduk = require('./routes/produk.router');

module.exports = {
  RouterMain,
  RouterToken,
  RouterProduk,
};
