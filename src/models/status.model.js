/** @format */

const mongoose = require('../apps/connect');

const StatusSchema = mongoose.Schema(
  {
    nama_status: { type: String, required: true },
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
const StatusModel = mongoose.model('Status', StatusSchema);

const FormatInputStatus = { nama_status: 'String' };

module.exports = { StatusModel, FormatInputStatus };
