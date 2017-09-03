let express = require('express')
let bodyParser = require('body-parser')
let request = require('request')
let app = express()

// line set token
// https://developers.line.me/ba/u5444a2c11d095606c34b25850f01abcd/bot
const CHANNEL_ACCESS_TOKEN = 'nkpOP80vHRG71KkIg6GLGXLuJJpp23mBTy0sMKQpMgZR5v7eEGgtutHvrVcZfu87n41n+Dfuy/cLf5H3YiGUjVT6OXcruDE1vWHmOOW3ij+6skACq2yzYyKaBTzZ/sgU27bhec1ml2Wlj4zLamtxkQdB04t89/1O/w1cDnyilFU='
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`)
})

// handler receiving messages
app.post('/', function (req, res) {
})

// generic function sending messages
function sendMessage(replyToken, text) {
    let body = {
        replyToken,
        messages: [{
            type: 'text',
            text,
        }],
    };

    let options = {
        url: 'https://api.line.me/v2/bot/message/reply',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,
        },
        body,
        json: true,
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        }
        else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    })
}
