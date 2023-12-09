/** @format */

const { CreateStatusData, GetStatusData, GetStatusDetails, UpdateStatusData, DeleteStatusData } = require('../functions/status.function');
const { CheckingTokenAuthorization } = require('../middleware/auth');

const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/status', async (req, res) => {
  try {
    await CreateStatusData(req, res);
  } catch (err) {
    res.status(500).json({ status: 'failed', message: `Endpoint error: ${err}` });
  }
});

router.get('/status', async (req, res) => {
  try {
    await GetStatusData(req, res);
  } catch (err) {
    res.render('produk', { messages: JSON.stringify({ status: 'failed', message: `Function catch error: ${err}` }) });
    // res.status(500).json({ status: 'failed', message: `Endpoint error: ${err}` });
  }
});

router.get('/status/:id', async (req, res) => {
  try {
    await GetStatusDetails(req, res);
  } catch (err) {
    res.render('produk', { messages: JSON.stringify({ status: 'failed', message: `Function catch error: ${err}` }) });
    // res.status(500).json({ status: 'failed', message: `Endpoint error: ${err}` });
  }
});

// router.put('/status/:id', async (req, res) => {
router.post('/status/edit/:id', async (req, res) => {
  try {
    await UpdateStatusData(req, res);
  } catch (err) {
    res.status(500).json({ status: 'failed', message: `Endpoint error: ${err}` });
  }
});

// router.delete('/status/:id', async (req, res) => {
router.post('/status/delete/:id', async (req, res) => {
  try {
    await DeleteStatusData(req, res);
  } catch (err) {
    res.status(500).json({ status: 'failed', message: `Endpoint error: ${err}` });
  }
});

module.exports = router;
