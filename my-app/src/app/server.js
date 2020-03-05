const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongo = require('mongoose');

const db = mongo.connect('mongodb://localhost:27017/elovskyTEST', { useUnifiedTopology: true, useNewUrlParser: true },)
.then((response) => console.log(`Connected to ${db} + ${response}`))
.catch(err => console.log(`DB Connection Error: ${err.message}`)
);

const app = express();
app.use(bodyParser.json({ limit:'5mb' }));
app.use(bodyParser.urlencoded({ extended:true }));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
});

const Schema = mongo.Schema;

const UsersSchema = new Schema({
  name: { type: String },
  address: { type: String },
}, { versionKey: false });

const model = mongo.model('users', UsersSchema, 'users');

app.post('/api/SaveUser', function(req, res) {
  const mod = new model(req.body);
  if (req.body.mode === 'Save') {
    mod.save(function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send({ data: 'Record has been inserted!'});
      }
    });
  } else {
    model.findByIdAndUpdate(req.body.id, { name: req.body.name, address: req.body.address },
      function(err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send({ data: 'Record has been updated!'});
        }
      }
    );
  }
})

app.post('/api/deleteUser', function(req, res) {
  model.remove({ _id: req.body.id }, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.send({ data: 'Record has been deleted' });
    }
  });
})

app.get('api/getUser', function(req, res) {
  model.find({}, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
})

app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
})