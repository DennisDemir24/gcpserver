const express = require('express')
const app = express()
const ds = require('./datastore')
const datastore = ds.datastore

const CUSTOMERS = 'customers'


// Get customer name and id
app.get('/getCustomers', (req, res) => {
  const query = datastore
    .createQuery(CUSTOMERS)
    .select(['name'])
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
})


// Get customer by id
app.get('/getCustomer/:id', (req, res) => {
    let id = req.params.id
    const key = datastore.key([CUSTOMERS, parseInt(id, 10)])
    return datastore.get(key).then((results) => {
      const customer = results[0]
      if (!customer) {
        return res.status(404).send('Customer not found')
      }
      res.send(customer)
    })
    
})

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})
