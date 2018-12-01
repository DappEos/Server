const { BaseActionWatcher } = require("demux")
const { NodeosActionReader } = require("demux-eos") // eslint-disable-line
const ObjectActionHandler = require("./ObjectActionHandler")
const updaters = require("./updaters")
const effects = require("./effects")

const actionHandler = new ObjectActionHandler(
  updaters,
  effects,
  'mongodb://127.0.0.1/eosbet_platform'
)
//const actionHandler = new ObjectActionHandler(updaters, effects, process.env.MONGODB_URL)
const actionReader = new NodeosActionReader(
  "http://jungle.cryptolions.io:18888", 
  0, // Start at most recent blocks
)

const actionWatcher = new BaseActionWatcher(
  actionReader,
  actionHandler,
  500,
)

actionWatcher.watch()
