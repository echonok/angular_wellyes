const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongo = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

mongo.connect('mongodb://localhost:27017/elovskyTEST', { useUnifiedTopology: true, useNewUrlParser: true });

mongo.connection.on('connected', () => {
  console.log('connected!!!');
});

mongo.connection.on('error', (error) => {
  console.log('error!!!', error);
});

const UserSchema = mongo.Schema({
  name: {type: String}
});

const model = mongo.model('users', UserSchema);

app.get('/', (req, res) => {
  res.send('it works!');
});

app.get('/getUsers', (req, res) => {
  console.log('start getting');
  model.find({}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log('data', data);
      res.send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});