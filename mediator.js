// 中介者模式 and 揭示模式

class Player {
  constructor (name, teamColor) {
    this.name = name
    this.teamColor = teamColor
    this.state = 'live'
  }
  win () {
    console.log(`${this.name} 胜利！`)
  }
  lose () {
    console.log(`${this.name} 失败`)
  }
  die () {
    this.state = 'dead'
    // playerDirector.playerDead(this)
    playerDirector.reciveMessage('playerDead', this)
  }
  msg (msg) {
    console.log(msg)
  }
}


// 中介者
playerDirector = (function() {
  let players = {}
  let methods = {}
  methods.addPlayer = player => {
    const teamColor = player.teamColor
    if (!players[teamColor]) players[teamColor] = []
    players[teamColor].push(player) 
  }
  methods.playerDead = player => {
    const teamColor = player.teamColor
    const teamPlayers = players[teamColor].filter(i => i.state !== 'dead')
    players[teamColor].forEach(item => {
      item.msg(`${item.name} -> ${player.name} dead`)
      if (!teamPlayers.length) {
        item.lose()
      }
    })
    if (!teamPlayers.length) {
      for (let i in players) {
        if (i !== teamColor) methods.enemyPlayer(players[i])
      }
    }
  }
  methods.enemyPlayer = enemy => {
    enemy.forEach(i => {
      i.win()
    })
  }

  // 揭示模式
  const reciveMessage = (...args) => {
    const message = Array.prototype.shift.call(args)
    methods[message].apply(null, args)
  }

  return {
    reciveMessage: reciveMessage
  }
})()

const player1 = playerFactory('player1', 'red')
const player2 = playerFactory('player2', 'red')
const player3 = playerFactory('player3', 'red')
const player4 = playerFactory('player4', 'blue')
const player5 = playerFactory('player5', 'blue')
const player6 = playerFactory('player6', 'blue')

function playerFactory (name, team) {
  const player = new Player(name, team)
  playerDirector.reciveMessage('addPlayer', player)
  return player
}

player1.die()