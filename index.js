// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date(\\d+)", function (req, res) {
  const date = req.params.date;

  const formattedDate = new Date(parseInt(date))
  if (formattedDate.toString() === 'Invalid Date') {
    return res.json({ error : "Invalid Date" })
  }
    
  return res.json({ 
    unix: formattedDate.getTime(),
    utc: formattedDate.toUTCString()
  })
  
});

app.get("/api/:date?", function (req, res) {
  const date = req.params.date;
  if (date === undefined) {
    return res.json({
      unix: Date.now(),
      utc: new Date(Date.now()).toUTCString()
    })
  }
    
  const formattedDate = new Date(date)
  if (formattedDate.toString() === 'Invalid Date') {
    return res.json({ error : "Invalid Date" })
  }
    
  return res.json({ 
    unix: formattedDate.getTime(),
    utc: formattedDate.toUTCString()
  })
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
