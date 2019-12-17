const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    course_name: {type: String, required: true},
    due_date: {type: String, required: true},
    done: {type: String, required: true},
    alive: {type: String, required: true},
    points: {type: String, required: true},
    desc: {type: String, required: true},
    personal_notes: {type: String, required: true}
});

module.exports = mongoose.model('Assignment', schema);