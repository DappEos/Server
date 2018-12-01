const { AbstractActionHandler } = require("demux")

const BetReceipt = require('./api/betreceipt/betreceipt.model')
//const state = { volumeBySymbol: {}, totalTransfers: 0, indexState: { blockNumber: 0, blockHash: "" } } // Initial state
const BlockIndexState = require('./api/block-index-state/block-index-state.model')
const state = { betReceipt: BetReceipt, indexState: { blockNumber: 0, blockHash: "" }}
const mongoose = require('mongoose')

class ObjectActionHandler extends AbstractActionHandler {

  constructor (updaters, effects, uri) {
    console.log(uri);
    mongoose.connect(uri)
    .then(() => {
      console.log('Database connection successful')
    })
    .catch(err => {
      console.error('Database connection error')
    })

    // CONNECTION EVENTS
    // Connection successful
    mongoose.connection.on('connected', () => {
      console.info(`Mongoose default connection open to ${uri}`)
    })

    // Connection throws an error
    mongoose.connection.on('error', console.error.bind(console, 'Mongoose default connection error:'))

    // Connection is disconnected
    mongoose.connection.on('disconnected', () => {
      console.info('Mongoose default connection disconnected')
    })

    // Close the connection if the node process is terminated
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.info('Mongoose default connection disconnected through app termination')
        process.exit(0)
      })
    })
    super(updaters, effects)
  }

  async handleWithState(handle) {
    await handle(state)
  }

  async loadIndexState() {
    return state.indexState

  }

  async updateIndexState(stateObj, block) {
    stateObj.indexState.blockNumber = block.blockInfo.blockNumber
    stateObj.indexState.blockHash = block.blockInfo.blockHash
  }

}
 
module.exports = ObjectActionHandler
