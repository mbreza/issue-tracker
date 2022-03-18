import express from 'express';

const app = express()

app.get('/', function (req, res) {
    res.send('I will be a backend for issue tracker.')
})

app.listen(3000)