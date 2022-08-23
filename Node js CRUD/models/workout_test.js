const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
    name: {type:string, required:true},
    duration: {type:string, required:true},
    mood: {type:string, required:true},
    exercise: {type:string, required:true}
})
const workout = mongoose.model('workout', workoutSchema)


module.exports = workout;
