/** @format */

require('./apps/connect');
const RouterMain = require('./routes/main.router');
const RouterToken = require('./routes/token.router');
const RouterProduk = require('./routes/produk.router');
const RouterKategori = require('./routes/kategori.router');
const RouterStatus = require('./routes/status.router');

module.exports = {
  RouterMain,
  RouterToken,
  RouterProduk,
  RouterKategori,
  RouterStatus
};
