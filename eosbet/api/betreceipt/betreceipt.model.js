const mongoose = require('mongoose')

const { Schema } = mongoose

let BetReceipt = null

try {
  const BetReceiptSchema = new Schema({
    _id: Number,
    bettor: String,
    amt_contract: String,
    bet_amt: String,
    payout: String,
    seed: String,
    signature: String,
    roll_under: String,
    random_roll: String,
    confirmed: {
      type: Boolean,
      default: false
    }
  })
  BetReceipt = mongoose.model('BetReceipt', BetReceiptSchema)
} catch (e) {
  BetReceipt = mongoose.model('BetReceipt')
}

module.exports = BetReceipt
