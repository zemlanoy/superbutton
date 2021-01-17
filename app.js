const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const port = 8080


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '50mb'}))


app.get('/', (req, res) => {
    res.sendFile( path.join(__dirname, './public/index.html'));
})

app.post('/newmasseg',  (req, res) => {
    try {
        fs.readFile('db.json', (err, data) => {
            if (err) throw err;
            let json = JSON.parse(data);
            if(req.body.email && req.body.text) {
                json.push({
                    email: req.body.email,
                        text: req.body.text
                })
            }
            fs.writeFile("db.json", data, (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written...");
                    console.log(json);
                    res.sendStatus(200);
                }
            });

        });
    } catch (e) {
        console.log(e)
        res.sendStatus(200);
    }
})

app.listen(port, () => {
    console.log(`Сервер работает на порту:${port}`)
})
