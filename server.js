const express=require('express')
const mongoose=require('mongoose')
const app=express()
app.use(express.json())
const port=5000

mongoose.connect('mongodb://localhost:27017/feb2020')
.then(()=>{
    console.log('connected to db')
})
.catch((err)=>{
    console.log('error connecting to db',err)
})

const Schema=mongoose.Schema
const taskSchema=new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    number:{
        type:Number
    },
    experience:{
        type:String
    },
    company:{
        type:String
    },
    duration:{
        type:String
    },
    
})
const Task=mongoose.model('Task',taskSchema)

app.get('/',(req,res)=>{
    res.send('welcome to the website')
})
app.get('/api/tasks',(req,res)=>{
    Task.find()
    .then((tasks)=>{
        res.json(tasks)
    })
    .catch((err)=>{
        res.json(err)
    })
})

app.post('/api/tasks',(req,res)=>{
    const body=req.body
    const task =new Task(body)
    task.save()
    .then((task)=>{
        res.json(task)
    })
    .catch((err)=>{
        res.json(err)
    })
})
app.delete('/api/tasks/:id',(req,res)=>{
    const id=req.params.id
    Task.findByIdAndDelete(id)
    .then((task)=>{
        res.json(task)
    })
    .catch((err)=>{
        res.json(err)
    })
})
app.listen(port,()=>{
    console.log('server is running on port',port)
})