const express = require('express')
const app = express()
const cors = require('cors')
const ds = require('./datastore')
const datastore = ds.datastore

app.use(cors())

const CUSTOMERS = 'customers'

// Get name and id of all customers
app.get('/getCustomers', (req, res) => {
  const query = datastore.createQuery(CUSTOMERS)
  datastore
    .runQuery(query)
    .then((results) => {
      const customers = results[0]
      const customerNames = customers.map((customer) => {
        return {
          name: customer.name,
          id: customer[datastore.KEY].id,
        }
      })
      res.send(customerNames)
    })
    .catch((err) => {
      console.error('ERROR:', err)
      res.status(500).send(err)
    })
})


// Get customer by id
app.get('/getCustomer/:id', (req, res) => {
  const customerId = req.params.id
  const key = datastore.key([CUSTOMERS, parseInt(customerId, 10)])
  datastore
    .get(key)
    .then((results) => {
      res.send(results)
    })
    .catch((err) => {
      console.error('ERROR:', err)
      res.status(500).send(err)
    })
})


// Get customer by name
/* app.get('/getCustomer/:name', (req, res) => {
  const name = req.params.name
  const query = datastore.createQuery(CUSTOMERS).filter('name', '=', name)
  datastore
    .runQuery(query)
    .then((results) => {
      const customers = results[0]
      console.log(customers)
      res.send(customers)
    })
    .catch((err) => {
      console.error('ERROR:', err)
      res.status(500).send(err)
    })
}) */

/* // Get customer name and id
app.get('/getCustomers', (req, res) => {
  const query = datastore.createQuery(CUSTOMERS).select('name')
  datastore
    .runQuery(query)
    .then((results) => {
      const customers = results[0]
      res.send(customers)
    })
    .catch((err) => {
      console.error('ERROR:', err)
      res.status(500).send(err)
    })
}) */

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})
