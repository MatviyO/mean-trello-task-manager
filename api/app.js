const express = require('express');
const app = express();
const mongoose = require('./db/mongoose')
const bodyParser = require('body-parser')
const { List, Task} = require('./db/models/index')

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT,PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
    next();
})

app.get('/lists', (req,res) => {
    List.find({}).then(lists => {
        res.send(lists)
    })
})
app.post('/lists', (req,res) => {
    let title = req.body.title;

    let newList = new List({
        title
    })
    newList.save().then( listdoc => {
        res.send(listdoc)
    })
})
app.patch('/lists:id', (req, res) => {
    List.findOneAndUpdate({ _id: req.params.id}, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })
})
app.delete('/lists:id', (req, res) => {
    List.findOneAndDelete({_id: req.params.id}, {
        $set: req.body
    }).then((removedoc) => {
        res.send(removedoc);
    })
})

app.get('/lists/:listId/tasks', (req,res) => {
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks)
    })
})
app.get('/lits/:listId/tasks/:taskId', (req, res) => {
    Task.find({
        _listId: req.params.listId,
        _id: req.params.taskId
    }).then((task) => {
        res.send(task)
    })
})
app.post('/lists/:listId/tasks', (req, res) => {
    let newTask = new Task({
        _listId: req.params.listId,
        title: req.body.title
    });
    newTask.save().then( newtaskdoc => {
        res.send(newtaskdoc)
    })
})
app.patch('/lists/:listId/tasks/:taskId', (req,res) => {
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        res.send({message: 'Updated successful'})
    })
})
app.delete('/lists/:id/tasks/:taskId', (req,res) => {
    Task.findOneAndDelete({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removetask)=> {
        res.send(removetask);
    })
})

app.use('/users', (req, res) => {

    let body = req.body;
    let newUrl =


})

try {
    app.listen(3000, () => {
        console.log(`Server has been started on port 3000`)
    })
} catch (e) {
    console.log(e)
}
