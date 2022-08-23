const multer = require('multer');
const path = require('path');

/* file storage and rename settings */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // cb(null, file.originalname)
        cb(null, `doc-${new Date().getTime().toString()}${path.extname(file.originalname)}`)
    }
});

/* file upload and control logic */
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },

}).single('myfile');


module.exports = upload