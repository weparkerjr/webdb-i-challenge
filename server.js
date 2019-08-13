const express = require('express');

const knex = require('knex');
const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

// POST ACCOUNT
server.post("/api/accounts", (req, res) => {

    // get information
  const account = req.body;
 
    // db actions
  db('accounts')
  .insert(account, 'id')

  // response back to client
  .then(posted => {
    const response = posted[0];
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(500).json(error)
  })
})

// GET ACCOUNTS
server.get("/api/accounts", (req, res) => {

    // db actions
  db('accounts')
  .select()

// response back to client
  .then(accounts => {
    res.status(200).json(accounts);
  })
  .catch(error => {
    res.status(500).json(error)
  })
})

// UPDATE ACCOUNT BY ID
server.put("/api/accounts/:id", (req, res) => {

    // get information
  const updateAccount = req.body;
  const id = req.params.id;

  // db actions
  db('accounts')
  .where({id})
  .update(updateAccount)

  // response back to client
  .then(count => {
    if(count > 0){
       res.status(200).json({ message: `${count} account(s) updated`})
    } else {
      res.status(404).json({ message: 'not found' });
    }
  })
  .catch(error => res.status(500).json(error));
})

// DELETE ACCOUNT BY ID
server.delete('/api/accounts/:id', (req, res) => {

    // get information
  const id = req.params.id;

    // db actions
db('accounts')
.where({id})
.del()

// response back to client
.then(count => {
  if(count > 0){
    res.status(200).json({ message: `${count} account(s) deleted`})
 } else {
   res.status(404).json({ message: 'not found' });
 }
})
.catch(error => {
  res.status(500).json(error);
})
})


module.exports = server;  