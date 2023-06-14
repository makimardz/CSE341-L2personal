const { response } = require('express');
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

const createContact = async (req, res, next) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db('contactsDB').collection('contacts').insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some errror occured while creating the contact');
    }
};

const updateContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db('contactsDB')
    .collection('contacts')
    .updateOne({ _id: userId }, { $set: contact });
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some errror occured while updating the contact');
    }
};

const deleteContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('contactsDB')
    .collection('contacts')
    .deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some errror occured while deleting the contact');
    }
};

module.exports = { 
  getAll, 
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
