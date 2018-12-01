async function betreceipt(state, payload, blockInfo, context) {

    const BetReceipt = state.betReceipt
    try {
      let betReceipt = await BetReceipt.find(
        {
          _id: {
            timestamp: blockInfo.timestamp,
            author: payload.data.author
          }
        }
      ).exec()
  
      // if profile already exists do not insert it in again
      betReceipt = new BetReceipt(
        {
          _id: payload.data.bet_id,
          bettor: payload.data.bettor,
          amt_contract: payload.data.amt_contract,
          bet_amt: payload.data.bet_amt,
          payout: payload.data.payout,
          seed: payload.data.seed,
          signature: payload.data.signature,
          roll_under: payload.data.roll_under,
          random_roll: payload.data.random_roll,
          confirmed: true,
        }
      )
      await betReceipt.save()
    } catch (err) {
      console.error(err)
    }
  
  }

  module.exports = betreceipt