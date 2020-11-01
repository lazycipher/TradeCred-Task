const {
    Schema,
    model
} = require('mongoose');

const InvalidInvoiceSchema = new Schema({
    invoiceNumber: {
        type: Number,
    },
    documentNumber: {
        type: Number,

    },
    type: {
        type: String,
    },
    netDueDt: {
        type: Date,
    },
    docDate: {
        type: Date,
    },
    pstngDate: {
        type: Date,
    },
    amtInLocCur: {
        type: Number,
    },
    vendorCode: {
        type: String,
        ref: 'Vendor'
    },
    createdBy: {
        type: String,
        ref: 'User'
    },
    reason: {
        type: String
    },
    InsertedByFile: {
        type: String,
        ref: 'UploadedFile'
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

const InvalidInvoice = model('invalidinvoice', InvalidInvoiceSchema);

module.exports = InvalidInvoice;
