const express = require ('express');
const app = express();
const path = require('path');
const PORT = 8080 || process.env.PORT
const mongoose = require('mongoose');
require('dotenv').config();
const workout = require('./models/workout')
// const uri = process.env.ATLAS_URI

mongoose.connect("mongodb://localhost:27017/dbuser", {useNewUrlParser: true, useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongodb connected succesfully');
})
app.set('views', path.join(__dirname, "views"))
app.set("view engine", "ejs");

app.get("/", async (req,res) => {
    const workouts = await workout.find({})
    console.log(workouts)
    res.render("home", {workouts})
})

app.listen(PORT, (req, res) => {
    console.log(`server is running in ${PORT}`)
})






