/** @format */

const {
  CreateKategoriData,
  GetKategoriData,
  GetKategoriDetails,
  UpdateKategoriData,
  DeleteKategoriData,
} = require('../functions/kategori.function');
const { CheckingTokenAuthorization } = require('../middleware/auth');

const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/kategori', async (req, res) => {
  try {
    await CreateKategoriData(req, res);
  } catch (err) {
    res.status(500).json({ status: 'failed', message: `Endpoint error: ${err}` });
  }
});

router.get('/kategori', async (req, res) => {
  try {
    await GetKategoriData(req, res);
  } catch (err) {
    res.render('produk', { messages: JSON.stringify({ status: 'failed', message: `Function catch error: ${err}` }) });
    // res.status(500).json({ status: 'failed', message: `Endpoint error: ${err}` });
  }
});

router.get('/kategori/:id', async (req, res) => {
  try {
    await GetKategoriDetails(req, res);
  } catch (err) {
    res.render('produk', { messages: JSON.stringify({ status: 'failed', message: `Function catch error: ${err}` }) });
    // res.status(500).json({ status: 'failed', message: `Endpoint error: ${err}` });
  }
});

// router.put('/kategori/:id', async (req, res) => {
router.post('/kategori/edit/:id', async (req, res) => {
  try {
    await UpdateKategoriData(req, res);
  } catch (err) {
    res.status(500).json({ status: 'failed', message: `Endpoint error: ${err}` });
  }
});

// router.delete('/kategori/:id', async (req, res) => {
router.post('/kategori/delete/:id', async (req, res) => {
  try {
    await DeleteKategoriData(req, res);
  } catch (err) {
    res.status(500).json({ status: 'failed', message: `Endpoint error: ${err}` });
  }
});

module.exports = router;
