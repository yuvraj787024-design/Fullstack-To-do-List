const express = require('express');
const app = express();
const connectDB = require('./db/db')
const todoModel = require('./models/post.models')
const cors =require('cors')


connectDB();
app.use(cors());
app.use(express.json());

//Routes

app.post('/add', async (req,res)=>{
    const data = req.body;
    await todoModel.create({
        task:data.task,
        dueTime:data.dueTime
    })
    res.status(201).json({
        message:"Task added successfully"
    })

})       


app.get('/fetch', async(req,res)=>{
    const todo = await todoModel.find();

    res.status(200).json({
        message:"Data Fetch SuccessFully",
        todo:todo
    })

})

app.delete('/delete/:id', async(req,res)=>{
    const id = req.params.id
    await todoModel.findOneAndDelete({
        _id:id
    })
    res.status(200).json({
        message:"Deleted Successfully"
    })
})

app.patch('/update/:id',  async(req,res)=>{
    const id = req.params.id
    const task = req.body.task
    const dueTime = req.body.dueTime
    await todoModel.findOneAndUpdate({_id:id},{
        task:task,
        dueTime:dueTime
    })
    res.status(200).json({
        message:"Task and Time Updated Successfully"
    })
})




module.exports = app;