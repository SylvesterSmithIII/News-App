const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
// Always require and config near the top
require('dotenv').config();
// Connect to db
require('./config/database')

const app = express();
const port = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/checkToken'));

app.use('/api/users', require('./routes/api/users'))
app.use('/api/scraper', require('./routes/api/scraper'))

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
	
app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
});