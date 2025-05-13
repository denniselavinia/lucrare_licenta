const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose');


//bciof7aGcBKY2fvb

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    app.use('/', (req, res) => {
        res.send('Welcome to my server!')
    })
}

main().then(() => console.log("Mondodb connect successfully!")).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
