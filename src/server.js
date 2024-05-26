const { Server, Origins } = require('boardgame.io/server')
const { ArkhamHorror } = require('./Game')

const server = Server({
  games: [ArkhamHorror],
  origins: ['Origins.LOCALHOST'],
})

server.run(8000)
