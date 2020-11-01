const {
    Schema,
    model,
    Types
} = require('mongoose');

const InvoiceSchema = new Schema({
    invoiceNumber: {
        type: Number,
        required: true,
    },
    documentNumber: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    netDueDt: {
        type: Date,
        required: true
    },
    docDate: {
        type: Date,
    },
    pstngDate: {
        type: Date,
        required: true
    },
    amtInLocCur: {
        type: Number,
        required: true
    },
    vendorCode: {
        type: String,
        required: true,
    },
    vendorName: {
        type: String,
        required: true,
    },
    vendorType: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
        ref: 'User'
    },
    insertedByFile: {
        type: String,
        ref: 'UploadedFile'
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

const Invoice = model('invoice', InvoiceSchema);

module.exports = Invoice;
