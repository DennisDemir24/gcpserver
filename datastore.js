const { Datastore } = require('@google-cloud/datastore')

const projectID = 'optimum-entity-332914'

module.exports.Datastore = Datastore
module.exports.datastore = new Datastore({ projectID: projectID })
module.exports.fromDatastore = function fromDatastore(item) {
    item.id = item[Datastore.KEY].id
    return item
}
