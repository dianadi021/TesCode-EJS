/** @format */

const mongoose = require('../apps/connect');

const KategoriSchema = mongoose.Schema(
  {
    nama_kategori: { type: String, required: true },
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
const KategoriModel = mongoose.model('Kategori', KategoriSchema);

const FormatInputKategori = { nama_kategori: 'String' };

module.exports = { KategoriModel, FormatInputKategori };
