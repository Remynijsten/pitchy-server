const Session           = require('./Session');
const StateMachine      = require('./StateMachine');

module.exports = function(io) {

    if (!this.activeSessions) this.activeSessions = []

    let session

    let broadcast = (message, data) => session.users.forEach(client => client.emit(message, data))

    let create_session = () => {
        // Clear other sessions
        this.activeSessions = []

        // Create new session
        session         = new Session();

        // Push to sessions array
        this.activeSessions.push(session)
    }

    // Listen for connections
    io.on('connection', (client) => {

        client.on('session', (args) => {

            switch (args.event)
            {
                case 'create':
                    create_session()
                break;

                case 'reset':

                break;

                case 'get':
                    client.emit('session', {event: 'get', session: session})
                break;
            }
        })

        client.on('add_user', data => {
            session === undefined ? create_session() : ''

            if(!session.users.some(client => client.name === data.name)){
                client.name = data.name

                session.users.push(client)

                client.emit('add_user');

                broadcast('user_joined', session.users.map(socket => socket.name))
            } else {
                client.emit('username_error', {error : 'Naam is al in gebruik'})
            }
        })

        client.on('get_users', () => session !== undefined ? client.emit('get_users', session.users.map(socket => socket.name)) : '')

        client.on('load_next_state', () => {
            session === undefined ? create_session() : ''

            console.log('load next state fired')

            // client.emit('load_next_state', session.statemachine.load_next_state())

            broadcast('load_next_state', session.statemachine.load_next_state())
        })
    })
}