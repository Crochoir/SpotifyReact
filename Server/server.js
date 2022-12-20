const express = require("express");
const spotifyWebApi = require('spotify-web-api-node');
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser");


const CLIENT_ID = "eee6212ac836476a9ac3733fa623ecc4";
const CLIENT_SECRET = "4ecd2073a4294284874860b2e29205da";

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    console.log(refreshToken);
    const spotifyApi = new spotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken
    });

    spotifyApi.refreshAccessToken().then(
        function(data) {
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn,
            })
        }).catch(err => {
            console.log(err)
            res.sendStatus(400);
        })
})

app.post('/login', (req, res) => {
    const code = req.body.code;
    const spotifyApi = new spotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET
    });
    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            res.json({
             accessToken: data.body.access_token,
             refreshToken: data.body.refresh_token,
             expiresIn: data.body.expires_in
         })
    }).catch((err) => {
        res.sendStatus(400);
    })
})


app.listen(3001);

