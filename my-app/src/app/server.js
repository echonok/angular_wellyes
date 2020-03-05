const express = require('express');
const path = require('path');
const bodyParser = require('bodyParser');
const mongo = require('mongoose');

const db = mongo.connect('mongodb://localhost:27017/elovskyTEST', function(err, response){
  if (err) {
    confirm.log(err);
  } else {
    console.log(`Connected to ${db} + ${response}`);
  }
});

const app = express();
app.use(bodyParser());
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
