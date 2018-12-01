function newProfile(state, payload, blockInfo, context) {
    const betreceipt = {
        _id: payload.data.bet_id,
        bettor: payload.data.bettor,
        amt_contract: payload.data.amt_contract,
        bet_amt: payload.data.bet_amt,
        payout: payload.data.payout,
        seed: payload.data.seed,
        signature: payload.data.signature,
        roll_under: payload.data.roll_under,
        random_roll: payload.data.random_roll,
    }
    console.log(betreceipt);
    context.socket.emit('betreceipt', betreceipt)
}

module.exports = newProfile
