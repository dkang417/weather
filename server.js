const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const port = process.env.PORT || 4200;
const app = express();


const sessionConfig = {
  saveUninitialized: true,
  secret: 'secretsecret',
  resave: false,
  name: 'session',
  rolling: true,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 360000,
  },
};

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, 'dist/weatherapp')))
  .use(cookieParser(';alkdfjladjfldsajfhsad'))
  .use(session(sessionConfig))
  .use('/api', require('./server/routes'))
  .use(require('./server/routes/catch-all.routes'));


app.listen(port, () => console.log(`Express server listening on port ${port}`));


