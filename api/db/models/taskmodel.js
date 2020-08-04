const mongoose = require('mongoose')
const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _listid: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

const Task = mongoose.Model('task', TaskSchema)

module.exports = {Task}
