const {
    Router
} = require('express');
const auth = require('../../../middlewares/auth');
const User = require('../../../models/User');
const UploadedFile = require('../../../models/UploadedFile');
const router = Router();
const multer = require('multer');
const XLSX = require('xlsx')
const Invoice = require('../../../models/Invoice');
const Vendor = require('../../../models/Vendor');
const InvalidInvoice = require('../../../models/InvalidInvoice');
const {parseDate} = require('../../../utils/conversion')
var xlsx = require('node-xlsx');

var Storage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, './uploads');
    },
    filename: function (req, file, next) {
        next(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage,
    onFileUploadStart: function(file) {
        console.log("Inside uploads");
        if (file.mimetype == 'application/vnd.ms-excel' || file.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            return true;
        }
        else
        {
            return false;
        }
    }
});


router.post('/upload', auth, upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        let data = xlsx.parse(file.path, {cellDates: true})
        // let workbook = XLSX.readFile(file.path, {raw: true, dateNF: true, cellDates: true});
        // let data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        let dups = 0, invs = 0;
        let flag = Boolean(false)
        for( const d of  data[0].data){
            if (flag) {
                const existingInvoice = await Invoice.findOne({invoiceNumber: d[0], type: d[2]});
                const checkVendor = await Vendor.findOne({vendorCode: d[7]});

                if(checkVendor==null){ 
                    const newVendor = new Vendor({
                        vendorCode: d[7],
                        vendorName: d[8],
                        vendorType: d[9]
                    })
                    const saveVendor = await newVendor.save();
                    if(!saveVendor) throw Error("Something went wrong!")
                }
                if(existingInvoice==null){
                    const newInvoice = new Invoice({
                        invoiceNumber: d[0],
                        documentNumber: d[1],
                        type: d[2],
                        netDueDt: d[3],
                        docDate: d[4],
                        pstngDate: d[5],
                        amtInLocCur: d[6],
                        vendorCode: d[7],
                        vendorName: d[8],
                        vendorType: d[9],
                        createdBy: req.user.id,
                        insertedByFile: file.originalname
                    })
                    const saveInvoice = await newInvoice.save();
                    if (!saveInvoice) throw Error("Something went wrong!");
                }else {
                    let reason='';

                    if(d[5]>Date.now()){
                        reason = 'futureDated'
                    } else {
                        reason = 'duplicate'
                    }
                    const newInvalidInvoice = new InvalidInvoice({
                        invoiceNumber: d[0],
                        documentNumber: d[1],
                        type: d[2],
                        netDueDt: d[3],
                        docDate: d[4],
                        pstngDate: d[5],
                        amtInLocCur: d[6],
                        vendorCode: d[7],
                        vendorName: d[8],
                        vendorType: d[9],
                        createdBy: req.user.id,
                        insertedByFile: file.originalname,
                        reason: reason
                    })
                    const saveInvalidInvoice = await newInvalidInvoice.save();
                    if (!saveInvalidInvoice) throw Error("Something went wrong!");

                    dups++;
                }
            }
            flag = true;
        }
        let user = await User.findOne({
            _id: req.user.id
        }, {
            name: 1,
            username: 1,
            files: 1
        });

        const {
            name,
            username,
            _id,
            files
        } = user;
        
        const newFile = new UploadedFile({
            originalName: file.originalname,
            user: {
                id: _id,
                name: name,
                username: username
            },
            fileName: file.filename,
            mimeType: file.mimetype,
            path: file.path,
            size: file.size,
            rowsCount: data[0].data.length - 1,
            inserted: data[0].data.length - dups - invs -1,
            duplicatesCount: dups,
            otherInvalidCount: invs
        });

        const saveFile = await newFile.save();

        files.push(saveFile._id);
        const updateUser = await user.save();

        if (!saveFile || !updateUser) throw Error("Something went wrong!");

        res.status(201).send({
            msg: "File Uploaded",
            success: true,
            saveFile,
            rowsCount: data[0].data.length - 1,
            inserted: data[0].data.length - dups - invs - 1,
            duplicates: dups,
            invalid: invs
        });
    } catch (e) {
        res.status(400).json({
            msg: e.message,
            success: false
        });
    }

})

router.get('/list', auth, async (req, res) => {
    try {
        const limit = req.query.limit? parseInt(req.query.limit):20;
        const page = req.query.page? parseInt(req.query.page):1;
        const skip = (page-1)*limit;
        const invoices = await Invoice.find().sort({ date: -1});
        // const totalInvoices = await Invoice.find().countDocuments();

        res.status(200).json(invoices);
    }catch(e) {
        res.status(400).json({
            msg: e.message,
            success: false
        });
    }
})

router.get('/stats', auth, async (req, res) => {
    try {
        const invoiceCount = await Invoice.find().countDocuments();
        const filesCount = await UploadedFile.find().countDocuments();
        const vendorsCount = await Vendor.find().countDocuments();
        const invoiceSum = await Invoice.aggregate([
            {
                $group: {
                    _id: '', 
                    amtInLocCur: {$sum: '$amtInLocCur'}
                }
            }
        ]).exec();
        const invalidCount = await InvalidInvoice.find().countDocuments()
        res.status(200).json({
            invoiceCount,
            filesCount,
            vendorsCount,
            invoiceAmount: invoiceSum[0].amtInLocCur,
            invalidCount
        });
    }catch(e) {
        res.status(400).json({
            msg: e.message,
            success: false
        });
    }
})


router.get('/invalidlist', auth, async (req, res) => {
    try {
        const limit = req.query.limit? parseInt(req.query.limit):20;
        const page = req.query.page? parseInt(req.query.page):1;
        const skip = (page-1)*limit;
        const invoices = await InvalidInvoice.find();
        res.status(200).json(invoices);
    }catch(e) {
        res.status(400).json({
            msg: e.message,
            success: false
        });
    }
})


module.exports = router;
