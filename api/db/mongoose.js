const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Trello', {useNewUrlParser: true}).then(() => {
    console.log('Connected to MongoDB')
}).catch((e) => {
    console.log('Error:', e)
})
mongoose.set('useCreateIndex' , true)
mongoose.set('useFindAndModify' , false)

module.exports = {
    mongoose
}
