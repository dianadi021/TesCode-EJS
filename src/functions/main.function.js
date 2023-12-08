/** @format */

const { GetFilteredDocument } = require('../utils/utils');

const GetDatas = async (req, res) => {
  try {
    res.render('index', { data:"success" });
  } catch (err) {
    res.render('index', { messages: JSON.stringify({ status: 'failed', message: `Function catch error: ${err}` }) });
  }
};

module.exports = {
  GetDatas,
};
