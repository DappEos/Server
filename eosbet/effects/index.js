const newProfile = require('./betreceipt')
const account = 'tamtamtamtam'

function logUpdate(state, payload, blockInfo, context) {
  console.info("State updated:\n", JSON.stringify(state, null, 2))
}

const effects = [
  {
    actionType: "eosio.token::transfer",
    effect: logUpdate,
  },
  {
    actionType: account + "::betreceipt",
    effect: newProfile,
  },
]

module.exports = effects
