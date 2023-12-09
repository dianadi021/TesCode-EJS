/** @format */

const { mongoose, StatusModel, FormatInputStatus } = require('../models/status.model');
const { CheckingKeyReq, CheckingKeyReqSyntax, CheckingIsNilValue, CheckingObjectValue } = require('../utils/utils');

const CreateStatusData = async (req, res) => {
  try {
    const { nama_status } = req.body.data ? JSON.parse(req.body.data) : req.body;
    if (!nama_status) {
      res.render('list', { section: 'status', data: `Format tidak sesuai! format: ${FormatInputStatus}` });
      // return res.status(404).json({ status: 'failed', data: `Format tidak sesuai!`, format: FormatInputStatus });
    }
    const newStatus = StatusModel({ nama_status: nama_status.toLowerCase() });
    return await newStatus
      .save()
      .then((result) => res.render('list', { section: 'status', data: 'Berhasil membuat data status.' }))
      .catch((err) => res.render('list', { section: 'status', data: `Gagal membuat data status. Catch: ${err}` }));
  } catch (err) {
    res.render('list', { section: 'status', data: `Gagal membuat data status. Function Catch: ${err}` });
    // return res.status(500).json({ status: 'failed', data: `Gagal membuat data status. Function Catch: ${err}` });
  }
};

const GetStatusData = async (req, res) => {
  try {
    const syntaxExec = ['nama_status'];
    const { nama_status, page, document } = CheckingKeyReq(req.body, req.query, req.body.data);
    const isHasSyntax = CheckingKeyReqSyntax(syntaxExec, req.body, req.query, req.body.data);
    if (!isHasSyntax && Object.keys(CheckingKeyReq(req.body, req.query, req.body.data)).length >= 1) {
      res.render('list', { section: 'status', data: 'Query tidak benar atau tidak terdaftar!' });
    }
    if (isHasSyntax && nama_status) {
      let toFilter = nama_status ? { nama_status: nama_status.toLowerCase() } : false;
      const isDocumentHasInDatabase = await StatusModel.aggregate([{ $project: { _id: 1, nama_status: 1 } }, { $match: toFilter }]);
      if (isDocumentHasInDatabase.length < 1) {
        res.render('list', { section: 'status', data: 'tidak ada data yang tersimpan' });
      }
      res.render('list', { section: 'status', data: isDocumentHasInDatabase });
    }

    const isDocumentHasInDatabase =
      !page && !document
        ? await StatusModel.aggregate([{ $project: { _id: 1, nama_status: 1 } }])
        : await StatusModel.aggregate([
            { $project: { _id: 1, nama_status: 1 } },
            { $skip: (parseInt(page) - 1) * parseInt(document) },
            { $limit: parseInt(document) },
          ]);
    if (isDocumentHasInDatabase.length > 0) {
      res.render('list', { section: 'status', data: isDocumentHasInDatabase });
    } else {
      res.render('list', { section: 'status', data: 'tidak ada data yang tersimpan' });
    }
  } catch (err) {
    res.render('list', { messages: JSON.stringify({ status: 'failed', data: `Function catch error: ${err}` }) });
  }
};

const GetStatusDetails = async (req, res) => {
  try {
    let { id } = req.params;
    let isDocumentHasInDatabase = await StatusModel.findById(id);
    if (isDocumentHasInDatabase) {
      res.render('list', { section: 'status', data: isDocumentHasInDatabase });
      // return res.status(200).json({ status: 'success', data: isDocumentHasInDatabase });
    } else {
      res.render('list', { section: 'status', data: `Tidak ada data status.` });
      // return res.status(404).json({ status: 'success', data: `Tidak ada data status.` });
    }
  } catch (err) {
    res.render('list', { section: 'status', data: `Gagal mengambil data status. Function Catch: ${err}` });
    // return res.status(500).json({ status: 'failed', data: `Gagal mengambil data status. Function Catch: ${err}` });
  }
};

const UpdateStatusData = async (req, res) => {
  try {
    const { id } = req.params;
    const isDocumentHasInDatabase = await StatusModel.findById(id);
    if (!isDocumentHasInDatabase) {
      res.render('list', { section: 'status', data: `Tidak ada data status.` });
      // return res.status(404).json({ status: 'success', data: `Tidak ada data status.` });
    }
    const { nama_status } = CheckingKeyReq(req.body, req.query, req.body.data);
    if (!nama_status) {
      res.render('list', { section: 'status', data: `Format tidak sesuai! format: ${FormatInputStatus}` });
      // return res.status(404).json({ status: 'failed', data: `Format tidak sesuai!`, format: FormatInputStatus });
    }

    let updateKategori = { nama_status: nama_status.toLowerCase() };
    return await StatusModel.findByIdAndUpdate(id, updateKategori)
      // .then((result) => res.status(200).json({ status: 'success', data: `Berhasil memperbaharui data status.` }))
      .then((result) => res.render('list', { section: 'status', data: `Berhasil memperbaharui data status.` }))
      .catch((result) => res.render('list', { section: 'status', data: `Gagal memperbaharui data status. Function Catch: ${err}` }));
    // .catch((err) => res.status(500).json({ status: 'failed', data: `Gagal memperbaharui data status. Function Catch: ${err}` }));
  } catch (err) {
    res.render('list', { section: 'status', data: `Gagal memperbaharui data status. Function Catch: ${err}` });
    // return res.status(500).json({ status: 'failed', data: `Gagal memperbaharui data status. Function Catch: ${err}` });
  }
};

const DeleteStatusData = async (req, res) => {
  try {
    const { id } = req.params;
    const isDocumentHasInDatabase = await StatusModel.findById(id);
    if (!isDocumentHasInDatabase) {
      // return res.status(404).json({ status: 'success', data: `Tidak ada data status.` });
      res.render('list', { section: 'status', data: `Tidak ada data status.` });
    }
    return await StatusModel.findByIdAndRemove(id)
      .then((result) => res.render('list', { section: 'status', data: 'Berhasil menghapus data status.' }))
      .catch((err) => res.render('list', { section: 'status', data: `Gagal menghapus data status. Catch: ${err}` }));
  } catch (err) {
    res.render('list', { section: 'status', data: `Gagal menghapus data status. Function Catch: ${err}` });
    // return res.status(500).json({ status: 'failed', data: `Gagal menghapus data status. Function Catch: ${err}` });
  }
};

module.exports = {
  CreateStatusData,
  GetStatusData,
  GetStatusDetails,
  UpdateStatusData,
  DeleteStatusData,
};
