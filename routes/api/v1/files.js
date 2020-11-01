const {
    Router
} = require('express');
const auth = require('../../../middlewares/auth');
const UploadedFile = require('../../../models/UploadedFile');
const router = Router();

router.get('/', auth, async (req, res) => {
    try {
        const files = await UploadedFile.find().limit(20);
        res.status(200).json(files);
    }catch(e) {
        res.status(400).json({
            msg: e.message,
            success: false
        });
    }
})

module.exports = router;
