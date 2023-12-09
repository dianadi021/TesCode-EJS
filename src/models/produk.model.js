/** @format */

const mongoose = require('../apps/connect');

const ProdukSchema = mongoose.Schema(
  {
    nama_produk: { type: String, required: true },
    harga: { type: Number, required: true },
    kategori_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'kategoriproduks' }],
    status_id: { type: mongoose.Schema.Types.ObjectId, ref: 'statusproduks' },
  },
  { timestamps: true },
  {
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000,
    },
  }
);
const ProdukModel = mongoose.model('Produk', ProdukSchema);

const FormatInputProduk = {
  nama_produk: 'String',
  harga: 'Number',
};

module.exports = {
  mongoose,
  ProdukModel,
  FormatInputProduk,
};
