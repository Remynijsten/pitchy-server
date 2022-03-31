const StateMachine = require('./StateMachine');

class Session {
    statemachine;

    users = [];

    constructor() {
        this.statemachine = new StateMachine()
    }
}

module.exports = Session;