const express = require('express')
const bodyParser = require('body-parser')
const db = require('./fn/db')
const admin = require('firebase-admin')
const serviceAccount = require('./muzic-256103-firebase-adminsdk-v2ivf-1d6a994bf4.json')

const getTokens = () => {
    var sql = `SELECT token FROM UserToken`
    return db.load(sql)
}

const saveToken = (token) => {
    var sql = `INSERT INTO UserToken(token) VALUES ('${token}')`
    return db.save(sql)
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://muzic-256103.firebaseio.com"
});

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/notification', (req, res) => {
    getTokens().then((pRow) => {
        var registrationTokens = []
        JSON.parse(JSON.stringify(pRow)).forEach(element => {
            registrationTokens.push(element.token)
        })
        var message = {
            notification: {
                title: req.body.title,
                body: req.body.message
            },
            data: {
                videos: JSON.stringify(req.body.data)
            },
            tokens: registrationTokens
        }
        admin.messaging().sendMulticast(message)
            .then((response) => {
                res.json(response)
            })
            .catch((error) => {
                res.json(error)
            })
    })
})

app.post('/token', (req, res) => {
    if (req.body.token != undefined) {
        saveToken(req.body.token)
        res.json({
            msg: req.body.token
        })
    } else {
        res.json({
            msg: "Error"
        })
    }
})

app.listen(process.env.PORT || 10000)