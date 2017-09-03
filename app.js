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
    // console.log(req.body);
    console.log(JSON.stringify(req.body, null, 3));

    let replyToken = req.body.events[0].replyToken;
    let text = req.body.events[0].message.text;
    if(text)
    {
        sendMessage(replyToken, text);
    }

    res.send(); // 有回應 line verify 才會驗證成功
})

// generic function sending messages
function sendMessage(replyToken, text) {
    let body = {
        replyToken, // 等同 replyToken : replyToken
        messages: [{ // 最多五段  , 每段最多160 字
            type: 'text',
            text, // 欄位跟值相同時 可以縮寫  text: text
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
