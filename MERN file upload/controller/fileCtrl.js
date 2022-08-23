const File = require('../model/fileModel')
const fs = require('fs');

const fileCtrl = {
    index: async (req, res) => {
        try {
            let id = req.user.id;

            let files = await File.find({ userId: id })
            res.json({
                length: files.length,
                data: files
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    fileUpload: async (req, res) => {
        try {
            // res.json({ msg: "file upload called"})
            let id = req.user.id;


            // to avoid duplicates
            let extFile = await File.findOne({ originalname: req.file.originalname })
            if (extFile) {
                    fs.unlinkSync(req.file.path)
                    res.status(400).json({ msg: "file already exists"})
            }


            let newFile = new File({
                fieldname: req.file.fieldname,
                originalname: req.file.originalname,
                encoding: req.file.encoding,
                mimetype: req.file.mimetype,
                destination: req.file.destination,
                filename: req.file.filename,
                path: req.file.path,
                size: req.file.size,
                userId: id
            });

            await newFile.save();

            res.json({ msg : "file uploaded successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    fileDelete: async (req, res) => {
        try {
            let id = req.params.id;

            let extData = await File.findById({ _id: id })

            fs.unlinkSync(extData.path)

            await File.findByIdAndDelete({ _id: id })

            res.status(200).json({ msg: "File deleted successfully" })

        } catch (err) {
            return res.status(500).json({msg: err.message })
        }
    }
}

module.exports = fileCtrl