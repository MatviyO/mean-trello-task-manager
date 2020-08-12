const express = require('express');
const app = express();
const mongoose = require('./db/mongoose')
const bodyParser = require('body-parser')
const { List, Task, User} = require('./db/models/index')

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT,PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
    next();
});
let verifySession = (req,res,next) => {
    let refreshToken = req.header('x-refresh-token');
    let _id  = req.header('_id');

    User.findByIdAndToken(_id, refreshToken ).then((user) => {
        if (!user) {
            return Promise.reject({
                'error': 'User no found'
            });
        }

        req.user._id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;
        let isSessionvailid = false
        user.sessions.forEach((session) => {
            if ( session.token === refreshToken) {
                if (User.hasRefreshTokenExpired(session.expiresAt) ===false) {
                    isSessionvailid = true
                }
            }
        });
        if ( isSessionvailid) {
            next();
        } else {
            return Promise.reject({
                'error': 'refresh token has expired or invalid'
            })
        }
    }).catch(e => {
        res.status(400).send(e)
    })
}


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

app.post('/users', (req, res) => {
    let body = req.body;
    let newUser = new User(body);

    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        return newUser.generateAccessAuthToken().then((accessToken) => {
            return { accessToken, refreshToken }
        });
    }).then((authTokens) => {
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
})


app.post('/users/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            return user.generateAccessAuthToken().then((accessToken) => {
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
});
app.get('/users/me/access-token' , verifySession , (req, res) => {
   req.userObject.generateAccessAuthToken().then((accessToken) => {
       res.header('x-access-token', accessToken).send({ accessToken})
   }).catch(e => {
       res.status(400).send(e)
   })
})

try {
    app.listen(3000, () => {
        console.log(`Server has been started on port 3000`)
    })
} catch (e) {
    console.log(e)
}
