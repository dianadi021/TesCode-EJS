/** @format */

const { CreateProdukData, GetProdukData, GetProdukDetails, UpdateProdukData, DeleteProdukData } = require('../functions/produk.function');
const { CheckingTokenAuthorization } = require('../middleware/auth');

const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/produk', async (req, res) => {
  try {
    await CreateProdukData(req, res);
  } catch (err) {
    res.status(500).json({ status: 'failed', message: `Endpoint error: ${err}` });
  }
});

router.get('/produk', async (req, res) => {
  try {
    await GetProdukData(req, res);
  } catch (err) {
    res.render('produk', { messages: JSON.stringify({ status: 'failed', message: `Function catch error: ${err}` }) });
    // res.status(500).json({ status: 'failed', message: `Endpoint error: ${err}` });
  }
});

router.get('/produk/:id', async (req, res) => {
  try {
    await GetProdukDetails(req, res);
  } catch (err) {
    res.render('produk', { messages: JSON.stringify({ status: 'failed', message: `Function catch error: ${err}` }) });
    // res.status(500).json({ status: 'failed', message: `Endpoint error: ${err}` });
  }
});

// router.put('/produk/:id', async (req, res) => {
router.post('/produk/edit/:id', async (req, res) => {
  try {
    await UpdateProdukData(req, res);
  } catch (err) {
    res.status(500).json({ status: 'failed', message: `Endpoint error: ${err}` });
  }
});

// router.delete('/produk/:id', async (req, res) => {
router.post('/produk/delete/:id', async (req, res) => {
  try {
    await DeleteProdukData(req, res);
  } catch (err) {
    res.status(500).json({ status: 'failed', message: `Endpoint error: ${err}` });
  }
});

module.exports = router;
