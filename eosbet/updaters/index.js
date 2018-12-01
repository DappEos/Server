const betreceipt = require('./betreceipt')

const account = 'tamtamtamtam'


function updateHello(state, payload, blockInfo, context) {
  console.log(state);
  console.log(payload);
  console.log(blockInfo);
  console.log(context);
}


const updaters = [
  {
    actionType: account + "::hello",
    updater: updateHello,
  },
  {
    actionType: account + "::betreceipt",
    updater: betreceipt,
  },
]

module.exports = updaters
