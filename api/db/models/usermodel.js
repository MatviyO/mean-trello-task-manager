const mongoose = require('mongoose')
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const bcrypt = require('bcryptjs')


const jwtSecret =  "284758375894758837569";

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    sessions: [{
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Number,
            required: true
        }
    }]
})

UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    return _.omit(userObject, ['password', 'sessions'])
}
UserSchema.methods.generateAccessAuthToken = function () {
    const user = this;
    return new Promise((resolve, reject) => {
        jwt.sing({_id: user._id.toHexString()}, jwtSecret, {expiresIn: "15m"}, (err, token) => {
            if (!err) {
                resolve(token)
            } else {
                reject();
            }
        })
    })
}
UserSchema.methods.generateRefreshAuthToken = function () {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buff) => {
            if (!err) {
                let token = buff.toString('hex');
                return resolve(token);
            }
        })
    })
}
UserSchema.methods.createSession = function () {
    let user = this;
    return user.generateRefreshAuthToken().then((refreshToken) => {
        return saveSessionToDatabase(user, refreshToken)
    }).then( (refreshTok) => {
        return refreshTok;
    }).catch((e) => {
        return Promise.reject('Failed to save session to database', e);
    })
}
UserSchema.statics.findByIdAndToken = function(_id, token) {
    const User = this;

    return User.findOne({
        _id,
        'session.token': token
    })

}
UserSchema.statics.findByCredentials = function(email, password) {
    let User = this;
    return User.findOne({email}).then( user => {
        if (!user) return Promise.reject();

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err,res) => {
                if ( res) resolve(user);
            })
        })
    })

}

UserSchema.pre('save', function (next) {
    let user = this;
    let constFactor = 10;

    if(user.isModified('password')) {
        bcrypt.genSalt(constFactor, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }

})

let saveSessionToDatabase = (user, refreshToken) => {
    return new Promise((resolve, reject ) => {
        let expiresAt = generateRefreshTokenExpiryTime();
        user.sessions.push({'token': refreshToken, expiresAt});

        user.save().then(() => {
            return resolve(refreshToken);
        }).catch( (e) => {
            reject(e);
        })
    })
}

let generateRefreshTokenExpiryTime = () => {
    let daysUntilExpire = '10';
    let secondsUntilExpire = ((daysUntilExpire * 24) * 60) * 60;
    return ((Date.now() / 1000) + secondsUntilExpire);
}

const User = mongoose.model('User', UserSchema)

module.exports = {User}
