var message = function (content, isBroadcast, sender) {
    this.content = content,
    this.isBroadcast = isBroadcast ,
    this.sender = sender
}

module.exports = message