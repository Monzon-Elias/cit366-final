const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxAssignmentId: {type: Number, require: true }
});

module.exports = mongoose.model('Sequence', sequenceSchema);