var express = require('express');
var cors = require('cors');
require('dotenv').config()
var bodyParser = require('body-parser');
const upload = require('multer')();
var app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if(req.file != undefined) {
    const { originalname: name, mimetype: type, size } = req.file;
    res.json({name, type, size});
  }
  else {
    res.end('invalid file');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
