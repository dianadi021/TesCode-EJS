/** @format */

const { mongoose, ProdukModel, FormatInputProduk } = require('../models/produk.model');
const { CheckingKeyReq, CheckingKeyReqSyntax, CheckingIsNilValue, CheckingObjectValue } = require('../utils/utils');

const CreateProdukData = async (req, res) => {
  try {
    const { nama_produk, harga, kategori_id, status_id } = req.body.data ? JSON.parse(req.body.data) : req.body;
    if (!nama_produk || !harga) {
      return res.status(404).json({ status: 'failed', data: `Format tidak sesuai!`, format: FormatInputProduk });
    }
    const newProduk = ProdukModel({
      nama_produk: nama_produk.toLowerCase(),
      harga,
      kategori_id: kategori_id ? kategori_id : null,
      status_id: status_id ? status_id : null,
    });
    return await newProduk
      .save()
      // .then((result) => res.status(201).json({ status: 'success', data: `Berhasil membuat data produk.` }))
      .then((result) => res.render('produk', { isDetails: false, isCreateDocument: true, data: 'Berhasil membuat data produk.' }))
      // .catch((err) => res.status(500).json({ status: 'failed', data: `Gagal membuat data produk. Catch: ${err}` }));
      .catch((err) => res.render('produk', { isDetails: false, isCreateDocument: true, data: `Gagal membuat data produk. Catch: ${err}` }));
  } catch (err) {
    return res.status(500).json({ status: 'failed', data: `Gagal membuat data produk. Function Catch: ${err}` });
  }
};

const GetProdukData = async (req, res) => {
  try {
    const syntaxExec = ['nama_produk'];
    const { nama_produk, document, page } = CheckingKeyReq(req.body, req.query, req.body.data);
    const isHasSyntax = CheckingKeyReqSyntax(syntaxExec, req.body, req.query, req.body.data);
    if (!isHasSyntax && Object.keys(CheckingKeyReq(req.body, req.query, req.body.data)).length >= 1) {
      // const isDocumentHasInDatabase = await ProdukModel.aggregate([
      //   {
      //     $project: {
      //       username: 1,
      //       email: 1,
      //       full_name: 1,
      //     },
      //   },
      //   {
      //     $match: toFilter,
      //   },
      // ]);
      // if (!isDocumentHasInDatabase) {
      //   return res.status(404).json({ status: 'success', data: `Tidak ada data produk tersebut.` });
      // }
      // return res.status(200).json({ status: 'success', data: `Berhasil mengambil data produk.`, data: isDocumentHasInDatabase });
      // return res.status(404).json({ status: 'failed', data: `Gagal mengambil data! Query tidak sesuai.` });
      res.render('produk', {
        isDetails: false,
        isCreateDocument: false,
        isDeleteDocument: false,
        data: 'Query tidak benar atau tidak terdaftar!',
      });
    }
    if (isHasSyntax && nama_produk) {
      let toFilter = nama_produk ? { nama_produk: nama_produk.toLowerCase() } : false;
      const isDocumentHasInDatabase = await ProdukModel.aggregate([
        { $project: { _id: 1, nama_produk: 1, harga: 1 } },
        { $match: toFilter },
      ]);
      if (isDocumentHasInDatabase.length < 1) {
        // return res.status(404).json({ status: 'success', data: `Tidak ada data produk tersebut.` });
        res.render('produk', { isDetails: false, isCreateDocument: false, isDeleteDocument: false, data: 'tidak ada data yang tersimpan' });
      }
      res.render('produk', { isDetails: false, isCreateDocument: false, isDeleteDocument: false, data: isDocumentHasInDatabase });
      // return res.status(200).json({ status: 'success', data: `Berhasil mengambil data produk.`, data: isDocumentHasInDatabase });
    }

    // START PAGINATION ($SKIP & $LIMIT)
    const isDocumentHasInDatabase =
      !page && !document
        ? await ProdukModel.aggregate([{ $project: { _id: 1, nama_produk: 1, harga: 1 } }])
        : await ProdukModel.aggregate([
            { $project: { _id: 1, nama_produk: 1, harga: 1 } },
            { $skip: (parseInt(page) - 1) * parseInt(document) },
            { $limit: parseInt(document) },
          ]);
    // END PAGINATION ($SKIP & $LIMIT)
    if (isDocumentHasInDatabase.length > 0) {
      res.render('produk', { isDetails: false, isCreateDocument: false, isDeleteDocument: false, data: isDocumentHasInDatabase });
      // return res.status(200).json({ status: 'success', data: `Berhasil mengambil data produk.`, data: isDocumentHasInDatabase });
    } else {
      // return res.status(404).json({ status: 'success', data: `Tidak ada data produk.` });
      res.render('produk', { isDetails: false, isCreateDocument: false, isDeleteDocument: false, data: 'tidak ada data yang tersimpan' });
    }
  } catch (err) {
    res.render('produk', { messages: JSON.stringify({ status: 'failed', data: `Function catch error: ${err}` }) });
    // return res.status(500).json({ status: 'failed', data: `Gagal mengambil data produk. Function Catch: ${err}` });
  }
};

