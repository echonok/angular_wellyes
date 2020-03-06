const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongo = require('mongoose');
const cors = require('cors');

//const db = mongo.connect('mongodb://localhost:27017/elovskyTEST', { useUnifiedTopology: true, useNewUrlParser: true },)
//.then((response) => console.log(`Connected to ${db} + ${response}`))
//.catch(err => console.log(`DB Connection Error: ${err.message}`)
//);

mongo.connect('mongodb://localhost:27017/elovskyTEST', { useUnifiedTopology: true, useNewUrlParser: true });

mongo.connection.on('connected', () => {
  console.log('connected!!!');
});

mongo.connection.on('error', (error) => {
  console.log('error!!!', error);
});

const app = express();
const port = 3000;

app.use(bodyParser.json());
//app.use(bodyParser.json({ limit: '5mb' }));
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
});

const UserSchema = mongo.Schema({
  name: {type: String}
});

const model = mongo.model('users', UserSchema);

app.post('/api/saveUser', (req, res) => {
  const mod = new model(req.body);
  if (req.body.mode === 'Save') {
    mod.save((err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ data: 'Record has been inserted!'});
      }
    });
  } else {
    model.findByIdAndUpdate(req.body.id, { name: req.body.name, address: req.body.address },
      (err, data) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ data: 'Record has been updated!'});
        }
      }
    );
  }
});

app.post('/api/deleteUser', (req, res) => {
  model.remove({ _id: req.body.id }, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ data: 'Record has been deleted' });
    }
  });
});

app.get('/api/getUser', (req, res) => {
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

app.get('/', (req, res) => {
  res.send('it works!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});