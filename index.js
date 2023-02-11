// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// whoami endpoint
app.get("/api/whoami/", (req, res) => res.json({
  ipaddress: req.ip,
  language: req.headers["accept-language"],
  software: req.headers["user-agent"]
})
);

// date endpoint
app.get("/api/:date?", (req, res) =>
  res.json(dateResponseFormatter(req.params.date))
);

const dateResponseFormatter = (string) => {
  let date = parser(string)
  return date.toUTCString() === "Invalid Date" ? {
    error: date.toUTCString()
  } : {
    unix: date.getTime(),
    utc: date.toUTCString()
  }
}

const parser = (string) => {
  return !string ? new Date() : string.match(/^\d+$/) ? new Date(parseInt(string)) : new Date(string);
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
