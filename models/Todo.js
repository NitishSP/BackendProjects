const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
    },
    priority: {
        type: String, 
        enum: ['high', 'medium', 'low'],
        default: 'medium',
    },
    dueDate: {
        type: Date,
    }
});

module.exports = new mongoose.model("Todo", TodoSchema);