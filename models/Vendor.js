const { Schema, model } = require('mongoose');

const VendorSchema = new Schema({
  vendorCode: {
    type: String,
    required: true,
    unique: true
  },
  vendorName: {
    type: String,
    required: true,
    unique: true
  },
  vendorType: {
    type: String,
    required: true,
  }
});

const Vendor = model('vendor', VendorSchema);

module.exports = Vendor;
