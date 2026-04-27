const mongoose =require('mongoose');


const todoSchema = new mongoose.Schema({
    task:String,
    createdAt:{
        type:Date,
        default:Date.now,
    },
    dueTime:{
        type:Date,
        required:true
    }
}) 

const todoModel = mongoose.model("todo",todoSchema);


module.exports = todoModel;