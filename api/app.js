const express = require('express');
const app = express();

app.get('/lists', (req,res) => {
    res.send('hay')
})
app.post('/lists', (req,res) => {
    res.send('hay')
})
app.patch('/lists:id', (req, res) => {

})
app.delete('/lists:id', (req, res) => {

})


try {
    app.listen(3000, () => {
        console.log(`Server has been started on port 3000`)
    })
} catch (e) {
    console.log(e)
}
