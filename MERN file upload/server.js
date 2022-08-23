const express = require('express');
const assert = require('assert');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const db = require('./db');

const PORT = process.env.PORT || Number(5000);

const app = express();

app.use(cors())
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/uploads', express.static('uploads'));

mongoose.Promise = global.Promise
mongoose.connect(db.prod_url, { useNewUrlParser: true }, (err, resp) => {
    if (err) assert.deepStrictEqual(err, null)
    console.log('mongodb connected successfully');
});

app.use(`/api/v1/auth/`, require('./route/userRoute'))
app.use(`/api/v1/files/`, require('./route/fileRoute'))

app.listen(PORT, () => {
    console.log(`server is up and running @ http://localhost:${PORT}`);
})