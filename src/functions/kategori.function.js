/** @format */

const { mongoose, KategoriModel, FormatInputKategori } = require('../models/kategori.model');
const { CheckingKeyReq, CheckingKeyReqSyntax, CheckingIsNilValue, CheckingObjectValue } = require('../utils/utils');

const CreateKategoriData = async (req, res) => {
  try {
    const { nama_kategori } = req.body.data ? JSON.parse(req.body.data) : req.body;
    if (!nama_kategori) {
      return res.status(404).json({ status: 'failed', data: `Format tidak sesuai!`, format: FormatInputKategori });
    }
    const newKategori = KategoriModel({ nama_kategori: nama_kategori.toLowerCase() });
    return await newKategori
      .save()
      .then((result) => res.render('list', { section: 'kategori', data: 'Berhasil membuat data kategori.' }))
      .catch((err) => res.render('list', { section: 'kategori', data: `Gagal membuat data kategori. Catch: ${err}` }));
  } catch (err) {
    return res.status(500).json({ status: 'failed', data: `Gagal membuat data kategori. Function Catch: ${err}` });
  }
};

const GetKategoriData = async (req, res) => {
  try {
    const syntaxExec = ['nama_kategori'];
    const { nama_kategori, page, document } = CheckingKeyReq(req.body, req.query, req.body.data);
    const isHasSyntax = CheckingKeyReqSyntax(syntaxExec, req.body, req.query, req.body.data);
    if (!isHasSyntax && Object.keys(CheckingKeyReq(req.body, req.query, req.body.data)).length >= 1) {
      res.render('list', { section: 'kategori', data: 'Query tidak benar atau tidak terdaftar!' });
    }
    if (isHasSyntax && nama_kategori) {
      let toFilter = nama_kategori ? { nama_kategori: nama_kategori.toLowerCase() } : false;
      const isDocumentHasInDatabase = await KategoriModel.aggregate([
        { $project: { _id: 1, nama_kategori: 1, harga: 1 } },
        { $match: toFilter },
      ]);
      if (isDocumentHasInDatabase.length < 1) {
        res.render('list', { section: 'kategori', data: 'tidak ada data yang tersimpan' });
      }
      res.render('list', { section: 'kategori', data: isDocumentHasInDatabase });
    }

    const isDocumentHasInDatabase =
      !page && !document
        ? await KategoriModel.aggregate([{ $project: { _id: 1, nama_kategori: 1, harga: 1 } }])
        : await KategoriModel.aggregate([
            { $project: { _id: 1, nama_kategori: 1, harga: 1 } },
            { $skip: (parseInt(page) - 1) * parseInt(document) },
            { $limit: parseInt(document) },
          ]);
    if (isDocumentHasInDatabase.length > 0) {
      res.render('list', { section: 'kategori', data: isDocumentHasInDatabase });
    } else {
      res.render('list', { section: 'kategori', data: 'tidak ada data yang tersimpan' });
    }
  } catch (err) {
    res.render('list', { messages: JSON.stringify({ status: 'failed', data: `Function catch error: ${err}` }) });
  }
};

const GetKategoriDetails = async (req, res) => {
  try {
    let { id } = req.params;
    let isDocumentHasInDatabase = await KategoriModel.findById(id);
    if (isDocumentHasInDatabase) {
      res.render('list', { data: isDocumentHasInDatabase });
    } else {
      return res.status(404).json({ status: 'success', data: `Tidak ada data kategori.` });
    }
  } catch (err) {
    return res.status(500).json({ status: 'failed', data: `Gagal mengambil data kategori. Function Catch: ${err}` });
  }
};

const UpdateKategoriData = async (req, res) => {
  try {
    const { id } = req.params;
    const isDocumentHasInDatabase = await KategoriModel.findById(id);
    if (!isDocumentHasInDatabase) {
      return res.status(404).json({ status: 'success', data: `Tidak ada data kategori.` });
    }
    const { nama_kategori } = CheckingKeyReq(req.body, req.query, req.body.data);
    if (!nama_kategori) {
      return res.status(404).json({ status: 'failed', data: `Format tidak sesuai!`, format: FormatInputKategori });
    }

    let updateKategori = { nama_kategori: nama_kategori.toLowerCase() };
    return await KategoriModel.findByIdAndUpdate(id, updateKategori)
      .then((result) => res.status(200).json({ section: 'kategori', status: 'success', data: `Berhasil memperbaharui data kategori.` }))
      .catch((err) =>
        res.status(500).json({ section: 'kategori', status: 'failed', data: `Gagal memperbaharui data kategori. Function Catch: ${err}` })
      );
  } catch (err) {
    return res.status(500).json({ status: 'failed', data: `Gagal memperbaharui data kategori. Function Catch: ${err}` });
  }
};

const DeleteKategoriData = async (req, res) => {
  try {
    const { id } = req.params;
    const isDocumentHasInDatabase = await KategoriModel.findById(id);
    if (!isDocumentHasInDatabase) {
      return res.status(404).json({ status: 'success', data: `Tidak ada data kategori.` });
    }
    return await KategoriModel.findByIdAndRemove(id)
      .then((result) =>
        res.render('list', {
          data: 'Berhasil menghapus data kategori.',
        })
      )
      .catch((err) => res.render('list', { section: 'kategori', data: `Gagal menghapus data kategori. Catch: ${err}` }));
  } catch (err) {
    return res.status(500).json({ status: 'failed', data: `Gagal menghapus data kategori. Function Catch: ${err}` });
  }
};

module.exports = {
  CreateKategoriData,
  GetKategoriData,
  GetKategoriDetails,
  UpdateKategoriData,
  DeleteKategoriData,
};
