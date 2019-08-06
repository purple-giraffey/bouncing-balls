const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const https = require('https');

app.use(express.static(path.join(__dirname)));
app.use(express.static(__dirname + '/static', { dotfiles: 'allow' }));
app.use("/styles", express.static(__dirname));
app.use("/scripts", express.static(__dirname + '/scripts'));
app.use('/favicon.ico', express.static('images/favicon.ico'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/bouncingBalls.html'));
});

https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/purplegiraffe.dev/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/purplegiraffe.dev/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/purplegiraffe.dev/chain.pem')
}, app).listen(443, () => {
  console.log('Listening...')
});

//app.listen(process.env.PORT || 80);
