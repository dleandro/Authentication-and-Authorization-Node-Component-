class ConnectionError extends Error {  
  constructor (args) {
    super(args)

    this.name = this.constructor.name
  }
}

module.exports = ConnectionError  