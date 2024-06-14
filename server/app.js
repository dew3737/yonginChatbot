const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const configfile = require('../.config/config.json');
const runmode = configfile.runmode;
const config = configfile[runmode];
const indexRouter = require('./routes/index');
const port = config.EXPRESS_PORT;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use('/chat/ibricks', express.static(path.resolve(__dirname, '../build')));
app.use('/chat/ibricks', express.static(path.resolve(__dirname, '../public')));
app.use('/chat', indexRouter);
// app.get('/*', function (req, res) {
//   res.redirect('/chat');
// });
app.listen(port, function () {
  console.log(`listening on port ${port}!`);
});
