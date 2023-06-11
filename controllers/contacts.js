const mongodb = require('../db/connection');
console.log(mongodb);
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db('contactsDB').collection('contacts').find();
  result.toArray().then((lists) => {
    console.log(lists); // Log the query results
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('contactsDB')
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    console.log(lists); // Log the query results
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

module.exports = { getAll, getSingle };