const GetProdukDetails = async (req, res) => {
  try {
    let { id } = req.params;
    let isDocumentHasInDatabase = await ProdukModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'Kategori',
          localField: 'kategori_id',
          foreignField: '_id',
          as: 'kategori_id',
        },
      },
      {
        $lookup: {
          from: 'Status',
          localField: 'status_id',
          foreignField: '_id',
          as: 'status_id',
        },
      },
    ]);
    if (isDocumentHasInDatabase) {
      res.render('produk', { isDetails: true, isCreateDocument: false, isDeleteDocument: false, data: isDocumentHasInDatabase });
      // return res.status(200).json({ status: 'success', data: `Berhasil mengambil data produk.`, data: isDocumentHasInDatabase });
    } else {
      return res.status(404).json({ status: 'success', data: `Tidak ada data produk.` });
    }
  } catch (err) {
    return res.status(500).json({ status: 'failed', data: `Gagal mengambil data produk. Function Catch: ${err}` });
  }
};

const UpdateProdukData = async (req, res) => {
  try {
    const { id } = req.params;
    const isDocumentHasInDatabase = await ProdukModel.findById(id);
    if (!isDocumentHasInDatabase) {
      return res.status(404).json({ status: 'success', data: `Tidak ada data produk.` });
    }
    const { nama_produk, harga, kategori_id, status_id } = CheckingKeyReq(req.body, req.query, req.body.data);
    if (!nama_produk || !harga) {
      return res.status(404).json({ status: 'failed', data: `Format tidak sesuai!`, format: FormatInputProduk });
    }

    let updateProduk = { nama_produk: nama_produk.toLowerCase(), harga, kategori_id, status_id };
    return await ProdukModel.findByIdAndUpdate(id, updateProduk)
      .then((result) => res.status(200).json({ status: 'success', data: `Berhasil memperbaharui data produk.` }))
      .catch((err) => res.status(500).json({ status: 'failed', data: `Gagal memperbaharui data produk. Function Catch: ${err}` }));
  } catch (err) {
    return res.status(500).json({ status: 'failed', data: `Gagal memperbaharui data produk. Function Catch: ${err}` });
  }
};

const DeleteProdukData = async (req, res) => {
  try {
    const { id } = req.params;
    const isDocumentHasInDatabase = await ProdukModel.findById(id);
    if (!isDocumentHasInDatabase) {
      return res.status(404).json({ status: 'success', data: `Tidak ada data produk.` });
    }
    return await ProdukModel.findByIdAndRemove(id)
      .then((result) =>
        res.render('produk', { isDetails: false, isCreateDocument: false, isDeleteDocument: true, data: 'Berhasil menghapus data produk.' })
      )
      .catch((err) =>
        res.render('produk', {
          isDetails: false,
          isCreateDocument: false,
          isDeleteDocument: true,
          data: `Gagal menghapus data produk. Catch: ${err}`,
        })
      );
  } catch (err) {
    return res.status(500).json({ status: 'failed', data: `Gagal menghapus data produk. Function Catch: ${err}` });
  }
};

module.exports = {
  CreateProdukData,
  GetProdukData,
  GetProdukDetails,
  UpdateProdukData,
  DeleteProdukData,
};
